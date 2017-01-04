Map = {
    // TODO: Generate towns, caves
    tiles: [],
    towns: [],
    dungeons: [],
    init: function() {
        for (var x = 0; x < Game.map_grid.width; x++ ) {
            this.tiles[x] = [];
        }
        var noiseGen = new FastSimplexNoise({ frequency: 0.03, max: 255, min: 0, octaves: 8 });

        for (x = 0; x < Game.map_grid.width; x++) for (var y = 0; y < Game.map_grid.height; y++) {
            this.tiles[x][y] = noiseGen.scaled([x, y]);
        }

        var flattened_tiles = _.flatten(this.tiles);
        var min = Math.min.apply(null, flattened_tiles);
        var max = Math.max.apply(null, flattened_tiles);
        var water_line = min + (max - min) * 0.3;
        var mountain_line = min + (max - min) * 0.8;
        var towns = [];

        // Convert to entity codes
        for (x = 0; x < Game.map_grid.width; x++) for (y = 0; y < Game.map_grid.height; y++) {
            // Below waterline
            if (this.tiles[x][y] <= water_line) {
                if(this.tiles[x][y] > min + (water_line / 3.75)) {
                    if(Math.random() < 0.005) {
                        this.tiles[x][y] = 'Dungeon';
                        this.dungeons.push({x: x, y: y});
                    } else {
                        this.tiles[x][y] = 'Shallow Water';
                    }
                } else {
                    this.tiles[x][y] = 'Deep Water';
                }
            } else if(this.tiles[x][y] >= mountain_line) {
                if(this.tiles[x][y] > mountain_line + ((max - mountain_line) / 3.0)) {
                    this.tiles[x][y] = 'Snow';
                } else {
                    if(Math.random() < 0.015) {
                        this.tiles[x][y] = 'Dungeon';
                        this.dungeons.push({x: x, y: y});
                    } else {
                        this.tiles[x][y] = 'Rock';
                    }
                }
            } else {
                if(this.tiles[x][y] > min + ((max - min) / 2.0)) {
                    if(Math.random() < 0.01) {
                        this.tiles[x][y] = 'Dungeon';
                        this.dungeons.push({x: x, y: y});
                    } else {
                        this.tiles[x][y] = 'Forest';
                    }
                } else {
                    if(Math.random() < 0.015) {
                        this.tiles[x][y] = 'Town';
                        this.towns.push({x: x, y: y});
                    } else {
                        this.tiles[x][y] = 'Plains';
                    }
                }
            }
        }
    },
    render: function() {
        for (var x = 0; x < Game.map_grid.width; x++) {
            for (var y = 0; y < Game.map_grid.height; y++) {
                Crafty.e(this.tiles[x][y]).at(x, y);
            }
        }
    }
};
Map.init();