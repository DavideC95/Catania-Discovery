var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('City', new Schema({
	city: String,
  province: String
}));
