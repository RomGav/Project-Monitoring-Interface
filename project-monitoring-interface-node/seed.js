import mongoose from "mongoose";
import dotEnv from "dotenv";
import bcrypt from "bcrypt";
import userModel from "./models/userModel.js";

dotEnv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB");

  const hashedPassword = await bcrypt.hash("devtest", 10);

  //Seed Data
  const users = await userModel.insertOne(
    { 
        name: "Initial Dev",
        role: "Developer",
        email: "dev@test.com",
        password: hashedPassword
    }
  );
      console.log("Dev test inserted")

  console.log("Database seeded");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
