import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import router from './routes';
import 'reflect-metadata';
import config from '../ormconfig'
import { test } from './utils/scheduler'

dotenv.config();
const port = process.env.HTTP_PORT || 80;

const app = express();

createConnection(config)
.then(() => {
  console.log("DB CONNECTION!");
})
.catch((error) => {
  console.log(error);
});

// node-scheduler
test();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use('/', router);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
