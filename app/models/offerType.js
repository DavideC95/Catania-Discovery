// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('offerType', new Schema({
  users_id: Schema.Types.ObjectId,
  city_id: Schema.Types.ObjectId,
  price: Number,
  description: String,
  img_path: String
}));
