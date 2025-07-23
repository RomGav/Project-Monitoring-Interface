import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import sendEmail from "../services/mailService.js";

dotenv.config()

const register = async (req, res) => {
    const payload = req.body

    try{
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const savedUser = await userModel.create({
            name: payload.name,
            role: payload.role,
            email: payload.email,
            password: hashedPassword,
        });

        await sendEmail(
            "IT Team",
            savedUser.email,
            "Project Monitoring Interface (PMI) Account Registered",
            `Welcome to the team!\n\nAs part of your onboarding, you are given access to our Project Monitoring Interface (PMI). Here you can monitor the general state of the project and those involved in it.\n\nWe have generated an account for you with the following credentials:\n
            Role: ${payload.role}\n
            Username: ${payload.email}\n
            Password: ${payload.password}\n\nPlease remember to keep your login credentials confidential!\m\nGlad to have you onboard,\nThe IT Team`
        );

        res.status(201).json({message: `${payload.role} ${payload.name} has been registered`});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    const payload = req.body;

    try{
        const user = await userModel.findOne({email: payload.email});
        if(!user){
            return res.status(400).json({error: "Invalid credentials"});
        };

        const passwordMatched = await bcrypt.compare(payload.password, user.password);
        if(!passwordMatched) {
            return res.status(400).json({error: "Invalid Credentials"});
        };

        //Generate Token
        const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "30m"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 1800000, //30 min
        });

        res.json({message: "Login successful"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        });

        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validate = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
        return res.status(401).json({ valid: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
};
export {register, login, logout, validate};
