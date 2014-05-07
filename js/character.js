function Character() {
	//properties
	this._name = "BeaverusIV";
	this._level = 1;
	this._race = "Human";
	//0STR, 1DEX, 2INT, 3HP, 4MP, 5DEF, 6DMG, 7SPD, 8FRES, 9CRES, 10LRES, 11PRES
	this._stats = [10,10,10,100,30,10,2,5,0,0,0,0];
	this._exp = 0;
	this._gold = 0;
	this._equipment = [0,0,0,0,0,0,0,0,0,0,0,0];
	this._inventory = [];
	this._classes = [ {
		  name: "Barbarian",
		  start_stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [3,2,1,5,0,0,0,0,0,0,0,0],
		  stat_weights: [8,2,0,9,0,7,10,6,5,5,5,5]
		}, {
		  name: "Magician",
		  start_stats: [10,10,10,100,30,10,2,5,0,0,0,0],
		  level_stats: [1,2,3,0,5,0,0,0,0,0,0,0],
		  stat_weights: [0,0,0,0,0,0,0,0,0,0,0,0]
		} ];
	this._class = this._classes[0];
	this._health = this._stats[3];
	this._mana = this._stats[4];
	
	//TODO: allow to check both ring slots
	this.addItem = function(item) {
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
	};
	
	this.isUpgrade = function(item) {
		if(this._equipment[item._place] == 0) return true;
		var old_sum = 0;
		var new_sum = 0;
		for(x in item._stats) {
			new_sum += item._stats[x] * this._class.stat_weights[x];
			old_sum += this._equipment[item._place]._stats[x] * this._class.stat_weights[x];
		}
		return new_sum >= old_sum;
	};
	
	this.gainExp = function(m_lvl) {
		//TODO: xp formula
		if(this._level > 98) return;
		this._exp += 100;
		if(Math.floor(this._exp / 1000) > this._level) {
			this._level++;
			for(x in this._stats) this._stats[x] += this._class.level_stats[x];
		}
	};
	
	this.getStat = function(s) {
		var ret = this._stats[s];
		for(var i = 0; i < 12; i++) {
			if(this._equipment[i] != 0) ret += this._equipment[i]._stats[s]
		}
		return ret;
	};
}