/* JS code for video call*/
// var localMediaStream = null;

var constraints = {
	video: true
};

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
	console.log("Your Browser is : "+navigator.userAgent);
	console.log("getUserMedia() is supported in your browser");
	console.log("More info about the browser: ");
	console.log(navigator);
	navigator.getUserMedia = navigator.getUserMedia ||
						navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
} else {
	alert('getUserMedia() is not supported in your browser');
}

function successCallback(localMediaStream) {
	console.log("Success Callback method"+ navigator.getUserMedia);
	window.stream = localMediaStream; // stream available to console
	console.log(stream);
	console.log(stream.getVideoTracks());
	// stream.stop();
	// console.log("stream stopped");
	var video = document.querySelector("video");
	console.log(video);
	video.src = window.URL.createObjectURL(localMediaStream);
	video.play();			
}

function errorCallback(error){
	console.log("Error Callback method");
	console.log("navigator.getUserMedia error: ", error);

	//video.src = 'fallbackvideo.webm';
}

navigator.getUserMedia(constraints, successCallback, errorCallback);