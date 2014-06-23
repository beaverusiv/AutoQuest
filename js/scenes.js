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

    Crafty.e('DisplayText')
        .at(10, 346)
        .label('STR')
        .update(10);

    Crafty.e('DisplayText')
        .at(197, 346)
        .label('DEX')
        .update(10);

    Crafty.e('DisplayText')
        .at(10, 366)
        .label('INT')
        .update(10);

    Crafty.e('DisplayText')
        .at(197, 366)
        .label('SPD')
        .update(10);

    Crafty.e('DisplayText')
        .at(10, 386)
        .label('DEF')
        .update(10);

    Crafty.e('DisplayText')
        .at(197, 386)
        .label('DMG')
        .update(10);

    Crafty.e('DisplayText')
        .at(10, 406)
        .label('Fire')
        .update(0);

    Crafty.e('DisplayText')
        .at(197, 406)
        .label('Light')
        .update(0);

    Crafty.e('DisplayText')
        .at(10, 426)
        .label('Cold')
        .update(0);

    Crafty.e('DisplayText')
        .at(197, 426)
        .label('Poison')
        .update(0);

    Crafty.e('DisplayText')
        .at(10, 446)
        .label('Amulet')
        .update('...');

    Crafty.e('DisplayText')
        .at(197, 446)
        .label('Helm')
        .update('...');

    Crafty.e('DisplayText')
        .at(10, 486)
        .label('Ring')
        .update('...');

    Crafty.e('DisplayText')
        .at(197, 486)
        .label('Ring')
        .update('...');

    Crafty.e('DisplayText')
        .at(10, 526)
        .label('Pauldrons')
        .update('Superior Healthy Shoulder Pads of Running');

    Crafty.e('DisplayText')
        .at(197, 526)
        .label('Armour')
        .update('...');

    Crafty.e('DisplayText')
        .at(10, 566)
        .label('Gloves')
        .update('Master Lined Mittens of Riding');

    Crafty.e('DisplayText')
        .at(197, 566)
        .label('Belt')
        .update('...');

    Crafty.e('DisplayText')
        .at(10, 606)
        .label('Leggings')
        .update('...');

    Crafty.e('DisplayText')
        .at(197, 606)
        .label('Greaves')
        .update('...');

    Crafty.e('DisplayText')
        .at(10, 646)
        .label('Weapon')
        .update('...');

    Crafty.e('DisplayText')
        .at(197, 646)
        .label('Shield')
        .update('...');

});