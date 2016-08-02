var configRoutes,
    express = require('express'),
    user_actions = require('../methods/user_actions'),
    room_actions = require('../methods/room_actions'),
    socket_actions = require('../methods/socket_actions');

//
  var router = express.Router();
//--------auto route---------
  router.post('/auth/login', user_actions.authenticate);
  router.post('/auth/register', user_actions.addNew);
  router.get('/auth/getInfo', user_actions.getInfo);

//-------room route-----------
  router.post('/room/makeroom',room_actions.makeroom);
  router.get('/room/getrooms', room_actions.getRooms);


configRoutes = function (server){
  socket_actions.connect(server);
}

module.exports = {router: router,
                  configRoutes: configRoutes
                  };
