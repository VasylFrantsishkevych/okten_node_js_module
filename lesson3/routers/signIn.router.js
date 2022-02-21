const {Router} = require('express');

const {signInController} = require("../controllers");
const {signInMiddleware} = require("../middlewares");

const signInRouter = Router();

signInRouter.get('/', signInController.renderSingInForm);
signInRouter.post('/',
    signInMiddleware.checkUsersAuth,
    signInController.signInUser);

module.exports = signInRouter;