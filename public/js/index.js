let socket = io();
let roomlist;
let options = [];
socket.on('roomList', (rooms)=>{
    roomlist = rooms.roomList;
    console.log(roomlist);
    $(document).ready(function(){
        let select = document.getElementById('rooms')
            roomlist.forEach((room)=>{
                let option = document.createElement('option');
                option.value = room;
                option.innerHTML = room;
                option.setAttribute('id', `${option.innerHTML}`)
                optionId = option.getAttribute('id')
                if(options.indexOf(optionId)===-1){
                    options.push(optionId)
                    select.appendChild(option)
                }
            })
    })
});
