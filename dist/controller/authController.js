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
exports.authController = void 0;
const services_1 = require("../services");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
class AuthController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield services_1.authService.registration(req.body);
            const user = req.body;
            yield services_1.emailService.sendMail(user, constants_1.emailActionEnum.WELCOME);
            res.cookie(constants_1.COOKIE.nameRefreshToken, data.refreshToken, { maxAge: constants_1.COOKIE.maxAgeRefreshToken, httpOnly: true });
            return res.json(data);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { id } = req.user;
            yield services_1.emailService.sendMail(user, constants_1.emailActionEnum.LOGGED_OUT);
            yield services_1.tokenService.deleteUserTokenPair(id);
            return res.json('Ok');
        });
    }
    // Створюємо два токена юзеру який залогувався та зберігаємо їх в базу
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id, email, firstName, password: hashPassword, } = req.user;
                const { password } = req.body;
                yield services_1.emailService.sendMail(user, constants_1.emailActionEnum.LOGIN_TO_SITE, { userName: firstName });
                yield services_1.userService.compareUserPassword(password, hashPassword);
                const tokenPair = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
                const { refreshToken, accessToken } = tokenPair;
                yield repositories_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
                res.json({
                    refreshToken,
                    accessToken,
                    user: req.user,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, email } = req.user;
                // Беремо refreshToken з хедера
                const refreshTokenToDelete = req.get(constants_1.constants.AUTHORIZATION);
                // Стираємо стару пару токенів по refreshToken
                yield services_1.tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
                // Генеруємо нову пару токенів
                const { accessToken, refreshToken } = yield services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
                // Записуємо нову пару токенів в базу
                yield repositories_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
                res.json({
                    refreshToken,
                    accessToken,
                    user: req.user,
                });
            }
            catch (e) {
                res.status(400).json(e);
            }
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map