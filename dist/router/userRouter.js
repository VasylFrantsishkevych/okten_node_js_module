"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.userController.getUserByEmail);
router.post('/', userController_1.userController.createUser);
// router.patch('/:id', userController.updateUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map