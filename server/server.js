var express = require('express');
const fileUpload = require('express-fileupload');
var multer = require('multer')
var cors = require('cors')
var bodyParser = require('body-parser');


var app = express();
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

var PORT = 5000;

app.get('/', function(req, res) {
  res.status(200).send('Hello world');
});

app.post("/upload", (req, res) => {
  fs = require('fs');
  fs.writeFile('dictionary.json', JSON.stringify(req.body), function (err) {
    if (err) return console.log(err);
    console.log('dictionary > dictionary.json');
  });
});

app.listen(PORT, function() {
  console.log('Server is running on PORT:',PORT);
});