"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// app.get('/users', async (req: Request, res: Response) => {
//     const users = await getManager().getRepository(User).find({ relations: ['posts'] });
//
//     res.json(users);
//     // const users = await getManager().getRepository(User).findOne();
//     // console.log(users);
//     // res.json(users);
// });
// Get all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, typeorm_1.getManager)().getRepository(user_1.User)
        .createQueryBuilder('user')
        .leftJoin('Post', 'post', 'post.userId = user.id')
        .getMany();
    res.json(users);
}));
// Create User
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = yield (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createUser);
}));
// Get user by id
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, typeorm_1.getManager)().getRepository(user_1.User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: Number(id) })
        .leftJoin('Post', 'posts', 'posts.userId = user.id')
        .getOne();
    res.json(user);
}));
// Update field password and email in user
app.patch('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const createdUser = yield (0, typeorm_1.getManager)().getRepository(user_1.User)
        .update({ id: +req.params.id }, {
        password,
        email,
    });
    res.json(createdUser);
}));
// Delete user by id
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield (0, typeorm_1.getManager)().getRepository(user_1.User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deleteUser);
}));
// Create post
app.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, typeorm_1.getManager)().getRepository(post_1.Post).save(req.body);
        res.status(201).json(post);
    }
    catch (e) {
        console.log(e);
    }
}));
// Get post by userId
app.get('/posts/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const post = yield (0, typeorm_1.getManager)().getRepository(post_1.Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: Number(userId) })
        .leftJoin('User', 'user', 'user.id = post.userId')
        .getMany();
    res.json(post);
}));
// Update fields title and text in post
app.patch('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, text } = req.body;
    const { id } = req.params;
    const updatePost = yield (0, typeorm_1.getManager)().getRepository(post_1.Post)
        .update({ id: Number(id) }, {
        title,
        text,
    });
    res.json(updatePost);
}));
// Create comments
app.post('/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createComment = yield (0, typeorm_1.getManager)().getRepository(comment_1.Comment).save(req.body);
    res.json(createComment);
}));
// Get comments to user and post which they write
app.get('/comments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comments = yield (0, typeorm_1.getManager)().getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: Number(id) })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    }
    catch (e) {
        console.log(e);
    }
}));
app.listen(5500, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server has started!!!');
    try {
        const connection = yield (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connection');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
}));
//# sourceMappingURL=app.js.map