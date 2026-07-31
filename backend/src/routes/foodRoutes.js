import express from 'express';
const router = express.Router();

import { getAllFood, getFoodById, createFood, updateFood, deleteFood } from '../controllers/foodController.js';

router.get('/', getAllFood);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.patch('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;