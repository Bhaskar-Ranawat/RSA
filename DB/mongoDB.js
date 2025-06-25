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
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    handleError(error);
  }
};

//Graceful Shutdown
const gracefulExit = async (signal) => {
  logger.info(`Recieved ${signal}. Closing MongoDB connection.....`);
  console.log(`Recieved ${signal}. Closing MongoDB connection.....`);
  try {
    await db.close();
    console.log("MongoDB connection closed gracefully");
    logger.info("MongoDB connection closed gracefully");
    process.exit(0);
  } catch (err) {
    handleError(err, "gracefulExit MongoDB connection");
  }
};

process.on("SIGINT", async () => await gracefulExit("SIGINT"));
process.on("SIGTERM", async () => await gracefulExit("SIGTERM"));

module.exports = connectDB;
