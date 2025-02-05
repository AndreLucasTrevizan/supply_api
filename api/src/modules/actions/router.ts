import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { storageEntry } from './controller';

const router = Router();

router
  .route('/actions/entry')
  .post(authMiddleware, storageEntry);

export { router as ActionsRouter };
