import projectModel from "../models/projectModel.js";

//create
const createProject = async (req, res) => {
    try{
        const newData = req.body;
        const record = new projectModel(newData);
        await record.save();

        res.status(201).json(record);
    }catch(error){
        res.status(500).json({error:error.message})
    };
};

//list
const listProject = async (req, res) => {
    try{
        const search = req.query.search?.toString().trim();
        const query = {
            isDeleted: false,
            ...(search && { name: { $regex: search, $options: "i" } })
        };
        const records = await projectModel.find(query, "-id",)
        .populate("client", "name")
        .populate("handlingAccountManager", "name")
        .populate("handlingProjectManager", "name");

        res.json(records);
    }catch(error){
        res.status(500).json({error:error.message})
    };
};

//read
const readProject = async (req, res) => {
    try{
        const id = req.params.projectId;
        const record = await projectModel.findOne({projectId: id}, "-id");
        if(!record) {
            return res.status(404).json({error: "Project not found"});
        };
        res.json(record);
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

//patch
const patchProject = async (req, res) => {
    try{
        const id = req.params.projectId;
        const newData = req.body;
        const role = req.user.role?.toLowerCase();

        if (role === 'user' && newData.isDeleted) {
            return res.status(403).json({error: "Access denied: You cannot modify isDeleted"});
        }

        const record = await projectModel.findOneAndUpdate({projectId: id}, newData, {new: true});
        if(!record) {
            return res.status(404).json({error: "Project Manager not found"});
        };
        res.json(record);
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

//delete
const deleteProject = async (req, res) => {
    try{
        const id = req.params.projectId;
        const role = req.user.role?.toLowerCase();

        const record = await projectModel.findOne({projectId: id});
        if(!record) {
            return res.status(404).json({error: "Project not found"});
        };

        if (role === "developer") {
            //Developer: Performs hard delete
            await projectModel.findOneAndDelete({projectId: id});
            if (!record) {
                return res.status(404).json({ error: "Project not found" });
            }
            return res.json({message: "Project permanently deleted"});
        } else if (role === "manager") {
            //Manager: Performs soft delete
            await projectModel.findOneAndUpdate({ projectId: id }, { isDeleted: true });
            return res.json({message: "Project marked as deleted"});
        } else {
            return res.status(403).json({error: "Access denied: Developers and Managers only"});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

export {createProject, readProject, listProject, patchProject, deleteProject};