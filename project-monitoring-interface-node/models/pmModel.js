import mongoose from "mongoose";

const pmSchema = new mongoose.Schema(
    {
        projectManagerId: {type: Number, required: true, unique: true},
        name: {type: String, required: true},
        rank: {
            type: String,
            required: true,
            enum: ["Junior", "Senior", "Department Head"]
        },
        projectsHandling: {type: Number, required: true, default: 0},
        email: {type: String, required: true, unique: true},
        phoneNumber: {type: String, required: true, unique: true},
        isDeleted: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
    },
);

const pmModel = mongoose.model("ProjectManager", pmSchema);

export default pmModel;