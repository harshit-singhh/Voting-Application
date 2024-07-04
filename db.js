const mongoose = require("mongoose");
const colors = require("colors");





const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {});

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`error is ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
