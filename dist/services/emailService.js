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
exports.emailService = void 0;
const constants_1 = require("../constants");
class EmailService {
    sendMail(user, action, context = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subject, template } = constants_1.emailInfo[action];
            const { email, firstName } = user;
            Object.assign(context, { url: 'https://google.com', name: firstName });
            // const html = await templateRender.render(template, context);
            const mailOptions = {
                from: 'No Reply Sep-2021',
                to: email,
                subject,
                template,
                context: {
                    name: firstName,
                },
            };
            return constants_1.emailTransporter.sendMail(mailOptions);
        });
    }
}
exports.emailService = new EmailService();
//# sourceMappingURL=emailService.js.map