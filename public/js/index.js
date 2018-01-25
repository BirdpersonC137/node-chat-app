let socket = io();

socket.on('connect', function(){
    console.log('Connected to server')
    socket.emit('name', 'Vlad')
})

socket.on('disconnect', function(){
    console.log('Disconnected from server')
})


socket.on('newMessage', function(newMessage){
    console.log(newMessage)
})

socket.on('welcome', function(message){
    console.log(message)
})