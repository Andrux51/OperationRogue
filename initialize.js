console.clear();

var tileSize = 32;
var tilearea = $("#tilearea");
var pHealth = $("#pHealthFill");

function Initialize() {
	UpdateUnitHealth(player);
	setUnitPopoverContent(player);
	loadMapFromJSON('maps/map' + _.random(1, 2) + '.json');
	PlacePlayer();
	PlaceEnemies();
	$(".tile").css('opacity', 0);
	$(".enemy").css('opacity', 0);
	FlashLight();
}

function UpdateUnitHealth(unit) {
	unit.healthBar.css('width', getPct(unit.health.current, unit.health.max));
	unit.healthBar.css('width', clampValue(Number(unit.healthBar.css('width').split('p')[0]), 0, 100));
	unit.healthBar.css('background-color', 'rgb(' +
		(100 - getPct(unit.health.current, unit.health.max)) +
		',' +
		(180 - getPct(unit.health.current, unit.health.max)) +
		',' +
		(255 - getPct(unit.health.current, unit.health.max)) +
		')');
	unit.health.current = clampValue(unit.health.current, 0, unit.health.max);
	if (unit === player) {
		$("#pHealth").html('&nbsp;' + getPct(unit.health.current, unit.health.max) + '%');
	}
}

function showGameOverScreen() {
	$("body").html('<div class="jumbotron"><h1>You lost! <small>(Score: ' + $("#score-num").html() + ')</small></h1><p>OH YOU SUCK! Refresh page to play again (F5)</p></div>');
	// do stuff
}

function setUnitPopoverContent(unit) {
	strTitle = unit.name;
	unit.popover.options.title = strTitle;
	strContent = '<strong>Health:</strong> ' + unit.health.current + '\/' + unit.health.max;
	strContent += '<br /><strong>Damage:</strong> ' + unit.damage.min + '-' + unit.damage.max;
	unit.popover.options.content = strContent;
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
				CheckForPassableTiles();
			}
		});
	}
}

// Can place enemies after map load at random intervals, either chance on turn ending, or over time
function PlaceEnemies() {
	var totalEnemies = 5;
	if (totalEnemies > $(".tile[data-passable='true']").length) totalEnemies = $(".tile[data-passable='true']").length - 1; // safety measure in case of small maps; -1 because enemy cannot spawn on top of player
	var enemiesOnCurrentMap = 0;
	var randIndex = 0;
	var randsUsed = [];
	while (enemiesOnCurrentMap < totalEnemies) {
		randIndex = _.random(0, $(".tile[data-passable='true']").length);
		while (randsUsed.indexOf(randIndex) > -1) {
			randIndex = _.random(0, $(".tile[data-passable='true']").length);
		}
		randsUsed.push(randIndex);
		$(".tile[data-passable='true']").each(function(index) {
			if (index === randIndex) {
				if (Rect($(this)).x === player.rect.x && (Rect($(this)).y + tileSize * 2) === player.rect.y) {
					return false;
				}
				$("#enemies").append('<div class="enemy" id="enemy-' + enemiesOnCurrentMap + '" style="background:url(\'images/I_Cannon01.png\')"></div>');
				$("#enemy-" + enemiesOnCurrentMap).css({
					'position': 'absolute',
					'top': (Rect($(this)).y + tileSize * 2) + 'px',
					'left': Rect($(this)).x + 'px'
				});
				enemies.push(Rect($("#enemy-" + enemiesOnCurrentMap)));
				enemies[enemiesOnCurrentMap].id = enemiesOnCurrentMap;
				enemies[enemiesOnCurrentMap].health = {current:20,max:20};
				enemiesOnCurrentMap++;
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