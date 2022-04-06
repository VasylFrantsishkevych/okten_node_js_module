import { Router } from 'express';

import { commentController } from '../controller';

const router = Router();

router.use('/', commentController.createComment);
router.use('/:userId', commentController.getUserComments);
router.use('/action', commentController.setLikeDislike);

export const commentRouter = router;
