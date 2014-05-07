function MonsterManager() {
	this._monsters = [ {
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
		} ];
	this._current = 0;

	//TODO: spawn based on location
	this.spawn = function(c_lvl) {
		var rand = Math.floor(Math.random() * this._monsters.length + 1) - 1;
		this._current = this._monsters[rand];
		this._current.level = Math.floor(Math.random() * c_lvl + 11) - 5;
		if(this._current.level < 1) this._current.level = 1;
		for(x in this._current.stats) this._current.stats[x] += this._current.level * this._current.level_stats[x];
	};
}

/*
str dmg, carry
int dmg, mana regen
dex spd, hp regen
*/