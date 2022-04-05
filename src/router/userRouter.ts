import { Router } from 'express';

import { userController } from '../controller';
import { authMiddleware } from '../middlewares';

const router = Router();

// router.get('/', userController.getAllUsers);
router.get('/', userController.getUserPagination);
router.post('/', authMiddleware.validatorRegistration, userController.createUser);

export const userRouter = router;
