var express = require('express');  
var session  = require('express-session');
var morgan = require('morgan');
var port     = process.env.PORT || 3000;
var router =express.Router()
var path = require('path');   
  
var cookieParser = require('cookie-parser');  
var bodyParser = require('body-parser');  
var cors = require('cors');  

var passport = require('passport');
var flash    = require('connect-flash');
 

require('./auth/passport')(passport); 

var Shoes = require('./routes/Shoe');  
var Users = require('./routes/User');  
var Shoemania = require('./routes/Shoemania');
var Wishlist = require('./routes/Wishlist');
var PersonalRecommend = require('./routes/PersonalRecommendation');
var LocationRecommend = require('./routes/LocationRecommendation');
var AIRecommend = require('./routes/AIRecommendation');
var Account = require('./routes/Login')(router, passport);
var app = express();  


// view engine setup  
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');  

// uncomment after placing your favicon in /public  
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  
app.use(cors());  


app.use(morgan('dev')); // log every request to the console



app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
    extended: false  
}));  
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session({
    secret: 'mcheung3secret',
    resave: true,
    saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 

app.use('/shoes', Shoes); 
app.use('/account', Account );
app.use('/users', Users );
app.use('/shoemania', Shoemania );
app.use('/wishlist', Wishlist );
app.use('/personalRecommendation', PersonalRecommend );
app.use('/aiRecommendation', AIRecommend)
app.use('locationRecommendation', LocationRecommend);

// catch 404 and forward to error handler  
app.use(function(req, res, next) {  
    var err = new Error('Not Found');  
    err.status = 404;  
    next(err);  
});  
// error handlers  
// development error handler  
// will print stacktrace  
if (app.get('env') === 'development') {  
    app.use(function(err, req, res, next) {  
        res.status(err.status || 500);  
        res.render('error', {  
            message: err.message,  
            error: err  
        });  
    });  
}  
// production error handler  
// no stacktraces leaked to user  
app.use(function(err, req, res, next) {  
    res.status(err.status || 500);  
    res.render('error', {  
        message: err.message,  
        error: {}  
    });  
});  



app.listen(port);
module.exports = app;