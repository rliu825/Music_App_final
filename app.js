var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
// var mu = require('mu2');

var models = require('./models');
// Create new express server
var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));
// mu.root = __dirname

app.get('/', function (req,res){
    res.writeHead(301, {'Content-Type': 'text/plain', 'Location': '/playlists'});//,cache: 1800
    // fs.createReadStream(__dirname + '/playlist.html', 'utf8').pipe(res); 
    res.status(200).send();  
});

app.get(['/playlists','/library','/search'], function (req,res){
        res.writeHead(200);//, {cache: 1800}
        fs.createReadStream(__dirname + '/playlist.html', 'utf8').pipe(res);
});

app.get('/style.css', function (req,res){
    res.writeHead(200, {'Content-Type': 'text/css', cache: 1800});
    fs.createReadStream(__dirname + '/playlist.css', 'utf8').pipe(res); 
});

app.get('/music-app.js', function (req, res){
    res.writeHead(200, {'Content-Type': 'text/javascript', cache: 1800});
    fs.createReadStream(__dirname + '/music-app.js', 'utf8').pipe(res); 
});




//create a new playlist
app.post('/api/playlists', function (req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});   
    console.log(req.body.name);
    models.Playlist.create({
        name: req.body.name
    });
});

//add a song to a playlist
app.post('/api/playlists/:id', function (req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});   
    var playlistId = parseInt(req.params.id, 10);
    var songID = Number(req.body.songId);
    var playlistIdInDb = playlistId + 1;
    // console.log("display request params for playlistID " + playlistIdInDb);
    // console.log("display request params for songID " + songID);
    //console.log("songId is: " + req.body.songId);
    
   // console.log("playlistIdInDb is: " + playlistIdInDb);
    models.Playlist.findById(playlistIdInDb).then(function(playlist){
        models.Song.findById(songID).then(function(song){
            playlist.addSong(song);
        })

        res.end();
        
    });
});
//delete song from playlist
app.delete('/playlists/:id', function (req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});  
    var objtodelete = req.body.songId;
    var playlistId = parseInt(req.params.id, 10);
    var songID = Number(req.body.songId);
    var songId1 = songID +1;
    var playlistIdInDb = playlistId + 1;
    console.log("-----------------------songID is:" + songID);
    console.log("-----------------------playlistIdInDb is:" + playlistIdInDb); 
    
    models.Playlist.findById(playlistIdInDb).then(function(playlist){
        models.Song.findById(songID+1).then(function(song){
            playlist.removeSong(song);
              res.end();
            
        })
       
        
    });    
});


//models.sequelize.sync().then(function(){
  app.get('/api/playlists', function(req, res) {
    res.set({
      statusCode : 200,
      'Content-Type' : 'application/json'
    });
    models.Playlist.findAll().then(function(playlists){
      var len = playlists.length;
      var playObject = {
        "playlists":[]
      };

      var counter = 0;

      playlists.forEach(function(playlist){
       

        var PlaylistItem={
          //decrement id to start from 0
            "id" : playlist.id-1,
            "name" : playlist.name,
            "songs" : []
        };
        playObject.playlists.push(PlaylistItem);
        playlist.getSongs().then(function(aSongs){
          counter++;
          for(var i =0; i < aSongs.length; i++){
            var songId = aSongs[i].id;
            var Newplaylistid = aSongs[i].PlaylistSong.playlist_id-1;
            
            playObject.playlists[Newplaylistid].songs.push(songId - 1);

          }
          if(counter===len){
              res.send(JSON.stringify(playObject,null,4));

          }
        });

       });

    });

});

  app.get('/api/songs', function(req, res){
    res.set({
      statusCode : 200,
      'Content-Type' : 'application/json'
    });
    models.Song.findAll().then(function(songs){
      var count=0;
      var songObject={
        "songs":[]
      }
      
      var lengOfSong=songs.length;
      songs.forEach(function(song){
        count++;
        var songObj={
          "album":song.album,
          "duration":song.duration,
          "title":song.title,
          "id":song.id,
          "artist":song.artist
        }
        songObject.songs.push(songObj);
        if(count===lengOfSong){
          res.send(JSON.stringify(songObject, null, 4))
        }
      });

    });
  });
//});

// Start the server on port 3000
models.sequelize.sync().then(function(){
    app.listen(3000, function() {
        console.log('Amazing music app server listening on port 3000!');
    });
});
