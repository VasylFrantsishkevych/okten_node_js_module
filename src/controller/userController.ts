import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createUser = await userService.createUser(req.body);
        return res.json(createUser);
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;

        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, perPage = 25, ...other } = req.query;
            const userPagination = await userService.getUserPagination(other, +page, +perPage);

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
