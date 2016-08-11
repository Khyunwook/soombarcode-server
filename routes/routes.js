var configRoutes,
    express = require('express'),
    user_actions = require('../methods/user_actions'),
    room_actions = require('../methods/room_actions'),
    danseo_actions = require('../methods/danseo_actions'),
    curios_actions = require('../methods/curios_actions'),
    profile_actions = require('../methods/profile_actions'),
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

//-----danseo route------------
  router.post('/danseo/makeDanseo',danseo_actions.makeDanseo);
  router.post('/danseo/addDanseo',danseo_actions.addDanseo);
  router.post('/danseo/getDanseo',danseo_actions.getDanseo);

//-----curios route------------
  router.post('/curios/makeCurios',curios_actions.makeCurios);

//-----Profile route---------
  router.post('/profile/makeProfile',profile_actions.makeProfile);
  router.post('/profile/getProfile',profile_actions.getProfile);

configRoutes = function (server){
  socket_actions.connect(server);
}

module.exports = {router: router,
                  configRoutes: configRoutes
                  };
