Crafty.scene('Fighting', function() {
    setupMiniMap();
    setupCharacterScreen();

    var monster = MonsterManager.spawn(Game.character.level);

    //hp / (lvl * def + 0.6 * spd) / (lvl * (dmg + (0.1 * str) + 0.2 * spd)
    var speed = monster.stats[3] / ((monster.level * monster.stats[5]) + (0.6 * monster.stats[7])) / Game.character.level * (Game.character.dmg + (0.1 * Game.character.str) + (0.2 * Game.character.spd));

    Game.console_line_ids = (Game.console_line_ids + 1) % 6;
    Crafty.e('ConsoleLine')
        .text('Fighting a '+monster.name+'...')
        .done('Fought a '+monster.name+'.')
        .bar('FIGHTING_'+Game.console_line_ids, speed, function() { Crafty.scene('Fighting'); });
});

Crafty.scene('Travelling__fight', function() {
    setupMiniMap();
    setupCharacterScreen();

    Game.console_line_ids = (Game.console_line_ids + 1) % 6;
    Crafty.e('ConsoleLine')
        .text('Travelling to the killing fields...')
        .done('Travelled to the killing fields.')
        .bar('TRAVELLING_TO_FIGHT_'+Game.console_line_ids, 20, function() { Crafty.scene('Fighting', 0); });
});

Crafty.scene('Travelling__town', function() {
    setupMiniMap();
    setupCharacterScreen();

    Game.console_line_ids = (Game.console_line_ids + 1) % 6;
    Crafty.e('ConsoleLine')
        .text('Travelling to the village...')
        .bar('TRAVELLING_TO_TOWN_'+Game.console_line_ids, 20, function() { Crafty.scene('Town'); });
});

// TODO: town or inn?
Crafty.scene('Town', function() {
    setupMiniMap();
    setupCharacterScreen();
});
