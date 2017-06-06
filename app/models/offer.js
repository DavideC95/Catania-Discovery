// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Offer', new Schema({
	date_start: { type: Date, default: Date.now },
	date_end: { type: Date, default: Date.now },
	quantity: Number,
  users_id: Schema.Types.ObjectId
}));
