import { emailActionEnum } from '../enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome',
        html: 'Hello. You have registered on the site',
    },

    [emailActionEnum.LOGIN_TO_SITE]: {
        subject: 'Login in the site',
        html: 'You have logged in to your account',
    },

    [emailActionEnum.LOGGED_OUT]: {
        subject: 'Logged out',
        html: 'You are logged out of your account',
    },
};
