/** @format */

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;

// To access my credentials from .env file
const originUrl = process.env.ORIGIN_URL;

// To allow only a particular origin to access your server, create an object like the one below
// Then add it to the route you ant to allow the origin to access
// or pass as an argument to the cors() if you want that origin to have access to all the routr on your server
let corsOptions = {
  origin: originUrl,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// To enable cross origin resource sharing
app.use(cors());

// Body Parser is required to parse payloads coming from the frontend.
// Without this, you'll get an error "TypeError: Cannot read properties of undefined (reading 'name')"
// Because the payload won't be parsed.
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static assets from the public folder
app.use("/public", express.static(__dirname + "/public"));

// Serve a html file
const serveHTML = __dirname + "/public/index.html";

app.get("/", (req, res) => {
  res.sendFile(serveHTML);
});

// This endpoint shows some information about the machine or user making a request to your server
app.get("/info", (req, res) => {
  const response = {
    ip: req.ip,
    path: req.path,
    method: req.method,
    message: "These are some info you can get from the request object",
  };
  res.json(response);
});

// This endpoint returns a json object containing the details entered in the survey form
app.post("/survey", (req, res) => {
  const details = {
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
  };
  res.json(details);
});

// This endpoint shows how to write a middleware for a specific route
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

// This endpoint shows how to get the params sent from the client side on the server
// To test the endpoint, visit the route attaching your localhost port.
// Then add a number of day of the week and it gets return as a json object
// E.g localhost:3001/weekdays/1
app.get("/weekdays/:day", (req, res) => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = req.params.day;
  res.json({
    dayOfWeek:
      day > 7
        ? "No such day of the week. There are only 7 days in the week"
        : weekDays[day - 1],
  });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
