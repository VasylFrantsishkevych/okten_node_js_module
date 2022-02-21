const users = require('../db/users');

module.exports = {
    renderUserForm: (req, res) => {
        res.render('login');
    },
    createUserForm: (req, res) => {
        const {body} = req;
        users.push({ ...body, id: users.length ? users[users.length - 1].id + 1 : 1 });
        res.redirect('/users');
    }
};