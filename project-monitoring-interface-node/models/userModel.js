import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        role: {
            type: String,
            enum: ["Developer", "Manager", "User"],
            default: "User",
            required: true,
        },
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true,
    },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;