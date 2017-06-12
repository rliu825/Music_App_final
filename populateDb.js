var fs = require('fs');
var models = require('./models');
var Promise = require('bluebird');

models.sequelize.sync({force: true}).then(function() {

    fs.readFile('./songs.json', function(err, data) {
        var music_data = JSON.parse(data);
        var songs = music_data['songs'];

        songs.forEach(function(song) {
            console.log(song);
            models.Song.create({
                title: song.title,
                album: song.album,
                artist: song.artist,
                duration: song.duration,
            });
        });
    });

    var counter = 0;

    fs.readFile('./playlists.json', function(err, data){

        var music_data1 = JSON.parse(data);
        var playlists = music_data1['playlists'];
        var playlistLength = playlists.length;

        playlists.forEach(function(playlists) {
            //console.log(playlists);
            var aSonginPlaylist = playlists.songs;
            
            models.Playlist.create({
                name: playlists.name,
            }).then(function(playlist){
                for (var i=0;i<aSonginPlaylist.length;i++){
                    playlist.addSong(aSonginPlaylist[i]+1);
                }
            });
        
        })



    })
});
