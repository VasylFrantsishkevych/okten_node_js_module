import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);

export const apiRouter = router;
