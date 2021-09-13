import * as express from 'express';
import userRouter from './user'
import signRoute from './sign';

const app = express();

app.use('/');
app.use('/user', userRouter);
app.use('/post', )