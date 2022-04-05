import { IPost } from '../../entity';

export interface IPostRepository {
    createPost(post: IPost): Promise<IPost>;
    getUserPosts(id: number): Promise<IPost[]>;
}
