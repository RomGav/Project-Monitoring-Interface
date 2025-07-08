import clientModel from "../models/clientModel.js";

// create
const createClient = async (req, res) => {
    try {
        const newData = req.body;
        const record = new clientModel(newData);
        await record.save();

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// list
const listClient = async (req, res) => {
    try {
        const search = req.query.search?.toString().trim();
        const query = {
            isDeleted: false,
            ...(search && { name: { $regex: search, $options: "i" } })
        };
        const records = await clientModel.find(query, "-id")
        .populate("handlingAccountManager", "name");

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// read
const readClient = async (req, res) => {
    try {
        const id = req.params.clientId;
        const record = await clientModel.findOne({ clientId: id }, "-id");
        if (!record) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// patch
const patchClient = async (req, res) => {
    try {
        const id = req.params.clientId;
        const newData = req.body;
        const role = req.user.role?.toLowerCase();

        if (role === 'user' && newData.isDeleted) {
            return res.status(403).json({ error: "Access denied: You cannot modify isDeleted" });
        }

        const record = await clientModel.findOneAndUpdate({ clientId: id }, newData, { new: true });
        if (!record) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete
const deleteClient = async (req, res) => {
    try {
        const id = req.params.clientId;
        const role = req.user.role?.toLowerCase();

        const record = await clientModel.findOne({ clientId: id });
        if (!record) {
            return res.status(404).json({ error: "Client not found" });
        }

        if (role === "developer") {
            await clientModel.findOneAndDelete({ clientId: id });
            return res.json({ message: "Client permanently deleted" });
        } else if (role === "manager") {
            await clientModel.findOneAndUpdate({ clientId: id }, { isDeleted: true });
            return res.json({ message: "Client marked as deleted" });
        } else {
            return res.status(403).json({ error: "Access denied: Developers and Managers only" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createClient, listClient, readClient, patchClient, deleteClient };