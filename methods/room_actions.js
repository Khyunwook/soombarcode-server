
var Room = require('../model/room');
var config = require('../config/database');

var functions = {
    makeroom: function(req, res){
        var newRoom = Room({
              roomname: req.body.roomname,
              password: req.body.password,
              nton: req.body.nton,
              master: req.body.master,

          });

        newRoom.save(function(err, newRoom){
            if (err){
                console.log('roomerr',err);
                res.json({success:false, msg:'Failed to save'})
            }
            else {
              //  console.log('newRoom',newRoom);
                res.json({success:true, msg:'Successfully saved',room :{ room_id: newRoom._id, nton: newRoom.nton, master : newRoom.master}  });
            }
        });
    },

    getRooms: function(req, res){
        Room.find(function(err, rooms){
          if(err)
            res.send(err);
          res.json(rooms)
        });
    }
};
module.exports = functions;
