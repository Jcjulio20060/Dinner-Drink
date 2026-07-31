import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['drink', 'food'], required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
});

const Food = mongoose.model('Food', foodSchema);

export default Food;