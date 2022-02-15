import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
  res.status(200).end(`params: ${JSON.stringify(req.query)}`);
});

export default images;
