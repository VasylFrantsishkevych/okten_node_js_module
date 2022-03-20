import { Router } from 'express';

import { userController } from '../controller';

const router = Router();

router.get('/', userController.getUserByEmail);
router.post('/', userController.createUser);

export const userRouter = router;
