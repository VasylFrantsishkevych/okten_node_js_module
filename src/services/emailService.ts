import { SentMessageInfo } from 'nodemailer';

import { emailInfo, emailTransporter } from '../constants';
import { IUser } from '../entity/user';
import { emailActionEnum } from '../enums';

class EmailService {
    async sendMail(user: IUser, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
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
            },
        };

        return emailTransporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService();
