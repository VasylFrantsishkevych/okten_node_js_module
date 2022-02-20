const {Router} = require('express');
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const errorRouter = require("./errorRouter");
const signInRouter = require("./signInRouter");

const routes = Router();

routes.use('/users', userRouter);
routes.use('/login', loginRouter);
routes.use('/error', errorRouter);
routes.use('/signIn', signInRouter);


routes.use((req, res) => {
    res.render('notFound')
})

module.exports = routes;