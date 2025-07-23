import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import connectDB from "./configs/db.js";
import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import clientRoute from "./routes/clientRoute.js";
import acmRoute from "./routes/acmRoute.js";
import pmRoute from "./routes/pmRoute.js";

dotenv.config();
const PORT = process.env.PORT
const app = express();

//DB Connection
connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);
app.use("/api/clients", clientRoute);
app.use("/api/account-managers", acmRoute);
app.use("/api/project-managers", pmRoute);
app.use(helmet())


app.listen(PORT, () => console.log(`Port is running at ${PORT}`))
