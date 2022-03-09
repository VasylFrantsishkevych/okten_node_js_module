import { userRepository } from '../repositories/user/userRepository';

import { IUser } from '../entity/user';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const createUser = await userRepository.createUser(user);
        return createUser;
    }
}

export const userService = new UserService();
