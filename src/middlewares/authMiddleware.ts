import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { actionTokenRepository, tokenRepository } from '../repositories';
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

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // беремо токен з header
            const actionToken = req.get(constants.AUTHORIZATION);
            // Перевіряємо чи є токен в базі
            if (!actionToken) {
                next(new ErrorHandler('No token', 401));
                return;
            }
            // Розшифровуємо юзера
            const { userEmail } = tokenService.verifyToken(actionToken, 'action');
            // Шукаємо refreshToken токен в базі
            const tokenPairFromDB = await actionTokenRepository.findByParams({ actionToken });

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
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async validatorRegistration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
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

    public async validatorLogin(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
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

    // Перевірка валідності емейла
    public async checkEmailValid(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = authValidators.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    // Перевірка валідності паролю
    public async checkPassValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidators.pass.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
