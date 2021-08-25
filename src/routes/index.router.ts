import { Router } from 'express';
import userRouter from './user.router';

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/health', (_, res) => {
  return res.status(200).send('OK');
});

export default indexRouter;
