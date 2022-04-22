import { EmailActionEnum } from '../../enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome',
        template: 'emailRegistration',
        // template: 'registration',
    },

    [EmailActionEnum.LOGIN_TO_SITE]: {
        subject: 'Login in the site',
        template: 'emailLogin',
        // template: 'login',
    },

    [EmailActionEnum.LOGGED_OUT]: {
        subject: 'Logged out',
        template: 'emailLogout',
        // template: 'logout',
    },

    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Forgot password',
        template: 'emailForgotPassword',
    },

    [EmailActionEnum.RESET_PASSWORD]: {
        subject: 'New password',
        template: 'emailResetPassword',
    },

    [EmailActionEnum.SEND_MAIL_ALL_USERS]: {
        subject: 'Discounts',
        template: 'emailAllUsers',
    },
};
