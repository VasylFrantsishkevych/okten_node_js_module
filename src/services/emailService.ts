import { SentMessageInfo } from 'nodemailer';

import { constants, emailInfo, emailTransporter } from '../constants';
import { IUser } from '../entity/user';
import { EmailActionEnum } from '../enums';

class EmailService {
    async sendMail(user: IUser, action: EmailActionEnum, tokenAction?: string): Promise<SentMessageInfo> {
        const { subject, template } = emailInfo[action];
        const { email, firstName } = user;

        // Object.assign(context, { url: 'https://google.com', name: firstName });

        // const html = await templateRender.render(template, context);

        const mailOptions = {
            from: 'No Reply Sep-2021',
            to: email,
            subject,
            template,
            context: {
                name: firstName,
                url: 'https://google.com',
                urlResetPassword: constants.URL_RESET_PASSWORD,
                token: tokenAction,
            },
        };

        return emailTransporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService();
