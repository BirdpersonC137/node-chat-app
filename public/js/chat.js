let socket = io();

function scrollToBottom(){
    let messages = $('#messages');
    let newMessage = messages.children('li')
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function(){
    let params = $.deparam(window.location.search)
    socket.emit('join', params, function (err) {
        if(err){
            alert(err)
            window.location.href = '/'
        } else {
            console.log('No error')
        }
    })
})

socket.on('disconnect', function(){
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
    let formattedTime =  moment(message.createdAt).format('h:mm a')
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html)
    scrollToBottom();
})

socket.on('newLocationMessage', function(message){
    let formattedTime =  moment(message.createdAt).format('h:mm a')
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    $('#messages').append(html);
    scrollToBottom();
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

