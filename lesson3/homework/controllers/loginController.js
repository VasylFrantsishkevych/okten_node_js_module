let users = require('../db/users');
let error = require('../db/error');

class LoginController {
    renderLogin(req, res) {
        res.render('login')
    }

    loginUser(req, res) {
        const {body} = req;
        const user = users.some(user => user.email === body.email)
        if (user) {
            error = 'Email is used!!';
            console.log(error)
            res.redirect('/error');
            return;
        }
        users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
        res.redirect('/users');
    }
}

module.exports = new LoginController();