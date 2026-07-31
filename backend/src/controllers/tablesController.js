import Table from '../models/tablesSchema.js';

const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' })
        }
        return res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createTable = async (req, res) => {
    try {
        const { capacity, status } = req.body ?? {};

        if (!capacity) {
            return res.status(400).json({ message: 'capacity is required' });
        }

        const table = new Table({ capacity, status: status ?? 'available' });
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateTable = async (req, res) => {
    try {
        const { status } = req.body ?? {};

        if (!status) {
            return res.status(400).json({ message: 'status is required' });
        }

        const table = await Table.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!table) {
            return res.status(404).json({ message: 'Table not found' })
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' })
        }
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllTables, getTableById, createTable, updateTable, deleteTable };