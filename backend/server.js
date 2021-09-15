const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const PORT = 4040;

app.use(cors());
app.use(express.json());

// DB init stuff
const mongoose = require("mongoose");
const models = require("./models.js");
const uri = "mongodb+srv://greg:LeafletThesis2021@cluster0.g97hf.mongodb.net/Leaflet_Thesis?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.post("/landmarks", (req, res) => {
  const landmark = new models.Landmark(req.body);
  landmark.save((err) => {
    if (err) return console.log("ERROR: " + err.message);
  });
  res.sendStatus(200);
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
