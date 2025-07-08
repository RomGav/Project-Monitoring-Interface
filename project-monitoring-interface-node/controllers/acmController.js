import acmModel from "../models/acmModel.js";

// create
const createAcm = async (req, res) => {
    try {
        const newData = req.body;
        const record = new acmModel(newData);
        await record.save();

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// list
const listAcm = async (req, res) => {
    try {
        const search = req.query.search?.toString().trim();
        const query = {
            isDeleted: false,
            ...(search && { name: { $regex: search, $options: "i" } })
        };
        const records = await acmModel.find(query, "-id");

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// read
const readAcm = async (req, res) => {
    try {
        const id = req.params.accountManagerId;
        const record = await acmModel.findOne({ accountManagerId: id }, "-id");
        if (!record) {
            return res.status(404).json({ error: "Account Manager not found" });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// patch
const patchAcm = async (req, res) => {
    try {
        const id = req.params.accountManagerId;
        const newData = req.body;
        const role = req.user.role?.toLowerCase();

        if (role === 'user' && newData.isDeleted) {
            return res.status(403).json({ error: "Access denied: You cannot modify isDeleted" });
        }

        const record = await acmModel.findOneAndUpdate({ accountManagerId: id }, newData, { new: true });
        if (!record) {
            return res.status(404).json({ error: "Account Manager not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete
const deleteAcm = async (req, res) => {
    try {
        const id = req.params.accountManagerId;
        const role = req.user.role?.toLowerCase();

        const record = await acmModel.findOne({ accountManagerId: id });
        if (!record) {
            return res.status(404).json({ error: "Account Manager not found" });
        }

        if (role === "developer") {
            await acmModel.findOneAndDelete({ accountManagerId: id });
            return res.json({ message: "Account Manager permanently deleted" });
        } else if (role === "manager") {
            await acmModel.findOneAndUpdate({ accountManagerId: id }, { isDeleted: true });
            return res.json({ message: "Account Manager marked as deleted" });
        } else {
            return res.status(403).json({ error: "Access denied: Developers and Managers only" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createAcm, listAcm, readAcm, patchAcm, deleteAcm };