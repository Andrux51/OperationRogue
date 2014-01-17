var player = {
	name: "Alien Rogue",
	jq: $("#player"),
	healthBar: $("#pHealthFill"),
	rect: Rect($("#player")),
	health: {
		current: 110,
		max: 110
	},
	damage: {
		min: 6,
		max: 10
	},
	showStats: function() {
		strStats = '<strong>Health:</strong> ' + player.health.current + '\/' + player.health.max;
		strStats += '<br /><strong>Damage:</strong> ' + player.damage.min + '-' + player.damage.max;
		return strStats;
	},
	attackEnemy: function(enemy) {
		// These need to move to enemy.attackPlayer();
		player.health.current -= _.random(6, 10);
		setUnitPopoverContent(player);
		enemy.health.current -= _.random(player.damage.min, player.damage.max);
		// console.log(enemy.health);
		if (enemy.health.current <= 0) {
			DoEnemyDeath(enemy);
		}
	},
	takeTurn: function() {
		// console.log("player turn begins");
		enemyToCheck = {};
		enemyFound = {};
		switch (mvmtDirection) {
			case "right":
				enemyFound = FindObjectNearPlayer(enemies, 1, 0);
				if (!enemyFound) MoveUnit(player, 1, 0);
				break;
			case "left":
				enemyFound = FindObjectNearPlayer(enemies, -1, 0);
				if (!enemyFound) MoveUnit(player, -1, 0);
				break;
			case "up":
				enemyFound = FindObjectNearPlayer(enemies, 0, -1);
				if (!enemyFound) MoveUnit(player, 0, -1);
				break;
			case "upleft":
				enemyFound = FindObjectNearPlayer(enemies, -1, -1);
				if (!enemyFound) MoveUnit(player, -1, -1);
				break;
			case "upright":
				enemyFound = FindObjectNearPlayer(enemies, 1, -1);
				if (!enemyFound) MoveUnit(player, 1, -1);
				break;
			case "down":
				enemyFound = FindObjectNearPlayer(enemies, 0, 1);
				if (!enemyFound) MoveUnit(player, 0, 1);
				break;
			case "downleft":
				enemyFound = FindObjectNearPlayer(enemies, -1, 1);
				if (!enemyFound) MoveUnit(player, -1, 1);
				break;
			case "downright":
				enemyFound = FindObjectNearPlayer(enemies, 1, 1);
				if (!enemyFound) MoveUnit(player, 1, 1);
				break;
		}
		if (enemyFound) player.attackEnemy(enemyFound);

		CheckForPassableTiles();
		FlashLight();
		if (enemies.length === 0) $("body").html('<div class="jumbotron"><h1>You won! <small>(Score: ' + $("#score-num").html() + ')</small></h1><p>Hooray for you and your ability to win this super easy game! Refresh page to play again (F5)</p></div>');
		// console.log('%cplayer position: [' + player.rect.x + ', ' + player.rect.y + ']', 'background-color:#bd5');
		UpdateUnitHealth(player);
		if (player.health.current <= 0) showGameOverScreen();
		// console.log("player turn ends");
		// for(var i in enemies) enemy.takeTurn();
	}
};

function DoEnemyDeath(enemy) {
	// Give reward to player (above enemy death code because enemies will have xp value that needs to be added)
	$("#score-num").html(parseInt($("#score-num").html()) + 1);
	// Remove enemy from array and DOM
	enemies = _.without(enemies, enemy);
	$("#enemy-" + enemy.id).remove();
	// console.log(enemies);
}

player.jq.popover({
	html: true,
	container: 'body',
	placement: 'auto right',
	title: "Player",
	content: player.showStats(),
	trigger: 'manual'
});
player.popover = player.jq.data('bs.popover');

player.jq.mousedown(function(e) {
	if (e.button === 0) { // left-click
	}
	if (e.button === 2) { // right-click
		player.jq.popover('show');
	}
});

player.jq.mouseleave(function(e) {
	player.jq.popover('hide');
});