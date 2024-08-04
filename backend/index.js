import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Users from "./routers/user.js";
import Admin from "./routers/admin.js";

dotenv.config();

console.log('MongoDB URL:', process.env.MONGODB_URL);
console.log('PORT:', process.env.PORT);

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("MongoDb connection error", err));
app.use("/users", Users);
app.use("/admins", Admin);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
