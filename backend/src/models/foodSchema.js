import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['drink', 'food'], required: true },
    quantity: { type: Number, required: true },
});

const Food = mongoose.model('Food', foodSchema);

export default Food;