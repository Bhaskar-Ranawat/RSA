require("dotenv").config();

const app = require("./app");

const { port } = require("./config/config");

const connectDB = require("./DB/mongoDB");

connectDB();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const userRoutes = require("./routes/UserRoutes/userRoutes");
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`The server is up at \nhttp://localhost:${port}`);
});
