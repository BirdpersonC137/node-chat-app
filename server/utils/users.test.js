const expect = require('expect')

const {Users} = require('./users')

describe('Users', ()=>{
    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Yuri',
            room: 'Node Course'
        },{
            id: 2,
            name: 'Jen',
            room: 'React Course'
        },{
            id: 3,
            name: 'Julie',
            room: 'React Course'
        },
    ]})
    it('should add new user', ()=>{
        let users = new Users();
        let user = {
            id: '123',
            name: 'Vlad',
            room: 'The office fans'
        }
        let resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user]);
    })
    it('should return names for react course', ()=>{
        let userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen', 'Julie'])
    })
    it('should remove user', ()=>{
        let userId = 1;
        let user = users.removeUser(userId)

        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(2);
    })
    it('should not remove user', ()=>{
        let userId = 99;
        let user = users.removeUser(userId)

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })
    it('Should find user', () => {
        let userId = 2;
        let user = users.getUser(userId)

        expect(user.id).toBe(userId)
    })
    it('Should not find user', ()=>{
        let userId = 99;
        let user = users.getUser(userId)

        expect(user).toNotExist()
    })
})