var audioScript = function($) {
	// Audio
	var audioList = [];
	var audioInfo = [
		{
			mpeg: 'zelda-triforce.mp3',
			aac: 'zelda-triforce.m4a',
			frame: 1
		},
		{
			mpeg: 'mario-coin.mp3',
			aac: 'mario-coin.m4a',
			frame: 3
		},
		{
			mpeg: 'mario-coin.mp3',
			aac: 'mario-coin.m4a',
			frame: 3
		},
		{
			mpeg: 'starcraft.mp3',
			aac: 'starcraft.m4a',
			frame: 1
		},
		{
			mpeg: 'zelda-treasure.mp3',
			aac: 'zelda-treasure.m4a',
			frame: 9
		},
		{
			mpeg: 'minecraft-full.mp3',
			aac: 'minecraft-full.m4a',
			frame: 1
		},
		{
			mpeg: 'sonic.mp3',
			aac: 'sonic.m4a',
			frame: 3
		},
		{
			mpeg: 'donkey-kong.mp3',
			aac: 'donkey-kong.m4a',
			frame: 1
		},
		{
			mpeg: 'hadouken.mp3',
			aac: 'hadouken.m4a',
			frame: 3
		},
		{
			mpeg: 'hearthstone.mp3',
			aac: 'hearthstone.m4a',
			frame: 1
		},
		{
			mpeg: 'sonic.mp3',
			aac: 'sonic.m4a',
			frame: 3
		},
		{
			mpeg: 'metal-gear.mp3',
			aac: 'metal-gear.m4a',
			frame: 1
		},
		{
			mpeg: 'frogger.mp3',
			aac: 'frogger.m4a',
			frame: 5
		},
		{
			mpeg: 'mario-powerup.mp3',
			aac: 'mario-powerup.m4a',
			frame: 1
		},
	];

	function initAudio() {
		var audioPathBase = 'audio/';

		var audioContainer = document.createElement('div');
		audioContainer.classList.add('game-audio');
		document.body.appendChild(audioContainer);

		for (var i = 0; i < audioScript.audioInfo.length; i++) {
			var src = '';
			var audioEl = document.createElement('audio');
			var source = document.createElement('source');
			if (audioEl.canPlayType('audio/mp4;')) {
					source.type= 'audio/mp4';
					source.src= audioPathBase + audioScript.audioInfo[i].aac;
					src = audioPathBase + audioScript.audioInfo[i].aac;
			} else {
					source.type= 'audio/mpeg';
					source.src= audioPathBase + audioScript.audioInfo[i].mpeg;
					src = audioPathBase + audioScript.audioInfo[i].mpeg;
			}

			audioEl.appendChild(source);
			audioContainer.appendChild(audioEl);

			var audioObj = {
				src: src,
				el: audioEl,
				frame: audioScript.audioInfo[i].frame,
				hasPlayed: false
			};

			audioScript.audioList.push(audioObj);
		}
	}

	function playAudio(currentKeyframe, idSelected) {
		if (currentKeyframe === audioScript.audioList[idSelected].frame && !audioScript.audioList[idSelected].hasPlayed) {
			if (idSelected === 2 || idSelected === 1 || idSelected === 6 || idSelected === 10) {
				setTimeout(function(){
					audioScript.audioList[idSelected].el.play();  //uncomment for play through
				}, 300);
			} else if (idSelected === 12) { // frogger
				setTimeout(function(){
					audioScript.audioList[idSelected].el.play();  //uncomment for play through
				}, 500);
			} else {
				audioScript.audioList[idSelected].el.play();  //uncomment for play through
			}
			audioScript.audioList[0].hasPlayed = true;
			console.log('audio play');
		}
	}

	return {
		audioList: audioList,
		audioInfo: audioInfo,
		initAudio: initAudio,
		playAudio: playAudio
	};
}(jQuery);