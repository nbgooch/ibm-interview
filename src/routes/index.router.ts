import { Router } from 'express';
import userRouter from './user.router';

const indexRouter = Router();

indexRouter.use('/user', userRouter);

export default indexRouter;
