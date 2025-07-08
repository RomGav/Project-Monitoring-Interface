import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const onlyDevelopers = async (req,res, next) => {
    try{
        if(!req.cookies.token) {
            return res.status(401).json({error: "Unauthorized Access!"});
        }

        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({error: "Unauthorized Access!"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);

        if(!user || user.role !== "Developer"){
            return res.status(403).json({error: "Access denied: Developers only"})
        };

        next();

    }catch(error){
        res.status(500).json({error: error.message});
    };
};

export {onlyDevelopers};