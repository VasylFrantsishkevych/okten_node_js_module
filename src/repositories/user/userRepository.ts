import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, UserEntity } from '../../entity/user.entity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(UserEntity).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager().getRepository(UserEntity).find({ relations: ['posts'] });
    }

    // public async updateUser(id: number, password: string, email: string): Promise<IUser> {
    //     return getManager()
    //         .getRepository(UserEntity)
    //         .update({ id }, { password, email });
    // }
}

export const userRepository = new UserRepository();
