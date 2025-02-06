import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { storageEntry, storageOut } from './controller';

const router = Router();

router
  .route('/actions/entry')
  .post(authMiddleware, storageEntry);

router
  .route('/actions/out')
  .post(authMiddleware, storageOut);

export { router as ActionsRouter };
