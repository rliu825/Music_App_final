var MUSIC_DATA1 = {};
var songsLoaded = false;
var playlistsLoaded = false;
var MUSIC_PLAYLIST = {};

var attemptRunApplication = function() {
    if (songsLoaded == true && playlistsLoaded == true) {
        // some function you have for executing the JS in your music-app.js from previous exercise:
        runApplication();
    }
};


function makeRequest(url,callback) {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Fail to create httpRequest');
      return false;
    }
   httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var local = httpRequest.responseText;
        //var parselocal = JSON.parse(local);
      	callback.apply(this,[local]);
        // interval = setInterval("getResult()", 1000);
      } else {
        console.log('There was a problem with the request.');
      }
    }

   };
    
    httpRequest.open('GET', url);
    httpRequest.send();
    //console.log(httpRequest.result);
}

var loadSongs = function()  {
	makeRequest('/api/songs',function(data) {
//     // Transform the response string into a JavaScript object	
    var songsObj = JSON.parse(data);
    MUSIC_DATA1['songs'] = songsObj['songs'];
    //console.log(MUSIC_DATA1);
    songsLoaded = true;
    attemptRunApplication();
});
}

makeRequest('/api/playlists',function(data) {
//     // Transform the response string into a JavaScript object	
    var playlistObj = JSON.parse(data);
    console.log(playlistObj.playlists.length);
    MUSIC_PLAYLIST['playlists'] = playlistObj['playlists'];
    MUSIC_DATA1['playlists'] = playlistObj['playlists'];
	console.log(MUSIC_DATA1.playlists.length);
    playlistsLoaded = true;
    loadSongs();
});




//main
function runApplication(){


var aPlaylist = window.MUSIC_DATA1.playlists;
var aSongs = window.MUSIC_DATA1.songs;

console.log(aPlaylist.length);
// console.log(aSongs);



function searchItem () {
	var filter = document.getElementById('inputTxt').value;
	showSearchedItem(filter);	
}
function libraryTabOn(){
	libraryIcon.style.color = "purple";
	playlistIcon.style.color = "black";
	searchIcon.style.color = "black";
	librarytext.style.color = "purple";
	playlisttext.style.color = "gray";
	searchtext.style.color = "gray";
}
function playlistTabOn(){
	playlistIcon.style.color = "purple";
	libraryIcon.style.color = "black";
	searchIcon.style.color = "black";
	playlisttext.style.color = "purple";
	librarytext.style.color = "gray";
	searchtext.style.color = "gray";
}
function searchTabOn(){
	searchIcon.style.color = "purple";
	playlistIcon.style.color = "black";
	libraryIcon.style.color = "black";
	searchtext.style.color = "purple";
	playlisttext.style.color = "gray";
	librarytext.style.color = "gray";
}
//tab switch changing color
var tab1 = document.getElementsByClassName('icon')[0];
var tab2 = document.getElementsByClassName('icon')[1];
var tab3 = document.getElementsByClassName('icon')[2];
var libraryIcon = document.getElementsByClassName('glyphicon-music')[0];
var playlistIcon = document.getElementsByClassName('glyphicon-th-list')[0];
var searchIcon = document.getElementsByClassName('glyphicon-search')[0];
var librarytext =  document.getElementsByClassName('optionText')[0];
var playlisttext =  document.getElementsByClassName('optionText')[1];
var searchtext =  document.getElementsByClassName('optionText')[2];
tab1.addEventListener('click', function(){
	libraryTabOn();
	window.history.pushState(null,null,'/library');
});

tab2.addEventListener('click', function(){
	playlistTabOn();
	window.history.pushState(null,null,'/playlists');
});

tab3.addEventListener('click', function(){
	searchTabOn();
	window.history.pushState(null,null,'/search');
});



function showLibContent() {
	hideAll("sortedsongs");
	showAll('libsong');
	show('Page 1');
	document.getElementById('artistbutton').style.background = "#936AC7";
	document.getElementById('songnamebutton').style.background = '#936AC7';
}
function showPlaylistContent(){
	show('Page 2');
}

function showSearchContent(){
	
	document.getElementById('inputTxt').value = "";
	hideAllByName("searchedsong");
	for (var i=0;i<aPlaylist.length;i++){
		hideAllById("seachedPlaylist"+i.toString());
	}
	show('Page 3');
}

document.getElementsByName("lib")[0].onclick = function(){
	showLibContent();
};
document.getElementsByName("list")[0].onclick = function(){
	showPlaylistContent();
};
document.getElementsByName("search1")[0].onclick = function(){
	showSearchContent();
};




if (window.location.href.indexOf('/library') > -1) {
    libraryTabOn();
    showLibContent();
}

// if (window.location.href.indexOf('/playlists')> -1) {
//     playlistTabOn();
//     showPlaylistContent();
// }

if (window.location.href.indexOf('/search') > -1 ) {
    searchTabOn();
    showSearchContent();
}


// Add a playlist in main page 
document.getElementsByClassName('addPlayListButton')[0].onclick = function(){
	var input = prompt ("New Playlist Name:");
	var Newplaylist = {
		"id":MUSIC_DATA1.playlists.length,
		"name": input,
		"songs": []
	}
	var playlistInDb = {
		"name": input
	}
	//console.log(Newplaylist);
	if (/\S/.test(input) &&input !== null){
		MUSIC_PLAYLIST.playlists.push(Newplaylist);

		$.ajax({
		type: 'POST',
		url: '/api/playlists',
		crossDomain: true,
		dataType: "json",
		data: Newplaylist
		})//.done(function(data){
		location.reload();
	//})
	}else{
		return;
	}
	//console.log(MUSIC_DATA1.playlists);
	//var NewPlaylistJson = JSON.stringify(MUSIC_PLAYLIST,null, 4);
	// NewPlaylistJson = NewPlaylistJson.replace("[\\[\\]\\s]", "");
	//console.log(NewPlaylistJson);
	//var id = MUSIC_DATA1.playlists.length;

}


document.getElementsByClassName('sortByTitle')[0].onclick = function(){
	hideAll('libsong');
	showAll("sortedsongs");
	this.style.background ="gray";
	document.getElementById('artistbutton').style.background = "#936AC7";
}

document.getElementsByClassName('sortByArtist')[0].onclick = function(){
	hideAll("sortedsongs");
	showAll('libsong');
	show('Page 1');
	this.style.background ="gray";
	document.getElementById('songnamebutton').style.background = '#936AC7';
}


function Createdplaylist(playlistname, songindex) {
	var divPlaylist = document.createElement('div');
	divPlaylist.className= 'musicType';
	var spanPicture = document.createElement('span');
	var spanContent = document.createElement('span');
	var spanRightArrow = document.createElement('span');
	var canvasRectangle = document.createElement('canvas');
	canvasRectangle.className = 'rectangle';
	// var index;
	spanPicture.className = 'picture col-xs-4 col-sm-4';
	spanContent.className = 'playlistTxt col-xs-4 col-sm-4';
	spanRightArrow.className = 'glyphicon glyphicon-chevron-right col-xs-4 col-sm-4';
	spanContent.innerHTML = playlistname;
	divPlaylist.setAttribute('name','playlist'+MUSIC_DATA1['playlists'][songindex].id);

	spanPicture.appendChild(canvasRectangle);
	divPlaylist.appendChild(spanPicture);
	divPlaylist.appendChild(spanContent);
	divPlaylist.appendChild(spanRightArrow);
	
	return divPlaylist;
	//document.getElementsByClassName('row')[rowindex].appendChild(divPlaylist);
}

function Createdsong(songname,artistname, className, isLibSong) {
	var divPlaylist = document.createElement('div');
	divPlaylist.className= className;
	var spanPicture = document.createElement('span');
	var spanSongWrapper = document.createElement('span');
	var spanContent = document.createElement('div');
	var spanArtist = document.createElement('div');
	var Iconwrapper = document.createElement('span');
	var spanPlaybutton = document.createElement('span');
	var spanPlusButton = document.createElement('span');
	//add delete button
	var spanDeleteButton = document.createElement('span');
	var canvasRectangle = document.createElement('canvas');
	canvasRectangle.className = 'rectangle';
	// var index;
	spanPicture.className = 'picture col-xs-4 col-sm-4';
	spanSongWrapper.className = 'Songwrapper col-xs-4 col-sm-4 text-left';
	spanContent.className = 'songTxt';
	spanArtist.className = 'artistTxt';
	Iconwrapper.className = "Iconwrapper col-xs-4 col-sm-4";
	spanPlaybutton.className = 'glyphicon glyphicon-play';
	spanPlusButton.className = 'glyphicon glyphicon-plus-sign';
	//add delete icon in song row 
	if (!isLibSong){
	spanDeleteButton.className = 'delete';
	spanDeleteButton.innerHTML = '&times;';
	}

	spanContent.innerHTML = songname;
	spanArtist.innerHTML = artistname;
	//divPlaylist.setAttribute('data-id','song'+MUSIC_DATA['songs'][i].id);
	spanPicture.appendChild(canvasRectangle);
	divPlaylist.appendChild(spanPicture);
	divPlaylist.appendChild(spanSongWrapper);
	spanSongWrapper.appendChild(spanContent);
	spanSongWrapper.appendChild(spanArtist);
	Iconwrapper.appendChild(spanPlaybutton);
	Iconwrapper.appendChild(spanPlusButton);
	if (!isLibSong){
	Iconwrapper.appendChild(spanDeleteButton);
	}
	divPlaylist.appendChild(Iconwrapper);
	
	return divPlaylist;

}
//var searchList = document.getElementById('searchList');
//create playlist in Search
var playlistDiv;
for (var i=0;i<aPlaylist.length;i++){
		playlistDiv = document.createElement('div');
		playlistDiv.setAttribute('class','musicType');
		playlistDiv.innerHTML = '<span class="picture col-xs-4 col-sm-4"><canvas class="rectangle"></canvas></span><span class="playlistTxt col-xs-4 col-sm-4">'+aPlaylist[i].name+'</span><span class="glyphicon glyphicon-chevron-right col-xs-4 col-sm-4"></span>';
		playlistDiv.setAttribute('name',"playlist"+i.toString());
		playlistDiv.setAttribute('id',"seachedPlaylist"+i.toString());
		searchList.appendChild(playlistDiv);

		hideAll("musicType");
}

//create songs in a playlist

var SongInplaylistSection = document.getElementById("SongInPlaylistSection");
var songsInPlaylistPage;

for (var i = 0; i<aPlaylist.length;i++){
	songsInPlaylistPage = document.createElement('div');
	songsInPlaylistPage.className = "AddPlayListSection";
	songsInPlaylistPage.setAttribute('name', "songInPlaylist");
	songsInPlaylistPage.setAttribute('id', 'playlistsong' + (i+1).toString());
	songsInPlaylistPage.innerHTML = '<span class="Playlist-text1" >'+ aPlaylist[i].name +'</span><section class="Playlists"><div class="row" ></div></section>'
	
	SongInplaylistSection.appendChild(songsInPlaylistPage);
}





var songDiv;

for (var i=0;i<aSongs.length;i++){
		songDiv = document.createElement('div'); 
		songDiv.innerHTML = '<span class="picture col-xs-4 col-sm-4"><canvas class="rectangle"></canvas></span><span class="Songwrapper col-xs-4 col-sm-4 text-left"><div class="songTxt">'+aSongs[i].title +'</div><div class="artistTxt">'+ aSongs[i].artist +'</div></span><span class="Iconwrapper col-xs-4 col-sm-4"><span class="glyphicon glyphicon-play"></span><span class="glyphicon glyphicon-plus-sign"></span>';
		//<div class="searchedSong" id = "searchedSong'+i+'">
		songDiv.setAttribute('class','song');
		songDiv.setAttribute('name','searchedsong');
		songDiv.setAttribute('id',"searchedSong"+i.toString());		
		searchList.appendChild(songDiv);
		hideAll("song");

}


function showSearchedItem(filterContent){
		//show searched playlist
		for (var j=0;j<aPlaylist.length;j++){
			if(aPlaylist[j].name.toLowerCase().indexOf(filterContent.toLowerCase()) > -1){
				document.getElementsByName('playlist'+j.toString())[1].style.display='block';
			}	else{
				document.getElementsByName('playlist'+j.toString())[1].style.display='none';
			}
		}


		for(var i=0;i<aSongs.length;i++){
			
			if (aSongs[i].title.toLowerCase().indexOf(filterContent.toLowerCase()) > -1 || aSongs[i].artist.toLowerCase().indexOf(filterContent.toLowerCase()) > -1 ) {				
				document.getElementById('searchedSong'+ i.toString()).style.display='block';
			}
			else{
				document.getElementById('searchedSong'+ i.toString()).style.display='none';
			}
			continue;			
		}
		if (filterContent===""){
			hideAllByName("searchedsong");
			for (var i=0; i<aPlaylist.length;i++){
			hideAllById("seachedPlaylist"+i.toString());
			}
		}
}

//show searched Item
document.getElementsByClassName('searchBar')[0].onkeyup = function(){
	searchItem();
}


//create playlist in Playlist

for (var i=0; i<aPlaylist.length; i++){
	document.getElementsByClassName('row')[0].appendChild(Createdplaylist(aPlaylist[i].name,i));
}


//create songs under Library

for (var i=0; i<aSongs.length; i++){
	document.getElementsByClassName('row')[1].appendChild(Createdsong(aSongs[i].title, aSongs[i].artist,'libsong', true));
}


//create songs in a certain Playlist
	
var songpos;

for (var i=0; i<aPlaylist.length; i++){	
	for (var j=0; j<aPlaylist[i].songs.length; j++){
		songpos = aPlaylist[i].songs[j];
		document.getElementsByClassName('row')[i+3].appendChild(Createdsong(aSongs[songpos].title, aPlaylist[i].name, 'songInPlaylist',false));
			
	}
}




//Click Playlist to display the songs in a certain Playlist
// Need to change to dynamic............................... 
function displayContentInPlaylist(num,classIndex){
	document.getElementsByName('playlist'+num.toString())[classIndex].addEventListener("click",function(){
		searchIcon.style.color = "black";
		playlistIcon.style.color = "purple";
		searchtext.style.color = "gray";
		playlisttext.style.color = "purple";
		showByIdPlaylist('playlistsong'+ (num+1).toString());
	})
}

for (var i=0;i<aPlaylist.length;i++){
	displayContentInPlaylist(i,0);
	displayContentInPlaylist(i,1);
}



//Add playlist to modal
var modalBody = document.getElementsByClassName('modal-body')[0];
for (var i=0; i<aPlaylist.length;i++){
	var aModalRow;

	aModalRow = document.createElement('div');
	aModalRow.className = 'modal-row';
	aModalRow.innerHTML = aPlaylist[i].name;
	modalBody.appendChild(aModalRow);
}



//Click on "+" button...................................................................

var plusIconArr = document.getElementsByClassName('glyphicon-plus-sign');
var deleteIconArr = document.getElementsByClassName('delete');

var playlistSelection;
var rowNum;


var songName;
var playlistName;
var songid;
var playlistid;

function ClickListener(indexSong) {	
	plusIconArr[indexSong].onclick = function(){
		songName = this.parentNode.previousSibling.childNodes[0].innerHTML;
		//console.log(songName);
		document.getElementById("modal").style.display = "block";
	};

}

function DeleteListener(indexSong){
	deleteIconArr[indexSong].onclick = function(){
		songName = this.parentNode.previousSibling.childNodes[0].innerHTML;
		playlistName = this.parentNode.previousSibling.childNodes[1].innerHTML;
		var songeleNode = this.parentNode.parentNode;
		//console.log(playlistName);
		for (var i = 0; i<aPlaylist.length;i++){
			if (aPlaylist[i].name === playlistName){
				playlistid = i;

			}
		}

		for (var i = 0; i<aSongs.length;i++){
			if (aSongs[i].title === songName){
				songid = i;
				//var indexToRemove = aPlaylist[playlistid].songs.indexOf(songid);
				if(songid>-1){
					MUSIC_PLAYLIST.playlists[playlistid].songs.splice(songid,1);
				}
			}
		}

		console.log(aSongs);
		var SongToDelete = {
			"songId": songid
		};		

		console.log(songid);
		console.log(playlistid);
		$.ajax({
					type: 'DELETE',
					url: '/playlists/' + playlistid,
					crossDomain: true,
					dataType: "json",
					data: SongToDelete,
				});
		// location.reload();
		// songeleNode.style.display='none';
		songeleNode.parentNode.removeChild(songeleNode);
	};
}


function listenPlaylistEvent(playlistIndex) {
document.getElementsByClassName('modal-row')[playlistIndex].onclick = function(){
	rowNum = playlistIndex+3;
	
	//rowNum = lastindex;
	document.getElementById("modal").style.display = "none";
	for (var j=0; j<aSongs.length; j++){
			if (aSongs[j].title === songName){	


				if (aPlaylist[playlistIndex].songs.indexOf(aSongs[j].id) === -1){
					document.getElementsByClassName('row')[rowNum].appendChild(Createdsong(aSongs[j].title, aSongs[j].artist, 'songInPlaylist',false));	
				
				
				var playlistId = playlistIndex;
				var NewSongId = aSongs[j].id;
				//console.log(typeof(NewSongId)); 
				console.log(NewSongId);
				var SongInDb = {
					"songId": NewSongId
				}

				MUSIC_PLAYLIST.playlists[playlistIndex].songs.push(NewSongId);

				console.log(playlistId);
				$.ajax({
					type: 'POST',
					url: '/api/playlists/' + playlistId,
					crossDomain: true,
					dataType: "json",
					data: SongInDb
				})//.done(function(data){

					location.reload();

				//})

				}
				else{
					return;
				}
				
			}

		};

}
}


//click on a Plus button

for (var i=0; i<plusIconArr.length; i++){
	ClickListener(i);

}
//modal
for (var i=0;i<aPlaylist.length;i++){
	listenPlaylistEvent(i);
}

//delete a song when clicking delete button 
for (var i=0;i<deleteIconArr.length;i++){
	DeleteListener(i);
}

// close modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//Sort function start here
var libsongArr = document.getElementsByClassName("libsong");
var arrSongs = [];
var songTitle;
var sortedsongTitle;
var sortedarrSong;

//created sortByTitle array of songs
for (var i=0;i<libsongArr.length;i++){
	songTitle = libsongArr[i].childNodes[1].childNodes[0].innerHTML;
	//start with 'The'
	if (songTitle.indexOf('The ') === 0){
		songTitle = songTitle.slice(4, songTitle.length);
		songTitle = songTitle.concat('missingThe');
	}
	arrSongs.push(songTitle);
}
  sortedarrSong = arrSongs.sort();
for (var i=0;i<sortedarrSong.length;i++){
	if (sortedarrSong[i].indexOf('missingThe') > -1){
		sortedsongTitle = 'The ' + sortedarrSong[i].slice(0,length-10);
		//console.log(sortedsongTitle);
	}else {
		sortedsongTitle = sortedarrSong[i];
	}
	for (var j =0; j<aSongs.length;j++){
		if (aSongs[j].title === sortedsongTitle){
			var sortedsongArtist = aSongs[j].artist;
		}
	}
	document.getElementsByClassName('row')[2].appendChild(Createdsong(sortedsongTitle, sortedsongArtist, 'sortedsongs',true));
}


function showAll(classname){
	var arr = document.getElementsByClassName(classname);
    for (var i=0; i<arr.length;i++){
  		arr[i].style.display='block';
	}
}

function hideAllById(name){
	var arr = document.getElementById(name);
	if (arr){
	arr.style.display= 'none';
}
}


function hideAllByName(name) {
	var arr = document.getElementsByName(name);
    for (var i=0; i<arr.length;i++){
  		arr[i].style.display='none';
	}
}


function hideAll(classname) {
	var arr = document.getElementsByClassName(classname);
    for (var i=0; i<arr.length;i++){
  		arr[i].style.display='none';
	}
}


function show(shown) {
  hideAll("AddPlayListSection");
  document.getElementsByName(shown)[0].style.display='block';


  // alert('Yes');
}

function showByIdPlaylist(shown){
	hideAll("AddPlayListSection");
	document.getElementById(shown).style.display='block';
}

document.getElementsByClassName("close")[0].addEventListener("click",function(){
	document.getElementById("modal").style.display = "none";
})


}