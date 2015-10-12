window.onload = chooseLanguage;

function chooseLanguage() {
    //var languageFile = "js/songdata.js";
    var languageFile = Android.setLanguage();
    var scriptUrl = "js/" + languageFile;
    var body = document.getElementsByTagName("body")[0];
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = scriptUrl;

    body.appendChild(script);
}

var list = new List();
list.build();

function List() {
	this.build = function() {
		var toc = document.getElementById("toc");
		var tocButton = "";
		var innerHTML = "";
		toc.innerHTML = "";
		var max = 145;
		songNum = 1; //global

		for (var i = 1; i <= max; i++){
			tocButton = "<li id='toc" + i + "'>" + i + "</li>";
			innerHTML += tocButton;
		}

		toc.innerHTML = innerHTML;

		var buttonList = document.getElementById('toc');
		var buttons = buttonList.getElementsByTagName('li');

		for (var i = 0; i < max; i++) {
			var button = buttons[i];
			button.onclick = clickButton(i); //call clickButton
		}

		function clickButton(n) {
			return function() {
				songNum = n;
				document.getElementById("toc").style.display = "none";
				var song = new Song(songNum);
				song.build();
				scrollTo(0,0);
			}
		}
	}
}

function Song(songNumber) {
	this.number = songNumber + 1;
	this.title = songdata[songNumber].title;
	this.verse1 = songdata[songNumber].verse[0];
	this.verse2 = songdata[songNumber].verse[1];
	this.verse3 = songdata[songNumber].verse[2];
	this.chorus = songdata[songNumber].chorus;
	this.chorus2 = songdata[songNumber].chorus2;
	this.scripture = songdata[songNumber].scripture;
	this.piano = songdata[songNumber].piano;
	this.footer = songdata[songNumber].footer;

	this.songFile = 001;
	console.log(this.number);
	if (this.number < 10) {
		this.songFile = "00" + this.number;
		console.log(this.songFile);
	}

	if ((this.number >= 10) && (this.number < 100)) {
		this.songFile = "0" + this.number;
		console.log(this.songFile);
	}

	this.build = function() {
	    var chorusHeader, songSrc;

	    if (Android.setLanguage() == "songdata-es.js") {
            chorusHeader = 'ESTRIBILLO';
            songSrc = 'Tomado de';
        } else {
            chorusHeader = 'CHORUS';
            songSrc = 'Taken from';
        }

		var songContent = '<div id="song' + this.number + '" class="song">\n';
		songContent += '<h1><span class="song-number">' + this.number + '</span> ' + this.title + '</h1>\n';
		if (this.verse1) {
			songContent += '<p class="verse">' + this.verse1 + '</p>\n';
		}

		if (this.chorus) {
			songContent += '<p class="chorus">' + chorusHeader + ':<br />' + this.chorus + '</p>\n';
		}

		if (this.verse2) {
			songContent += '<p class="verse">' + this.verse2 + '</p>\n';
		}

		if (this.chorus2) {
            songContent += '<p class="chorus">' + chorusHeader + ':<br />' + this.chorus2 + '</p>\n';
        }

		if (this.verse3) {
			songContent += '<p class="verse">' + this.verse3 + '</p>\n';
		}

		songContent += '<p class="song-footer">' + songSrc + ': ' + this.scripture + ' ' + this.footer + '</p>';
		songContent += '</div>';

		document.getElementById("result").innerHTML += songContent;
	}

}

