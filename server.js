var mongoose = require('mongoose'),
    express  = require('express'),
    morgan   = require('morgan'),
    cors     = require('cors'),
    config = require('./config/database'),
    passport = require('passport'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser'),
    http  = require('http'),
    app = express(),
    server = http.createServer(app);

mongoose.connect(config.database);
mongoose.connection.on('open',function(){
  console.log('mongo is open');
});

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes.router);
app.use(routes.configRoutes);
app.use(passport.initialize());
require('./config/passport')(passport);

routes.configRoutes( server );

server.listen(3333, function (err) {
     console.log('Server is running')
});
