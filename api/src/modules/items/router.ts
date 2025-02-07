import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { createNewItem, listItems } from './controller';

const router = Router();

router
  .route('/items')
  .get(authMiddleware, listItems)
  .post(authMiddleware, createNewItem);

export { router as ItemsRouter };
