var socket = require( 'socket.io' );

var numUsers =0;
var rooms = [];
var users = [];

var functions = {
  connect : function( server ){
    var io = socket.listen( server);
    io.on('connection', function(socket){
      console.log('User connected');

      socket.on('joinroom', function( data ){
          socket.join(data.room.room_id);

          socket.room = data.room.room_id;
          var userid = data.room.join_user_id;
          var username = data.room.join_user_name;
          //socket.emit('changename', {username:username});
              //Create Room
          if( rooms[socket.room] == undefined ){
              rooms[socket.room] = new Object();
              rooms[socket.room].socket_ids = new Object();
            //  rooms[socket.room].users = new Object();
          }

          user = new Object();
          user.username = username;
          user.userid = userid;
              //users.userid = new Object();
          users.push(user);

          //Store current user's nickname and socket.id to MAP
          rooms[socket.room].socket_ids[userid] = socket.id;
          rooms[socket.room].users = users;
          console.log("socket.id",socket.id);
          console.log("rooms",rooms);
          console.log("users",users);
          data = { msg : userid +'입장'};
          io.in(socket.room).emit('broadcast_msg',data);
          io.in(socket.room).emit('userlist',{ userskey: Object.keys(rooms[socket.room].socket_ids),
                                               users : rooms[socket.room].users
           });
          numUsers++;

    });

    socket.on('disconnect',function( data ){

    });

    });
  }
};

module.exports = functions;
