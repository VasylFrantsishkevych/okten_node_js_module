"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', controller_1.userController.getUserByEmail);
router.post('/', middlewares_1.authMiddleware.validatorRegistration, controller_1.userController.createUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map