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
        .update(Game.character.name);

    Crafty.e('DisplayText')
        .at(1, 0)
        .label('Level')
        .update(Game.character.level);

    Crafty.e('DisplayText')
        .at(0, 1)
        .label('Race')
        .update(Game.character.race);

    Crafty.e('DisplayText')
        .at(1, 1)
        .label('Class')
        .update(Game.character._class);

    Crafty.e('DisplayText')
        .at(0, 2)
        .label('Exp')
        .update(Game.character.exp);

    Crafty.e('DisplayText')
        .at(1, 2)
        .label('Gold')
        .update(Game.character.gold);

    Crafty.e('DisplayText')
        .at(0, 3)
        .label('HP')
        .update(Game.character.hp);

    Crafty.e('DisplayText')
        .at(1, 3)
        .label('MP')
        .update(Game.character.mp);

    Crafty.e('DisplayText')
        .at(0, 4)
        .label('STR')
        .update(Game.character.str);

    Crafty.e('DisplayText')
        .at(1, 4)
        .label('DEX')
        .update(Game.character.dex);

    Crafty.e('DisplayText')
        .at(0, 5)
        .label('INT')
        .update(Game.character._int);

    Crafty.e('DisplayText')
        .at(1, 5)
        .label('SPD')
        .update(Game.character.spd);

    Crafty.e('DisplayText')
        .at(0, 6)
        .label('DEF')
        .update(Game.character.def);

    Crafty.e('DisplayText')
        .at(1, 6)
        .label('DMG')
        .update(Game.character.dmg);

    Crafty.e('DisplayText')
        .at(0, 7)
        .label('Fire')
        .update(Game.character.fire);

    Crafty.e('DisplayText')
        .at(1, 7)
        .label('Light')
        .update(Game.character.light);

    Crafty.e('DisplayText')
        .at(0, 8)
        .label('Cold')
        .update(Game.character.cold);

    Crafty.e('DisplayText')
        .at(1, 8)
        .label('Poison')
        .update(Game.character.poison);

    Crafty.e('DisplayText')
        .at(0, 9)
        .label('Amulet')
        .update(Game.character.amulet?Game.character.amulet:'...');

    Crafty.e('DisplayText')
        .at(1, 9)
        .label('Helm')
        .update(Game.character.helm?Game.character.helm:'...');

    Crafty.e('DisplayText')
        .at(0, 11)
        .label('Ring')
        .update(Game.character.ring1?Game.character.ring1:'...');

    Crafty.e('DisplayText')
        .at(1, 11)
        .label('Ring')
        .update(Game.character.ring2?Game.character.ring2:'...');

    Crafty.e('DisplayText')
        .at(0, 13)
        .label('Pauldrons')
        .update(Game.character.pauldrons?Game.character.pauldrons:'...');

    Crafty.e('DisplayText')
        .at(1, 13)
        .label('Armour')
        .update(Game.character.armour?Game.character.armour:'...');

    Crafty.e('DisplayText')
        .at(0, 15)
        .label('Gloves')
        .update(Game.character.gloves?Game.character.gloves:'...');

    Crafty.e('DisplayText')
        .at(1, 15)
        .label('Belt')
        .update(Game.character.belt?Game.character.belt:'...');

    Crafty.e('DisplayText')
        .at(0, 17)
        .label('Leggings')
        .update(Game.character.leggings?Game.character.leggings:'...');

    Crafty.e('DisplayText')
        .at(1, 17)
        .label('Greaves')
        .update(Game.character.greaves?Game.character.greaves:'...');

    Crafty.e('DisplayText')
        .at(0, 19)
        .label('Weapon')
        .update(Game.character.weapon?Game.character.weapon:'...');

    Crafty.e('DisplayText')
        .at(1, 19)
        .label('Shield')
        .update(Game.character.shield?Game.character.shield:'...');
}