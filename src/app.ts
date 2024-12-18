import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';

// parser
app.use(express.json());
app.use(cors());

// application routing
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Blog Project!');
});

// not found
app.use(notFound);

export default app;
