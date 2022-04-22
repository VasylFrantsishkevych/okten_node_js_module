import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IRequestExtended, ITokenData } from '../interfaces';
import { constants, COOKIE } from '../constants';
import { IUser } from '../entity/user';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { ActionTokenType, EmailActionEnum } from '../enums';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        const user = req.body as IUser;

        await emailService.sendMail(user, EmailActionEnum.WELCOME);

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const user = req.user as IUser;
        const { id } = req.user as IUser;

        await emailService.sendMail(user, EmailActionEnum.LOGGED_OUT);
        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    // Створюємо два токена юзеру який залогувався та зберігаємо їх в базу
    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            const {
                id, email, password: hashPassword,
            } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(user, EmailActionEnum.LOGIN_TO_SITE);
            await userService.compareUserPassword(password, hashPassword);

            const tokenPair = tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { refreshToken, accessToken } = tokenPair;

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response) {
        try {
            const { id, email } = req.user as IUser;
            // Беремо refreshToken з хедера
            const refreshTokenToDelete = req.get(constants.AUTHORIZATION);
            // Стираємо стару пару токенів по refreshToken
            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
            // Генеруємо нову пару токенів
            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });
            // Записуємо нову пару токенів в базу
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    // Відновлення паролю
    public async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            const { id, email } = user;

            // Генеруємо токен для відновлення паролю
            const token = tokenService.generateActionToken({ userId: id, userEmail: email });

            // Зберігаємо токен в базу
            await actionTokenRepository.saveActionToken({
                actionToken: token,
                type: ActionTokenType.FORGOT_PASS,
                userId: id,
            });

            // Відправляємо емейл
            await emailService.sendMail(user, EmailActionEnum.FORGOT_PASSWORD, token);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    // Оновлення пароля по actionToken
    public async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.body;
            const { id } = req.user as IUser;
            // Дістав токен з headers/authorization
            const actionToken = req.get(constants.AUTHORIZATION);
            // Обновити пароль у юзера
            await userService.updateUser(id, user);
            // Видалення токена з бази
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
