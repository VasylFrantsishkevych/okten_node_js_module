import bcrypt from 'bcrypt';

import { userRepository } from '../repositories/user/userRepository';
import { IUser } from '../entity/user.entity';
import { config } from '../config/config';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getAllUsers(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    // public async updateUser(id: number, password: string, email: string): Promise<IUser> {
    //     return userRepository.updateUser(id, password, email);
    // }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
