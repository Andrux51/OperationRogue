var enemies = [];
var enemiesPlaced = 0;
// var totalEnemies = 5;

function loadEnemyFromJSON(id) {
	$.ajax({
		async: true, // TODO: Make sure this is correct
		url: 'enemies/enemies.json',
		success: function(data) {
			// Could be faster, but this should be fast enough for all intents and purposes. MtG card set loads in less than a second with hundreds of records.
			for (var i in data) {
				if (data[i].id === id) {
					// This will essentially be the PlaceEnemies() function
					var enemyToAdd = addFunctionsToEnemyData(data[i]);
					// var enemiesOnCurrentMap;
					// if (enemiesOnCurrentMap < totalEnemies) addEnemyToGame(enemyToAdd)
				}
			}
		}
	});
}

function addFunctionsToEnemyData(enemy) {
	enemy.jq = $("#enemy-" + enemiesPlaced);
	enemy.health.current = enemy.health.max;
	enemy.takeTurn = function() {
		console.log(enemy.id+' taking turn');
	},
	enemy.attackPlayer = function() {
		player.health.current -= _.random(enemy.damage.min, enemy.damage.max);
		setUnitPopoverContent(player);
		if (player.health.current <= 0) showGameOverScreen();
	};
	enemy.updateHealth = function() {

	};
	return enemy;
}

function addEnemyToGame(enemy) {
	enemies.push(enemy);
	enemiesPlaced++;
}