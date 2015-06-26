var youtubePixel = function($, paper) {

	var canvasWrapper = 'canvas-wrapper';
	var $canvasWrapper = $('#' + canvasWrapper);
	var initialPolyCount = $canvasWrapper.data('polyCount');
	var snapDistance = parseInt($canvasWrapper.data('snapDistance'), 10);
	var triangleSize = $canvasWrapper.data('triangleSize');
	var gridSize = 10;
	var triangleHeight = Math.sqrt(3)/2 * triangleSize;
	var pathItem;
	var isAnimatingForward = true;
	$('.animate-forward').text(isAnimatingForward);
	var triangleArray = [];
	var currentAnimFrame = 0;
	var currentKeyframe = 0;
	// var animationKeyFrames = [];

	var originalHeartFrame = [{"position":["Point",704,338.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",660.69873,363.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",617.39746,363.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",617.39746,388.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",574.09619,338.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",574.09619,363.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",660.69873,388.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",617.39746,413.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",574.09619,388.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",660.69873,338.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",660.69873,413.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",704,388.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",704,363.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",617.39746,338.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}];
	var animationKeyFrames = [[{"position":["Point",704,338.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",660.69873,363.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",617.39746,363.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",617.39746,388.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",574.09619,338.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",574.09619,363.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",660.69873,388.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",617.39746,413.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",574.09619,388.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",660.69873,338.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",660.69873,413.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",704,388.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",704,363.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",617.39746,338.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}]];
	var beatingHeart = [[{"position":["Point",704,338.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",660.69873,363.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",617.39746,363.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",617.39746,388.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",574.09619,338.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",574.09619,363.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",660.69873,388.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",617.39746,413.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",574.09619,388.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",660.69873,338.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",660.69873,413.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",704,388.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",704,363.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",617.39746,338.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}],[{"position":["Point",716,326.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",665,359.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",613.69873,359.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",614,393.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",562.39746,326.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",562.39746,359.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",665,392.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",614,426.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",562.69873,393.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",665,326.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",665.30127,426.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",716.30127,392.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",716.30127,359.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",613.69873,326.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}],[{"position":["Point",704,338.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",660.69873,363.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",617.39746,363.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",617.39746,388.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",574.09619,338.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",574.09619,363.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",660.69873,388.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",617.39746,413.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",574.09619,388.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",660.69873,338.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",660.69873,413.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",704,388.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",704,363.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",617.39746,338.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}]];
	var offscreenAnimation = [];

	var groupArray = [];
	var groupKeyFrames = [];
	var groupDurations = [];
	var groupStorage = [];
	var shouldPause = false;

	var heartBeat = [[{"position":["Point",704,338.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",660.69873,363.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",617.39746,363.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",617.39746,388.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",574.09619,338.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",574.09619,363.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",660.69873,388.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",617.39746,413.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",574.09619,388.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",660.69873,338.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",660.69873,413.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",704,388.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",704,363.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",617.39746,338.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}],[{"position":["Point",716,326.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",665,359.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",613.69873,359.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",614,393.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",562.39746,326.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",562.39746,359.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",665,392.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",614,426.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",562.69873,393.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",665,326.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",665.30127,426.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",716.30127,392.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",716.30127,359.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",613.69873,326.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}],[{"position":["Point",704,338.65064],"rotation":90,"fillColor":[0.93333,0.93333,0.93333],"idNum":"triangle-0","opacity":1,"layerOrder":0},{"position":["Point",660.69873,363.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-1","opacity":1,"layerOrder":0},{"position":["Point",617.39746,363.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-2","opacity":1,"layerOrder":0},{"position":["Point",617.39746,388.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-3","opacity":1,"layerOrder":0},{"position":["Point",574.09619,338.65064],"rotation":270,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-4","opacity":1,"layerOrder":0},{"position":["Point",574.09619,363.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-5","opacity":1,"layerOrder":0},{"position":["Point",660.69873,388.65064],"rotation":270,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-6","opacity":1,"layerOrder":0},{"position":["Point",617.39746,413.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-7","opacity":1,"layerOrder":0},{"position":["Point",574.09619,388.65064],"rotation":270,"fillColor":[0.61176,0.17255,0.1451],"idNum":"triangle-8","opacity":1,"layerOrder":0},{"position":["Point",660.69873,338.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-9","opacity":1,"layerOrder":0},{"position":["Point",660.69873,413.65064],"rotation":90,"fillColor":[0.7098,0.15686,0.12941],"idNum":"triangle-10","opacity":1,"layerOrder":0},{"position":["Point",704,388.65064],"rotation":90,"fillColor":[0.80392,0.1451,0.10588],"idNum":"triangle-11","opacity":1,"layerOrder":0},{"position":["Point",704,363.65064],"rotation":270,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-12","opacity":1,"layerOrder":0},{"position":["Point",617.39746,338.65064],"rotation":90,"fillColor":[0.9098,0.13333,0.0902],"idNum":"triangle-13","opacity":1,"layerOrder":0}]];
	var heartBeatDuration = [45, 15, 45];

	var animationDurations = [15];
	var offscreenDuration = [1, 120];


	// var animationKeyFrames = Anim.treasureAnimation;
	// var animationDurations = Anim.treasureDuration;


	var triforceRotate = 0;
	var triforceDuration = 28;
	var triforceMiddleDelay = 160;

	var hammerRotate = 0;
	var hammerDuration = 10;


	// var hearthstoneGroup = [[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0},{"position":["Point",823.79381,402.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0},{"position":["Point",823.79381,402.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",443.23825,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0},{"position":["Point",823.79381,402.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",443.23825,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0},{"position":["Point",638.79381,401.59508],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}]];
	var hearthstoneGroup = [[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",823.79381,402.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",823.79381,402.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",443.23825,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",823.79381,402.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",443.23825,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}],[{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",638.79381,401.59508],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.34937,402.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0}]];
	var sonicGroup = [[{"position":["Point",639.19873,375.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",639.19873,375.15064],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",639.19873,375.15064],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0},{"position":["Point",639.19873,375.15064],"rotation":0,"fillColor":"","idNum":"group-3","opacity":1,"layerOrder":0},{"position":["Point",639.19873,375.15064],"rotation":0,"fillColor":"","idNum":"group-4","opacity":1,"layerOrder":0}],[{"position":["Point",639.19873,375.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":1},{"position":["Point",218.64317,76.7062],"rotation":0,"fillColor":"","idNum":"group-1","opacity":1,"layerOrder":0},{"position":["Point",948.08762,55.03953],"rotation":0,"fillColor":"","idNum":"group-2","opacity":1,"layerOrder":0},{"position":["Point",350.8654,702.26175],"rotation":0,"fillColor":"","idNum":"group-3","opacity":1,"layerOrder":0},{"position":["Point",1025.30984,704.48397],"rotation":0,"fillColor":"","idNum":"group-4","opacity":1,"layerOrder":0}]];
	var froggerGroup = [[{"position":["Point",639.92095,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":0,"layerOrder":0}],[{"position":["Point",639.92095,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",933.47651,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":0,"layerOrder":0}],[{"position":["Point",933.47651,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",1283.47651,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":0,"layerOrder":0}],[{"position":["Point",1283.47651,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",383.47651,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":0,"layerOrder":0}],[{"position":["Point",383.47651,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",639.58762,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":0,"layerOrder":0}],[{"position":["Point",639.58762,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}]];
	var hadoukenGroup = [[{"position":["Point",661,364.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",1277.66667,364.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",125.66667,1189.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":0,"layerOrder":0}],[{"position":["Point",125.66667,364.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",661,364.15064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}]];
	var snakeGroup = [[{"position":["Point",661.42095,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}],[{"position":["Point",1303.64318,376.65064],"rotation":0,"fillColor":"","idNum":"group-0","opacity":1,"layerOrder":0}]];
	var hearthstoneGroupDuration = [30,20,20,55,20];
	var sonicGroupDuration = [1,60];
	var froggerGroupDuration = [5,30,5,30,5,30,5,15,5,15,5];
	var hadoukenGroupDuration = [10,120,1,1,80];
	var snakeGroupDuration = [10, 200];

	var globalGroupHolder = ['triforce', 'coin', 'coin', '', '', 'minecraft', sonicGroup, 'hammer', hadoukenGroup, hearthstoneGroup, sonicGroup, '', froggerGroup, 'superheart'];
	var globalGroupDurationHolder = ['', '', ' ',' ', ' ', 'minecraft', sonicGroupDuration, ' ', hadoukenGroupDuration, hearthstoneGroupDuration, sonicGroupDuration, '', froggerGroupDuration, ''];

	var triangleStorage = [];
	var shadesOfRed = ['#e82217', '#cd251b', '#b52821', '#9c2c25', '#6c1d19', 'blue'];
	var gridGroup;
	var animationGroup;
	var animationFrameX;
	var animationFrameY;
	var animationState = 'inTransition';
	var editMode = false;
	$('.edit-mode').text(editMode);
	var idSelected;
	var prevIdSelected;
	var lastPoint;
	var scaleHolder = 1;
	var isMobile = false;
	var offsetY = 0;

	var initCanvasWidth = 1280;
	var initCanvasHeight = 779;
	// animationKeyFrames = Anim.hearthstoneAnimation;
	var initAnimationValues = animationKeyFrames;

	// Store the differences in x and y for resizing.
	var diffPosX = 0;
	var diffPosY = 0;

	var restingAnimationInterval;
	var restingAnimationTimeStart;
	var restingAnimationTimeBetween = 1000;
	var hasMinecraftCompensated = false;

	var hasAnimationPlayed = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];

	/**
	 * init function
	 * @return {void}
	 */
	function init() {
		initPaper();
		updateAnimationPositions(false);
		zoomView();
		drawGrid(gridSize);
		buildInitialTriangles(initialPolyCount, triangleSize);
		lastPoint = view.center;
		bindEvents();
		detectMobile();
		if (isMobile) {
			audioScriptApi.initAudioApi();
		} else {
			audioScript.initAudio();
		}
		inEditMode(editMode);
		// offsetY = project.view.center.y;
		// project.view.viewSize.height = project.view.viewSize.height * 1.15;
		// offsetY = parseInt(project.view.center.y - offsetY, 10);
		// console.log(offsetY);
	}

	function initPaper() {
		paper.install(window);
		paper.setup(canvasWrapper);
		var tool = new Tool();
		gridGroup = new Group();

		// TEMP
		if (animationKeyFrames[0].length > 14 && isAnimatingForward) {
			var numNew = animationKeyFrames[0].length - 14;
			buildClonedTriangles(numNew, triangleSize);
		}
	}

	/*****************************************************/
	/*********************TEMP****************************/
	/*****************************************************/
	function updateKeyframe(arrayObj) {
		for (var i = 0; i < arrayObj.length; i++) {
			if (animationKeyFrames[currentKeyframe][i].position.x) {
				posX = animationKeyFrames[currentKeyframe][i].position.x;
				posY = animationKeyFrames[currentKeyframe][i].position.y;
			} else {
				posX = animationKeyFrames[currentKeyframe][i].position[1];
				posY = animationKeyFrames[currentKeyframe][i].position[2];
			}

			if (isAnimatingForward) {
				if (currentKeyframe !== 0) {
					rot = animationKeyFrames[currentKeyframe][i].rotation;
					prevRot = animationKeyFrames[currentKeyframe -1][i].rotation;
					rotAmt = rot - prevRot;
				}
			} else {
				if (currentKeyframe !== animationKeyFrames.length-1) {
					rot = animationKeyFrames[currentKeyframe][i].rotation;
					prevRot = animationKeyFrames[currentKeyframe + 1][i].rotation;
					rotAmt = rot - prevRot;
				}
			}

			if (animationKeyFrames[currentKeyframe][i].layerOrder) {
				if (animationKeyFrames[currentKeyframe][i].layerOrder === 1) {
					arrayObj[i].bringToFront();
				}
			}

			if (animationKeyFrames[currentKeyframe][i].opacity !== null && idSelected !== 8) {
				arrayObj[i].opacity = animationKeyFrames[currentKeyframe][i].opacity;
			}

			arrayObj[i].position.x = posX;
			arrayObj[i].position.y = posY;
			arrayObj[i].rotate(rotAmt);
			arrayObj[i].storedRotation = arrayObj[i].storedRotation + rotAmt;
		}
	}
	/*****************************************************/
	/*****************************************************/
	/*****************************************************/


	//terribly detcting mobile to play audio via web audio api instead of html5
	function detectMobile() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			isMobile = true;
		}

		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
			isMobile = true;
			console.log('test safari');
		}
	}

	function buildInitialTriangles(count, triangleSize) {
		for (var i = 0; i < count; i++) {
			var randomRed = Math.floor(Math.random() * 4);
			triangleArray[i] = new Path();
			triangleArray[i].add(new Point(triangleSize/2,0));
			triangleArray[i].add(new Point(0,triangleHeight));
			triangleArray[i].add(new Point(triangleSize,triangleHeight));
			triangleArray[i].closed = true;
			triangleArray[i].fillColor = shadesOfRed[randomRed];
			triangleArray[i].strokeWidth = 0;
			triangleArray[i].storedRotation = 0;
			triangleArray[i].storedScale = 1;
			triangleArray[i].layerOrder = 0;
			triangleArray[i].scale(1.01);
			triangleArray[i].opacity = 0;

			triangleArray[i].position.x = (i * triangleSize) + triangleSize/2;

			if (animationKeyFrames.length > 0) {
				triangleArray[i].position.x = animationKeyFrames[0][i].position[1];
				triangleArray[i].position.y = animationKeyFrames[0][i].position[2];
				triangleArray[i].storedRotation = animationKeyFrames[0][i].rotation;
				triangleArray[i].storedScale = animationKeyFrames[0][i].scale;
				triangleArray[i].rotate(triangleArray[i].storedRotation);
				triangleArray[i].fillColor = animationKeyFrames[0][i].fillColor;
			}

			if (i === 0) {
				triangleArray[i].fillColor = {
					gradient: {
						stops: [['#e2e2e2', 0.34],['white', 0.35]]
					},
					origin: triangleArray[i].bounds.topRight,
					destination: {x:triangleArray[i].bounds.bottomLeft.x,y:triangleArray[i].bounds.bottomLeft.y + 11}
				};
			}
		}
	}

	function buildClonedTriangles(count, triangleSize) {
		for (var i = 14; i < 14+count; i++) {
			triangleArray[i] = new Path();
			triangleArray[i].add(new Point(triangleSize/2,0));
			triangleArray[i].add(new Point(0,triangleHeight));
			triangleArray[i].add(new Point(triangleSize,triangleHeight));
			triangleArray[i].closed = true;
			triangleArray[i].sendToBack();

			triangleArray[i].position.x = animationKeyFrames[0][i].position[1];
			triangleArray[i].position.y = animationKeyFrames[0][i].position[2];
			triangleArray[i].storedRotation = animationKeyFrames[0][i].rotation;
			triangleArray[i].storedScale = animationKeyFrames[0][i].scale;
			triangleArray[i].rotate(triangleArray[i].storedRotation);
			triangleArray[i].scale(1.01);
			triangleArray[i].fillColor = animationKeyFrames[0][i].fillColor;
			triangleArray[i].strokeWidth = 0;
		}
	}

	function destroyClonedTriangles(arrayObj, originalCount) {
		for (var i = arrayObj.length-1; i > originalCount-1; i--) {
			arrayObj[i].remove();
			arrayObj.splice(i, 1);
		}
	}

	function bindEvents() {
		tool.onMouseUp = function(event) { selectPoly(event); };
		tool.onMouseDrag = function(event) { dragEvent(event); };
		tool.onMouseMove = function(event) { detectHover(event); };
		// tool.onKeyUp = function(event) { detectKeyPress(event); };
		view.onFrame = function(event) {
			playAnimationLoop(event);
		};
		view.onResize = function(event) { onResize(event); };
		view.pause();
		isAnimationPlaying = false;

		$('.save-keyframe').on('click', function(e) {
			e.preventDefault();

			numFrames = parseInt($('.animation-duration').val(), 10);

			if (!numFrames || numFrames === '') {
				numFrames = 0;
			}

			storeLocalPosition(triangleArray.length);
		});

		$('.save-group-keyframe').on('click', function(e) {
			e.preventDefault();

			numFrames = parseInt($('.animation-duration').val(), 10);

			if (!numFrames || numFrames === '') {
				numFrames = 0;
			}

			storeGroupPosition(groupArray.length);
		});
	}

	function selectPoly(event) {
		var hitOptions = {
			segments: true,
			fill: true,
			tolerance: 5
		};

		var hitResult = project.hitTest({x:event.point.x, y:event.point.y+offsetY}, hitOptions);
		project.activeLayer.selected = false;

		if (hitResult) {
			pathItem = hitResult.item;

			if (editMode) {
				findClickedTriangle(pathItem);
				pathItem.selected = true;
				groupSelect(pathItem, hitResult);
				snapPoly(event);
			} else if (animationState === 'restingAnimation'){
				findClickedTriangle(pathItem);

				if (idSelected !== 0) {
					pathItem.hasPlayed = true;
				}

				selectAnimation(idSelected);
			}
		}
	}

	function findClickedTriangle(pathItem) {
		// We need the triangleArray index from the selected item - not its PaperJS index
		for (var i = 0; i < triangleArray.length; i++) {
			if (pathItem.index === triangleArray[i].index) {
				prevIdSelected = idSelected;
				idSelected = i;
			}
		}
	}

	function groupSelect(pathItem, hitResult) {
		if (groupArray.length > 0) {
			for (var k = 0; k < groupArray.length; k++) {
				for (var j = 0; j < groupArray[k].children.length; j++) {
					if (groupArray[k].children[j].id === hitResult.item.id) {
						pathItem = groupArray[k];
					}
				}
			}
		}
	}

	function snapPoly(event) {
		var testPoint;
		var allOtherPoint;
		var tempX;
		var tempY;
		if (editMode) {
			if (project.activeLayer.selected && typeof pathItem.children !== 'object') {
				for (var i = 0; i < triangleArray.length; i++) {
					if (i !== pathItem.index) {
						for (var j = 0; j < triangleArray[i].segments.length; j++) {
							allOtherPoint = triangleArray[i].segments[j].point;
							for (var k = 0; k < pathItem.segments.length; k++) {
								testPoint = pathItem.segments[k].point;
								if (testPoint.isClose(allOtherPoint, snapDistance)) {
									tempX = allOtherPoint.x - testPoint.x;
									tempY = allOtherPoint.y - testPoint.y;
									pathItem.position.x += tempX;
									pathItem.position.y += tempY;

									return;
								}
							}
						}
					}
				}
			}
		}
	}

	function dragEvent(event) {
		if (project.activeLayer.selected) {
			pathItem.position.x += event.delta.x;
			pathItem.position.y += event.delta.y;
		}
	}

	function detectHover(event) {
		var hitOptions = {
			segments: true,
			fill: true,
			tolerance: 5
		};

		var hitResult = project.hitTest({x:event.point.x, y:event.point.y+offsetY}, hitOptions);

		if (hitResult) {
			if (!editMode && animationState === 'restingAnimation') {
				if (pathItem) {

					// We need the triangleArray index from the selected item - not its PaperJS index
					for (var i = 0; i < triangleArray.length; i++) {
						if (pathItem.index === triangleArray[i].index) {
							currentId = i;
						}
					}

					if (pathItem.id !== hitResult.id) {
						checkHighlight(currentId, false);
					}

					prevIdSelected = idSelected;
					idSelected = currentId;
				}

				shouldPause = true;
				pathItem = hitResult.item;

				if (!isAnimationPlaying) {
					addHighlight(pathItem, true);
					checkHighlight(-1, true);
				}

				window.clearInterval(restingAnimationInterval);
				restingAnimationInterval = null;
			}
		} else {
			if (!editMode) {
				if (!view._animate && animationState === 'restingAnimation') {
					if (!restingAnimationInterval) {
						restingAnimationInterval = window.setInterval(startRestingAnimation, 200);
						restingAnimationTimeStart = Date.now();
					}

					if (!isAnimationPlaying) {
						addHighlight(pathItem, false);
						checkHighlight(-1, false);
					}
				}
			}
		}
	}

	function addHighlight(pathObj, hasHighlight) {
		if (idSelected && pathObj && pathObj.fillColor) {
			if (hasHighlight && pathObj.fillColor.type !== 'gradient') {
				currentFill = new Color(heartBeat[0][idSelected].fillColor);
				if (pathObj.fillColor) {
					pathObj.fillColor.brightness = currentFill.brightness + 0.25;
				}
			} else if (pathObj.fillColor.type !== 'gradient') {
				if (hasAnimationPlayed[idSelected]) {
					currentFill = new Color(heartBeat[0][idSelected].fillColor);
					if (pathObj.fillColor) {
						pathObj.fillColor.brightness = currentFill.brightness;
					}
				} else {
					currentFill = new Color(heartBeat[0][idSelected].fillColor);
					if (pathObj.fillColor) {
						pathObj.fillColor.brightness = currentFill.brightness;
					}
				}
			}
		}
	}

	function checkHighlight(currentId, hasHighlight) {
		if (hasHighlight) {
			if (idSelected === 1) {
				addHighlight(triangleArray[2], true);
			} else if (idSelected === 2) {
				addHighlight(triangleArray[1], true);
			} else if (idSelected === 6) {
				addHighlight(triangleArray[10], true);
			} else if (idSelected === 10) {
				addHighlight(triangleArray[6], true);
			} else {
				addHighlight(triangleArray[currentId], true);
			}
		} else {
			if (idSelected === 1) {
				if (currentId !== 1 && currentId !== 2) {
					addHighlight(triangleArray[1], false);
					addHighlight(triangleArray[2], false);
				}
			} else if (idSelected === 2) {
				if (currentId !== 2 && currentId !== 1) {
					addHighlight(triangleArray[2], false);
					addHighlight(triangleArray[1], false);
				}
			} else if (idSelected === 6) {
				if (currentId !== 6 && currentId !== 10) {
					addHighlight(triangleArray[6], false);
					addHighlight(triangleArray[10], false);
				}
			} else if (idSelected === 10) {
				if (currentId !== 10 && currentId !== 6) {
					addHighlight(triangleArray[10], false);
					addHighlight(triangleArray[6], false);
				}
			} else {
				addHighlight(pathItem, false);
			}
		}
	}

	function detectKeyPress(event) {
		if (event.key === 'g') {
			gridGroup.opacity = gridGroup.opacity === 1 ? 0 : 1;
		} else if (event.key === 'e') {
			editMode = !editMode;
			$('.edit-mode').text(editMode);
			inEditMode(editMode);
		} else if (event.key === 'b') {
			isAnimatingForward = !isAnimatingForward;
			$('.animate-forward').text(isAnimatingForward);
		} else if (event.key === 'u') {
			createOffscreenAnim(triangleArray.length);
		} else if (event.key === 'z') {
			currentKeyframe--;
			isAnimatingForward = false;
			console.log(currentKeyframe);
			updateKeyframe(triangleArray);
		} else if (event.key === 'x') {
			currentKeyframe++;
			isAnimatingForward = true;
			console.log(currentKeyframe);
			updateKeyframe(triangleArray);
		}

		if (project.activeLayer.selected) {
			switch (event.key) {
				case 'right':
					pathItem.position.x+= 0.5;
					break;
				case 'left':
					pathItem.position.x-= 0.5;
					break;
				case 'up':
					pathItem.position.y-= 0.5;
					break;
				case 'down':
					pathItem.position.y+= 0.5;
					break;
				case 'a':
					if (pathItem.storedRotation === 0) {
						pathItem.storedRotation = 270;
					} else {
						pathItem.storedRotation = pathItem.storedRotation - 90;
					}
					pathItem.rotate(-90);
					break;
				case 's':
					if (pathItem.storedRotation === 270) {
						pathItem.storedRotation = 0;
					} else {
						pathItem.storedRotation = pathItem.storedRotation + 90;
					}
					pathItem.rotate(90);
					break;
				case 'j':
					if (pathItem.storedScale === 1) {
						pathItem.storedScale = 0;
					}
					pathItem.scale(pathItem.storedScale);
					break;
				case 'k':
					if (pathItem.storedScale !== 0) {
						if (pathItem.storedScale === 1) {
							pathItem.storedScale = -1;
						} else {
							pathItem.storedScale = 1;
						}
					}
					pathItem.scale(pathItem.storedScale, 1);
					break;
				case 'l':
					if (pathItem.storedScale !== 0) {
						if (pathItem.storedScale === 1) {
							pathItem.storedScale = -1;
						} else {
							pathItem.storedScale = 1;
						}
					}
					pathItem.scale(1, pathItem.storedScale);
					break;
				case 'f':
					groupObjects(false);
					break;
				case 'o':
					if (pathItem.opacity === 0) {
						pathItem.opacity = 1;
					} else {
						pathItem.opacity = 0;
					}
					break;
				case 'i':
					if (!pathItem.originalSize) {
						pathItem.originalSize = pathItem.bounds.size;
						pathItem.originalX = pathItem.position.x;
						pathItem.originalY = pathItem.position.y;
					}

					if (pathItem.bounds.size.width < pathItem.originalSize.width/4) {
						pathItem.bounds.size = pathItem.originalSize;
						pathItem.position.x = pathItem.originalX;
						pathItem.position.y = pathItem.originalY;
					} else {
						pathItem.scale(0.5, new Point(pathItem.originalX, pathItem.originalY));
					}
					break;
				case '1':
					pathItem.fillColor = shadesOfRed[0];
					break;
				case '2':
					pathItem.fillColor = shadesOfRed[1];
					break;
				case '3':
					pathItem.fillColor = shadesOfRed[2];
					break;
				case '4':
					pathItem.fillColor = shadesOfRed[3];
					break;
				case '9':
					pathItem.sendToBack();
					pathItem.layerOrder = 0;
					console.log('back');
					break;
				case '0':
					pathItem.bringToFront();
					pathItem.layerOrder = 1;
					console.log('front');
					break;
				case 'c':
					var newObject = pathItem.clone();
					if (pathItem === animationGroup) {
						groupArray.push(newObject);
					} else {
						triangleArray.push(newObject);
					}
					newObject.storedRotation = pathItem.storedRotation;
					console.log('cloned!');
					break;
			}
		}
	}

	function inEditMode(isInEditMode) {
		if (!isInEditMode) {
			staticAnimation();
			$('.controls').css('display', 'none');
			gridGroup.opacity = 0;
			view.play();
		} else {
			$('.controls').css('display', 'block');
			// gridGroup.opacity = 1;
			view.pause();
			isAnimationPlaying = false;
		}
	}

	function staticAnimation() {
		animationKeyFrames = Anim.introAnimation;
		animationDurations = Anim.introDuration;
		animationState = 'introAnimation';
		compensateLocation(true);
	}

	function storeLocalPosition(polyCount, numFrames) {
		triangleStorage = [];

		for (var i = 0; i < polyCount; i++) {
			var storageObj = new storageConstructor(
				triangleArray[i].position,
				triangleArray[i].storedRotation,
				triangleArray[i].fillColor,
				'triangle-' + i,
				triangleArray[i].opacity,
				triangleArray[i].storedScale,
				triangleArray[i].layerOrder);
			triangleStorage.push(storageObj);
		}

		animationKeyFrames.push(triangleStorage);
		animationDurations.push(numFrames);

		console.log(JSON.stringify(animationKeyFrames));
		console.log(JSON.stringify(animationDurations));
	}

	function storeGroupPosition(polyCount, numFrames) {
		groupStorage = [];

		for (var i = 0; i < polyCount; i++) {
			var storageObj = new storageConstructor(
				groupArray[i].position,
				groupArray[i].storedRotation,
				'',
				'group-' + i,
				groupArray[i].opacity,
				triangleArray[i].storedScale,
				triangleArray[i].layerOrder);
			groupStorage.push(storageObj);
		}

		groupKeyFrames.push(groupStorage);
		groupDurations.push(numFrames);

		console.log(groupKeyFrames);
		console.log(JSON.stringify(groupKeyFrames));
		console.log(JSON.stringify(groupDurations));
	}

	function storageConstructor(position, rotation, color, id, opacity, scale, order) {
		this.position = position;
		this.rotation = rotation;
		this.fillColor = color;
		this.idNum = id;
		this.opacity = opacity;
		this.scale = scale;
		this.layerOrder = order;
	}

	function resetColor(pathItem) {
		pathItem.fillColor = animationKeyFrames[0][idSelected].fillColor;
	}

	function selectAnimation(itemSelected) {
		fadeCopy(true);
		hasAnimationPlayed[itemSelected] = true;
		addHighlight(pathItem, false);
		checkHighlight(-1, false);
		currentAnimFrame = 0;
		currentKeyframe = 0;
		isAnimatingForward = true;
		animationState = 'inTransition';
		// Reset our current animation to the original values.
		animationKeyFrames = initAnimationValues;

		animationKeyFrames = Anim.globalAnimationHolder[itemSelected];
		animationDurations = Anim.globalDurationHolder[itemSelected];

		if (animationKeyFrames[0].length > 14 && isAnimatingForward) {
			var numNew = animationKeyFrames[0].length - 14;
			buildClonedTriangles(numNew, triangleSize);
		}

		if (!triangleArray[idSelected].hasCompensated) {
			compensateLocation(true);
			triangleArray[idSelected].hasCompensated = true;
			if(idSelected === 1 || idSelected === 2) {
				triangleArray[1].hasCompensated = true;
				triangleArray[2].hasCompensated = true;
			} else if(idSelected === 6 || idSelected === 10) {
				triangleArray[6].hasCompensated = true;
				triangleArray[10].hasCompensated = true;
			}
		}

		if (isAnimatingForward) {
			currentKeyframe = 0;
			if (!isMobile) {
				audioScript.audioList[0].hasPlayed = false;
			}
		} else {
			currentKeyframe = animationKeyFrames.length-1;
		}
		currentAnimFrame = 0;
		view.play();
	}

	function compensateLocation(shouldUpdate) {
		// Reset rotation;
		for (var i = 0; i < triangleArray.length; i++) {
			triangleArray[i].rotate(-triangleArray[i].storedRotation);
			triangleArray[i].rotate(animationKeyFrames[0][i].rotation);
			triangleArray[i].storedRotation = animationKeyFrames[0][i].rotation;
		}

		if (isAnimatingForward) {
			// Get store our new animation values and reset positions.
			initAnimationValues = animationKeyFrames;
			initCanvasWidth = 1280;
			initCanvasHeight = 779;
			zoomView();
			updateAnimationPositions(shouldUpdate);

			// Set initial positions and fill
			for (var j = 0; j < triangleArray.length; j++) {
				triangleArray[j].position.x = animationKeyFrames[currentKeyframe][j].position[1];
				triangleArray[j].position.y = animationKeyFrames[currentKeyframe][j].position[2];
			}
		}
	}

	function playAnimationLoop(event) {
		isAnimationPlaying = true;

		// Percentage of the way throught the animation
		var time = currentAnimFrame/animationDurations[currentKeyframe];
		// Modify the percentage with an easing formula - better transitions.
		var pct = (--time)*Math.pow(time, 2)+1;
		pct = time > 1.0 ? 1.0 : pct;

		if ((isAnimatingForward && currentKeyframe > 0) ||
			(!isAnimatingForward && currentKeyframe < animationKeyFrames.length-1)) {
			if (animationState === 'inTransition') {
				transitionEvent(pct, triangleArray);
			} else if (animationState === 'groupAnimation') {
				transitionEvent(pct, groupArray);
			} else if (animationState === 'restingAnimation') {
				transitionEvent(pct, triangleArray);
			} else if (animationState === 'offscreenAnimation') {
				transitionEvent(pct, triangleArray);
			} else if (animationState === 'introAnimation') {
				transitionEvent(pct, triangleArray);
			}
		}
		if (animationState !== 'uniqueAnimation') {
			currentAnimFrame++;

			if (currentAnimFrame >= animationDurations[currentKeyframe]) {
				currentAnimFrame = 0;

				if (isAnimatingForward) {
					currentKeyframe++;
				} else {
					currentKeyframe--;
				}
			}

			if (currentKeyframe > animationKeyFrames.length-1) {
				segmentStop(true);
			} else if (currentKeyframe < 0) {
				segmentStop(false);
			}
		} else {
			if (globalGroupHolder[idSelected] === 'coin') {
				animateCoin(event);
			} else if (globalGroupHolder[idSelected] === 'hammer') {
				animateHammer(event);
			} else if (globalGroupHolder[idSelected] === 'triforce') {
				animateTriforce(event);
			} else if (globalGroupHolder[idSelected] === 'superheart') {
				animateSuperHeart(event);
			}
		}
	}

	function transitionEvent(pct, arrayObj) {
		var modifier = 1;
		if (isAnimatingForward) {
			if (animationState === 'inTransition' && animationDurations !== offscreenDuration) {
				if (isMobile) {
					audioScriptApi.playAudio(currentKeyframe, idSelected);
				} else {
					audioScript.playAudio(currentKeyframe, idSelected);
				}
			}
			modifier = -1;
		}

		if (idSelected === 8 && animationState === 'groupAnimation') { //hadouken
			var tempVal = parseInt(pct*100, 10);
			if (tempVal !== 99) {
				if ( tempVal % 10 < 5) {
					animationGroup.opacity = 0;
				} else {
					animationGroup.opacity = 1;
				}
			}
		}

		// if (idSelected === 5 && animationState === 'groupAnimation') { //snake
		// 	var tempParsePct = parseInt(pct*100, 10);
		// 	if (tempParsePct !== 99) {
		// 		if ( tempParsePct % 9 === 0) {
		// 			animationGroup.scale(1,-1);
		// 		} else {
		// 			animationGroup.scale(1,1);
		// 		}
		// 	}
		// }

		for (var i = 0; i < arrayObj.length; i++) {
			if (animationKeyFrames[currentKeyframe][i].position.x) {
				posX = animationKeyFrames[currentKeyframe][i].position.x;
				posY = animationKeyFrames[currentKeyframe][i].position.y;
				prevPosX = animationKeyFrames[currentKeyframe + modifier][i].position.x;
				prevPosY = animationKeyFrames[currentKeyframe + modifier][i].position.y;
			} else {
				posX = animationKeyFrames[currentKeyframe][i].position[1];
				posY = animationKeyFrames[currentKeyframe][i].position[2];
				prevPosX = animationKeyFrames[currentKeyframe + modifier][i].position[1];
				prevPosY = animationKeyFrames[currentKeyframe + modifier][i].position[2];
			}

			if (animationState === 'offscreenAnimation') {
				rot = animationKeyFrames[currentKeyframe][i].rotation;
				prevRot = arrayObj[i].storedRotation;
				rotAmt = (rot - prevRot) / 19;
			} else {
				rot = animationKeyFrames[currentKeyframe][i].rotation;
				prevRot = animationKeyFrames[currentKeyframe + modifier][i].rotation;
				rotAmt = (rot - prevRot) / animationDurations[currentKeyframe];
			}

			if (animationKeyFrames[currentKeyframe][i].layerOrder) {
				if (animationKeyFrames[currentKeyframe][i].layerOrder === 1) {
					arrayObj[i].bringToFront();
				}
			}

			if (animationKeyFrames[currentKeyframe][i].opacity !== null && idSelected !== 8) {
				// Intro
				if (animationState === 'introAnimation') {
					opac = animationKeyFrames[currentKeyframe][i].opacity;
					prevOpac = animationKeyFrames[currentKeyframe + modifier][i].opacity;
					arrayObj[i].opacity = prevOpac + (opac - prevOpac) * pct;
				} else if (idSelected === 3 && currentKeyframe > 8 && currentKeyframe < 12) {
					opac = animationKeyFrames[currentKeyframe][i].opacity;
					prevOpac = animationKeyFrames[currentKeyframe + modifier][i].opacity;
					arrayObj[i].opacity = prevOpac + (opac - prevOpac) * pct;
				}else {
					arrayObj[i].opacity = animationKeyFrames[currentKeyframe][i].opacity;
				}
			}

			arrayObj[i].position.x = prevPosX + (posX - prevPosX) * pct;
			arrayObj[i].position.y = prevPosY + (posY - prevPosY) * pct;
			arrayObj[i].rotate(rotAmt);
			arrayObj[i].storedRotation = arrayObj[i].storedRotation + rotAmt;
		}
	}

	function segmentStop(isGoingForward) {
		if (triangleArray.length > 14 && !isAnimatingForward) {
			destroyClonedTriangles(triangleArray, 14);
		}

		if (animationState !== 'restingAnimation' || shouldPause) {
			view.pause();
			isAnimationPlaying = false;
		}

		resetView();

		if (isGoingForward) {
			currentKeyframe = animationKeyFrames.length-1;
			if (animationState === 'inTransition') {
				if (globalGroupHolder[idSelected] !== '' && globalGroupHolder[idSelected] !== undefined) {
					view.pause();
					isAnimationPlaying = false;
					setFinalKeyFrames();

					if (idSelected === 5 && animationDurations === offscreenDuration) { //snake
						animationState = 'restingAnimation';
						animationKeyFrames = heartBeat;
						animationDurations = heartBeatDuration;
					} else if (globalGroupHolder[idSelected] === 'coin' || globalGroupHolder[idSelected] === 'hammer' || globalGroupHolder[idSelected] === 'triforce' || globalGroupHolder[idSelected] === 'superheart') {
						groupObjects(false);
						animationState = 'uniqueAnimation';

						if (globalGroupHolder[idSelected] === 'triforce') {
							triangleArray[0].bringToFront();
						}

						view.play();

					} else if (globalGroupHolder[idSelected] === 'minecraft') {
						animationKeyFrames = Anim.offscreenAnimation;
						animationDurations = Anim.offscreenDuration;
						compensateLocation(false);
						animationState = 'offscreenAnimation';
						isAnimatingForward = true;
						currentKeyframe = 0;

						if (isMobile) {
							audioScriptApi.setPlayed(false);
						}

						// This section is coped from compensateLocation().
						initAnimationValues = animationKeyFrames;
						initCanvasWidth = 1280;
						initCanvasHeight = 779;
						if (!hasMinecraftCompensated) {
							updateAnimationPositions(true);
						}
						zoomView();

						hasMinecraftCompensated = true;


						// Set initial positions and fill
						for (var j = 0; j < triangleArray.length; j++) {
							triangleArray[j].position.x = animationKeyFrames[currentKeyframe][j].position[1];
							triangleArray[j].position.y = animationKeyFrames[currentKeyframe][j].position[2];
						}

						view.play();
					} else {
						if (idSelected === 12) {
							setTimeout(function() {
								groupObjects(true);
							}, 500);
						} else {
							groupObjects(true);
						}
					}
				} else {
					currentKeyframe = animationKeyFrames.length-1;
					isAnimatingForward = false;

					if (idSelected === 3) { // Starcraft should delay longer.
						setTimeout(function() {
							view.play();
						}, 1400);
					} else {
						setTimeout(function() {
							view.play();
						}, 700);
					}
				}
			} else if (animationState === 'groupAnimation') {
				destroyClonedTriangles(groupArray, 1);
				if (idSelected === 12) {
					animationGroup.rotation = -90;
				}
				animationState = 'inTransition';
				if (idSelected === 5){ //snake
					destroyClonedTriangles(triangleArray, 14);
					currentKeyframe = 0;
					isAnimatingForward = true;
					animationKeyFrames = Anim.offscreenAnimation;
					animationDurations = offscreenDuration;
				} else {
					animationKeyFrames = Anim.globalAnimationHolder[idSelected];
					animationDurations = Anim.globalDurationHolder[idSelected];
					currentKeyframe = animationKeyFrames.length-1;
					isAnimatingForward = false;
				}
				groupArray = [];
				view.play();
			} else if (animationState === 'offscreenAnimation') {
				setFinalKeyFrames();
				animationKeyFrames = initAnimationValues;
				animationState = 'restingAnimation';
				animationKeyFrames = heartBeat;
				animationDurations = heartBeatDuration;
				initAnimationValues = animationKeyFrames;
				isAnimatingForward = true;
				fadeCopy(false);
			} else if (animationState === 'introAnimation') {
				animationKeyFrames = initAnimationValues;
				animationState = 'restingAnimation';
				animationKeyFrames = heartBeat;
				animationDurations = heartBeatDuration;
				initAnimationValues = animationKeyFrames;
				currentKeyframe = 0;
				isAnimatingForward = true;
				compensateLocation(true);
				view.play();
				fadeCopy(false);
			}
		} else {
			currentKeyframe= 0;
			if (animationState === 'inTransition') {
				console.log('resting');

				if (isMobile) {
					audioScriptApi.setPlayed(false);
				}

				animationKeyFrames = initAnimationValues;
				animationState = 'restingAnimation';
				animationKeyFrames = heartBeat;
				animationDurations = heartBeatDuration;
				initAnimationValues = animationKeyFrames;
				currentKeyframe = 0;
				isAnimatingForward = true;
				animationGroup = null;
				fadeCopy(false);
			}
		}
	}

	function setFinalKeyFrames() {
		for (var i = 0; i < triangleArray.length; i++) {
			if (animationKeyFrames[currentKeyframe][i].position.x) {
				posX = animationKeyFrames[currentKeyframe][i].position.x;
				posY = animationKeyFrames[currentKeyframe][i].position.y;
			} else {
				posX = animationKeyFrames[currentKeyframe][i].position[1];
				posY = animationKeyFrames[currentKeyframe][i].position[2];
			}

			triangleArray[i].position.x = posX;
			triangleArray[i].position.y = posY;
		}
	}

	function drawGrid(spacing) {
		var width = view.size.width;
		var height = view.size.height;

		for (var x = 0; x < width; x += spacing) {
			var gridLineVert = new Path();
			gridLineVert.add(new Point(x, 0));
			gridLineVert.add(new Point(x, height));
			gridLineVert.strokeColor = '#444';
			gridGroup.addChild(gridLineVert);
		}

		for (var y = 0; y < height; y += spacing) {
			var gridLineHoriz = new Path();
			gridLineHoriz.add(new Point(0, y));
			gridLineHoriz.add(new Point(width, y));
			gridLineHoriz.strokeColor = '#444';
			gridGroup.addChild(gridLineHoriz);
		}

		var centerVert = new Path();
		centerVert.add(new Point(view.size.width/2, 0));
		centerVert.add(new Point(view.size.width/2, view.size.height));
		centerVert.strokeColor = '#400';
		gridGroup.addChild(centerVert);

		var centerHoriz = new Path();
		centerHoriz.add(new Point(0, view.size.height/2));
		centerHoriz.add(new Point(view.size.width, view.size.height/2));
		centerHoriz.strokeColor = '#400';
		gridGroup.addChild(centerHoriz);

		gridGroup.opacity = 0;
	}

	function groupObjects(shouldPlay) {
		animationGroup = new Group(triangleArray);
		animationState = 'groupAnimation';
		if (globalGroupHolder[idSelected] !== '') {
			animationKeyFrames = globalGroupHolder[idSelected];
			animationDurations = globalGroupDurationHolder[idSelected];
			initAnimationValues = animationKeyFrames;
			if (typeof animationKeyFrames !== 'string' && !globalGroupHolder[idSelected].hasCompensated) {
				updateAnimationPositions(true);
				globalGroupHolder[idSelected].hasCompensated = true;
			}
		}
		currentKeyframe = 0;
		animationGroup.storedRotation = 0;
		animationGroup.storedScale = 1;
		isAnimatingForward = true;
		groupArray.push(animationGroup);

		if (shouldPlay) {
			if (animationKeyFrames[0].length > 0) {
				for (var i = 0; i < animationKeyFrames[0].length - 1; i++) {
					var newObject = animationGroup.clone();
					newObject.storedRotation = pathItem.storedRotation;
					groupArray.push(newObject);
				}
			}

			if (idSelected === 12) { //'frogger'
				animationGroup.rotation = 90;
			}
			view.play();
		}
	}

	function animateCoin(event) {
		if (event.count <= 18) {
			if (event.count === 3) {
				animationGroup.scale(0.6, 1);
			} else if (event.count === 6) {
				animationGroup.scale(-1.0, 1);
			} else if (event.count === 9) {
				animationGroup.scale(-1 / 0.6, 1);
			} else if (event.count === 12) {
				animationGroup.scale(1, 1);
			} else if (event.count === 15) {
				animationGroup.scale(0.6, 1);
			} else if (event.count === 18) {
				animationGroup.scale(1 / 0.6, 1);
			}
		} else {
			resetFromUnique();
		}
	}

	function animateHammer(event) {

		var point = triangleArray[0].segments[2].point;
		var startDelay = 30;
		var endDelay = 35;
		var isHammerFinished = false;

		if (currentAnimFrame < startDelay) {

		} else if (currentAnimFrame < (hammerDuration + startDelay)) {
			rotAmt = 20 / hammerDuration;
		} else if (currentAnimFrame < (hammerDuration * 2) + startDelay) {
			rotAmt = 20 / hammerDuration * -1;
		} else if (currentAnimFrame < (hammerDuration * 3) + startDelay) {
			rotAmt = 20 / hammerDuration;
		} else if (currentAnimFrame < (hammerDuration * 4) + startDelay) {
			rotAmt = 20 / hammerDuration * -1;
		} else if (currentAnimFrame < (hammerDuration * 5) + startDelay) {
			rotAmt = 20 / hammerDuration;
		} else if (currentAnimFrame < (hammerDuration * 6) + startDelay) {
			rotAmt = 20 / hammerDuration * -1;
		} else if (currentAnimFrame < (hammerDuration * 6) + startDelay + endDelay) {
			rotAmt = 0;
		} else {
			rotAmt = 0;
			isHammerFinished = true;
		}

		groupArray[0].rotate(rotAmt, point);
		hammerRotate += rotAmt;

		if (isHammerFinished) {
			resetFromUnique();
		}

		currentAnimFrame++;
	}

	function animateTriforce(event) {
		var point = triangleArray[7].segments[0].point;
		var isTriforceFinished = false;
		var startDelay = 30;

		if (currentAnimFrame < startDelay) {
			rotAmt = 0;
		} else if (currentAnimFrame < (triforceDuration + startDelay)) {
			rotAmt = 90 / triforceDuration;
		} else if (currentAnimFrame <= (triforceDuration + triforceMiddleDelay + startDelay)) {
			rotAmt = 0;
		} else if (currentAnimFrame <= (triforceDuration*2 + triforceMiddleDelay + startDelay)) {
			rotAmt = 90 / triforceDuration * -1;
		} else {
			rotAmt = 0;
			isTriforceFinished = true;
		}

		groupArray[0].rotate(rotAmt, point);
		triforceRotate += rotAmt;

		if (isTriforceFinished) {
			resetFromUnique();
		}

		currentAnimFrame++;
	}

	function animateSuperHeart(event) {
		var time = parseInt(event.time*10, 10);

		if (time < 8) {
			if (time%3 === 0) {
				scaleHolder = scaleHolder * 1.02;
				groupArray[0].scale(1.02);
			}
		} else if (scaleHolder > 1.02) {
			if (time%1 === 0) {
				scaleHolder = scaleHolder/1.02;
				groupArray[0].scale(1 / 1.02);
			}
		} else {
			resetFromUnique();
		}
	}

	function resetFromUnique() {
		animationState = 'inTransition';
		animationKeyFrames = Anim.globalAnimationHolder[idSelected];
		animationDurations = Anim.globalDurationHolder[idSelected];
		currentKeyframe = animationKeyFrames.length-1;
		isAnimatingForward = false;
		groupArray = [];
		view.play();
	}

	function resetView() {
		view._time = 0;
		view._count = 0;
		isAnimatingForward = !isAnimatingForward;
	}

	function generateRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	function createOffscreenAnim(polyCount) {
		for (var i = 0; i < polyCount; i++) {
			// Half of the triangles will start offscreen left, and the other half offscreen right.
			if (i % 2 === 0) {
				triangleArray[i].position.x = generateRandom(-75, -25);
			} else {
				triangleArray[i].position.x = generateRandom(1305, 1355);
			}

			triangleArray[i].position.y = generateRandom(-50, 829);
			triangleArray[i].storedRotation = generateRandom(0, 270);

			triangleArray[i].opacity = 1;

			var storageObj = new storageConstructor(
				triangleArray[i].position,
				triangleArray[i].storedRotation,
				triangleArray[i].fillColor,
				'triangle-' + i,
				triangleArray[i].opacity,
				triangleArray[i].scale);
			triangleStorage.push(storageObj);
		}

		offscreenAnimation.push(triangleStorage);
		offscreenAnimation.push(originalHeartFrame);
		console.log(JSON.stringify(offscreenAnimation));
	}

	function onResize(event) {
			view.scrollBy(lastPoint.subtract(view.center));
			lastPoint = view.center;

			zoomView();
	}

	function zoomView() {
		if ($(window).width() < 768 || $(window).height() < 670) {
			view.zoom = 1.2; // 1.8
		} else {
			view.zoom = 2.0; // 2.0
		}
	}

	/**
	 * change animation positions based on size on canvas
	 * @param isNew {bool} True for selecting new animation. False for resizing.
	 */
	function updateAnimationPositions(isNew) {
		for (var i = 0; i < animationKeyFrames.length; i++) {
			for (var j = 0; j < animationKeyFrames[i].length; j++) {
				var posX = initAnimationValues[i][j].position[1];
				var posY = initAnimationValues[i][j].position[2];

				if (isNew) {
					newPosX = posX + diffPosX;
					newPosY = posY + diffPosY;
				} else {
					newPosX = posX + (view.size.width - initCanvasWidth)/2;
					newPosY = posY + (view.size.height - initCanvasHeight)/2;
				}

				animationKeyFrames[i][j].position[1] = newPosX;
				animationKeyFrames[i][j].position[2] = newPosY;
			}
		}

		if (!isNew) {
			diffPosX += (view.size.width - initCanvasWidth)/2;
			diffPosY += (view.size.height - initCanvasHeight)/2;
		}

		initCanvasWidth = view.size.width;
		initCanvasHeight = view.size.height;
	}


	function startRestingAnimation() {
		if (Date.now() - restingAnimationTimeStart > restingAnimationTimeBetween) {
			window.clearInterval(restingAnimationInterval);
			restingAnimationInterval = null;
			animationState = 'restingAnimation';
			shouldPause = false;
			view.play();
		}
	}

	function fadeCopy(fadeOut) {
		if (fadeOut) {
			$('.canvas-title-container').addClass('is-fade-out');
			$('.canvas-copy').addClass('is-fade-out');
		} else {
			$('.canvas-title-container').removeClass('is-fade-out');
			$('.canvas-copy').removeClass('is-fade-out');
		}
	}

	return {
		init: init,
	};
}(jQuery, paper);

youtubePixel.init();