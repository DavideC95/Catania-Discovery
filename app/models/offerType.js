var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('offerType', new Schema({
	date_start: { type: Date, default: Date.now },
	date_end: { type: Date, default: Date.now },
	quantity: Number,
  users_id: Schema.Types.ObjectId
}));
