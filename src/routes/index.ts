import * as express from 'express';
import userRouter from './user';

const app = express();

app.use('/');
app.use('/user', userRouter);
