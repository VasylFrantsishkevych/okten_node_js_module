import cron from 'node-cron';

import { userRepository } from '../repositories';
import { emailService } from '../services';
import { EmailActionEnum } from '../enums';

export const sendAllUsers = async () => {
    cron.schedule('*/30 * * * * *', async () => {
        const users = await userRepository.getAllUsers();
        users.forEach((user) => emailService.sendMailAllUsers(user, EmailActionEnum.SEND_MAIL_ALL_USERS));
    });
};
