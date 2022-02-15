import express from 'express';
import router from './routes/index';

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.status(200).end('hello world!');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
