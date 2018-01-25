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

socket.on('newLocationMessage', function(message){
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>')

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    $('#messages').append(li);
})
$( document ).ready(function() {
    $('#message-form').on('submit', function(e){
        e.preventDefault();
        let messageTextbox = $('[name=message]')
        socket.emit('createMessage', {
            from: 'Bud',
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val('')
        });
    })
    let locationButton = $('#send-location')
    locationButton.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser')
        }
        locationButton.attr('disabled', 'disable').text('Sending location...')
        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send location')
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function(){
            locationButton.removeAttr('disabled')
            alert('Unable to fetch location')
        })
    })
})

