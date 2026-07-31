import Food from '../models/foodSchema.js';

const getAllFood = async (req, res) => {
    try {
        const food = await Food.find();
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createFood = async (req, res) => {
    try {
        const { name, price, category, status } = req.body ?? {};

        if (!name || !price || !category) {
            return res.status(400).json({ message: 'name, price and category are required' });
        }

        const food = new Food({ name, price, category, status: status ?? 'available' });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateFood = async (req, res) => {
    try {
        const { name, price, category, status } = req.body ?? {};

        if (!name && !price && !category && !status) {
            return res.status(400).json({ message: 'At least one field is required for update' })
        }

        const food = await Food.findByIdAndUpdate(req.params.id, { name, price, category, status }, { new: true })

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllFood, getFoodById, createFood, updateFood, deleteFood };