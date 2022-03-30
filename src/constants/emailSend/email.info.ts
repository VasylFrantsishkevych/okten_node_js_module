import { emailActionEnum } from '../../enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome',
        template: 'emailRegistration',
        // template: 'registration',
    },

    [emailActionEnum.LOGIN_TO_SITE]: {
        subject: 'Login in the site',
        template: 'emailLogin',
        // template: 'login',
    },

    [emailActionEnum.LOGGED_OUT]: {
        subject: 'Logged out',
        template: 'emailLogout',
        // template: 'logout',
    },
};
