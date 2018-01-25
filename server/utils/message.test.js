const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')
describe('generateMessage', ()=>{
    it('should generate the correct message object', ()=>{
        let from = 'Jen'
        let text = 'Some message'
        let message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('string')
        expect(message).toInclude({from,text})
    })
})
describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        let from = 'Admin'
        let latitude = 50.12345
        let longitude = 129.12346
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`
        let message = generateLocationMessage(from, latitude, longitude)
        expect(message.url).toBe(url)
        expect(message.createdAt).toBeA('string')
        expect(message).toInclude({from, url})
    })
})