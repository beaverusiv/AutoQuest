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
    character: {
        name: 'Player 1',
        level: 1,
        race: 'Human',
        _class: 'Barbarian',
        exp: 0,
        gold: 0,
        hp: 100,
        mp: 10,
        str: 10,
        dex: 10,
        _int: 10,
        spd: 10,
        dmg: 5,
        def: 2,
        fire: 0,
        light: 0,
        cold: 0,
        poison: 0,
        helm: '',
        amulet: '',
        ring1: '',
        ring2: '',
        pauldrons: '',
        armour: '',
        gloves: '',
        belt: '',
        leggings: '',
        greaves: '',
        weapon: 'Wooden Stick',
        shield: '',
        inventory: []
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
        Crafty.scene('Travelling');
    },

    startProgressBar: function(_event, _percent, _callback) {
        setTimeout(function(){
            if(100 >= _percent) {
                Crafty.trigger(_event, _percent);
                _percent += 10;
                Game.startProgressBar(_event, _percent, _callback);
            } else {
                _callback();
            }
        }, 50);
    }
}