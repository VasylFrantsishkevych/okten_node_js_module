import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

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

    public async updatePost(req: Request, res: Response): Promise<Response<UpdateResult>> {
        const { id } = req.params;
        const { title, text } = req.body;
        const updatePost = await postService.updatePost(id, title, text);
        return res.json(updatePost);
    }
}

export const postController = new PostController();
