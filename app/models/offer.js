var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('offer', new Schema({
  users_id: Schema.Types.ObjectId,
  city_id: Schema.Types.ObjectId,
  price: Number,
  description: String,
  img_path: String
}));
