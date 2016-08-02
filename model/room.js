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
  nton:{
    type: Number,
    required: true
  },
  master:{
    type: String,
    required: true
  },
  joinuser:[
    {
      juser_id : String,
      juser_name : String,
      team : String
    }
  ],
});

module.exports = mongoose.model('Room', RoomSchema);
