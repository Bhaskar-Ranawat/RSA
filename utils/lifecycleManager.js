module.exports = function setupLifecycle({ dbConnection, server, logger }) {
  const shutdown = async (signalOrReason) => {
    try {
      logger?.info(`Shutting down due to : ${signalOrReason}`);
      console.log("Shutting down due to : ", signalOrReason);

      if (server) {
        await new Promise((resolve) => server.close(resolve));
        logger?.info(`HTTP server closed`);
        console.log("HTTP server close");
      }
      if (dbConnection && dbConnection.close) {
        await dbConnection.close();
        logger?.info(`MongoDB connection closed`);
        console.log("MongoDB connection closed");
      }
      process.exit(0);
    } catch (error) {
      try {
        logger?.error(`Error during shutdown: ${error.message}`);
      } catch (error) {
        console.log("Logger failed during shutdown", error.message);
      }
      console.log("Error during shutdown : ", error.message || error);
      process.exit(1);
    }
  };

  // global error handlers

  process.on("uncaughtException", (err) => {
    logger?.error(`Uncaught Exception Error Encountered: ${err}`);
    console.error("Uncaught Exception: ", err.message);
    shutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    logger?.error(`Unhandled Rejection Encountered: ${reason}`);
    console.error("Unhandled Rejection: ", reason);
    shutdown("unhandledRejection");
  });

  process.on("SIGINT", async () => await shutdown("SIGINT"));
  process.on("SIGTERM", async () => await shutdown("SIGTERM"));

  process.on("exit", (code) => {
    logger?.info(`Process exited with code: ${code}`);
    console.log(`Process exited with code: ${code}`);
  });

  process.on("warning", (warning) => {
    logger?.warn(`⚠️ Node warning: ${warning.name}`);
    logger?.warn(`${warning.message}`);
    logger?.warn(`${warning.stack}`);

    console.warn("⚠️ Node warning:", warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
  });
};
