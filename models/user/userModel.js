const mongoose = require('mongoose');
const {UserRole} = require("../../constants");

const userSchema = new mongoose.Schema({ 
    name: String,
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    phone: String,
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: [true, 'Please provide the role.'],
        default: "employee",                
    },
    default_profile_id: String,
    resetToken: String,
    resetTokenExpiry: Date,
}, {
    timestamps: true,
}); 
module.exports = mongoose.model('User', userSchema);