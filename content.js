var head = document.head || document.getElementsByTagName('head')[0];
var video = document.getElementsByClassName('html5-main-video')[0];
var content = document.getElementById('content');

// Run on first load.
updateStyles()

window.addEventListener('resize', function() {
	// Fixes resizing to a large window sometimes not updating the styles,
	// since we are abusing YouTube's video resize function.
	setTimeout(function() {
		updateStyles()
	}, 1)
})

function updateStyles() {
	// Check if the styles already exist
	var oldStyles = document.getElementById('youtube-theater-fix')

	if (oldStyles) {
		// Just completely remove the style tag and start again like normal.
		oldStyles.parentNode.removeChild(oldStyles)
	}

	var style = document.createElement('style');
	style.id = 'youtube-theater-fix'
	style.type = 'text/css';

	head.appendChild(style);

	var newWidth = content.clientWidth *= 1;
	var newHeight = Math.round((newWidth/16)*9);

	// We only want to affect the theater mode (.watch-stage-mode)
	var css = '.watch-stage-mode .player-height { height: ' + newHeight + 'px !important; }' +
			  '.watch-stage-mode .player-width {' +
			  	'width: ' + newWidth + 'px !important;' +
			  	'left: -' + newWidth / 2 + 'px !important;' +
			  '}';

	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}
}