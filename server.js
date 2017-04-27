var bodyParser = require('body-parser');
var express = require('express')
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/', function (req, res) {
    console.log('post / = ' + JSON.stringify(req.body));
    res.status(200).send('got it');
});

app.post('/echo', function (req, res) {
    console.log('post /echo = ' + JSON.stringify(req.body));
    io.sockets.emit('echo', req.body);
    res.status(200).send('ok');
});

app.use('/', express.static(__dirname + '/WebClient'));

server.listen(3000, function () {
    console.log('port:3000 listening')
});