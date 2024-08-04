import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "Token yoq",
            variant: "warning",
            payload: null, I
        });
    }
    jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                msg: "Token mos emas",
                variant: "warning",
                payload: null,
            });
        } else {
            console.log(decoded); // bar
            next();
        }
    });
};