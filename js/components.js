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
			return { x: Game.map_grid.offset_x + this.x/Game.map_grid.tile.width, y: Game.map_grid.offset_y + this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: Game.map_grid.offset_x + x * Game.map_grid.tile.width, y: Game.map_grid.offset_y + y * Game.map_grid.tile.height });
			return this;
		}
	}
});

// An "Actor" is an entity that is drawn in 2D on canvas
// via our logical coordinate grid
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	}
});

Crafty.c('Snow', {
	init: function() {
		this.requires('Actor, snow');
	}
});

Crafty.c('Rock', {
	init: function() {
		this.requires('Actor, rock');
	}
});

Crafty.c('Shallow Water', {
    init: function() {
        this.requires('Actor, water');
    }
});

Crafty.c('Deep Water', {
    init: function() {
        this.requires('Actor, water');
    }
});

Crafty.c('Forest', {
    init: function() {
        this.requires('Actor, forest');
    }
});

Crafty.c('Plains', {
    init: function() {
        this.requires('Actor, plains');
    }
});

Crafty.c('Town', {
    init: function() {
        this.requires('Actor, town');
    }
});

Crafty.c('Dungeon', {
    init: function() {
        this.requires('Actor, dungeon');
    }
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
	}
});

Crafty.c('ConsoleItem', {
	init: function() {
		this.requires('2D, DOM, Persist')
			.bind('ConsoleLineShift', this._shift);
	},
	_shift: function () {
		this.y -= 20;
		if(this.y < 678) this.destroy();
	}
});

Crafty.c('ConsoleLine', {
	_done: '',
	init: function() {
		Crafty.trigger('ConsoleLineShift');
		this.requires('Text, ConsoleItem')
			.attr({ x: 394, y: 738, w: 876 });
		Game.console_line_ids = (Game.console_line_ids + 1) % 6;
	},
	bar: function(_event, _speed, _callback) {
		Crafty.e('ProgressBar, ConsoleItem')
	        .attr({ x: 1070, y : 740, w: 200, h: 10, z: 100 })
	        .progressBar(100, false, 'blue', 'green')
	        .bind(_event, function(percent) {
	            this.updateBarProgress(percent);
	        });
	    Game.startTimedProgressBar(_event, 0, _speed, _callback);

	    this.bind(_event+'_done', function() {
	    	this.text(this._done);
	    });

	    return this;
	},
	done: function(text) {
		this._done = text;

		return this;
	}
});