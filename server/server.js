const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();
const publicPath = path.join(__dirname, '../public');

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('New user connected')

    socket.on('disconnect', ()=>{
        console.log('User disconnected')
    });
    socket.on('createMessage', function(message){
        console.log('Recieved message', message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })
})

app.use(express.static(publicPath));
server.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
});