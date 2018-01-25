const moment = require('moment')

let generateMessage = (from, text) =>{
    return {
        from,
        text,
        createdAt: moment().format("h:mm:ss a")
    }
}
let generateLocationMessage = (from, latitude, longitude) =>{
    return{
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().format("h:mm:ss a")
    }
}

module.exports = {generateMessage, generateLocationMessage}