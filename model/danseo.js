var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var DanSeoSchema = new Schema({
  room_id : {
    type: String,
    unique: false,
    required: false
  },
  num : {
    type: Number,
    unique: false,
    required: false
  },
  danseo : {
      type: String,
      unique: false,
      required: false
  }

});

module.exports = mongoose.model('DanSeo', DanSeoSchema);
