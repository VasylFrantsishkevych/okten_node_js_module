import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createUser = await userService.createUser(req.body);
        return res.json(createUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;

        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }
}

export const userController = new UserController();
