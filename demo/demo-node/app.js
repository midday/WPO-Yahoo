var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var compression = require('compression');
var combo = require('combohandler');
var expressSSI = require('express-ssi');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//(1)配置反向代理
//httpProxy.createProxyServer({target:'http://localhost:3000'}).listen(8000);
//(2)配置gzip压缩
//app.use(compression());
//(3)配置http缓存：maxAge、etag、lastModified等
app.use(express.static(path.join(__dirname, 'public'),{maxAge:0,etag:false,lastModified:false}));
//(4)配置combo
//app.get('/javascripts', combo.combine({rootPath: path.join(__dirname, 'public')+'/javascripts'}), combo.respond);
//app.get('/stylesheets', combo.combine({rootPath: path.join(__dirname, 'public')+'/stylesheets'}), combo.respond);
//(5)配置ssi
//expressSSI.init(express,'http://gome.com.cn');

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
