var express = require('express');
var app = express();


app.set('views', __dirname + "/public/views");
app.set('view engine', 'ejs');


app.get('/', function(req, res){
  res.render('pages/index');
});

var cities = require('./routes/cities');
app.use('/cities', cities);

app.use(express.static(__dirname + '/public'));

module.exports = app;


