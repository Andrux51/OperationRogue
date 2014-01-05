var mvmtDirection = "";
var possibleMoves = {};

function DoControls() {
	$(document).keydown(function(event) {
		var key = event.keyCode;
		// console.log('%cKey pressed: ' + key, 'background-color:#f60');
		// console.log(player.rect);

		// Debug test health increase/decrease
		if (key === 70) player.health.current -= _.random(3, 10); // F
		if (key === 71) player.health.current += _.random(3, 10); // G
		ControlMovement(key);

		player.updateHealth();

		if (key === 116 || key === 123) return; // allow F5, F12 *for development only*

		event.preventDefault();
		event.stopPropagation();
	}).keyup(function(event) {
		var key = event.keyCode;
		// console.log('Key released: '+key);
	});
}

function ControlMovement(key) {
	SetPossibleMoves();
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
	if (mvmtDirection) DoPlayerMovement();
}

function SetPossibleMoves() {
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
}

function DoPlayerMovement() {
	// console.log("player movement begins");
	var enemyToCheck = {};
	var enemyFound = {};
	switch (mvmtDirection) {
		case "right":
			enemyToCheck.x = (player.rect.x + tileSize);
			enemyToCheck.y = player.rect.y;
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.x += tileSize;
			}
			break;
		case "left":
			enemyToCheck.x = (player.rect.x - tileSize);
			enemyToCheck.y = player.rect.y;
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.x -= tileSize;
			}
			break;
		case "up":
			enemyToCheck.x = player.rect.x;
			enemyToCheck.y = (player.rect.y - tileSize);
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.y -= tileSize;
			}
			break;
		case "upleft":
			enemyToCheck.x = (player.rect.x - tileSize);
			enemyToCheck.y = (player.rect.y - tileSize);
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.y -= tileSize;
				player.rect.x -= tileSize;
			}
			break;
		case "upright":
			enemyToCheck.x = (player.rect.x + tileSize);
			enemyToCheck.y = (player.rect.y - tileSize);
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.y -= tileSize;
				player.rect.x += tileSize;
			}
			break;
		case "down":
			enemyToCheck.x = player.rect.x;
			enemyToCheck.y = (player.rect.y + tileSize);
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.y += tileSize;
			}
			break;
		case "downleft":
			enemyToCheck.x = (player.rect.x - tileSize);
			enemyToCheck.y = (player.rect.y + tileSize);
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.y += tileSize;
				player.rect.x -= tileSize;
			}
			break;
		case "downright":
			enemyToCheck.x = (player.rect.x + tileSize);
			enemyToCheck.y = (player.rect.y + tileSize);
			if (_.findWhere(enemies, enemyToCheck)) {
				enemyFound = _.findWhere(enemies, enemyToCheck);
				player.attackEnemy(enemyFound);
			} else {
				player.rect.y += tileSize;
				player.rect.x += tileSize;
			}
			break;
	}

	$("#player").css('left', player.rect.x + 'px').css('top', player.rect.y + 'px');
	if (enemies.length === 0) {
		$("body").html('<div class="jumbotron"><h1>You won!</h1><p>Hooray for you and your ability to win this super easy game! Refresh page to play again (F5)</p></div>');
	}
	// console.log('%cplayer position: [' + player.rect.x + ', ' + player.rect.y + ']', 'background-color:#bd5');
	// console.log("player movement ends");
}