import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }],
});

const Table = mongoose.model('Table', tableSchema);

export default Table;