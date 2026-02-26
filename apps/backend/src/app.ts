import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import routes from './shared/http/routes';
import { errorHandler } from './shared/http/middlewares/errorHandler';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export { app };
