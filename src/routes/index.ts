import * as express from 'express';
import userRouter from './user';
import authRouter from './auth';
import postRouter from './post';

const app = express();

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

export default app;