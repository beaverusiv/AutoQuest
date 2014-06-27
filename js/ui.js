// TODO: setup an actual map and display a minimap
function setupMiniMap() {
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
}

function setupCharacterScreen() {
    Crafty.e('DisplayText')
        .at(0, 0)
        .label('Name')
        .update(Character._name);

    Crafty.e('DisplayText')
        .at(1, 0)
        .label('Level')
        .update(Character._level);

    Crafty.e('DisplayText')
        .at(0, 1)
        .label('Race')
        .update(Character._race);

    Crafty.e('DisplayText')
        .at(1, 1)
        .label('Class')
        .update(Character._class.name);

    Crafty.e('DisplayText')
        .at(0, 2)
        .label('Exp')
        .update(Character._exp);

    Crafty.e('DisplayText')
        .at(1, 2)
        .label('Gold')
        .update(Character._gold);

    Crafty.e('DisplayText')
        .at(0, 3)
        .label('HP')
        .update(Character.hp());

    Crafty.e('DisplayText')
        .at(1, 3)
        .label('MP')
        .update(Character.mp());

    Crafty.e('DisplayText')
        .at(0, 4)
        .label('STR')
        .update(Character.str());

    Crafty.e('DisplayText')
        .at(1, 4)
        .label('DEX')
        .update(Character.dex());

    Crafty.e('DisplayText')
        .at(0, 5)
        .label('INT')
        .update(Character.int());

    Crafty.e('DisplayText')
        .at(1, 5)
        .label('SPD')
        .update(Character.spd());

    Crafty.e('DisplayText')
        .at(0, 6)
        .label('DEF')
        .update(Character.def());

    Crafty.e('DisplayText')
        .at(1, 6)
        .label('DMG')
        .update(Character.dmg());

    Crafty.e('DisplayText')
        .at(0, 7)
        .label('Fire')
        .update(Character.fire());

    Crafty.e('DisplayText')
        .at(1, 7)
        .label('Light')
        .update(Character.light());

    Crafty.e('DisplayText')
        .at(0, 8)
        .label('Cold')
        .update(Character.cold());

    Crafty.e('DisplayText')
        .at(1, 8)
        .label('Poison')
        .update(Character.poison());

    Crafty.e('DisplayText')
        .at(0, 9)
        .label('Amulet')
        .update(Character.amulet()?Character.amulet():'...');

    Crafty.e('DisplayText')
        .at(1, 9)
        .label('Helm')
        .update(Character.helm()?Character.helm():'...');

    Crafty.e('DisplayText')
        .at(0, 11)
        .label('Ring')
        .update(Character.ring1()?Character.ring1():'...');

    Crafty.e('DisplayText')
        .at(1, 11)
        .label('Ring')
        .update(Character.ring2()?Character.ring2():'...');

    Crafty.e('DisplayText')
        .at(0, 13)
        .label('Pauldrons')
        .update(Character.pauldrons()?Character.pauldrons():'...');

    Crafty.e('DisplayText')
        .at(1, 13)
        .label('Armour')
        .update(Character.armour()?Character.armour():'...');

    Crafty.e('DisplayText')
        .at(0, 15)
        .label('Gloves')
        .update(Character.gloves()?Character.gloves():'...');

    Crafty.e('DisplayText')
        .at(1, 15)
        .label('Belt')
        .update(Character.belt()?Character.belt():'...');

    Crafty.e('DisplayText')
        .at(0, 17)
        .label('Leggings')
        .update(Character.leggings()?Character.leggings():'...');

    Crafty.e('DisplayText')
        .at(1, 17)
        .label('Greaves')
        .update(Character.greaves()?Character.greaves():'...');

    Crafty.e('DisplayText')
        .at(0, 19)
        .label('Weapon')
        .update(Character.weapon()?Character.weapon():'...');

    Crafty.e('DisplayText')
        .at(1, 19)
        .label('Shield')
        .update(Character.shield()?Character.shield():'...');
}