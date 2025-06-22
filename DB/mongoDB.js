const mongoose = require("mongoose");
const { mongo } = require("../config/config");

function handleError(err, context = "mongoDB") {
  console.log(`${context} --> Error: `, err.message || err);
  process.exit(1);
}

const db = mongoose.connection;

//Connection events
db.on("error", (err) => handleError(err, "Mongoose event on error"));
db.on("reconnected", () => console.log("Mongoose Reconnected"));

db.on("disconnected", () => {
  if (mongoose.connection.readyState !== 0) {
    console.log("⚠️  MongoDB disconnected unexpectedly");
  }
});

db.on("timeout", () => console.log("Mongoose connection timeout"));

// function logError(err) {
//   console.log("Error encountered: ", err.message);
// }
//Replace this function with a logger, Most Important Learning Skill (Winston/Pino)

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
  console.log(`Recieved ${signal}. Closing MongoDB connection.....`);
  try {
    await db.close();
    console.log("MongoDB connection closed gracefully");
    process.exit(0);
  } catch (err) {
    handleError(err, "gracefulExit MongoDB connection");
  }
};

process.on("SIGINT", async () => await gracefulExit("SIGINT"));
process.on("SIGTERM", async () => await gracefulExit("SIGTERM"));

process.on("uncaughtException", (err) =>
  handleError(err, "Uncaught Exception")
);

process.on("unhandledRejection", (reason) =>
  console.log("Unhandled Rejection: ", reason)
);

process.on("exit", (code) => console.log(`Process exited with code: ${code}`));

module.exports = connectDB;
