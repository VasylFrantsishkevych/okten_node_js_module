const {Router} = require('express');

const usersRouter = require("./users.router");
const loginRouter = require("./login.router");
const signInRouter = require('./signIn.router');

const router = Router();

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/signIn', signInRouter);

router.get('/error', ({ query }, res) => {
    res.render('error', { error: query.error });
});

router.use((req, res) => {
    res.render('notFound');
});

module.exports = router;