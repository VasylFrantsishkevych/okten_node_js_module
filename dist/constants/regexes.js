"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexes = void 0;
exports.regexes = {
    EMAIL: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    PHONE: /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
    PASSWORD: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/,
};
//# sourceMappingURL=regexes.js.map