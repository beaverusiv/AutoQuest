Crafty.scene('Fighting', function() {
    setupMiniMap();
    setupCharacterScreen();

    var monster = MonsterManager.spawn(Game.character.level);

    //hp / (lvl * def + 0.6 * spd) / (lvl * (dmg + (0.1 * str) + 0.2 * spd)
    var speed = monster.stats[3] / ((monster.level * monster.stats[5]) + (0.6 * monster.stats[7])) / Game.character.level * (Game.character.dmg + (0.1 * Game.character.str) + (0.2 * Game.character.spd));

    Crafty.e('ConsoleLine')
        .text('Fighting a '+monster.name+'...')
        .done('Fought a '+monster.name+'.')
        .bar('FIGHTING_'+Game.console_line_ids, speed, function() { Crafty.scene('Fighting__victory'); });
});

Crafty.scene('Fighting__victory', function() {
    setupMiniMap();
    setupCharacterScreen();

    //TODO: Function based on monster and lvl
    Game.character.exp += 100;
    Game.character.level = Math.floor(Game.character.exp / 1000) + 1;

    Crafty.e('ConsoleLine')
        .text('Victory! You gained a Potion and 34 gold!');

    // If inventory is full or hp below 15%
    // TODO: replace 100 with maxHp function
    if( Game.character.inventory.length > Game.character.str / 2 - 3
        || Math.floor((Game.character.hp * 100) / 100) < 15 ) {
        Crafty.scene('Travelling__town');
    } else {
        Crafty.scene('Fighting');
    }
});

Crafty.scene('Travelling__fight', function() {
    setupMiniMap();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Travelling to the killing fields...')
        .done('Travelled to the killing fields.')
        .bar('TRAVELLING_TO_FIGHT_'+Game.console_line_ids, 20, function() { Crafty.scene('Fighting'); });
});

Crafty.scene('Travelling__town', function() {
    setupMiniMap();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Travelling to the village...')
        .bar('TRAVELLING_TO_TOWN_'+Game.console_line_ids, 20, function() { Crafty.scene('Town'); });
});

// TODO: town or inn?
Crafty.scene('Town', function() {
    setupMiniMap();
    setupCharacterScreen();
});
