import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from "../models/User.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User not found", success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Incorrect password", success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
