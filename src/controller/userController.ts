import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createUser = await userService.createUser(req.body);
        return res.json(createUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        console.log(email);
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response<IUser>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    // public async updateUser(req: Request, res: Response): Promise<Response<IUser>> {
    //     const { password, email } = req.body;
    //     const { id } = req.params;
    //     const updateUser = await userService.updateUser(id, password, email);
    //     return res.json(updateUser);
    // }
}

export const userController = new UserController();
