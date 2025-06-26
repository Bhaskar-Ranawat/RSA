require("dotenv").config();

const app = require("./app");

const { port } = require("./config/config");

const connectDB = require("./DB/mongoDB");

const logger = require("./utils/logger");
const setupLifecycle = require("./utils/lifecycleManager");

let dbConnection;
let server;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const userRoutes = require("./routes/UserRoutes/userRoutes");
app.use("/api/user", userRoutes);

(async () => {
  try {
    dbConnection = await connectDB();

    server = app.listen(port, () => {
      console.log(`The server is up at \nhttp://localhost:${port}`);
    });
    setupLifecycle({ dbConnection, server, logger });
  } catch (error) {
    logger.error(`Failed to start the application: ${error.message}`);
    process.exit(1);
  }
})();
