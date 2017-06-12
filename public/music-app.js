var aPlaylist = MUSIC_DATA['playlists'];
var aSongs = MUSIC_DATA['songs'];

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
	libraryIcon.style.color = "purple";
	playlistIcon.style.color = "black";
	searchIcon.style.color = "black";
	librarytext.style.color = "purple";
	playlisttext.style.color = "gray";
	searchtext.style.color = "gray";
});

tab2.addEventListener('click', function(){
	playlistIcon.style.color = "purple";
	libraryIcon.style.color = "black";
	searchIcon.style.color = "black";
	playlisttext.style.color = "purple";
	librarytext.style.color = "gray";
	searchtext.style.color = "gray";
});
tab3.addEventListener('click', function(){
	searchIcon.style.color = "purple";
	playlistIcon.style.color = "black";
	libraryIcon.style.color = "black";
	searchtext.style.color = "purple";
	playlisttext.style.color = "gray";
	librarytext.style.color = "gray";
});





//document.getElementsByClassName('modal-row')[playlistIndex].onclick


document.getElementsByName("lib")[0].onclick = function(){
	hideAll("sortedsongs");
	showAll('libsong');
	show('Page 1');
	document.getElementById('artistbutton').style.background = "#936AC7";
	document.getElementById('songnamebutton').style.background = '#936AC7';

};
document.getElementsByName("list")[0].onclick = function(){
	show('Page 2');
};
document.getElementsByName("search1")[0].onclick = function(){
	document.getElementById('inputTxt').value = "";
	hideAllByName("searchedsong");
	hideAllById("seachedPlaylist0");
	hideAllById("seachedPlaylist1");
	hideAllById("seachedPlaylist2");
	show('Page 3');
};

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
	divPlaylist.setAttribute('name','playlist'+MUSIC_DATA['playlists'][songindex].id);

	spanPicture.appendChild(canvasRectangle);
	divPlaylist.appendChild(spanPicture);
	divPlaylist.appendChild(spanContent);
	divPlaylist.appendChild(spanRightArrow);
	
	return divPlaylist;
	//document.getElementsByClassName('row')[rowindex].appendChild(divPlaylist);
}

function Createdsong(songname,artistname, className) {
	var divPlaylist = document.createElement('div');
	divPlaylist.className= className;
	var spanPicture = document.createElement('span');
	var spanSongWrapper = document.createElement('span');
	var spanContent = document.createElement('div');
	var spanArtist = document.createElement('div');
	var Iconwrapper = document.createElement('span');
	var spanPlaybutton = document.createElement('span');
	var spanPlusButton = document.createElement('span');
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

//create searched songs - display 
function searchItem () {
	var filter = document.getElementById('inputTxt').value;
	showSearchedItem(filter);
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
			hideAllById("seachedPlaylist0");
			hideAllById("seachedPlaylist1");
			hideAllById("seachedPlaylist2");
		}
}

//change play;ost



//create playlist in Playlist

for (var i=0; i<aPlaylist.length; i++){
	document.getElementsByClassName('row')[0].appendChild(Createdplaylist(aPlaylist[i].name,i));
}


//create songs under Library

for (var i=0; i<aSongs.length; i++){
	document.getElementsByClassName('row')[1].appendChild(Createdsong(aSongs[i].title, aSongs[i].artist,'libsong'));
}


//create songs in a certain Playlist
	
var songpos;

for (var i=0; i<aPlaylist.length; i++){	
	for (var j=0; j<aPlaylist[i].songs.length; j++){
		songpos = aPlaylist[i].songs[j];
		document.getElementsByClassName('row')[i+3].appendChild(Createdsong(aSongs[songpos].title, aPlaylist[i].name, 'songInPlaylist'));
			
	}
}




//Click Playlist to display the songs in a certain Playlist
// Need to change to dynamic............................... 
document.getElementsByName("playlist0")[0].addEventListener("click",function(){
	searchIcon.style.color = "black";
	playlistIcon.style.color = "purple";
	searchtext.style.color = "gray";
	playlisttext.style.color = "purple";
	show('playlistsong1');
});
document.getElementsByName("playlist0")[1].addEventListener("click",function(){
	searchIcon.style.color = "black";
	playlistIcon.style.color = "purple";
	searchtext.style.color = "gray";
	playlisttext.style.color = "purple";
	show('playlistsong1');
});
document.getElementsByName("playlist1")[0].addEventListener("click",function(){
	searchIcon.style.color = "black";
	playlistIcon.style.color = "purple";
	searchtext.style.color = "gray";
	playlisttext.style.color = "purple";
	show('playlistsong2');
});
document.getElementsByName("playlist1")[1].addEventListener("click",function(){
	searchIcon.style.color = "black";
	playlistIcon.style.color = "purple";
	searchtext.style.color = "gray";
	playlisttext.style.color = "purple";
	show('playlistsong2');
});
document.getElementsByName("playlist2")[0].addEventListener("click",function(){
	searchIcon.style.color = "black";
	playlistIcon.style.color = "purple";
	searchtext.style.color = "gray";
	playlisttext.style.color = "purple";
	show('playlistsong3');
});
document.getElementsByName("playlist2")[1].addEventListener("click",function(){
	searchIcon.style.color = "black";
	playlistIcon.style.color = "purple";
	searchtext.style.color = "gray";
	playlisttext.style.color = "purple";
	show('playlistsong3');
});

//...................................................................

var plusIconArr = document.getElementsByClassName('glyphicon-plus-sign');
// var test = document.getElementsByClassName("sortByArtist");
// console.log(plusIconArr[0].parentNode);

var playlistSelection;
var rowNum;


var songName;
var songid;
var playlistName;

function ClickListener(indexSong) {	
	plusIconArr[indexSong].onclick = function(){
		songName = this.parentNode.previousSibling.childNodes[0].innerHTML;
		//console.log(songName);
		document.getElementById("modal").style.display = "block";
	};
}
//  for (var i=0; i<plusIconArr.length; i++){
// 	ClickListener(i);
// }

function listenPlaylistEvent(playlistIndex) {
document.getElementsByClassName('modal-row')[playlistIndex].onclick = function(){
	rowNum = playlistIndex+3;
	document.getElementById("modal").style.display = "none";
	for (var j=0; j<aSongs.length; j++){
			if (aSongs[j].title === songName){	
				//this works --need to get value of which playlist and use related row class index (2,3,4)->(playlist1,2,3) 
				//click 1st -> getElementsByClassName('row')[2] and aPlaylist[0].songs.
				//console.log(rowindex);
				if (aPlaylist[playlistIndex].songs.indexOf(aSongs[j].id) === -1){
					document.getElementsByClassName('row')[rowNum].appendChild(Createdsong(aSongs[j].title, aSongs[j].artist, 'song'));
					aPlaylist[playlistIndex].songs.push(aSongs[j].id);
				}
			}
			// console.log(aPlaylist[0].songs);
		};
		// console.log(aPlaylist[0].songs);
		// console.log(aPlaylist[1].songs);
		// console.log(aPlaylist[2].songs);
}
}
for (var i=0;i<3;i++){
	listenPlaylistEvent(i);
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
		console.log(sortedsongTitle);
	}else {
		sortedsongTitle = sortedarrSong[i];
	}
	for (var j =0; j<aSongs.length;j++){
		if (aSongs[j].title === sortedsongTitle){
			var sortedsongArtist = aSongs[j].artist;
		}
	}
	document.getElementsByClassName('row')[2].appendChild(Createdsong(sortedsongTitle, sortedsongArtist, 'sortedsongs'));
}


 for (var i=0; i<plusIconArr.length; i++){
	ClickListener(i);
}

function showAll(classname){
	var arr = document.getElementsByClassName(classname);
    for (var i=0; i<arr.length;i++){
  		arr[i].style.display='block';
	}
}

function hideAllById(name){
	var arr = document.getElementById(name);
	arr.style.display= 'none';
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

document.getElementsByClassName("close")[0].addEventListener("click",function(){
	document.getElementById("modal").style.display = "none";
})


