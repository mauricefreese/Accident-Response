var bodyParser = require('body-parser');
var express = require('express')
var http = require('http');
var socketio = require('socket.io');
var Mongo = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://localhost:27017/iot';

Mongo.connect(MONGO_URL, function (err, db) {
    if (err) {
        //TODO: handle error
    }
    Mongo.ops = {};

    // Finds all documetns that contain the value of 'json'
    Mongo.ops.find = function (collection, json, callback) {
        db.collection(collection).find(json).toArray(function (err, docs) {
            if (callback) callback(err, docs);
        });
    };

    // Creates a new JSONdocumetn in MongoDB
    Mongo.ops.insert = function (collection, json, callback) {
        db.collection(collection).insert(json, function (err, result) {
            if (callback) callback(err, result);
        });
    };
});



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
    Mongo.ops.insert('echo', req.body, function (err, result) {
        if (err)
            res.status(500).send(error);
        else
            res.status(201).send(req.body);
    });
});

app.get('/', express.static('../WebClient/'));

app.listen(3000, function () {
    console.log('Example app listening on port:3000!')
});