import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IUser } from '../entity';
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

    public async updateUser(req: Request, res: Response): Promise<Response<IUser>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updateUser = await userService.updateUser(id, password, email);
        return res.json(updateUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deleteUser = await userService.deleteUser(id);
        return res.json(deleteUser);
    }
}

export const userController = new UserController();
