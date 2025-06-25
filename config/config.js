const environmentVariables = {
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  adminPass: process.env.ADMIN_PASS,
  adminName: process.env.ADMIN_NAME,
};

module.exports = environmentVariables;
