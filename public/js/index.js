let socket = io();

socket.on('connect', function(){
    console.log('Connected to server')
    
    socket.emit('createMessage', {
        from: 'Brandon',
        text: 'My mom is so fat, she has her own asteroid belt!',
    });
})

socket.on('disconnect', function(){
    console.log('Disconnected from server')
})


socket.on('newMessage', (newMessage)=>{
    console.log(newMessage)
})