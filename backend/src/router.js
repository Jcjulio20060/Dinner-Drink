import express from 'express';
import tablesRouter from './routes/tablesRoutes.js';
import foodRouter from './routes/foodRoutes.js';
import pedidoRouter from './routes/pedidoRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('ok');
});

router.get('/health', (req, res) => {
  res.status(200).send('ok');
});

router.use('/tables', tablesRouter);
router.use('/food', foodRouter);
router.use('/pedidos', pedidoRouter);

export default router;