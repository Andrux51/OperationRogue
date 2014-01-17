# OperationRogue

Simple Roguelike game project built in jQuery/HTML5/CSS3

## Primary functionality

#### Player can move in 8 directions (UL,U,UR,L,R,DL,D,DR)
* Keypress (numpad) - check if tile is walkable && no enemies on destination

#### Player can attack enemies
* Walking into an enemy constitutes a melee attack
    * "Roll dice" for damage

#### Enemy can attack player
* Enemy always tries to get to melee range and attack

#### Terrain generated procedurally 
* 32x32px tiles
* Rooms (size 3x3 - 10x10)
* Hallways (any length, must always be connected to at least one room & be one tile wide)
* Stairway (1 per level, must be in a room)

## Extra Features

#### In-game clock
* Show real time for player to keep track of the clock in the real world
* Show amount of time elapsed
    * This can create strategic factors such as disaster striking if too much time spent on a single level without pausing

#### Pause gameplay allowed
* Until time is implemented, pause is unnecessary
* Pause can lead to a menu of inventory, save, and so forth

#### Ranged attack (use arrow keys - haha, get it?)
* Low damage, limited ammo

#### Inventory (weapon, armor/shield, items?)
* Either managed, or new replaces old (confirm equip)

#### Abilities (single slot, or managed list)
* Single slot will impact strategy (good or bad?) but easier to code! (confirm pickup new ability)
