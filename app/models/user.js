// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  nickname: String,
	name: String,
  surname: String,
	password: String,
	email: String,
  date: { type: Date, default: Date.now },
  propic: String,
  tourist_seller: Boolean,
	blocked: Boolean
}));
