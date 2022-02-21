const users = require('../db/users');

module.exports = {
    renderSingInForm: (req, res) => {
        res.render('signIn');
    },
    signInUser: ({user}, res) => {
        res.redirect(`/users/${user.id}`);
    }
};