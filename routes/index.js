import express from 'express';
import apiRoutes from './api/index.js';

const router = express.Router();

router.use('/api', apiRoutes)

router.use((req, res) => {
  return res.send("Wrong route!");
});

export default router;