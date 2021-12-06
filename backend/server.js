const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const config = require('dotenv').config();
const PORT = 4040;

app.use(cors());
app.use(express.json());

// DB init stuff
const mongoose = require("mongoose");
const models = require("./models.js");
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.post("/landmarks", (req, res) => {
  console.log(req.body);
  let _landmark = {
    title: req.body.title,
    image: req.body.image,
    description: req.body.desc,
    type: req.body.type,
    position: req.body.position
  }

  const landmark = new models.Landmark(_landmark);
  landmark.save((err) => {
    if (err) {
      return console.log("ERROR: " + err.message);
    } else {
      models.Landmark.find({}, "-__v", (err, landmarks) => {
        res.send(landmarks);
      });
    }
  });
});

app.get("/landmarks", (req, res) => {
  models.Landmark.find({}, "-__v", (err, landmarks) => {
    console.log(landmarks);
    res.send(landmarks);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
