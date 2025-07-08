import mongoose from "mongoose";

const acmSchema = new mongoose.Schema(
    {
        accountManagerId: {type: Number, required: true, unique: true},
        name: {type: String, required: true},
        rank: {
            type: String,
            required: true,
            enum: ["Junior", "Senior", "Department Head"]
        },
        accountsHandling: {type: Number, required: true, default: 0},
        email: {type: String, required: true, unique: true},
        phoneNumber: {type: String, required: true, unique: true},
        isDeleted: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
    },
);

const acmModel = mongoose.model("AccountManager", acmSchema);

export default acmModel;