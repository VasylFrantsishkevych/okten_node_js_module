"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const router = (0, express_1.Router)();
router.use('/users', userRouter_1.userRouter);
exports.apiRouter = router;
//# sourceMappingURL=apiRouter.js.map