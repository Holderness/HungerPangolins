var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function() {

	it('Returns a 200 status code', function(done) {

    request(app)
      .get('/')
      .expect(200)
      .end(function(error) {
        if (error) throw error;
        done();
      });
  });

  it('Returns a HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/, done);
  });

  it('Returns an index file with Cities', function(done) {
    request(app)
      .get('/')
      .expect(/cities/i, done);
  });
});


describe('Listing cities on /cities', function() {

	it('Returns 200 status code', function(done) {
    
    request(app)
      .get('/cities')
      .expect(200, done);

	});

	it('Returns JSON format', function(done) {

		request(app)
      .get('/cities')
      .expect('Content-Type', /json/)/** or put 'done' here as a 3rd arg*/
      .end(function(error)  {
        if (error) throw error;
        done();
      });

	});

	it('Returns initial cities', function(done) {

    request(app)
      .get('/cities')
      .expect(JSON.stringify([]), done);

	});
});

describe('Creating new cities', function() {

  it('Returns a 201 status code', function(done) {

     request(app)
       .post('/cities')
       .send('name=Springfield&description=where+the+simpsons+live')
       .expect(201, done);

  });

  it('Return the city name', function(done) {

    request(app)
      .post('/cities')
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(/springfield/i, done);

  });
});


describe('Deleting cities', function() {
  before(function() {
    client.hset('cities', 'chickParm', 'a tasty fruit');
  });

  after(function() {
    client.flushdb();
  });


  it('Returns a 204 status code: no content', function(done) {
    
    request(app)
      .delete('/cities/chickParm')
      .expect(204, done);
  });

  it('Validates city name and description', function(done) {
    request(app)
      .post('/cities')
      .send('name=&description=')
      .expect(400, done);
  });
});

describe('Show city info', function() {

  before(function() {
    client.hset('cities', 'Boogers', 'tasty tasty booger city');
  });

  after(function() {
    client.flushdb();
  });
  
  it('Returns 200 status code', function(done) {

    request(app)
      .get('/cities/Boogers')
      .expect(200, done);

  });

  it('Returns HTML format', function(done) {

    request(app)
      .get('/cities/Boogers')
      .expect('Content-Type', /html/, done);

  });

  it('Returns information for given city', function(done) {

    request(app)
      .get('/cities/Boogers')
      .expect(/tasty/, done);

  });
});

