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

function createList(){
  var toc = document.getElementById("toc");
  var tocButton = "";
  var innerHTML = "";
  toc.innerHTML = "";
  var max = 135;
  var i = 1;
  for(i; i <= max; i++){
    tocButton = "<li id='toc" + i + "'>" + i + "</li>";

    innerHTML +=  tocButton;
  }
  toc.innerHTML = innerHTML;
    //console.log(tocButton);
    clicks(max);
};

function clicks(max) {
    var i = 1;
    for(i; i <= max; i++) {
        var button = document.getElementById("toc" + i);

        button.addEventListener("click", function() {
            var buttonText = this.innerHTML;
            //console.log(buttonText);
            var toc = document.getElementById("toc");
            toc.style.display = "none";

            buildSong(buttonText);
            window.scrollTo(0, 0);

        }, false);

    }
}

function buildSong(buttonText) {
    //console.log("button " + buttonText);

    var songContent, songNumber, songTitle, scripture, verse1, chorus, chorusHeader, songSrc, footer;

    buttonText = buttonText - 1; // added for demo purposes, THIS NEEDS TO BE FIXED

    if (Android.setLanguage() == "songdata-es.js") {
        chorusHeader = 'ESTRIBILLO';
        songSrc = 'Tomado de';

    } else {
        chorusHeader = 'CHORUS';
        songSrc = 'Taken from';
    }

    songNumber = songdata[buttonText].number;
    songTitle = songdata[buttonText].title;
    verse1 = songdata[buttonText].verse[0]; //only show first verse, then chorus, then other verses
    verseOthers = songdata[buttonText].verse.slice(1); //get all other verses
    //console.log(verseOthers);

    chorus = songdata[buttonText].chorus;

    scripture = songdata[buttonText].scripture;
    footer = songdata[buttonText].footer;

    songContent = '<div id="song' + songNumber + '" class="song">\n';
    songContent += '<h1><span class="song-number">' + songNumber + '</span> ' + songTitle + '</h1>\n';
    songContent += '<p class="verse">' + verse1 + '</p>\n';

    //chorus
    if (chorus) {
        songContent += '<p class="chorus">' + chorusHeader + ':<br />' + chorus + '</p>\n';
    }
    if (verseOthers) {
        if (verseOthers[0]) {
            songContent += '<p class="verse">' + verseOthers[0] + '</p>\n';
        }
        if (verseOthers[1]) {
            songContent += '<p class="verse">' + verseOthers[1] + '</p>\n';
        }
    }



    songContent += '<p class="song-footer">' + songSrc + ': ' + scripture + ' ' + footer + '</p>';
    songContent += '</div>';

    document.getElementById("result").innerHTML += songContent;

}

function homeButton() {
    var toc = document.getElementById("toc");
    var results = document.getElementById("results");
    toc.style.display = "block";
}


createList();


