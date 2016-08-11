
var Profile = require('../model/profile');
var config = require('../config/database');
var ObjectId = require('mongoose').Types.ObjectId;


var functions = {
   makeProfile : function(req, res) {
      var room_id = req.body.room_id;
      var user_id = req.body.user_id;
      console.log('req',req.body);
      var myprofile = {
        old : req.body.profile.old,
        height : req.body.profile.height,
        country : req.body.profile.country,
        job : req.body.profile.job,
        hobby : req.body.profile.hobby
      }
      console.log('myprofile',myprofile);
      var newProfile = Profile({
        room_id : room_id,
        user_id : user_id,
        profile : myprofile
      });
      Profile.find({room_id : room_id, user_id : user_id},function(err, data){
        if(err){
          res.send(err);
        }
        if(data[0]){
          console.log('Curios exist',data[0]);
        }else{
          newProfile.save(function(err, newProfile){
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
    getProfile : function(req, res){
      var room_id = req.body.room_id;
      var user_id = req.body.user_id;

      Profile.find({room_id : room_id, user_id : user_id},function(err, data){
        if(err){
          res.send(err);
        }
        else if(data[0]){
          res.json({success:true, data : data[0]});
        }
      });
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
