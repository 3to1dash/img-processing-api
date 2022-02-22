import express, { Request, Response } from 'express';
import images from './api/images';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  res.status(200).end('hello from main api route');
});

router.use('/images', images);

export default router;
