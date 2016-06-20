var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

AccountSchema = new Schema({
  local: {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
  }
});

AccountSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

AccountSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Account', AccountSchema);