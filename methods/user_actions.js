var User = require('../model/user');
var jwt  = require('jwt-simple');
var config = require('../config/database');
var socket = require( 'socket.io' );

var functions = {
    authenticate: function(req, res) {
       //console.log(User);
        User.findOne({
            userid: req.body.userid
        }, function(err, user){
            if (err) throw err;
            if(!user){
                return res.status(403).send({success: false, msg: 'Authenticaton failed, user not found.'});
            } else {
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token: token});
                    } else {
                        return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
                    }
                })
            }
        })
    },
    addNew: function(req, res){
      //console.log("addNew req",req);
        if((!req.body.userid) || (!req.body.password)){
            console.log(req.body.userid);
            console.log(req.body.password);

            res.json({success: false, msg: 'Enter all values'});
        }
        else {
            var newUser = User({
                userid: req.body.userid,
                username: req.body.username,
                password: req.body.password
            });

            newUser.save(function(err, newUser){
                if (err){
                    console.log('newUser err',err);
                    res.json({success:false, msg:'Failed to save'})
                }

                else {
                    console.log('newUser success',newUser);
                    res.json({success:true, msg:'Successfully saved'});
                }
            })
        }
    },

    getInfo: function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]  === 'getuser') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);

            return res.json({success: true, msg: { userid :decodedtoken.userid, username: decodedtoken.username }});
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
    }
};
module.exports = functions;
