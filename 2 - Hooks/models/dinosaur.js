const mongoose = require('mongoose');
const Schema = mongoose.Schema;

DinosaurSchema = new Schema({
	name: {type: String, required: true},
	count: Number,
	risk: String
});

module.exports = mongoose.model('Dinosaur', DinosaurSchema);
