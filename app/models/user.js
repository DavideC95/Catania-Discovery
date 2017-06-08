var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  nickname: String,
	name: String,
  surname: String,
	password: String,
	email: String,
  phone: String,
  date: String,
  propic: String,
  seller: Boolean,
	blocked: Boolean
}));
