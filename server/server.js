const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
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
        users.addUser(socket.id, params.name, params.room)
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Mother Russia Chat App'))
        callback();
    })
    socket.on('disconnect', ()=>{
        console.log('User disconnected')
        let user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));            
        }
    });
    socket.on('createMessage', function(message, callback){
        console.log(message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server');
    })
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })
})

app.use(express.static(publicPath));
server.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
});