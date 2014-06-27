Crafty.scene('Fighting', function() {
    setupMiniMap();
    setupCharacterScreen();

    var monster = MonsterManager.spawn(Character._level);

    //hp / (lvl * def + 0.6 * spd) / (lvl * (dmg + (0.1 * str) + 0.2 * spd)
    var speed = monster.stats[3] / ((monster.level * monster.stats[5]) + (0.6 * monster.stats[7])) / Character._level * (Character.dmg() + (0.1 * Character.str()) + (0.2 * Character.spd()));

    Crafty.e('ConsoleLine')
        .text('Fighting a '+monster.name+'...')
        .done('Fought a '+monster.name+'.')
        .bar('FIGHTING_'+Game.console_line_ids, speed, function() { Crafty.scene('Fighting__victory', monster); });
});

Crafty.scene('Fighting__victory', function(monster) {
    setupMiniMap();
    setupCharacterScreen();

    Character.gainExp(monster.level);
    Character.addItem(ItemManager.getItem(monster.level, Character._level));

    Crafty.e('ConsoleLine')
        .text('Victory! You gained a Potion and 34 gold!');

    // If inventory is full or hp below 15%
    // TODO: replace 100 with maxHp function
    if( Character._inventory.length > Character.str() / 2 - 3
        || Math.floor((Character.hp() * 100) / 100) < 15 ) {
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
