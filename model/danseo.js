var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var DanSeoSchema = new Schema({
  room_id : {
    type: String,
    unique: false,
    required: true
  },
  num : {
    type: Number,
    unique: false,
    required: true
  },
  danseo : {
      type: String,
      unique: true,
      required: true
  }

});

module.exports = mongoose.model('DanSeo', DanSeoSchema);
