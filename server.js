require("dotenv").config();

const app = require("./app");

const { port } = require("./config/config");

const connectDB = require("./DB/mongoDB");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const userRoutes = require("./routes/UserRoutes/userRoutes");
app.use("/api/user", userRoutes);

// global error handlers

process.on("exit", (code) => {
  logger.info(`Process exited with code: ${code}`);
  console.log(`Process exited with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception: ", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection: ", reason);
  process.exit(1);
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`The server is up at \nhttp://localhost:${port}`);
  });
});
