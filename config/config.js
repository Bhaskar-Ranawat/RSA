const environmentVariables = {
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = environmentVariables;
