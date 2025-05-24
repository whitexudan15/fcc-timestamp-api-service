// index.js
// where your node app starts
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// init project
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Empty Date parameter
app.get("/api", (req, res) => {
  const unix = Math.floor(new Date().getTime());
  const utc = new Date().toUTCString();
  res.json({ unix: unix, utc: utc });
});

app.get("/api/:endpoint", (req, res) => {
  const endpoint = req.params.endpoint;

  if (!isNaN(parseInt(endpoint))) {
    const unix = parseInt(endpoint);
    const utc = new Date(unix).toUTCString();
    res.json({ unix: unix, utc: utc });
  } else {
    const dateString = endpoint;
    const date = new Date(dateString);
    const unix = date.getTime();
    const utc = date.toUTCString();

    if (isNaN(date.getTime())) res.json({ error: "Invalid Date" });

    res.json({ unix: unix, utc: utc });
  }
});

// Listen on port set in environment variable or default to 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + process.env.PORT);
});

let date = new Date("December 25, 2004");
console.log(date.getTime());

console.log(parseInt("December 25, 2005"));
