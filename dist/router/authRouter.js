"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/registration', controller_1.authController.registration);
// router.post('/login', authController.registration);
router.post('/logout', middlewares_1.authMiddleware.checkAccessToken, controller_1.authController.logout);
// router.post('/refresh', authController.registration);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map