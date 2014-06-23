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
        .at(0, 0)
        .label('Name')
        .update('BeaverusIV');

    Crafty.e('DisplayText')
        .at(1, 0)
        .label('Level')
        .update(1);

    Crafty.e('DisplayText')
        .at(0, 1)
        .label('Race')
        .update('Human');

    Crafty.e('DisplayText')
        .at(1, 1)
        .label('Class')
        .update('Barbarian');

    Crafty.e('DisplayText')
        .at(0, 2)
        .label('Exp')
        .update(0);

    Crafty.e('DisplayText')
        .at(1, 2)
        .label('Gold')
        .update(0);

    Crafty.e('DisplayText')
        .at(0, 3)
        .label('HP')
        .update(100);

    Crafty.e('DisplayText')
        .at(1, 3)
        .label('MP')
        .update(10);

    Crafty.e('DisplayText')
        .at(0, 4)
        .label('STR')
        .update(10);

    Crafty.e('DisplayText')
        .at(1, 4)
        .label('DEX')
        .update(10);

    Crafty.e('DisplayText')
        .at(0, 5)
        .label('INT')
        .update(10);

    Crafty.e('DisplayText')
        .at(1, 5)
        .label('SPD')
        .update(10);

    Crafty.e('DisplayText')
        .at(0, 6)
        .label('DEF')
        .update(10);

    Crafty.e('DisplayText')
        .at(1, 6)
        .label('DMG')
        .update(10);

    Crafty.e('DisplayText')
        .at(0, 7)
        .label('Fire')
        .update(0);

    Crafty.e('DisplayText')
        .at(1, 7)
        .label('Light')
        .update(0);

    Crafty.e('DisplayText')
        .at(0, 8)
        .label('Cold')
        .update(0);

    Crafty.e('DisplayText')
        .at(1, 8)
        .label('Poison')
        .update(0);

    Crafty.e('DisplayText')
        .at(0, 9)
        .label('Amulet')
        .update('...');

    Crafty.e('DisplayText')
        .at(1, 9)
        .label('Helm')
        .update('...');

    Crafty.e('DisplayText')
        .at(0, 11)
        .label('Ring')
        .update('...');

    Crafty.e('DisplayText')
        .at(1, 11)
        .label('Ring')
        .update('...');

    Crafty.e('DisplayText')
        .at(0, 13)
        .label('Pauldrons')
        .update('Superior Healthy Shoulder Pads of Running');

    Crafty.e('DisplayText')
        .at(1, 13)
        .label('Armour')
        .update('...');

    Crafty.e('DisplayText')
        .at(0, 15)
        .label('Gloves')
        .update('Master Lined Mittens of Riding');

    Crafty.e('DisplayText')
        .at(1, 15)
        .label('Belt')
        .update('...');

    Crafty.e('DisplayText')
        .at(0, 17)
        .label('Leggings')
        .update('...');

    Crafty.e('DisplayText')
        .at(1, 17)
        .label('Greaves')
        .update('...');

    Crafty.e('DisplayText')
        .at(0, 19)
        .label('Weapon')
        .update('...');

    Crafty.e('DisplayText')
        .at(1, 19)
        .label('Shield')
        .update('...');

});