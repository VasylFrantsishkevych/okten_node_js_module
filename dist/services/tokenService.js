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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const repositories_1 = require("../repositories");
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACCESS_KEY, { expiresIn: config_1.config.EXPIRES_IN_ACCESS });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_REFRESH_KEY, { expiresIn: config_1.config.EXPIRES_IN_REFRESH });
        return {
            accessToken,
            refreshToken,
        };
    }
    saveToken(userId, refreshToken, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenFromDb = yield repositories_1.tokenRepository.findTokenByUserId(userId);
            if (tokenFromDb) {
                tokenFromDb.refreshToken = refreshToken;
                tokenFromDb.accessToken = accessToken;
                return repositories_1.tokenRepository.createToken(tokenFromDb);
            }
            return repositories_1.tokenRepository.createToken({ accessToken, refreshToken, userId });
        });
    }
    deleteUserTokenPair(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return repositories_1.tokenRepository.deleteByParams({ userId });
        });
    }
    deleteTokenPairByParams(searchObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return repositories_1.tokenRepository.deleteByParams(searchObject);
        });
    }
    // Розшифровуємо токен та отримаємо зашифровані дані
    verifyToken(authToken, tokenType = 'access') {
        let secretWord = config_1.config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config_1.config.SECRET_REFRESH_KEY;
        }
        return jsonwebtoken_1.default.verify(authToken, secretWord);
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=tokenService.js.map