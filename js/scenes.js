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
    Crafty.e('DisplayText')
        .at(10, 266)
        .label('Name')
        .update('BeaverusIV');

    Crafty.e('DisplayText')
        .at(197, 266)
        .label('Level')
        .update(1);

    Crafty.e('DisplayText')
        .at(10, 286)
        .label('Race')
        .update('Human');

    Crafty.e('DisplayText')
        .at(197, 286)
        .label('Class')
        .update('Barbarian');

    Crafty.e('DisplayText')
        .at(10, 306)
        .label('Exp')
        .update(0);

    Crafty.e('DisplayText')
        .at(197, 306)
        .label('Gold')
        .update(0);

    Crafty.e('DisplayText')
        .at(10, 326)
        .label('HP')
        .update(100);

    Crafty.e('DisplayText')
        .at(197, 326)
        .label('MP')
        .update(10);
});