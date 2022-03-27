import { emailActionEnum, emailInfo, emailTransporter } from '../constants';

class EmailService {
    sendMail(userEmail: string, action: emailActionEnum) {
        const { subject, html } = emailInfo[action];

        return emailTransporter.sendMail({
            from: 'No Reply Sep-2021',
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
