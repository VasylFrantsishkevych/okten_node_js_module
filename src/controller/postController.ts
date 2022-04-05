import { Request, Response } from 'express';
import { IPost } from '../entity';
import { postService } from '../services';

class PostController {
    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const createPost = await postService.createPost(req.body);
        return res.json(createPost);
    }

    public async getUserPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const { id } = req.params;
        const posts = await postService.getUserPosts(id);
        return res.json(posts);
    }
}

export const postController = new PostController();
