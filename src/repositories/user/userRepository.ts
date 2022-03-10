import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    // public async updateUser(id: number, password: string, email: string): Promise<IUser> {
    //     return getManager()
    //         .getRepository(User)
    //         .update({ id }, { password, email });
    // }
}

export const userRepository = new UserRepository();
