import { emailActionEnum } from '../enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to Sep-2021',
        html: 'Hello this is mail',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Blocked account',
        html: 'Your account was blocked',
    },
};
