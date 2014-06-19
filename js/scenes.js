Crafty.scene('Game', function() {
    // Minimap
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
            if (at_edge) {
                // Place a tree entity at the current tile
                Crafty.e('Tree').at(x, y);
            } else if (Math.random() < 0.06) {
                // Place a bush entity at the current tile
                Crafty.e('Bush').at(x, y);
            }
        }
    }

    // LCS
});