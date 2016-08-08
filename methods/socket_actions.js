var socket = require( 'socket.io' ),
    room_actions = require('./room_actions'),
    gameplay_actions = require('./gameplay_actions');

var numUsers =0;
var rooms = [];
var users = [];

var functions = {
  connect : function( server ){
    var io = socket.listen( server);
    io.on('connection', function(socket){
      console.log('User connected');

      //방만들때
      socket.on('joinroom', function( data ){
          socket.join(data.room.room_id);

          socket.room = data.room.room_id;
          var userid = data.room.join_user_id;
          var username = data.room.join_user_name;
          console.log("joinroom",data);
          if( rooms[socket.room] == undefined ){
              rooms[socket.room] = new Object();
              rooms[socket.room].socket_ids = new Object();
          }
          var joinuser = {
            juser_id : userid,
            juser_name :  username,
            team : 'A'
          }

          //addJoinuser
          var promise = room_actions.addJoinuser(socket.room, joinuser);
          promise.then(function (updateroom){
            console.log('update_room',updateroom[0].joinusers);
            io.in(socket.room).emit('userlist',{ users : updateroom[0].joinusers });
          });

          //Store current user's nickname and socket.id to MAP
          rooms[socket.room].socket_ids[userid] = socket.id;
    });

    //방입장할때
    socket.on('joinroomupdate', function(data){
       var room_id = data.room.room_id;
       var joinuser = {
         juser_id : data.juser.join_user_id,
         team : data.juser.join_user_team
       };
       console.log('joinroomupdate',data);
       var promise = room_actions.updateJoinuser(room_id, joinuser);
       promise.then(function(updateroom){
       io.in(socket.room).emit('userlist',{ users : updateroom[0].joinusers });
       });

    });

    //방에서 나갈때
    socket.on('outroomupdate', function(data) {
      var room_id = data.room.room_id;
      var user_id = data.user_id;
      delete rooms[socket.room].socket_ids[user_id];
      var promise = room_actions.deleteJoinuser(room_id,user_id);
      promise.then(function(updateroom){
        io.in(socket.room).emit('userlist',{ users : updateroom[0].joinusers });
      })
    });

    //게임시작할때
    socket.on('startgame',function(data){
      console.log('startgame data',data);
      var usersinfo = [];
      for(var i=0; i<data.Ateam.length; i++){
        usersinfo.push(data.Ateam[i]);
      }
      for(var i=0; i<data.Bteam.length; i++){
        usersinfo.push(data.Bteam[i]);
      }
      console.log('playgameuserinfo',usersinfo);
      var promise = gameplay_actions.makegame(data.room.room_id ,usersinfo);
      promise.then(function(makegame){
        //console.log('makegame res1',makegame[0].usersinfo);
        //console.log('makegame res2',makegame.usersinfo);
        io.in(socket.room).emit('playgame',{ room_id : makegame[0].room_id ,users:makegame[0].usersinfo});

      });



    });
    socket.on('disconnect',function( data ){

    });

    });
  }
};

module.exports = functions;
