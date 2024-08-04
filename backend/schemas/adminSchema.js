import mongoose from "mongoose";
import Joi from "joi";

const adminSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false,
        default: "admin"
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    }
});

export const Admin = mongoose.model("Admin", adminSchema);

export const validationAdmin = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string(),
        isActive: Joi.boolean()
    });
    return schema.validate(body);
};