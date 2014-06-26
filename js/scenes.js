Crafty.scene('Fighting', function() {
    setupMiniMap();
    setupCharacterScreen();
});

Crafty.scene('Travelling__fight', function() {
    setupMiniMap();
    setupCharacterScreen();

    Game.pushConsoleLine('Travelling to the killing fields...', 'TRAVELLING_TO_FIGHT', 20, function() { Crafty.scene('Fighting'); });
});

Crafty.scene('Travelling__home', function() {
    setupMiniMap();
    setupCharacterScreen();

     Crafty.e('2D, DOM, Text')
        .attr({ x: 394, y: 620, w: 300 })
        .text('Travelling to the village...');

    Crafty.e("2D, DOM, ProgressBar")
        .attr({ x: 554, y : 622, w: 100, h: 10, z: 100 })
        .progressBar(100, false, "blue", "green")
        .bind("TRAVELLING_TO_FIGHT", function(percent) {
            this.updateBarProgress(percent);
        });
    Game.startTimedProgressBar("TRAVELLING_TO_FIGHT", 0, 20, function() { Crafty.scene('Town'); });
});

// TODO: town or inn?
Crafty.scene('Town', function() {
    setupMiniMap();
    setupCharacterScreen();
});
