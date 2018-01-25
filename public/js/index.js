let socket = io();

socket.on('connect', function(){
    console.log('Connected to server')
    socket.emit('name', 'Vlad')
})

socket.on('disconnect', function(){
    console.log('Disconnected from server')
})


socket.on('newMessage', function(message){
    console.log(message)
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    $('#messages').append(li);
})

socket.on('welcome', function(message){
    console.log(message)
})

socket.emit('createMessage', {
    from: 'Frank',
    text: 'hi'
}, function (data){
    console.log(data)
})
$( document ).ready(function() {
    $('#message-form').on('submit', function(e){
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function () {
        });
    })
})