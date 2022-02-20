const users = require('../db/users');

function isSignInEmailValid(req, res, next) {
    const {email} = req.body;
    const signInEmail = users.find(user => user.email === email)
    try {
        if (!signInEmail){
            throw new Error('There is no such email in the array');
        }
        next();
    }catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = isSignInEmailValid;