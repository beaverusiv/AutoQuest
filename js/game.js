Game = {
    // This defines our grid's size and the size of each of its tiles
    // 384x256
    map_grid: {
        width: 24,
        height: 16,
        tile: {
            width: 16,
            height: 16
        }
    },
    character_screen: {
        offset_x: 0,
        offset_y: 266,
        padding: 10,
        width: 384,
        row_height: 18,
        col_width: 170
    },
    // The total width of the game screen.
    width: function() {
        return 1280;
    },
    // The total height of the game screen.
    height: function() {
        return 768;
    },
    // Initialize and start our game
    start: function() {
        Game.character_screen.col_width = (Game.character_screen.width - (Game.character_screen.padding * 3)) / 2;
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(249, 223, 125)');
         
        // Simply start the "Game" scene to get things going
        Crafty.scene('Game');
    }
}