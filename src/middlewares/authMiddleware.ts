import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { constants } from '../constants';
import { authValidators } from '../validators';
import { ErrorHandler } from '../error/ErrorHandler';

class AuthMiddleware {
    // З header authorization дістаємо токен та розшифровуємо токен. Він вертає нам або помилку або
    // проверифікується і повернуться дані які зашифрували.
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);
            if (!accessToken) {
                next(new ErrorHandler('No token', 401));
                return;
            }
            // Розшифровуємо юзера
            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            // Шукаємо юзера по емейлу
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            // Розширили request додавши юзера з
            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // беремо токен з header
            const refreshToken = req.get(constants.AUTHORIZATION);
            // Перевіряємо чи є токен в базі
            if (!refreshToken) {
                next(new ErrorHandler('No token', 401));
                return;
            }
            // Розшифровуємо юзера
            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');
            // Шукаємо refreshToken токен в базі
            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }
            // Шукаємо юзера по емейлу
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            // Розширили request додавши юзера з
            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
        }
    }

    async validatorRegistration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidators.registration.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    async validatorLogin(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidators.login.validate(req.body);

            if (error) {
                next(new ErrorHandler('Wrong password or email', 400));
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
