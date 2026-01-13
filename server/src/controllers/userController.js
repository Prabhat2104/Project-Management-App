import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import User from "../models/user.model.js";

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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, email, password: hashedPassword
        });

        const token = generateToken(newUser._id);

        // Exclude password from response
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
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
            name: userData.name,
            email: userData.email,
            role: userData.role,
        };

        res.status(200).json({ success: true, userData: userResponse, token, message: "Login successful" })

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export { registerUser, login }