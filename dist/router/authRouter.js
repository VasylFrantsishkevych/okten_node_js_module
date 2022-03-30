"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/registration', middlewares_1.authMiddleware.validatorRegistration, controller_1.authController.registration);
router.post('/login', middlewares_1.authMiddleware.validatorLogin, middlewares_1.userMiddleware.checkIsUserExist, controller_1.authController.login);
router.post('/logout', middlewares_1.authMiddleware.checkAccessToken, controller_1.authController.logout);
router.post('/refresh', middlewares_1.authMiddleware.checkRefreshToken, controller_1.authController.refreshToken);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map