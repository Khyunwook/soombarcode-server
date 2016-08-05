
var Room = require('../model/room');
var config = require('../config/database');
var ObjectId = require('mongoose').Types.ObjectId;


var functions = {

    makeroom: function(req, res){
        var newRoom = Room({
              roomname: req.body.roomname,
              password: req.body.password,
              nton: req.body.nton,
              master_id: req.body.master_id
          });

        newRoom.save(function(err, newRoom){
            if (err){
                console.log('roomerr',err);
                res.json({success:false, msg:'Failed to save'})
            }
            else {
                res.json({success:true, msg:'Successfully saved',room : { room_id :newRoom._id, nton: newRoom.nton, master_id: newRoom.master_id} });
            }
        });
    },

    getRooms: function(req, res){
        Room.find(function(err, rooms){
          if(err)
            res.send(err);
          res.json(rooms)
        });
    },

    addJoinuser: function(id, set_map){
      Room.findByIdAndUpdate( { _id : ObjectId(id) }, {$push : { joinusers : set_map}}).exec();
      var promise = Room.find( { _id : ObjectId(id)}).exec();
      return promise;
    },
    updateJoinuser: function(id,set_map){
      Room.update( { _id : ObjectId(id), 'joinusers.juser_id': set_map.juser_id }, { $set : { 'joinusers.$.team' : set_map.team}} ).exec();
      var promise = Room.find( {_id: ObjectId(id)}).exec();
      return promise;
    },
    deleteJoinuser: function(r_id,u_id){
      Room.update( { _id : ObjectId(r_id)}, { $pull : { "joinusers" : {juser_id : u_id}}}).exec();
      var promise = Room.find( { _id: ObjectId(r_id)}).exec();
      return promise;
    }

};
module.exports = functions;
