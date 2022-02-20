const {Router} = require('express');
const loginController = require('../controllers/loginController');
const isLoginValid = require('../middleware/isLoginValid');


const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/', isLoginValid, loginController.loginUser);

module.exports = loginRouter;