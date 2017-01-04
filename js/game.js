Game = {
    // TODO: Add hero wandering map
    // TODO: Add inventory list to UI
    // This defines our grid's size and the size of each of its tiles
    // 384x256
    font: {
        size: '12px',
        family: 'Noticia Text'
    },
    map_grid: {
        offset_x: 400,
        offset_y: 10,
        width: 54,
        height: 41,
        tile: {
            width: 16,
            height: 16
        }
    },
    character_screen: {
        offset_x: 10,
        offset_y: 10,
        padding: 10,
        width: 384,
        row_height: 18,
        col_width: 170
    },
    console_line_ids: 0,
    shop_inventory: [],
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
        Crafty.load({
            "sprites": {
                "images/tileset.png": {
                    tile: 16,
                    tileh: 16,
                    map: {
                        snow: [ 7, 1 ],
                        forest: [ 4, 11 ],
                        plains: [ 1, 1 ]
                    }
                },
                "images/water.png": {
                    tile: 16,
                    tileh: 16,
                    map: {
                        water: [ 0, 0 ]
                    }
                },
                "images/mountains.png" : {
                    tile: 16,
                    tileh: 16,
                    map: {
                        rock: [ 2, 2 ]
                    }
                }
            }
        });
        Crafty.sprite("images/tileset.png", { town: [ 32, 240, 48, 48 ] });
        Crafty.sprite("images/tileset.png", { dungeon: [ 96, 288, 48, 48 ] });

        Character.init();

        // Simply start the "Game" scene to get things going
        Crafty.scene('Travelling__fight');
    },
    // Progress bar that runs for a certain amount of time. Total time is _speed * 100
    startTimedProgressBar: function(_event, _percent, _speed, _callback) {
        setTimeout(function(){
            if(100 >= _percent) {
                Crafty.trigger(_event, _percent);
                _percent++;
                Game.startTimedProgressBar(_event, _percent, _speed, _callback);
            } else {
                _callback();
                Crafty.trigger(_event+'_done');
            }
        }, _speed);
    }
    // Progress bar that increments when an event is triggered
    //startEventProgressBar()
};