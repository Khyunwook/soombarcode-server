
var GamePlay = require('../model/gameplay');
var config = require('../config/database');
var ObjectId = require('mongoose').Types.ObjectId;


var functions = {

    makegame: function(r_id, users){
      var userlen = users.length;
      var cluen = Math.ceil(userlen/3);
      console.log('preshuffle',users);
      users = this.shuffle(users);
      console.log('nextshuffle',users);
      var usersinfo=[];
      for(var i=0; i<userlen; i++){
        var userinfo ={
          juser_id : users[i].juser_id,
          juser_name : users[i].juser_name,
          is_clue : i<cluen?true:false,
          live : true
        };
        usersinfo.push(userinfo);
      }
      var newGame = GamePlay({
        room_id: r_id,
        usersinfo : usersinfo
      });
      newGame.save();

      var promise  = GamePlay.find({ "room_id" : r_id }).exec();
      return promise;

    //  var promise  = GamePlay.find({ "room_id" : r_id }).exec();
    //  return promise;
    },
    killUsers : function ( room_id, kill_user){
      console.log('killuser',kill_user);
      GamePlay.update( {room_id: room_id , 'usersinfo.juser_id' : kill_user }, {$set : { 'usersinfo.$.live' : false }},{upsert:true},function(err,data){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully added");
        }
      });//.exec();
      var promise = GamePlay.find( { room_id : room_id }).exec();
      return promise;
    },
    shuffle: function(array) {
      var counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
          var index = Math.floor(Math.random() * counter);
          counter--;

          var temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
    },

    countdown: function(){

    }

};
module.exports = functions;
