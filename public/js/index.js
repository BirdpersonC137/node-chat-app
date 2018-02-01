let socket = io();
let roomlist;
let options = [];
socket.on('roomList', (rooms)=>{
    roomlist = rooms.roomList;
        function capitalize(str) {
        const words = []
    
        for(let word of str.split(' ')){
            words.push(word[0].toUpperCase() + word.slice(1));
        }
        return words.join(' ')
    } 
    $(document).ready(function(){
        let select = document.getElementById('rooms')
            roomlist.forEach((room)=>{
                let option = document.createElement('option');
                option.value = capitalize(room);
                option.innerHTML = capitalize(room);
                option.setAttribute('id', `${option.innerHTML}`)
                optionId = option.getAttribute('id')
                if(options.indexOf(optionId)===-1){
                    options.push(optionId)
                    select.appendChild(option)
                }
            })
    })
});
