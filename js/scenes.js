Crafty.scene('Fighting', function() {
    setupMiniMap();
    setupCharacterScreen();

    Game.console_line_ids = (Game.console_line_ids + 1) % 6;
    Crafty.e('ConsoleLine')
        .text('Fighting a Monstrous Boar...')
        .done('Fought a Monstrous Boar.')
        .bar('FIGHTING_'+Game.console_line_ids, 40, function() { Crafty.scene('Fighting'); });
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
