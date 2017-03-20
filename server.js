var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port:3000!')
});

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/', function (req, res) {
    console.log('post / = ' + req.body);
    res.status(200).send('got it');
});