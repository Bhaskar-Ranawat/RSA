const mongoose = require("mongoose");
const { mongo } = require("../config/config");
const logger = require("../utils/logger");

function handleError(err, context = "mongoDB") {
  logger.error(`${context} --> Error: ${err.message} || ${err}`);
  console.log(`${context} --> Error: `, err.message || err);
  process.exit(1);
}

const db = mongoose.connection;

//Connection events
db.on("error", (err) => handleError(err, "Mongoose event on error"));
db.on("reconnected", () => console.log("Mongoose Reconnected"));

db.on("disconnected", () => {
  if (mongoose.connection.readyState !== 0) {
    logger.warn("⚠️  MongoDB disconnected unexpectedly");
    console.log("⚠️  MongoDB disconnected unexpectedly");
  }
});

db.on("timeout", () => console.log("Mongoose connection timeout"));

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongo}/RSA`, {
      serverSelectionTimeoutMS: 5000, //retry quickly if DB not reachable
    });
    logger.info(`MongoDB connected successfully`);
    console.log(`MongoDB connected successfully`);
    return mongoose.connection;
    // console.dir(`MongoDB connected successfully`); --> green color like nodemon
  } catch (error) {
    handleError(error);
  }
};

module.exports = connectDB;
