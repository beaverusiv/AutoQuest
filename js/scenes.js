Crafty.scene('Fighting', function() {
    setupMiniMap();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Fighting a Monstrous Boar...')
        .bar('FIGHTING', 40, function() { Crafty.scene('Fighting'); });
});

Crafty.scene('Travelling__fight', function() {
    setupMiniMap();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Travelling to the killing fields...')
        .bar('TRAVELLING_TO_FIGHT', 20, function() { Crafty.scene('Fighting'); });
});

Crafty.scene('Travelling__town', function() {
    setupMiniMap();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Travelling to the village...')
        .bar('TRAVELLING_TO_TOWN', 20, function() { Crafty.scene('Town'); });
});

// TODO: town or inn?
Crafty.scene('Town', function() {
    setupMiniMap();
    setupCharacterScreen();
});
