const { Schema, model } = require("mongoose");

const forgotPasswordSchema = Schema([{

    email: {
        type: String,
    },
    otp: {
        type: Number,
    },
    expireIn: {
        type: Date
    },
    otpType: {
        type: String,
        require: false
    }

}]);

// Create Collection
const forgot = new model('forgotPassword', forgotPasswordSchema);

module.exports = forgot;