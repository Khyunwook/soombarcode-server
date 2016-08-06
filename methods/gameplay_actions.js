
var GamePlay = require('../model/gameplay');
var config = require('../config/database');
var ObjectId = require('mongoose').Types.ObjectId;


var functions = {

    makegame: function(r_id, users){

      var usersinfo=[];
      for(var i=0; i<users.length; i++){
        var userinfo ={
          juser_id : users[i].juser_id,
          juser_name : users[i].juser_name,
          team : users[i].team,
          hp : 100,
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
    }

};
module.exports = functions;
