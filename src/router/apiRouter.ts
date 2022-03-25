import {
    NextFunction, Request, Response, Router,
} from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

router.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    res
        .status(err.code || 500)
        .json({
            message: err.message,
        });
});

export const apiRouter = router;
