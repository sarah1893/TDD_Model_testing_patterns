const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema here
const DinosaurSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Dinosaur', DinosaurSchema);
