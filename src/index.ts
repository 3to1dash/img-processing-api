import express, { Request, Response } from 'express';
import router from './routes/index';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.status(200).end('hello world!');
});

app.use('/api', router);

app.listen(port, (): void => {
  console.log(`Server is running on http://localhost:${port}`);
});
