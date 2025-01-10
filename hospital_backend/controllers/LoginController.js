const bcrypt = require('bcryptjs');
const User = require('../model');
const generateToken = require("../utils/index.js");
const nodemailer = require('nodemailer');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'deliveryagent', // Default role is 'user' if not provided
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({message: 'User Created', user: newUser});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Authenticate user
exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
};

// Reset password request
exports.resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const token = Math.random().toString(36).slice(-8);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour validity

    await user.save();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password reset request",
        text: `You are receiving this email because you or someone else has requested a password reset for your account. \n\n Please use the following token to reset your password: ${token} \n\n If you didn't request a password reset, Kindly Ignore this email`,
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            return res.status(404).json({ message: "Something went wrong, try again!" });
        }
        res.status(200).json({ message: "Password reset email has been sent." + info.response });
    });
};

// Reset password using token
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(404).json({ message: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({ message: "Password reset successfully" });
};
