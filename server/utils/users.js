[{
    id: '.1iubnfiuanfiuwan',
    name: 'Vlad',
    room: 'The Office Fans'
}]

//addUser(id/name/room name)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor(){
     this.users = []   
    }

    addUser(id, name, room){
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
}

module.exports = {Users};
// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// let me = new Person('Vlad', 28);
// let description = me.getUserDescription();
// console.log(description)