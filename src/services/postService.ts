import { IPost } from '../entity';
import { postRepository } from '../repositories';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return postRepository.createPost(post);
    }

    public async getUserPosts(id: string): Promise<IPost[]> {
        return postRepository.getUserPosts(+id);
    }
}

export const postService = new PostService();
