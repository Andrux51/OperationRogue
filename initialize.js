console.clear();

var tileSize = 32;
var tilearea = $("#tilearea");
var pHealth = $("#pHealthFill");
var enemies = [];

function Initialize() {
	initPlayerHealthBar();
	loadMapFromJSON('maps/map' + _.random(1, 2) + '.json');
	PlacePlayer();
	PlaceEnemies();
	$(".tile").css('opacity', 0);
	$(".enemy").css('opacity', 0);
	FlashLight();
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

function PlacePlayer() {
	// Be sure when placing other things that they cannot spawn on top of the player.
	possibleMoves.up = false;
	var randIndex = 0;
	while (!_.every(possibleMoves)) {
		randIndex = _.random(0, $(".tile[data-passable='true']").length);
		$(".tile[data-passable='true']").each(function(index) {
			var tileRect = Rect($(this));
			if (index === randIndex) {
				$("#player").css('left', tileRect.x).css('top', (tileRect.y + tileSize * 2));
				player.rect = Rect($("#player"));
				SetPossibleMoves();
			}
		});
	}
}

function PlaceEnemies() {
	var totalEnemies = 5;
	if (totalEnemies > $(".tile[data-passable='true']").length) totalEnemies = $(".tile[data-passable='true']").length - 1; // safety measure in case of small maps; -1 because enemy cannot spawn on top of player
	var enemiesPlaced = 0;
	var randIndex = 0;
	var randsUsed = [];
	while (enemiesPlaced < totalEnemies) {
		randIndex = _.random(0, $(".tile[data-passable='true']").length);
		while (randsUsed.indexOf(randIndex) > -1) {
			randIndex = _.random(0, $(".tile[data-passable='true']").length);
		}
		randsUsed.push(randIndex);
		$(".tile[data-passable='true']").each(function(index) {
			if (index === randIndex) {
				if (Rect($(this)).x === player.rect.x && (Rect($(this)).y + tileSize * 2) === player.rect.y) {
					// console.log("tried to place " + enemiesPlaced + " on top of player, but we can fix it!");
					return false;
				}
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
	// console.log(enemies);
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