var mongoose = require('mongoose'),
    express  = require('express'),
    morgan   = require('morgan'),
    cors     = require('cors'),
    config = require('./config/database'),
    passport = require('passport'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser');

console.error('mongo is open');
mongoose.connect(config.database);
console.error('mongo is open2');
mongoose.connection.on('open', function(){

    console.error('mongo is open');
    var app = express();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);

    routes.configRoutes(app, server);
    app.listen(3333, function (err) {
       console.log('Server is running')
    });
})
