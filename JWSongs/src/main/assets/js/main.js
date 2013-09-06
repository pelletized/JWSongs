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
					console.log(buttonText);
					var toc = document.getElementById("toc");
					toc.style.display = "none";
					
					buildSong(buttonText);								
					window.scrollTo(0, 0);					
									
				}, false);

			}
			
		}

		function buildSong(buttonText) {
			//console.log("button " + buttonText);
		
			var songContent, songNumber, songTitle, scripture, verse1, chorus, footer;

			buttonText = buttonText - 1; // added for demo purposes, THIS NEEDS TO BE FIXED

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
				songContent += '<p class="chorus">CHORUS:<br />' + chorus + '</p>\n';
			}
			if (verseOthers) {
				songContent += '<p class="verse">' + verseOthers[0] + '</p>\n';

				if (verseOthers[1]) {
					songContent += '<p class="verse">' + verseOthers[1] + '</p>\n';
				}
			}

			songContent += '<p class="song-footer">Taken from: ' + scripture + ' ' + footer + '</p>';
			songContent += '</div>';

			document.getElementById("result").innerHTML += songContent;

		}
		
		function homeButton() {
			var toc = document.getElementById("toc");
			var results = document.getElementById("results");
			toc.style.display = "block";			
		}

		createList();		