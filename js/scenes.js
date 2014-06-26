Crafty.scene('Game', function() {
    setupMiniMap();
    setupCharacterScreen();
});

Crafty.scene('Travelling', function() {
    // setupMiniMap();
    // setupCharacterScreen();

    Crafty.e("2D, DOM, ProgressBar")
        .attr({ x: 150, y : 140, w: 100, h: 25, z: 100 })
        // progressBar(Number maxValue, Boolean flipDirection, String emptyColor, String filledColor)
        .progressBar(100, false, "blue", "green")
        .bind("LOADING_PROGRESS", function(percent) {
            // updateBarProgress(Number currentValue)
            this.updateBarProgress(percent);
        });
    Game.startProgressBar("LOADING_PROGRESS", 0, function() { console.log("1 Done!"); });

    Crafty.e("2D, DOM, ProgressBar")
        .attr({ x: 150, y : 280, w: 100, h: 25, z: 100 })
        // progressBar(Number maxValue, Boolean flipDirection, String emptyColor, String filledColor)
        .progressBar(100, false, "blue", "green")
        .bind("LOADING", function(percent) {
            // updateBarProgress(Number currentValue)
            this.updateBarProgress(percent);
        });
    Game.startProgressBar("LOADING", 0, function() { console.log("2 Done!"); });
});