import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { constants } from '../constants';
import { userValidators } from '../validators';

class AuthMiddleware {
    // З header authorization дістаємо токен та розшифровуємо токен. Він вертає нам або помилку або
    // проверифікується і повернуться дані які зашифрували.
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);
            if (!accessToken) {
                throw new Error('No token');
            }
            // Розшифровуємо юзера
            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }

            // Шукаємо юзера по емейлу
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            // Розширили request додавши юзера з
            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    status: 401,
                    message: e.message,
                });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // беремо токен з header
            const refreshToken = req.get(constants.AUTHORIZATION);
            // Перевіряємо чи є токен в базі
            if (!refreshToken) {
                throw new Error('No token');
            }
            // Розшифровуємо юзера
            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');
            // Шукаємо refreshToken токен в базі
            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }
            // Шукаємо юзера по емейлу
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            // Розширили request додавши юзера з
            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    status: 401,
                    message: e.message,
                });
        }
    }

    async validatorRegistration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidators.registration.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validatorLogin(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidators.login.validate(req.body);

            if (error) {
                throw new Error('Wrong password or email');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
