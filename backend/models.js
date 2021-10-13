const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {type: String,  required: true, unique: true},
  password: {type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const landmarkSchema = new mongoose.Schema({
  title: {type: String,  required: true },
  image: {type: String, required: true },
  position: {type: Array, required: true},
  description: {type: String, required: false}
});
const Landmark = mongoose.model('Landmark', landmarkSchema);

const models = {
  User: User,
  Landmark : Landmark
}

module.exports = models;