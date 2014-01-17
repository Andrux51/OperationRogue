var mvmtDirection = "";
var possibleMoves = {};
var enemyToCheck = {};
var enemyFound = {};

$(document).keydown(function(e) {
	// console.log('%cKey pressed: ' + e.keyCode, 'background-color:#f60');
	// console.log(player.rect);

	// Debug test health increase/decrease
	if (e.keyCode === 70) player.health.current -= _.random(3, 10); // F
	if (e.keyCode === 71) player.health.current += _.random(3, 10); // G
	ControlMovement(e.keyCode);
	if (mvmtDirection !== "") player.takeTurn();

	if (e.keyCode === 116 || e.keyCode === 123) return; // allow F5, F12 *for development only*

	e.preventDefault();
	e.stopPropagation();
}).keyup(function(e) {
	// console.log('Key released: '+e.keyCode);
});

function ControlMovement(key) {
	// keyboard movement - keep player on screen
	mvmtDirection = "";
	if (possibleMoves.up && (key === 38 || key === 104)) { // Up or Numpad 8
		mvmtDirection = "up";
	}
	if (possibleMoves.upleft && key === 103) { // Numpad 7
		mvmtDirection = "upleft";
	}
	if (possibleMoves.upright && key === 105) { // Numpad 9
		mvmtDirection = "upright";
	}
	if (possibleMoves.right && (key === 39 || key === 102)) { // Right or Numpad 3,6,9
		mvmtDirection = "right";
	}
	if (possibleMoves.down && (key === 40 || key === 98)) { // Down or Numpad 1,2,3
		mvmtDirection = "down";
	}
	if (possibleMoves.downleft && key === 97) { // Numpad 7
		mvmtDirection = "downleft";
	}
	if (possibleMoves.downright && key === 99) { // Numpad 9
		mvmtDirection = "downright";
	}
	if (possibleMoves.left && (key === 37 || key === 100)) { // Left or Numpad 1,4,7
		mvmtDirection = "left";
	}
}

function CheckForPassableTiles() {
	// find all possible moves in 8 directions
	possibleMoves = {
		up: true,
		upleft: true,
		upright: true,
		right: true,
		down: true,
		downleft: true,
		downright: true,
		left: true
	};
	if (!tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + player.rect.y + "']").data('passable')) {
		possibleMoves.left = false;
	}
	if (!tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + player.rect.y + "']").data('passable')) {
		possibleMoves.right = false;
	}
	if (!tilearea.find("[data-xy='" + player.rect.x + "," + (player.rect.y - tileSize) + "']").data('passable')) {
		possibleMoves.up = false;
	}
	if (!tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + (player.rect.y - tileSize) + "']").data('passable')) {
		possibleMoves.upleft = false;
	}
	if (!tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + (player.rect.y - tileSize) + "']").data('passable')) {
		possibleMoves.upright = false;
	}
	if (!tilearea.find("[data-xy='" + player.rect.x + "," + (player.rect.y + tileSize) + "']").data('passable')) {
		possibleMoves.down = false;
	}
	if (!tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + (player.rect.y + tileSize) + "']").data('passable')) {
		possibleMoves.downleft = false;
	}
	if (!tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + (player.rect.y + tileSize) + "']").data('passable')) {
		possibleMoves.downright = false;
	}
	// console.log(possibleMoves);
}

function MoveUnit(unit,x, y) {
	unit.rect.x += x * tileSize;
	unit.rect.y += y * tileSize;
	unit.jq.css('left',unit.rect.x+'px').css('top',unit.rect.y+'px');
}

function CheckTileNearPlayer(x, y) {
	return {
		"x": (player.rect.x + x * tileSize),
		"y": (player.rect.y + y * tileSize)
	};
}

function FindObjectNearPlayer(array_of_objects, tile_to_check_x, tile_to_check_y) {
	if (_.findWhere(array_of_objects, CheckTileNearPlayer(tile_to_check_x, tile_to_check_y))) {
		return _.findWhere(array_of_objects, CheckTileNearPlayer(tile_to_check_x, tile_to_check_y));
	}
	return false;
}

function FlashLight() {
	for (var i in enemies) {
		var enemy = enemies[i];
		if (enemy.x >= (player.rect.x - tileSize * 2) && enemy.x <= (player.rect.x + tileSize * 2) && enemy.y >= (player.rect.y - tileSize * 2) && enemy.y <= (player.rect.y + tileSize * 2)) {
			$("#enemy-" + enemy.id).css('opacity', 1);
		}
	}
	// way too slow since it's checking EVERY tile every time
	// $(".tile").each(function(index) {
	// 	var tileRect = Rect($(this));
	// 	if (tileRect.x >= (player.rect.x - tileSize * 2) && tileRect.x <= (player.rect.x + tileSize * 2) && tileRect.y >= (player.rect.y - tileSize * 2) && tileRect.y <= (player.rect.y + tileSize * 2)) {
	// 		$(this).css('opacity', 1);
	// 	}
	// });
	tilearea.find("[data-xy='" + player.rect.x + "," + player.rect.y + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + player.rect.y + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize * 2) + "," + player.rect.y + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + player.rect.x + "," + (player.rect.y - tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + player.rect.x + "," + (player.rect.y - tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + player.rect.y + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize * 2) + "," + player.rect.y + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + player.rect.x + "," + (player.rect.y + tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + player.rect.x + "," + (player.rect.y + tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + (player.rect.y - tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + (player.rect.y - tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize * 2) + "," + (player.rect.y - tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize * 2) + "," + (player.rect.y - tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + (player.rect.y - tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + (player.rect.y - tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize * 2) + "," + (player.rect.y - tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize * 2) + "," + (player.rect.y - tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + (player.rect.y + tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize) + "," + (player.rect.y + tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize * 2) + "," + (player.rect.y + tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x - tileSize * 2) + "," + (player.rect.y + tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + (player.rect.y + tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize) + "," + (player.rect.y + tileSize * 2) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize * 2) + "," + (player.rect.y + tileSize) + "']").css('opacity', 1);
	tilearea.find("[data-xy='" + (player.rect.x + tileSize * 2) + "," + (player.rect.y + tileSize * 2) + "']").css('opacity', 1);
}