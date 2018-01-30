const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
const capitalize = require('./utils/capitalize')
const app = express();
const publicPath = path.join(__dirname, '../public');

const server = http.createServer(app)
const io = socketIO(server)
const users = new Users();

io.on('connection', (socket)=>{
    console.log('New user connected')
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required')
        }
        socket.join(params.room);
        users.removeUser(socket.id)
        users.users.map((user)=>{
            if(user.name === params.name && user.room === params.room){
                return callback('User with that name already exists')
            }
        })
        users.addUser(socket.id, params.name, params.room)
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${capitalize(params.name)} has joined`))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Keyther chat'))
        callback();
    })
    socket.on('disconnect', ()=>{
        let user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${capitalize(user.name)} has left the room.`));            
        }
    });
    socket.on('createMessage', function(message, callback){
        let user = users.getUser(socket.id)
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(capitalize(user.name), message.text))
        }
        callback();
    })
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id)
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })
})

app.use(express.static(publicPath));
server.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
});