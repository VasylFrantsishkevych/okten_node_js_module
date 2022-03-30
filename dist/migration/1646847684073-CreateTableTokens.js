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
exports.CreateTableTokens1646847684073 = void 0;
class CreateTableTokens1646847684073 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                refreshToken VARCHAR(250) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES  Users (id)
            )
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
        });
    }
}
exports.CreateTableTokens1646847684073 = CreateTableTokens1646847684073;
//# sourceMappingURL=1646847684073-CreateTableTokens.js.map