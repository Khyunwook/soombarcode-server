var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StoreSchema = new Schema({
  id : {
    type : Number,
    unique : true,
    required : true
  }
  itemname : {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Store', StoreSchema);
