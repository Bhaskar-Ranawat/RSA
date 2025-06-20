const express = require("express");
const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`The server is up at \n http://localhost:${port}`);
});
