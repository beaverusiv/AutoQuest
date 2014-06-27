Character = {
	//properties
	_name: "BeaverusIV",
	_level: 1,
	_race: "Human",
	//0STR, 1DEX, 2INT, 3HP, 4MP, 5DEF, 6DMG, 7SPD, 8FRES, 9CRES, 10LRES, 11PRES
	_stats: [10,10,10,100,30,10,2,5,0,0,0,0],
	_exp: 0,
	_gold: 0,
	_equipment: [0,0,0,0,0,0,0,0,0,0,0,0],
	_inventory: [],
	_classes: [ {
		  name: "Barbarian",
		  start_stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0],
		  stat_weights: [8,2,0,9,0,7,10,6,5,5,5,5]
		}, {
		  name: "Magician",
		  start_stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [1,2,3,0,5,0,0,0,0,0,0,0],
		  stat_weights: [0,0,0,0,0,0,0,0,0,0,0,0]
		} ],
	_class: {},
	_health: 0,
	_mana: 0,

	init: function() {
		this._class = this._classes[0];
		this._health = this._stats[3];
		this._mana = this._stats[4];
	},
	
	//TODO: allow to check both ring slots
	addItem: function(item) {
		if(this._equipment[item._place] == 0) {
			this._equipment[item._place] = item;
		} else {
			if(this.isUpgrade(item)) {
				var temp_item = this._equipment[item._place];
				this._equipment[item._place] = item;
				this._inventory.push(temp_item);
			} else {
				this._inventory.push(item);
			}
		}
	},
	
	isUpgrade: function(item) {
		if(this._equipment[item._place] == 0) return true;
		var old_sum = 0;
		var new_sum = 0;
		for(x in item._stats) {
			new_sum += item._stats[x] * this._class.stat_weights[x];
			old_sum += this._equipment[item._place]._stats[x] * this._class.stat_weights[x];
		}
		return new_sum >= old_sum;
	},
	
	gainExp: function(m_lvl) {
		//TODO: xp formula
		if(this._level > 98) return;
		this._exp += 100;
		if(Math.floor(this._exp / 1000) > this._level) {
			this._level++;
			for(x in this._stats) this._stats[x] += this._class.level_stats[x];
		}
	},
	
	getStat: function(s) {
		var ret = this._stats[s];
		for(var i = 0; i < 12; i++) {
			if(this._equipment[i] != 0) ret += this._equipment[i]._stats[s]
		}
		return ret;
	},
	hp: function() {
		return this.getStat(3);
	},
	mp: function() {
		return this.getStat(4);
	},
	str: function() {
		return this.getStat(0);
	},
	dex: function() {
		return this.getStat(1);
	},
	int: function() {
		return this.getStat(2);
	},
	spd: function() {
		return this.getStat(7);
	},
	dmg: function() {
		return this.getStat(6);
	},
	def: function() {
		return this.getStat(5);
	},
	fire: function() {
		return this.getStat(8);
	},
	cold: function() {
		return this.getStat(9);
	},
	light: function() {
		return this.getStat(10);
	},
	poison: function() {
		return this.getStat(11);
	},

	amulet: function() {
		return this._equipment[0];
	},
	helm: function() {
		return this._equipment[1];
	},
	ring1: function() {
		return this._equipment[2];
	},
	ring2: function() {
		return this._equipment[3];
	},
	pauldrons: function() {
		return this._equipment[4];
	},
	armour: function() {
		return this._equipment[5];
	},
	gloves: function() {
		return this._equipment[6];
	},
	belt: function() {
		return this._equipment[7];
	},
	leggings: function() {
		return this._equipment[8];
	},
	greaves: function() {
		return this._equipment[9];
	},
	weapon: function() {
		return this._equipment[10];
	},
	shield: function() {
		return this._equipment[11];
	}
}