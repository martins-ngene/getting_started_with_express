/** @format */

const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  const response = {
    ip: req.ip,
    path: req.path,
    method: req.method,
    message: "Hello World, This is my server",
  };
  res.json(response);
});

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
