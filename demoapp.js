var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')

var models = require('./models');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

/* Simple demo using an ORM in our API */
app.get('/songs/:id/', function(request, response) {
    models.Song.findOne({
            where: {
                id: request.params['id']
            }
        })
        .then(function(song) {
            response.end(song.get('title'));
        })
});
/* End simple ORM demo */

app.get('/songs/', function(request, response) {
    models.Song.findAll()
        .then(function(songs) {
            response.end(JSON.stringify(songs.map(function(song){
                return song.get({plain: true})
            })));
        })
});

app.post('/songs/', function(request, response) {
    console.log(request.body);
    models.Song.create({
        artist: request.body.artist,
        title: request.body.title,
        album: request.body.album,
        duration: request.body.duration,
    });
    response.end('Success!')
});

/* Demo client-side templating */

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', function(request, response) {
  response.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/main.js', function(request, response) {
  response.sendFile(path.join(__dirname, 'main.js'));
});

app.get('/mustache.js', function(request, response) {
  response.sendFile(path.join(__dirname, 'mustache.js'));
});
/* End client-side templating demo */




models.sequelize.sync().then(function() {
    app.listen(3000, function () {
      console.log('Example app listening on port 3000! Open and accepting connections until someone kills this process');
    });
});
