"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailInfo = void 0;
const enums_1 = require("../../enums");
exports.emailInfo = {
    [enums_1.emailActionEnum.WELCOME]: {
        subject: 'Welcome',
        template: 'emailRegistration',
        // template: 'registration',
    },
    [enums_1.emailActionEnum.LOGIN_TO_SITE]: {
        subject: 'Login in the site',
        template: 'emailLogin',
        // template: 'login',
    },
    [enums_1.emailActionEnum.LOGGED_OUT]: {
        subject: 'Logged out',
        template: 'emailLogout',
        // template: 'logout',
    },
};
//# sourceMappingURL=email.info.js.map