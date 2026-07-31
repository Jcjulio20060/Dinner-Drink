import express from 'express';
import { getAllTables, getTableById, createTable, updateTable, deleteTable } from '../controllers/tablesController.js';

const router = express.Router();

router.get('/', getAllTables);
router.get('/:id', getTableById);
router.post('/', createTable);
router.patch('/:id', updateTable);
router.delete('/:id', deleteTable);

export default router;