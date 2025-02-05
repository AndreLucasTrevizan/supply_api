import { Request, Response, Router } from 'express';
import { UsersRouter } from './modules/users/router';
import { ItemsRouter } from './modules/items/router';
import { MovimentsRouter } from './modules/moviments/router';
import { ActionsRouter } from './modules/actions/router';

const router = Router();

router.get('/errors', (req: Request, res: Response) => {
  throw new Error('Error test ok');
});

router.use(UsersRouter);
router.use(ItemsRouter);
router.use(MovimentsRouter);
router.use(ActionsRouter);

export default router;
