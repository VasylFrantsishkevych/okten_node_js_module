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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/user/userRepository");
const config_1 = require("../config/config");
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = user;
            const hashedPassword = yield this._hashPassword(password);
            const dataToSave = Object.assign(Object.assign({}, user), { password: hashedPassword });
            return userRepository_1.userRepository.createUser(dataToSave);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.userRepository.getUserByEmail(email);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.userRepository.getAllUsers();
        });
    }
    compareUserPassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordUnique = yield bcrypt_1.default.compare(password, hash);
            if (!isPasswordUnique) {
                throw new Error('User not exists');
            }
        });
    }
    _hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.hash(password, Number(config_1.config.USER_SALT_ROUNDS));
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map