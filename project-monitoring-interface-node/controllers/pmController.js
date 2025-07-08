import pmModel from "../models/pmModel.js";

//create
const createPm = async (req, res) => {
    try {
        const newData = req.body;
        const record = new pmModel(newData);
        await record.save();

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//list
const listPm = async (req, res) => {
    try {
        const search = req.query.search?.toString().trim();
        const query = {
            isDeleted: false,
            ...(search && { name: { $regex: search, $options: "i" } })
        };
        const records = await pmModel.find(query, "-id");

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//read
const readPm = async (req, res) => {
    try {
        const id = req.params.projectManagerId;
        const record = await pmModel.findOne({ projectManagerId: id }, "-id");
        if (!record) {
            return res.status(404).json({ error: "Project Manager not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//patch
const patchPm = async (req, res) => {
    try {
        const id = req.params.projectManagerId;
        const newData = req.body;
        const role = req.user.role?.toLowerCase();

        if (role === 'user' && newData.isDeleted) {
            return res.status(403).json({ error: "Access denied: You cannot modify isDeleted" });
        }

        const record = await pmModel.findOneAndUpdate({ projectManagerId: id }, newData, { new: true });
        if (!record) {
            return res.status(404).json({ error: "Project Manager not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//delete
const deletePm = async (req, res) => {
    try {
        const id = req.params.projectManagerId;
        const role = req.user.role?.toLowerCase();

        const record = await pmModel.findOne({ projectManagerId: id });
        if (!record) {
            return res.status(404).json({ error: "Project Manager not found" });
        }

        if (role === "developer") {
            await pmModel.findOneAndDelete({ projectManagerId: id });
            return res.json({ message: "Project Manager permanently deleted" });
        } else if (role === "manager") {
            await pmModel.findOneAndUpdate({ projectManagerId: id }, { isDeleted: true });
            return res.json({ message: "Project Manager marked as deleted" });
        } else {
            return res.status(403).json({ error: "Access denied: Developers and Managers only" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createPm, listPm, readPm, patchPm, deletePm };