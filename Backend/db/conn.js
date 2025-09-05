const mongoose = require("mongoose");

const connectdb = async () => {
    return await mongoose.connect('mongodb+srv://rithvik:rithvik@atlascluster.ktvdzjq.mongodb.net/RMS').then(() => {
        console.log("DB Connected!!");
    }).catch((err) => {
        console.log("Error while connecting DB: ",err)
        console.log(err);
    });
}

module.exports = { connectdb };

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'root',
//   port: 5432,
// });

// // define async connect function
// const connectdb = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("✅ Connected to PostgreSQL");
//     client.release(); // release after test
//   } catch (err) {
//     console.error("❌ DB connection failed:", err.stack);
//   }
// };

// export both pool and connectdb
// module.exports = { connectdb };