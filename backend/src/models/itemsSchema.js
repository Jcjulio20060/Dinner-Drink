import mongoose from 'mongoose';

const itemsSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['drink', 'food'], required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
});

const Item = mongoose.model('Item', itemsSchema);

export default Item;