import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authMiddleware.validatorRegistration, authController.registration);
router.post('/login', authMiddleware.validatorLogin, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post(
    '/forgotPassword',
    authMiddleware.checkEmailValid,
    userMiddleware.checkIsUserExist,
    authController.sendForgotPassword,
);
router.post(
    '/forgotPassword/set',
    authMiddleware.checkPassValid,
    authMiddleware.checkActionToken,
    authController.setPassword,
);

export const authRouter = router;
