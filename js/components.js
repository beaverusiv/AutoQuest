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

// Display Text
Crafty.c('DisplayText', {
	init: function() {
		this.requires('2D, DOM, Text')
			.attr({ x: 0, y: 0, w: Game.character_screen.col_width, value: 0, name: '...' })
			.textFont({ family: Game.font.family, size: Game.font.size })
			.text('...');
	},

	// Position text
	at: function(col, row) {
		this.attr({ x: Game.character_screen.offset_x + 10 + (col * (Game.character_screen.col_width + Game.character_screen.padding)), y: Game.character_screen.offset_y + (row * Game.character_screen.row_height) });
		return this;
	},

	// Set label
	label: function(n) {
		this.attr({ name: n });
		return this;
	},

	// Change text
	update: function(val) {
		this.attr({ value: val });

		if('...' == this.name) {
			this.text('...');
		} else {
			this.text(this.name + ': ' + this.value);
		}
		return this;
	},
});

Crafty.c('ConsoleLine', {
	init: function() {
		this.requires('2D, DOM, Text')
			.attr({ x: 394, y: 758, w: 876 });
	},
	bar: function(_event, _speed, _callback) {
		this._bar = Crafty.e("2D, DOM, ProgressBar")
	        .attr({ x: 1070, y : 756, w: 200, h: 10, z: 100 })
	        .progressBar(100, false, "blue", "green")
	        .bind(_event, function(percent) {
	            this.updateBarProgress(percent);
	        });
	    Game.startTimedProgressBar(_event, 0, _speed, _callback);
	}
});