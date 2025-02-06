import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import {
  listStorageActions,
  storageEntry,
  storageOut,
} from './controller';

const router = Router();

router
  .route('/actions/entry')
  .post(authMiddleware, storageEntry);

router
  .route('/actions/out')
  .post(authMiddleware, storageOut);

router
  .route('/actions')
  .get(authMiddleware, listStorageActions);

export { router as ActionsRouter };
