import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    tableId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;