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
exports.authMiddleware = void 0;
const services_1 = require("../services");
const repositories_1 = require("../repositories");
const constants_1 = require("../constants");
const validators_1 = require("../validators");
const ErrorHandler_1 = require("../error/ErrorHandler");
class AuthMiddleware {
    // З header authorization дістаємо токен та розшифровуємо токен. Він вертає нам або помилку або
    // проверифікується і повернуться дані які зашифрували.
    checkAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.get(constants_1.constants.AUTHORIZATION);
                if (!accessToken) {
                    next(new ErrorHandler_1.ErrorHandler('No token', 401));
                    return;
                }
                // Розшифровуємо юзера
                const { userEmail } = services_1.tokenService.verifyToken(accessToken);
                const tokenPairFromDB = yield repositories_1.tokenRepository.findByParams({ accessToken });
                if (!tokenPairFromDB) {
                    next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                    return;
                }
                // Шукаємо юзера по емейлу
                const userFromToken = yield services_1.userService.getUserByEmail(userEmail);
                if (!userFromToken) {
                    next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                    return;
                }
                // Розширили request додавши юзера з
                req.user = userFromToken;
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
    checkRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // беремо токен з header
                const refreshToken = req.get(constants_1.constants.AUTHORIZATION);
                // Перевіряємо чи є токен в базі
                if (!refreshToken) {
                    next(new ErrorHandler_1.ErrorHandler('No token', 401));
                    return;
                }
                // Розшифровуємо юзера
                const { userEmail } = services_1.tokenService.verifyToken(refreshToken, 'refresh');
                // Шукаємо refreshToken токен в базі
                const tokenPairFromDB = yield repositories_1.tokenRepository.findByParams({ refreshToken });
                if (!tokenPairFromDB) {
                    next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                    return;
                }
                // Шукаємо юзера по емейлу
                const userFromToken = yield services_1.userService.getUserByEmail(userEmail);
                if (!userFromToken) {
                    next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                    return;
                }
                // Розширили request додавши юзера з
                req.user = userFromToken;
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
    validatorRegistration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = validators_1.authValidators.registration.validate(req.body);
                if (error) {
                    next(new ErrorHandler_1.ErrorHandler(error.details[0].message, 400));
                    return;
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
    validatorLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = validators_1.authValidators.login.validate(req.body);
                if (error) {
                    next(new ErrorHandler_1.ErrorHandler('Wrong password or email', 400));
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map