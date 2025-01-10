const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {
        type: String,
        enum: ['admin', 'pantrystaff', 'deliveryagent'],
        default: 'pantrystaff' // default role, can be changed as needed
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User;
