import Pedido from '../models/pedidoSchema.js';

const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('tableId').populate('food');
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('tableId').populate('food');
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido not found' });
        }
        return res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPedido = async (req, res) => {
    try {
        const { tableId, food, status } = req.body ?? {};

        if (!food || !Array.isArray(food) || food.length === 0) {
            return res.status(400).json({ message: 'food is required' });
        }

        const pedido = new Pedido({
            tableId: tableId ?? [],
            food,
            status: status ?? 'pending'
        });

        await pedido.save();
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePedido = async (req, res) => {
    try {
        const { tableId, food, status } = req.body ?? {};

        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { tableId, food, status },
            { new: true }
        );

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido not found' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido not found' });
        }
        res.status(200).json({ message: 'Pedido deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllPedidos, getPedidoById, createPedido, updatePedido, deletePedido };