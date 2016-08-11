
var Curios = require('../model/curios');
var config = require('../config/database');
var ObjectId = require('mongoose').Types.ObjectId;


var functions = {
   makeCurios : function(req, res) {
      var room_id = req.body.room_id;
      var user_id = req.body.user_id;
      var newCurios = Curios({
        room_id : room_id,
        user_id : user_id
      });
      Curios.find({room_id : room_id, user_id : user_id},function(err, data){
        if(err){
          res.send(err);
        }
        if(data[0]){
          console.log('Curios exist',data[0]);
        }else{
          newCurios.save(function(err, newCurios){
            if (err){
                console.log('curioserr',err);
                res.json({success:false, msg:'Failed to save'})
            }
            else {
                res.json({success:true, msg:'Successfully saved'});
            }
          });
        }
      });
    },
    addCurios : function(r_id,u_id,c_id){
      var room_id = r_id;
      var user_id = u_id;
      var c_uid = c_id;
      console.log('addCurios',r_id,u_id,c_id);
      Curios.update( {room_id: room_id , user_id : user_id }, {$push : { "curios_peoples" : { c_uid : c_uid} }},{upsert:true},function(err,data){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully added");
        }
      });//.exec();
      var promise = Curios.find( { room_id : room_id, user_id : user_id}).exec();
      return promise;
    },

    deleteCurios: function(r_id,u_id,c_id){
      var room_id = r_id;
      var user_id = u_id;
      var c_uid = c_id;
      console.log('delCurios',r_id,u_id,c_id);
      Curios.update( { room_id : room_id, user_id : user_id }, { $pull : { "curios_peoples" : {c_uid : c_uid}}}).exec();
      var promise = Curios.find( { room_id : room_id, user_id : user_id}).exec();
      return promise;
    }

};
module.exports = functions;
