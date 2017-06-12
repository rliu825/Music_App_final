module.exports = function(sequelize, DataType) {
    var Playlist = sequelize.define('Playlist', {
        name: {
            type: DataType.STRING,
            field: 'name'
        }

    },{
            'timestamps':false,
            classMethods: {
                associate: function(models) {
                    models.Playlist.belongsToMany(models.Song ,{through: 'PlaylistSong', foreignKey: 'playlist_id',as: 'songs',timestamps:false});
                }
            }
       }

    );

    return Playlist;
};
