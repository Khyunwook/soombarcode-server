
var DanSeo = require('../model/danseo');
var config = require('../config/database');
var ObjectId = require('mongoose').Types.ObjectId;


var functions = {
   makeDanseo : function(req, res) {
      var newDanseo = DanSeo({
        room_id : req.body.room_id
      });

      newDanseo.save(function(err, newDanseo){
        if (err){
            console.log('danseoerr',err);
            res.json({success:false, msg:'Failed to save'})
        }
        else {
            res.json({success:true, msg:'Successfully saved'});
        }
      });

    },
    addDanseo : function(req, res){
      var room_id = req.body.room_id;
      var danseo = req.body.profile;
      var hash_id = req.body.hash_id;
      var newDanseo = DanSeo({
          room_id : req.body.room_id,
          num : req.body.hash_id,
          danseo : req.body.profile
      });
      console.log("addDanseo",room_id);
      console.log("addDanseo2",danseo);
      console.log("addDanseo3",hash_id);
      //DanSeo.update({ room_id : room_id }, { $push : { danseos : danseoobj }}).exec();

      DanSeo.find( { room_id : room_id , num : hash_id } ,function(err, data){
        if(err) {
          res.send(err);
        }
        if(data[0]){
          console.log('danseo exist',data[0]);
          //DanSeo.update( { room_id : this.room_id , 'danseos.num' : this.hash_id }, { $set : { 'danseos.$.danseo' : this.danseo}}).exec();
        }else{
          console.log('danseo no exist');
          //console.log('danseo no exist test',danseoobj);
          newDanseo.save(function(err, newDanseo){
            if(err){
                res.json( { success :false });
            }else{
                res.json( { success :true });
            }
          });
        }
      });

    },

    getDanseo : function(req, res){
      var room_id = req.body.room_id;
      var hash_id = req.body.hash_id;
      console.log("room_id",room_id, hash_id);
      DanSeo.find( {room_id : room_id, num : hash_id },function(err,data){
        if(err)
          res.send(err);
        if(data){
          console.log("tttt",data[0]);
          res.json({success : true , danseo : data[0]});
        }else{
          res.json({success : false})
        }


      });
    }


};
module.exports = functions;
