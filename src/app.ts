import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// app.get('/users', async (req: Request, res: Response) => {
//     const users = await getManager().getRepository(User).find({ relations: ['posts'] });
//     res.json(users);
//     // const users = await getManager().getRepository(User).findOne();
//     // console.log(users);
//     // res.json(users);
// });

// Get all users
app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('Post', 'posts', 'posts.userId = user.id')
        .getMany();
    res.json(users);
});

// Create User
app.post('/users', async (req: Request, res: Response) => {
    const createUser = await getManager().getRepository(User).save(req.body);
    res.json(createUser);
});

// Get user by id
app.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: Number(id) })
        .leftJoin('Post', 'posts', 'posts.userId = user.id')
        .getOne();
    res.json(user);
});

// Update field password and email in user
app.patch('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password, email } = req.body;
    const createdUser = await getManager().getRepository(User)
        .update({ id: +id }, {
            password,
            email,
        });
    res.json(createdUser);
});

// Delete user by id
app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteUser = await getManager().getRepository(User)
        .softDelete({ id: +id });
    res.json(deleteUser);
});

// Create post
app.post('/posts', async (req: Request, res: Response) => {
    try {
        const post = await getManager().getRepository(Post).save(req.body);
        res.status(201).json(post);
    } catch (e) {
        console.log(e);
    }
});

// Get all posts
app.get('/posts', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(Post)
        .createQueryBuilder()
        .getMany();
    res.json(users);
});

// Get post by userId
app.get('/posts/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const post = await getManager().getRepository(Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: Number(userId) })
        .leftJoin('User', 'user', 'user.id = post.userId')
        .getMany();
    res.json(post);
});

// Update fields title and text in post
app.patch('/posts/:id', async (req: Request, res: Response) => {
    const { title, text } = req.body;
    const { id } = req.params;
    const updatePost = await getManager().getRepository(Post)
        .update({ id: Number(id) }, {
            title,
            text,
        });
    res.json(updatePost);
});

// Create comments
app.post('/comments', async (req: Request, res: Response) => {
    const createComment = await getManager().getRepository(Comment).save(req.body);
    res.json(createComment);
});

// Get comments to user and post which they write
app.get('/comments/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comments = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: Number(id) })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    } catch (e) {
        console.log(e);
    }
});

// Update fields like and dislike in comments
app.post('/comments/action', async (req: Request, res: Response) => {
    try {
        const { action, commentId } = req.body;
        const queryRunner = getManager().getRepository(Comment);
        const comment = await queryRunner.createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();

        if (!comment) {
            throw new Error('wrong comment ID');
        }

        if (action === 'like') {
            await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
        }

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
    }
});

app.listen(5500, async () => {
    console.log('Server has started!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connection');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
