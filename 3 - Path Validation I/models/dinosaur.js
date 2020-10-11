const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define validator method here
const validator = function() {
  return false;
};

const DinosaurSchema = new Schema(
  {
		name: {type: String, required: true},
    count: {
      type: Number,
      // Define validate property here
			validate: validator
    },
    risk: {type: String}
	}
);

module.exports = mongoose.model('Dinosaur', DinosaurSchema);
