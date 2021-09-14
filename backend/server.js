const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 3000;

// DB init stuff
const mongoose = require('mongoose');
const models = require('./models.js');
const uri = "mongodb+srv://greg:LeafletThesis2021@cluster0.g97hf.mongodb.net/Leaflet_Thesis?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//const user = new models.User({email: "asd@qwer.com", password: "qwer"});
//user.save((err) => { if (err) return console.log("ERROR: " + err.message); });


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});