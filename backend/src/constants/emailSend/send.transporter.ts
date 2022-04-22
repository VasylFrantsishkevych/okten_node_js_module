import nodemailer from 'nodemailer';
// import EmailTemplate from 'email-templates';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

import { config } from '../../config/config';

export const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,
    },
});

// export const templateRender = new EmailTemplate({
//     views: {
//         root: path.join(__dirname, '../', 'email-templates'),
//     },
// });

const handlebarOptions = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: path.resolve(__dirname, '../', '../', 'views/layout'),
        partialsDir: path.resolve(__dirname, '../', '../', 'views/partials'),
        defaultLayout: 'layout',
    },
    viewPath: path.resolve(__dirname, '../', '../', 'views'),
    extName: '.hbs',
};

emailTransporter.use('compile', hbs(handlebarOptions));
