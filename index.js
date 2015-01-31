(function(){

var OAUTH_CLIENT_ID= '674470774967-ov0q7iq8mmq0akvd034ck0buuf3ucehc.apps.googleusercontent.com'

var OAUTH_SCOPES = ['http://www.googleapis.com/auth/yt-analytics.readonly', 
					'http://www.googleapis.com/auth/youtube.readonly',
					'http://www.googleapis.com/auth/yt_analytics-monetary.readonly'];
var channelID;

window.onJSClientLoad = function(){
	gapi.auth.init(function(){
		window.setTimeout(checkAuth,1);
	});};

	function checkAuth(){
		gapi.autg.authorize({
			client_id: OAUTH_CLIENT_ID,
			scope: OAUTH_SCOPES,
			immediate: true

		}, handleAuthResult);
	}

function handleAuthResult(authResult){
	if (authResult){
		$('.pre-auth').hide();
		$('.post-auth').show();
		loadAPI();
	}
	else{
		$('.pre-auth').show();
		$('.post-auth').hide();
		$('#login-link').click(function(){
			gapi.auth.authorize({
			client_id: OAUTH_CLIENT_ID,
			scope: OAUTH_SCOPES,
			immediate: false

			}, handleAuthResult);
		})
	}
}


function loadAPI(){
	gapi.client.load('youtube', 'v3', function(){
		gapi.client.load('youtubeanalytics', 'v1', function(){
			getUserChannel();
		});
	});
}


function getUserChannel(){
	var request = gapi.client.youtube.channel.list({
		mine: true,
		part: 'id,contentDetails',
	});
	request.execute(function(response){
		if ('error' in response){
			displayMessage(response.error.message);
		}

		else{
			channelId = response.items[0].id;
			displayChannelID(channelId);
		}
	})
}

function displayChannelID(channel){
	alert(channel);
}










})();