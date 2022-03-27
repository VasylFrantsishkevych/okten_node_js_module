import nodemailer from 'nodemailer';
import { config } from '../../config/config';

export const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,
    },
});
