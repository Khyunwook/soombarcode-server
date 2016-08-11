var socket = require( 'socket.io' ),
    room_actions = require('./room_actions'),
    curios_actions = require('./curios_actions'),
    gameplay_actions = require('./gameplay_actions');

var numUsers =0;
var rooms = [];
var users = [];
var outusers =[];

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
            ready : false
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
         ready : data.juser.join_user_ready
       };
       //console.log('joinroomupdate',data);
       var promise = room_actions.updateJoinuser(room_id, joinuser);
       promise.then(function(updateroom){
         console.log("emit userlist");
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
      var usersinfo = data.wusers;
      var userlen = usersinfo.length;
      var cluen = Math.ceil((userlen)/3);


      var promise = gameplay_actions.makegame(data.room.room_id ,usersinfo);

      promise.then(function(makegame){
        io.in(socket.room).emit('playgame',{ room_id : makegame[0].room_id ,users:makegame[0].usersinfo});

      });
    });


    //의심자 목록 추가
    socket.on('add_curios',function(data){
      var room_id = data.room_id;
      var u_id = data.u_id;
      var c_id = data.c_uid;

      var promise = curios_actions.addCurios(room_id ,u_id ,c_id);

      promise.then(function(redata){
          io.in(socket.room).emit('updatecurios',{ data : redata});
      });
    });
    //의심자 목록 삭제
    socket.on('del_curios',function(data){
      var room_id = data.room_id;
      var u_id = data.u_id;
      var c_id = data.c_uid;

      var promise = curios_actions.deleteCurios(room_id ,u_id ,c_id);

      promise.then(function(redata){
          io.in(socket.room).emit('updatecurios',{ data : redata});
      });
    });

    //시간지난후 투표상황 집계
    socket.on('votetime',function(data){
      console.log('votetime',data);

      if(outusers[data.room_id]===undefined){
        outusers[data.room_id] = new Object();
        outusers[data.room_id].users = new Object();
        outusers[data.room_id].count = 0;
        outusers[data.room_id].maxv = 0;
        outusers[data.room_id].index = 0;
      }

      outusers[data.room_id].count++;

      if(data.vote_people !==undefined){
        if(outusers[data.room_id].users[data.vote_people]===undefined){
          outusers[data.room_id].users[data.vote_people] = 0;
        }
        outusers[data.room_id].users[data.vote_people]++;
        if(outusers[data.room_id].maxv < outusers[data.room_id].users[data.vote_people]){
          outusers[data.room_id].maxv = outusers[data.room_id].users[data.vote_people];
          outusers[data.room_id].index = data.vote_people;
        }
        console.log("outuser",outusers);
     }
     console.log('count,live',outusers[data.room_id].count,data.live_n);
     if(outusers[data.room_id].count === data.live_n){
       console.log('exit valeu',outusers[data.room_id].maxv);
       console.log('exit index',outusers[data.room_id].index);
       var killmaxv = outusers[data.room_id].maxv;
       var killuser = outusers[data.room_id].index;
       outusers[data.room_id]=undefined;

       if(killmaxv >= data.live_n-data.clue_n){
         var promise = gameplay_actions.killUsers(data.room_id ,killuser);

         promise.then(function(gameuser){
           //io.in(socket.room).emit('playgame',{ room_id : makegame[0].room_id ,users:makegame[0].usersinfo});
           console.log("ffff",gameuser);
          io.in(socket.room).emit('killafter',{ gameuser : gameuser[0].usersinfo})
        });
      }else{
          io.in(socket.room).emit("voteafter",{ msg : 'no die'});
      }
     }
   });

    socket.on('disconnect',function( data ){
        console.log("disconnect");
    });

    });
  }
};

module.exports = functions;
