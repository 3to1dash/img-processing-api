import express from 'express';
import images from './api/images';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).end('hello from main api route');
});

router.use('/images', images);

export default router;
