var server= require('../server');
var router = require('./router');
var requestHandler = require('../public/javascripts/requestHandler');

var handle = {};
handle["/"] = requestHandler.start;
handle["/login"] = requestHandler.login;
handle["/blogHome"] = requestHandler.blogHome;

server.start(router.route,handle);