import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    tableId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }],
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;