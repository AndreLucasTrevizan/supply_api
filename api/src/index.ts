import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router';
import { errorsMiddleware } from './middlewares/errors';

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorsMiddleware);

const {
  PORT
} = process.env;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
