"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const repositories_1 = require("../repositories");
const ErrorHandler_1 = require("../error/ErrorHandler");
class UserMiddleware {
    // Перевіряє по емейлу чи є юзер в DB. Якщо є такий юзер то передаємо його дальше,
    // а якщо немає то вилаємо помилку
    checkIsUserExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const userFromDB = yield repositories_1.userRepository.getUserByEmail(email);
                if (!userFromDB) {
                    next(new ErrorHandler_1.ErrorHandler('User not found', 404));
                    return;
                }
                req.user = userFromDB;
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map