import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';

class UserMiddleware {
    // Перевіряє по емейлу чи є юзер в DB. Якщо є такий юзер то передаємо його дальше,
    // а якщо немає то вилаємо помилку
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        const { email } = req.body;
        try {
            const userFromDB = await userRepository.getUserByEmail(email);

            if (!userFromDB) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
