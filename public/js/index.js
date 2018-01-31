let socket = io();

socket.on('newRoom', function(room){

})

$(document).ready(function(){
    let rooms = []
    $('#roomForm').on('submit',(e)=>{
        let room = document.getElementById("roomField").value
        if(rooms.indexOf(room) === -1){
            rooms.push(room)
            socket.emit('newRoom',{rooms:[rooms]})
        }

    })

})

//I need to save the new room to array - done
//I need to emit that array on the server end and persist through the session
//On recieval i need to send data back with append instructions
//I need to append data on front end