Crafty.scene('Game', function() {
    setupMiniMap();
    setupCharacterScreen();
});

Crafty.scene('Travelling', function() {
    setupMiniMap();
    setupCharacterScreen();

     Crafty.e('2D, DOM, Text')
        .attr({ x: 394, y: 620, w: 300 })
        .text('Travelling to the killing fields...');

    Crafty.e("2D, DOM, ProgressBar")
        .attr({ x: 554, y : 622, w: 100, h: 10, z: 100 })
        .progressBar(100, false, "blue", "green")
        .bind("TRAVELLING_TO_FIGHT", function(percent) {
            this.updateBarProgress(percent);
        });
    Game.startProgressBar("TRAVELLING_TO_FIGHT", 0, function() { console.log("1 Done!"); });
});