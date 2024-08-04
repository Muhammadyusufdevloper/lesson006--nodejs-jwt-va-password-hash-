import express from "express";
import { Admin, validationAdmin } from "../schemas/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

function ReturnInformation(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    };
}

router.post("/sing-up", async (req, res) => {
    try {
        let { error } = validationAdmin(req.body);
        if (error) {
            return res.status(400).json(ReturnInformation(error.details[0].message, "error", null));
        }
        const existAdmin = await Admin.exists({ username: req.body.username });

        if (existAdmin) {
            return res.status(400).json(ReturnInformation("User already exists", "warning", null));
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const admin = await Admin.create(req.body);
        res.status(201).json(ReturnInformation("User created", "success", admin));
    } catch (error) {
        console.error(error);
        res.status(500).json(ReturnInformation("Server error", "error", null));
    }
});

router.post("/sing-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username: username });
        if (!user) {
            return res.status(400).json(ReturnInformation("User | Password not found", "error", null));
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET);
                return res.status(200).json({
                    ...ReturnInformation("User sign in", "success", user),
                    token
                });
            } else {
                return res.status(400).json(ReturnInformation("User | Password not found", "error", null));
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(ReturnInformation("Server error", "error", null));
    }
});

export default router;
