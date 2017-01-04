Crafty.scene('Fighting', function() {
    Map.render();
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
    Map.render();
    setupCharacterScreen();

    Character.gainExp(monster.level);
    var item = ItemManager.getItem(monster.level, Character._level);
    Character.addItem(item);

    Crafty.e('ConsoleLine')
        .text('Victory! You found a '+item._name+'!');

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
    Map.render();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Travelling to the killing fields...')
        .done('Travelled to the killing fields.')
        .bar('TRAVELLING_TO_FIGHT_'+Game.console_line_ids, 20, function() { Crafty.scene('Fighting'); });
});

Crafty.scene('Travelling__town', function() {
    Map.render();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Travelling to the village...')
        .done('Travelled to the village.')
        .bar('TRAVELLING_TO_TOWN_'+Game.console_line_ids, 20, function() { Crafty.scene('Inn'); });
});

Crafty.scene('Inn', function() {
    Map.render();
    setupCharacterScreen();

    Crafty.e('ConsoleLine')
        .text('Sleeping at the Inn...')
        .done('Slept at the Inn.')
        .bar('INN_'+Game.console_line_ids, 20, function() { Crafty.scene('Shop__sell'); });
});

Crafty.scene('Shop__sell', function() {
    Map.render();
    setupCharacterScreen();

    var count = Character._inventory.length;

    if(count > 0) {
        var name = Character._inventory[count-1]._name;
        Character._gold += Math.round(Character._inventory[count-1]._price / 5);
        Character._inventory.pop();

        Crafty.e('ConsoleLine')
            .text('Selling '+name+'...')
            .done('Sold '+name+'.')
            .bar('SHOP_SELLING_'+Game.console_line_ids, 20, function() { Crafty.scene('Shop__sell'); });
    } else {
        Crafty.scene('Shop__enter');
    }
});

Crafty.scene('Shop__enter', function() {
    Game.shop_inventory = [];
    // Generate 5 - 20 items
    var item_count = Math.floor(Math.random() * 16) + 5;
    for(var i = 0; i < item_count; i++) {
        Game.shop_inventory.push(ItemManager.getItem((Character._level + 5), Character._level));
    }

    Crafty.scene('Shop__buy');
});

Crafty.scene('Shop__buy', function() {
    Map.render();
    setupCharacterScreen();

    if(0 < Game.shop_inventory.length && 0 < Character._gold) {
        var tmp_item = Game.shop_inventory.pop();
        if(tmp_item._price <= Character._gold && Character.isUpgrade(tmp_item)) {
            Character.addItem(tmp_item);
            //silently sell the item just replaced
            if(Character._inventory.length > 0) {
                Character._gold += Math.round(Character._inventory[Character._inventory.length-1]._price / 5);
                Character._inventory.pop();
            }
            Character._gold -= tmp_item._price;

            Crafty.e('ConsoleLine')
                .text('Buying '+tmp_item._name+'...')
                .done('Bought '+tmp_item._name+'.')
                .bar('SHOP_BUYING_'+Game.console_line_ids, 20, function() { Crafty.scene('Shop__buy'); });
        } else {
            // Must be a better way to fix this than have this line twice.
            Crafty.scene('Travelling__fight');
        }
    } else {
        Crafty.scene('Travelling__fight');
    }
});
