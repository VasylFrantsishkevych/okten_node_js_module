import { Router } from 'express';
import { postController } from '../controller';

const router = Router();

router.use('/', postController.createPost);
router.use('/:userId', postController.getUserPosts);

export const postRouter = router;
