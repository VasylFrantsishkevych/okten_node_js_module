const {Router} = require('express');

const {loginController} = require("../controllers");
const {userMiddleware} = require("../middlewares");

const loginRouter = Router();

loginRouter.get('/', loginController.renderUserForm);
loginRouter.post('/',
    userMiddleware.isUserDataValid,
    userMiddleware.isUserExist,
    loginController.createUserForm);

module.exports = loginRouter;