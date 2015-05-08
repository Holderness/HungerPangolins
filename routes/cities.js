

var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });/** extended false ensures node's native qs string parsing library */

/** .send, by default, when passed a string, returns text/html
if we pass in an array or object, it returns json
.json always returns json.
*/
// app.get('/', function(request, response){
//   response.send('OK');
// });

var redis = require('redis');
var client = redis.createClient();

/** .select tells redis what db to use, takes a number to identify it*/
client.select((process.env.NODE_ENV || 'development').length);


var router = express.Router();

router.route('/')
  .get(function(request, response){
    client.hkeys('cities', function(error, names) {
      if (error) throw error;
      response.json(names);
    });
  })
  .post(urlencode, function(request, response) {
    var newCity = request.body;
    if (!newCity.name || !newCity.description) {
      response.sendStatus(400);
      return false;
    }
    client.hset('cities', newCity.name, newCity.description, function(error) {
      if (error) throw error;
      response.status(201).json(newCity.name);
    });
  });

router.route('/:name')
  .delete(function(request, response) {
    client.hdel('cities', request.params.name, function(error) {
      if (error) throw error;
      response.sendStatus(204);
    });
  })
  .get(function(request, response) {
    client.hget('cities', request.params.name, function(error, description) {
    response.render('show.ejs',
                      { city:
                        { name: request.params.name, description: description }
                      });
    });
  });

module.exports = router;



// BEFORE ROUTER 

// app.get('/cities', function(request, response){
//   client.hkeys('cities', function(error, names) {
//     response.json(names);
//   });
// });

// app.post('/cities', urlencode, function(request, response) {
//   var newCity = request.body;
//   if (!newCity.name || !newCity.description) {
//     response.sendStatus(400);
//     return false;
//   }
//   client.hset('cities', newCity.name, newCity.description, function(error) {
//     if (error) throw error;
//     response.status(201).json(newCity.name);
//   });
// });

// app.delete('/cities/:name', function(request, response) {
//   client.hdel('cities', request.params.name, function(error) {
//     if (error) throw error;
//     response.sendStatus(204);
//   });
// });

// app.get('/cities/:name', function(request, response) {
//   client.hget('cities', request.params.name, function(error, description) {
//   response.render('show.ejs',
//                       { city:
//                         { name: request.params.name, description: description }
//                       });
//   });
// });