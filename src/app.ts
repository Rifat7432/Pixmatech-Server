import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app: Application = express();

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running... !');
});

app.get('/api', (req: Request, res: Response) => {
  res.send({
    massage: 'Welcome to Resume Craft',
  });
});

app.use('/api/v2', router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);
export default app;
