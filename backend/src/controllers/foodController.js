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
        const { name, price, category, quantity } = req.body ?? {};

        if (!name || !price || !category || quantity === undefined) {
            return res.status(400).json({ message: 'name, price, category and quantity are required' });
        }

        const food = new Food({ name, price, category, quantity });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateFood = async (req, res) => {
    try {
        const { name, price, category, quantity } = req.body ?? {};
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (price !== undefined) updateData.price = price;
        if (category !== undefined) updateData.category = category;
        if (quantity !== undefined) updateData.quantity = quantity;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        const food = await Food.findByIdAndUpdate(req.params.id, updateData, { new: true });

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

const verifyQuantity = async (foodId) => {
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return false;
        }
        return food.quantity > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateQuantity = async (foodId) => {
    try {
        const food = await Food.findById(foodId);
        if (!food || food.quantity <= 0) {
            return false;
        }

        const quantity = food.quantity - 1;
        await Food.findByIdAndUpdate(foodId, { quantity }, { new: true });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { getAllFood, getFoodById, createFood, updateFood, deleteFood, verifyQuantity, updateQuantity };