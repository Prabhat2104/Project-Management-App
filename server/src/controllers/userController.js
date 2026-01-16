import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import User from "../models/user.model.js";
import Project from "../models/project.model.js";

// Signup a new User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Account already exists" })
        }

        const adminExists = await User.exists({ role: 'admin' });

        const role = adminExists ? 'user' : 'admin';
        const isAdmin = role === 'admin' ? true : false;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, email, password: hashedPassword, role, isAdmin
        });

        const token = generateToken(newUser._id);

        // Exclude password from response
        const userResponse = {
            _id: newUser._id,
            // name: newUser.name,
            email: newUser.email,
            // role: newUser.role,
            isAdmin: newUser.isAdmin,
        };

        res.status(201).json({ success: true, userData: userResponse, token, message: "Account created successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


//Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = generateToken(userData._id);

        const userResponse = {
            _id: userData._id,
            // name: userData.name,
            email: userData.email,
            // role: userData.role,
            isAdmin: userData.isAdmin,
        };

        res.status(200).json({ success: true, userData: userResponse, token, message: "Login successful" })

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        await user.save();
        const token = generateToken(user._id);
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        res.status(200).json({ success: true, userData: userResponse, token, message: "Profile updated successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while updating profile" })
    }
}


export { registerUser, login, updateProfile }