const users = require('../db/users');
let error = require('../db/error');

class SignInController {
    renderSignIn(req, res) {
        res.render('signIn')
    }

    signInUser(req, res) {
        const {body} = req;
        const user = users.find(user => user.email === body.email && user.password === body.password);
        if (!user) {
            error = 'Email or password not exist'
            console.log(error)
            res.redirect('/error')
            return;
        }
        res.redirect(`/users/${user.id}`)
    }
}

module.exports = new SignInController();