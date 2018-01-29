const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const app = express();
const publicPath = path.join(__dirname, '../public');

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('New user connected')
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required')
        }
        
        socket.join(params.room);
        //io.emit -> io.to('The Office Fans).emit
        //socket.broadcast.emit -> socket.broadcast.to('The Office Fans).emit
        
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Mother Russia Chat App'))
        callback();
    })
    socket.on('disconnect', ()=>{
        console.log('User disconnected')
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