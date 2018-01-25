const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message')
const app = express();
const publicPath = path.join(__dirname, '../public');

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('New user connected')
    socket.emit('welcome', generateMessage('Admin', 'Welcome to Mother Russia Chat App'))
    socket.broadcast.emit('welcome', generateMessage('Admin', 'New user joined the chanel'))
    socket.on('disconnect', ()=>{
        console.log('User disconnected')
    });
    socket.on('createMessage', function(message){
        console.log('Recieved message', message)
        io.emit('newMessage', generateMessage(message.from, message.text))

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })
})

app.use(express.static(publicPath));
server.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
});