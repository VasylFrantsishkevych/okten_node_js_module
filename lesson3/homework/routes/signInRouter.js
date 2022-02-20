const {Router} = require('express');
const signInController = require('../controllers/signInController');
const isSignInEmailValid = require('../middleware/isSignInEmailValid')

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);
signInRouter.post('/', isSignInEmailValid, signInController.signInUser);

module.exports = signInRouter;