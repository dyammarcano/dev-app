var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocalMongoose = require('passport-local-mongoose');

Account = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    'default': Date.now
  },
  updatedAt: {
    type: Date,
    'default': Date.now
  }
});

Account.plugin(LocalMongoose);

module.exports = mongoose.model('Account', Account);
