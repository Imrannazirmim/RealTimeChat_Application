import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            res.status(400).json({ message: "All fields required." });
        }
        if (password.length < 6) {
            res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }
        const user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exits" });
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hasPassword,
        });
        if (newUser) {
            //generate token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user" });
        }
    } catch (error) {
        res.status(500).json({ message: "Invalid Server Error." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isPasswordCompare = await bcrypt.compare(password, user.password);
        if (!isPasswordCompare) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            password: user.isPasswordCompare,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res
                .status(400)
                .json({ message: "profile pic is required." });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findOneAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true },
        );
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Error." });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
        console.log(req.user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
    }
};
