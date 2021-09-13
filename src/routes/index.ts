import * as express from 'express';
import userRouter from './user';
import signRouter from './sign';
import postRouter from './post';

const app = express();

app.use('/auth', signRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

export default app;