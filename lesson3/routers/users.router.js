const {Router} = require('express');

const {usersController} = require("../controllers");
const {userMiddleware} = require("../middlewares");


const usersRouter = Router();

usersRouter.get('/',
    usersController.getAllUsers);
usersRouter.get('/:id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExist,
    usersController.getUserById);
usersRouter.post('/:id',
    userMiddleware.isUserIdValid,
    usersController.deleteUserById);

module.exports = usersRouter;