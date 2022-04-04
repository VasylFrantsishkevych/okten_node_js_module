import { sendAllUsers } from './sendAllUsers.cron';

export const cronRun = async () => {
    await sendAllUsers();
};
