console.clear();

var tileSize = 32;
var tilearea = $("#tilearea");
var pHealth = $("#pHealthFill");
var enemies = [];

function Initialize() {
	initPlayerHealthBar();
	// console.log(Rect(tilearea));
	loadMapFromJSON('maps/map1.json');
	PlaceEnemies();
}

function loadMapFromJSON(filename) {
	$.ajax({
		async: false,
		url: filename,
		success: function(data) {
			for (var i = 0; i < data.map.length; i++) { // Y-axis
				for (var j = 0; j < data.map[i].length; j++) { // X-axis
					tilearea.append('<span class="tile tile-' + data.map[i][j] + '" data-passable="' + (data.map[i][j] === 0 ? false : true) + '" data-xy="' + (j * tileSize) + ',' + ((i + 2) * tileSize) + '">&nbsp;</span>');
				}
				tilearea.append('<br />');
			}

		}
	});
}

function PlaceEnemies() {
	var totalEnemies = 5;
	var enemiesPlaced = 0;
	var randIndex = 0;
	var randsUsed = [];
	for (var i in _.range(totalEnemies)) {
		randIndex = _.random(0, $(".tile[data-passable='true']").length);
		while (randsUsed.indexOf(randIndex) > -1) {
			randIndex = _.random(0, $(".tile[data-passable='true']").length);
		}
		randsUsed.push(randIndex);
		$(".tile[data-passable='true']").each(function(index) {
			if (index === randIndex) {
				$("#enemies").append('<div class="enemy" id="enemy-' + enemiesPlaced + '"></div>');
				$("#enemy-" + enemiesPlaced).css({
					'position': 'absolute',
					'top': (Rect($(this)).y + tileSize * 2) + 'px',
					'left': Rect($(this)).x + 'px'
				});
				enemies.push(Rect($("#enemy-" + enemiesPlaced)));
				enemies[enemiesPlaced].id = enemiesPlaced;
				enemiesPlaced++;
			}
		});
	}
	console.log(enemies);
}

function Rect(object) {
	return {
		x: object.position().left,
		y: object.position().top,
		width: object.width(),
		height: object.height()
	};
}

document.oncontextmenu = function() {
	return false;
};

$("body").mousedown(function(event) {
	// $(this).focus();
	if (event.button === 0) {
		console.log('body left-clicked');
	}
	if (event.button === 2) {

		console.log('body right-clicked');
	}
});

function clampValue(val, min, max) {
	return Math.max(min, Math.min(val, max));
}

function getPct(val1, val2) {
	return Math.round(val1 / val2 * 100);
}