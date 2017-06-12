var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('offer', new Schema({
  user_id: Schema.Types.ObjectId,
  user: String,
//  city_id: Schema.Types.ObjectId,
  title: String,
  price: Number,
  quantity: Number,
  description: String,
  img_path: String,
  date: { type: Date, default: Date.now },
  clients: []
}));
