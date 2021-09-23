import * as express from 'express';
import userRouter from './user';
import authRouter from './auth';
import postRouter from './post';
import commentRouter from './comment';

const app = express();

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

export default app;