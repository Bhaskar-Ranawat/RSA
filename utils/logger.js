const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} | ${level.toUpperCase()} | ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} | ${level} | ${message}`;
        })
      ),
    }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/warnings.log", level: "warn" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;

// create the logger, now need to implement these logger throughout my project
