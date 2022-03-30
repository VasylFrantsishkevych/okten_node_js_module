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
exports.authService = void 0;
const userService_1 = require("./userService");
const tokenService_1 = require("./tokenService");
class AuthService {
    registration(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = body;
            const userFromDb = yield userService_1.userService.getUserByEmail(email);
            if (userFromDb) {
                throw new Error(`User with email: ${email} already exists`);
            }
            const createdUser = yield userService_1.userService.createUser(body);
            return this._getTokenData(createdUser);
        });
    }
    _getTokenData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email } = userData;
            const tokensPair = yield tokenService_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            yield tokenService_1.tokenService.saveToken(id, tokensPair.refreshToken, tokensPair.accessToken);
            return Object.assign(Object.assign({}, tokensPair), { userId: id, userEmail: email });
        });
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map