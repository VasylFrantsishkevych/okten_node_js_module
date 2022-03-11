import { Router } from 'express';

import { userController } from '../controller/userController';

const router = Router();

router.get('/', userController.getUserByEmail);
router.post('/', userController.createUser);

// router.patch('/:id', userController.updateUser);

export const userRouter = router;
