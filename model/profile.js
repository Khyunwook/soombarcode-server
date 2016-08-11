var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProfileSchema = new Schema({
  room_id : {
    type: String,
    unique: false,
    required: true
  },
  user_id : {
    type: String,
    unique: false,
    required: true
  },
  profile : {
      old: String,
      height: String,
      country: String,
      job: String,
      hobby:String
  }

});

module.exports = mongoose.model('Profile', ProfileSchema);
