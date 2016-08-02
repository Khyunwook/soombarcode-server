var configRoutes,
    express = require('express'),
    user_actions = require('../methods/user_actions'),
    room_actions = require('../methods/room_actions');

var router = express.Router();


//configRoutes = function (app, server){
//--------auto route---------
router.post('/auth/login', user_actions.authenticate);
router.post('/auth/register', user_actions.addNew);
router.get('/auth/getInfo', user_actions.getInfo);

//-------room route-----------
router.post('/room/makeroom',room_actions.makeroom);
router.get('/room/getrooms', room_actions.getRooms);

//};

module.exports = router;//{ configRoutes : configRoutes };//router;
