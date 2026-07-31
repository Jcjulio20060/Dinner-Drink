import Pedido from '../models/pedidoSchema.js';
import { verifyQuantity, updateQuantity } from './foodController.js';
import { verifyTable, addPedidoToTable } from './tablesController.js';

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
        const { tableId, foodId, food, status } = req.body ?? {};
        const foodIds = foodId ?? food;

        if (!foodIds || !Array.isArray(foodIds) || foodIds.length === 0) {
            return res.status(400).json({ message: 'food is required' });
        }

        const quantityChecks = await Promise.all(foodIds.map((id) => verifyQuantity(id)));
        const quantityOk = quantityChecks.every((isValid) => isValid);
        const tableOk = await verifyTable(tableId);

        if (!quantityOk) {
            return res.status(404).json({ message: 'Food not available' });
        }

        if (!tableOk) {
            return res.status(404).json({ message: 'Table not available' });
        }

        const pedido = new Pedido({
            tableId: tableId ?? [],
            food: foodIds,
            status: status ?? 'pending'
        });
        await pedido.save();
        const quantityUpdate = await Promise.all(foodIds.map((id) => updateQuantity(id)));
        const quantityUpdateOk = quantityUpdate.every((isValid) => isValid);
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

        if (status == "completed") {
            const isAdded = addPedidoToTable(tableId, req.params.id)
            if (!isAdded) {
                return res.status(404).json({ message: "An error ocorred" });
            }
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