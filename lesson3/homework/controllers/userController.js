const users = require('../db/users');
let error = require('../db/error');

class UserController {
    renderUsers(req, res) {
        const {city, age} = req.query;
        if (Object.keys(req.query).length){
            let userArr = [...users];
            if (city) {
                userArr = userArr.filter(user => user.city.toLowerCase() === city.toLowerCase());
            }
            if (age) {
                userArr = userArr.filter(user => user.age === age);
            }
            res.render('users', {users: userArr});
            return;
        }
        res.render('users', {users})
    }

    getUserById(req, res) {
        const {id} = req.params
        const user = users.find(user => user.id === +id )
        if (!user) {
            error = `User with ${id} not find`;
            console.log(error)
            res.redirect('/error');
            return;
        }
        res.render('user', {user})
    }

}

module.exports = new UserController();