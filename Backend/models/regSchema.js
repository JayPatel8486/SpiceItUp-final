const { Schema, model } = require("mongoose");
const validator = require("validator");

const registrationSchema = Schema([{
    user_role: {
        type: String,
        default: 'customer'
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already exists."],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmation_code: {
        type: Number,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: ''
    },
    createdBy: {
        type: String,
        default: 'self'
    },
    updatedBy: {
        type: String,
        default: 'self'
    },
    isActive: {
        type: Number,
        default: '1'
    },
    date: {
        type: Date
    },
    loginCount: {
        type: Number,
    }
}]);

// registration collection
const register = new model('registrationDetails', registrationSchema);
module.exports = register;