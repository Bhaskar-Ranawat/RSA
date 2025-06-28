require("dotenv").config();
const app = require("./app");
const { port } = require("./config/config");
const connectDB = require("./DB/mongoDB");
const logger = require("./utils/logger");
const setupLifecycle = require("./utils/lifecycleManager");

let dbConnection;
let server;

const userRoutes = require("./routes/UserRoutes/userAuthRoutes");
app.use("/api/user", userRoutes);

const providerRoutes = require("./routes/ProviderRoutes/providerAuthRoutes");
app.use("/api/provider", providerRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

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
