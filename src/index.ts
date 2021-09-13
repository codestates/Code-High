import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { createConnection } from 'typeorm';

dotenv.config();
const port = process.env.HTTP_PORT || 80;

const app = express();

createConnection()
.then(() => {
  console.log("DB CONNECTION!");
})
.catch((error) => {
  console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
