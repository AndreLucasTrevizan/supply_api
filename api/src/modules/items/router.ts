import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { createNewItem } from './controller';

const router = Router();

router
  .route('/items')
  .post(authMiddleware, createNewItem);

export { router as ItemsRouter };
