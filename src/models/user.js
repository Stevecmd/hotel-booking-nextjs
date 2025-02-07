import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://api.dicebear.com/9.x/notionists/svg?seed=default'  // Add default avatar
    },
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    // New optional fields
    currentAddress: {
        type: String,
        required: false
    },
    contactNumber: {
        type: String,
        required: false
    },
    idType: {
        type: String,
        enum: ['National-ID', 'Passport'],
        default: 'National-ID',
        required: false
    },
    idNumber: {
        type: String,
        required: false,
        unique: true
    },
    // Payment information fields
    cardholderName: {
        type: String,
        required: false
    },
    cardNumber: {
        type: String,
        required: false
    },
    expiryDate: {
        type: String,
        required: false
    },
    cvv: {
        type: String,
        required: false
    },
    billingAddress: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;