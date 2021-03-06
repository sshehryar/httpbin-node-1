var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// App Routes
// ---------------------------------------------------------------


    app.use( '/',              route('index')        );
    app.use( '/ip',            route('ip')           );
    app.use( '/user-agent',    route('user-agent')   );
    app.use('/headers',        route('headers')      );
    app.use('/get',            route('get')          );
    app.use('/status',         route('status')       )

// Custom Routing methods
// ---------------------------------------------------------------


function route(slug) {
    return require('./routes/' + slug);         // E.g.: route('ip');
}

function useRoute(slug) {
    app.use('/' + slug, loadRoute(slug));       // E.g.: useRoute('ip');
}

// ---------------------------------------------------------------




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


module.exports = app;
