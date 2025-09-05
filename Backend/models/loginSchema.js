const { Schema, model } = require("mongoose");
const validator = require("validator");

const loginSchema = Schema([{
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
        min: 6,
        unique: true
    },
}]);

// login details collection
const login = new model('loginDetails', loginSchema);
module.exports = login;