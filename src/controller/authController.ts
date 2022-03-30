import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IRequestExtended, ITokenData } from '../interfaces';
import { constants, COOKIE } from '../constants';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories';
import { emailActionEnum } from '../enums';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        const user = req.body as IUser;

        await emailService.sendMail(user, emailActionEnum.WELCOME);

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

        await emailService.sendMail(user, emailActionEnum.LOGGED_OUT);
        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    // Створюємо два токена юзеру який залогувався та зберігаємо їх в базу
    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            const {
                id, email, firstName, password: hashPassword,
            } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(user, emailActionEnum.LOGIN_TO_SITE, { userName: firstName });
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
}

export const authController = new AuthController();