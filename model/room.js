var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RoomSchema = new Schema({
  roomname : {
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: false
  },
  difficult:{
    type: Number,
    required: true
  },
  master_id:{
    type: String,
    required: true
  },
  joinusers:[
    {
      juser_id : String,
      juser_name : String,
      ready : Boolean
    }
  ],
});

module.exports = mongoose.model('Room', RoomSchema);
