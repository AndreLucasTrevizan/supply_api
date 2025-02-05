import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { createUser, listUsers, userProfile, userSignIn } from './controller';

const router = Router();

router
  .route('/users')
  .get(authMiddleware, listUsers)
  .post(authMiddleware, createUser);

router
  .route('/users/profile')
  .get(authMiddleware, userProfile);

router
  .route('/sign_in')
  .post(userSignIn);

export { router as UsersRouter };
