function isLoginValid(req, res, next) {
    const {firstName, lastName, email, password, age, city} = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !age || !city){
            throw new Error('One of the fields is blank!')
        }

        next();
    }catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

module.exports = isLoginValid;