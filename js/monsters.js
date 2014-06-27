MonsterManager = {
	_monsters: [ {
		  name: "Satyr",
		  stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0]
		}, {
		  name: "Monstrous Boar",
		  stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0]
		}, {
		  name: "Dark Satyr",
		  stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0]
		}, {
		  name: "Typhon",
		  stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0]
		}, {
		  name: "Mummy",
		  stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0]
		}, {
		  name: "Maenad",
		  stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0]
		} ],

	//TODO: spawn based on location
	spawn: function(c_lvl) {
		var rand = Math.floor(Math.random() * this._monsters.length + 1) - 1;
		monster = this._monsters[rand];
		monster.level = Math.floor(Math.random() * c_lvl + 11) - 5;
		if(monster.level < 1) monster.level = 1;
		for(x in monster.stats) monster.stats[x] += monster.level * monster.level_stats[x];

		return monster;
	}
}

/*
str dmg, carry
int dmg, mana regen
dex spd, hp regen
*/