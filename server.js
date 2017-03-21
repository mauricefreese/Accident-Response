var bodyParser = require('body-parser');
var express = require('express')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', express.static('../WebClient/'));

app.post('/', function (req, res) {
    console.log('post / = ' + JSON.stringify(req.body));
    res.status(200).send('got it');
});

app.listen(3000, function () {
    console.log('Example app listening on port:3000!')
});