var audioScriptApi = function ($) {
    // Audio
    var sound;
    var context;
    var buffer;
    var source;
    var soundPlayed = false;
    var audioInfo = [
        {
            src: 'audio/zelda-triforce.mp3',
            frame: 1
        },
        {
            src: 'audio/mario-coin.mp3',
            frame: 3
        },
        {
            src: 'audio/mario-coin.mp3',
            frame: 3
        },
        {
            src: 'audio/starcraft.mp3',
            frame: 1
        },
        {
            src: 'audio/zelda-treasure.mp3',
            frame: 9
        },
        {
            src: 'audio/minecraft-full.mp3',
            frame: 1
        },
        {
            src: 'audio/sonic.mp3',
            frame: 3
        },
        {
            src: 'audio/donkey-kong.mp3',
            frame: 1
        },
        {
            src: 'audio/hadouken.mp3',
            frame: 3
        },
        {
            src: 'audio/hearthstone.mp3',
            frame: 1
        },
        {
            src: 'audio/sonic.mp3',
            frame: 3
        },
        {
            src: 'audio/metal-gear.mp3',
            frame: 1
        },
        {
            src: 'audio/frogger.mp3',
            frame: 5
        },
        {
            src: 'audio/mario-powerup.mp3',
            frame: 1
        },
    ];

    function initAudioApi() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            context = new AudioContext();
        } catch (e) {
            throw new Error('Web Audio API not supported.');
        }

        window.addEventListener('touchstart', function () {
            // create empty buffer
            buffer = context.createBuffer(1, 1, 22050);
            source = context.createBufferSource();
            source.buffer = buffer;

            // connect to output (your speakers)
            source.connect(context.destination);

            // play the file
            source.play(0);
            console.log('fire');
        }, false);
    }

    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            context.decodeAudioData(request.response, function (buffer) {
                sound = buffer;
                playSound(sound);
            }, function (err) {
                throw new Error(err);
            });
        };
        request.send();
    }

    function playSound(buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    }

    function setPlayed(hasSoundPlayed) {
        soundPlayed = hasSoundPlayed;
    }

    function playAudio(currentKeyframe, idSelected) {
        if (!soundPlayed && currentKeyframe === audioInfo[idSelected].frame) {
            if (idSelected === 2 || idSelected === 1 || idSelected === 6 || idSelected === 10) {
                setTimeout(function () {
                    loadSound(audioInfo[idSelected].src);
                }, 300);
            } else if (idSelected === 12) {
                setTimeout(function () {
                    loadSound(audioInfo[idSelected].src);
                }, 500);
            } else {
                loadSound(audioInfo[idSelected].src);
            }

            soundPlayed = true;
        }
    }

    return {
        initAudioApi: initAudioApi,
        playAudio: playAudio,
        setPlayed: setPlayed
    };
}(jQuery);