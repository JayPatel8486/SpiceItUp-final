const mongoose = require("mongoose");

const connectdb = async () => {
    return await mongoose.connect('mongodb+srv://rithvik:rithvik@atlascluster.ktvdzjq.mongodb.net/RMS').then(() => {
        console.log("connected!!");
    }).catch((e) => {
        console.log(e);
    });
}
module.exports = { connectdb }   