var player = {
	rect: Rect($("#player")),
	health: {
		current: 110,
		max: 110
	},
	damage: {
		min: 6,
		max: 10
	},
};

$("#player").popover({
	html: true,
	container: 'body',
	placement: 'auto right',
	title: "player",
	content: "it's you!",
	trigger: 'manual'
});

$("#player").mousedown(function(event) {
	if (event.button === 0) { // left-click
	}
	if (event.button === 2) { // right-click
		$(this).popover('show');
	}
});
$("#player").mouseleave(function(event) {
	$(this).popover('hide');
});

function initPlayerHealthBar() {
	pHealth.css('width', getPct(player.health.current, player.health.max));
	$("#pHealth").html('&nbsp;' + getPct(player.health.current, player.health.max) + '%');
	player.updateHealth();
}

player.updateHealth = function() {
	pHealth.css('width', getPct(player.health.current, player.health.max));
	pHealth.css('width', clampValue(Number(pHealth.css('width').split('p')[0]), 0, 100));
	pHealth.css('background-color', 'rgb(' +
		(100 - getPct(player.health.current, player.health.max)) +
		',' +
		(180 - getPct(player.health.current, player.health.max)) +
		',' +
		(255 - getPct(player.health.current, player.health.max)) +
		')');
	player.health.current = clampValue(player.health.current, 0, player.health.max);
	$("#pHealth").html('&nbsp;' + getPct(player.health.current, player.health.max) + '%');
}

player.attackEnemy = function(enemy) {
	player.health.current -= 20;
	enemies = _.without(enemies, enemy);
	$("#enemy-" + enemy.id).remove();
	console.log(enemies);
	$("#score-num").html(parseInt($("#score-num").html())+1);
}
