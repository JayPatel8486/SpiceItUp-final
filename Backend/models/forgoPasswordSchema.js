const {Schema, model} = require("mongoose");

const forgotPasswordSchema = Schema([{

    email:{
        type:String,
    },
    otp:{
        type: Number,
    },
    expireIn:{
        type:Date
    } 
    
}]);

// Create Collection
const forgot = new model('forgotPassword',forgotPasswordSchema);

module.exports = forgot;