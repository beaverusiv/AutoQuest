Crafty.scene('Game', function() {
    // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
            if (at_edge) {
                // Place a tree entity at the current tile
                Crafty.e('2D, Canvas, Color').attr({
                    x: x * Game.map_grid.tile.width,
                    y: y * Game.map_grid.tile.height,
                    w: Game.map_grid.tile.width,
                    h: Game.map_grid.tile.height
                }).color('rgb(20, 125, 40)');
            } else if (Math.random() < 0.06) {
                // Place a bush entity at the current tile
                Crafty.e('2D, Canvas, Color').attr({
                    x: x * Game.map_grid.tile.width,
                    y: y * Game.map_grid.tile.height,
                    w: Game.map_grid.tile.width,
                    h: Game.map_grid.tile.height
                }).color('rgb(20, 185, 40)');
            }
        }
    }
});