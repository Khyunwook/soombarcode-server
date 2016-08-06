var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GamePlaySchema = new Schema({
  room_id : {
    type: String,
    unique: true,
    required: true
  },

  usersinfo:[
    {
      juser_id : String,
      juser_name : String,
      team : String,
      hp : Number,
      live : Boolean
    }
  ],
});

module.exports = mongoose.model('GamePlay', GamePlaySchema);
