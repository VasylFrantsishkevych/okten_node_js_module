import {  EntityRepository, getManager, Repository } from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getUserPosts(id: number): Promise<IPost[]> {
        return getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
    }
}

export const postRepository = new PostRepository();
