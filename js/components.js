Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},
 
	// Locate this entity at the given position on the grid
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	}
});

// An "Actor" is an entity that is drawn in 2D on canvas
// via our logical coordinate grid
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});
 
// A Tree is just an Actor with a certain color
Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Color')
			.color('rgb(20, 125, 40)');
	},
});
 
// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
	init: function() {
		this.requires('Actor, Color')
			.color('rgb(20, 185, 40)');
	},
});

// Character
Crafty.c('Character', {
	init: function() {
		this._stats = [10,10,10,100,30,10,2,5,0,0,0,0];
		this._stat_names = ['STR', 'DEX', 'INT', 'HP', 'MP', 'DEF', 'DMG', 'SPD', 'FRES', 'CRES', 'LRES', 'PRES'];
	},

})