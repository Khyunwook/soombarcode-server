var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CuriosSchema = new Schema({
  room_id : {
    type: String,
    unique: false,
    required: true
  },
  user_id : {
    type: Number,
    unique: false,
    required: true
  },
  curios_peoples : [{
      c_uid: String,
  }]

});

module.exports = mongoose.model('Curios', CuriosSchema);
