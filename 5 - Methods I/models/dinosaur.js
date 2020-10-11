const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = function(value) {
  return value <= 10;
};

const DinosaurSchema = new Schema(
  {
    name: {type: String, required: true},
    count: {
      type: Number,
      max: [10, 'Cannot hold more than 10 dinosaurs.']
    },
    risk: {type: String}
  }
);

// Define .findByName here
DinosaurSchema.statics.findByName = function(name, callback) {
    return this.findOne({ name: name }, callback);
};

module.exports = mongoose.model('Dinosaur', DinosaurSchema);
