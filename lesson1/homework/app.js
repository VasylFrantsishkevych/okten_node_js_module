const fs = require('fs');
const path = require("path");

// fs.mkdir(path.join(__dirname, 'main'), (err) => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.mkdir(path.join(__dirname, 'main', 'online'), (err) => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// })

let onlineUsers = [
    {name: 'Kolia', age: 15, city: 'Kyiv'},
    {name: 'Olia', age: 20, city: 'Lviv'},
    {name: 'Gena', age: 25, city: 'Rivne'}
];
let inPersonUsers = [
    {name: 'Masha', age: 21, city: 'Lviv'},
    {name: 'Andriy', age: 22, city: 'Kharkiv'},
    {name: 'Dima', age: 19, city: 'Brody'}
];

const users = onlineUsers.map(user => `\nName: ${user.name} Age: ${user.age} City:${user.city}`);
//
// fs.writeFile(path.join(__dirname, 'main', 'online', 'onlineUser.txt'),
//      `${users}`, (err) => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// })
//
const persons = inPersonUsers.map(person => `\nName: ${person.name} Age: ${person.age} City: ${person.city}` );
//
// fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPersonUser.txt'),
//     `${persons}`, (err) => {
//         if (err){
//             console.log(err);
//             throw err;
//         }
//     })

function substitute(online, inPerson) {
    fs.appendFile(path.join(__dirname, 'main', 'online', 'onlineUser.txt'), `${inPerson}`,
        {flag: 'w'},(err) => {
        if (err) {
            console.log(err);
            throw err
        }
        console.log(inPerson)
    })
    fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'inPersonUser.txt'), `${online}`,
        {flag: 'w'},(err) => {
            if (err) {
                console.log(err);
                throw err
            }
        })
    console.log(online)
}

substitute(users, persons);