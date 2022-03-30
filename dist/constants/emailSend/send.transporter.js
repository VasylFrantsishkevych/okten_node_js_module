"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// import EmailTemplate from 'email-templates';
const path_1 = __importDefault(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const config_1 = require("../../config/config");
exports.emailTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.config.NO_REPLY_EMAIL,
        pass: config_1.config.NO_REPLY_EMAIL_PASSWORD,
    },
});
// export const templateRender = new EmailTemplate({
//     views: {
//         root: path.join(__dirname, '../', 'email-templates'),
//     },
// });
const handlebarOptions = {
    viewEngine: {
        extname: 'handlebars',
    },
    viewPath: path_1.default.resolve(__dirname, '../', '../', 'views'),
    extName: '.hbs',
};
exports.emailTransporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
//# sourceMappingURL=send.transporter.js.map