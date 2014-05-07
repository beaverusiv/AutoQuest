function GameEngine() {
	//TODO: persistent game items, monsters, locations for multiple heroes for economies
	this._screen = $('#screen');
	this._character = new Character();
	this._quests = new Quests();
	this._monster = new MonsterManager();
	this._items = new ItemManager();
	this._shop = [];
	var self = this;
	
	this.displayScreen = function() {
		var i = 0;
		
		//TODO: cache name etc to speed up loop
		$('#lcs-name').html(this._character._name);
		$('#lcs-level').html(this._character._level);
		$('#lcs-race').html(this._character._race);
		$('#lcs-class').html(this._character._class.name);
		$('#lcs-exp').html(this._character._exp);
		$('#lcs-str').html(this._character.getStat(0));
		$('#lcs-dex').html(this._character.getStat(1));
		$('#lcs-int').html(this._character.getStat(2));
		$('#lcs-spd').html(this._character.getStat(7));
		$('#lcs-def').html(this._character.getStat(5));
		$('#lcs-dmg').html(this._character.getStat(6));
		$('#lcs-hp').html(this._character._health + "/" + this._character.getStat(3));
		$('#lcs-mp').html(this._character._mana + "/" + this._character.getStat(4));
		$('#lcs-fire').html(this._character.getStat(8));
		$('#lcs-cold').html(this._character.getStat(9));
		$('#lcs-light').html(this._character.getStat(10));
		$('#lcs-poison').html(this._character.getStat(11));
		$('#lcs-gold').html(this._character._gold);
		
		for(i = 0; i < 12; i++) {
			if(this._character._equipment[i] == 0) {
				$('#lcs-equip' + i).html('None');
			} else {
				$('#lcs-equip' + i).html(self._character._equipment[i]._name);
			}
		}
		
		for(i = 0; i < 14 && i < this._character._inventory.length; i++) {
			$('#lcs-inv' + i).html(self._character._inventory[i]._name);
		}

		while(i < 14) {
			$('#lcs-inv' + i).html('...');
			i++;
		}
		
		if(this._character._inventory.length > 14) $('#lcs-inv13').html("...and "+(this._character._inventory.length-13)+" others");
		
		$('#lcs-quest').html(this._quests.getQuest());
		$('#lcs-quest-prog').progressBar(this._quests.getProgress(), {showText: false});
		$('#lcs-quest-prog_pbText').hide(); //unsure why we need this!
	};
	
	this.fightEnemy = function() {	
		this._monster.spawn(this._character._level);
		$('#lcs-action').html("Now fighting " + this._monster._current.name + "...");
		//hp / (lvl * def + 0.6 * spd) / (lvl * (dmg + (0.1 * str) + 0.2 * spd)
		//0STR, 1DEX, 2INT, 3HP, 4MP, 5DEF, 6DMG, 7SPD, 8FRES, 9CRES, 10LRES, 11PRES
		var m = this._monster._current;
		var c = this._character;
		var time = m.stats[3] / ((m.level * m.stats[5]) + (0.6 * m.stats[7])) / c._level * (c._stats[6] + (0.1 * c._stats[0]) + (0.2 * c._stats[7]));
		$('#lcs-action-prog').progressBar(100, {
			showText: false,
			steps: 100,
			stepDuration: time,
			callback: function(data) {
				if (data.running_value == data.value) {
					data.running_value = 0;
					self.gainRewards();
					self.displayScreen();
					//If full of items
					if(self._character._inventory.length > self._character._stats[0] / 2 - 3) self.travelToTown();
					//If hp less than 15%
					else if(Math.floor((self._character._health * 100) / self._character.getStat(3)) < 15) self.travelToTown();
					else self.fightEnemy();
				}
			}
		});
	};
	
	this.travelToTown = function() {
		//finished fighting, head to town
		$('#lcs-action').html("Travelling to Town.");
		$('#lcs-action-prog').progressBar(100, {
			showText: false,
			steps: 100,
			stepDuration: 20,
			callback: function(data) {
				if (data.running_value == data.value) {
					data.running_value = 0;
					self.healUp();
				}
			}
		});
	};
	
	this.healUp = function() {
		$('#lcs-action').html("Sleeping at the Inn.");
		var h_step = Math.floor((this._character.getStat(3) - this._character._health) / 100);
		var m_step = Math.floor((this._character.getStat(4) - this._character._mana) / 100);
		$('#lcs-action-prog').progressBar(100, {
			showText: false,
			steps: 100,
			stepDuration: 20,
			callback: function(data) {
				self._character._health += h_step;
				self._character._mana += m_step;
				$('#lcs-hp').html(self._character._health + "/" + self._character.getStat(3));
				$('#lcs-mp').html(self._character._mana + "/" + self._character.getStat(4));
				if (data.running_value == data.value) {
					data.running_value = 0;
					self._character._health = self._character.getStat(3);
					self._character._mana = self._character.getStat(4);
					self.sellUp();
				}
			}
		});
	};
	
	this.gainRewards = function() {
		this._character.addItem(self._items.getItem(self._monster._current.level, self._character._level));
		this._character.gainExp(self._monster._current.level);
		this._quests.progressQuest();
	};
	
	this.run = function() {
		self._quests.progressQuest();
		self.displayScreen();
		self.sellUp();
	};
	
	this.sellUp = function() {
		var count = this._character._inventory.length;
		if(count > 0) {
			$('#lcs-action').html("Selling "+this._character._inventory[count-1]._name);
			this._character._gold += Math.round(this._character._inventory[count-1]._price / 5);
			this._character._inventory.pop();
			$('#lcs-action-prog').progressBar(100, {
				showText: false,
				steps: 100,
				stepDuration: 20,
				callback: function(data) {
					if (data.running_value == data.value) {
						data.running_value = 0;
						self.displayScreen();
						self.sellUp();
					}
				}
			});
		} else {
			self.spendUp();
		}
	};
	
	this.spendUp = function() {
		if(this._shop.length == 0 && self._character._gold > 0) {
			var item_count = Math.floor(Math.random() * 16) + 5; // 5 - 20 items
			for(i = 0; i < item_count; i++) {
				this._shop.push(self._items.getItem(self._monster._current.level, self._character._level));
			}
		}
		while(this._shop.length > 0 && self._character._gold > 0) {
			tmp_item = this._shop.pop();
			if(tmp_item._price <= self._character._gold && self._character.isUpgrade(tmp_item)) {
				this._character.addItem(tmp_item);
				//silently sell the item just replaced
				if(this._character._inventory.length > 0) {
					this._character._gold += this._character._inventory[this._character._inventory.length-1]._price;
					this._character._inventory.pop();
				}
				this._character._gold -= tmp_item._price;
				$('#lcs-action').html("Buying "+tmp_item._name);
				$('#lcs-action-prog').progressBar(100, {
					showText: false,
					steps: 100,
					stepDuration: 20,
					callback: function(data) {
						if (data.running_value == data.value) {
							data.running_value = 0;
							self.displayScreen();
							self.spendUp();
						}
					}
				});
				return;
			}
		}
		
		$('#lcs-action').html("Travelling to Hunting Grounds.");
		$('#lcs-action-prog').progressBar(100, {
			showText: false,
			steps: 100,
			stepDuration: 20,
			callback: function(data) {
				if (data.running_value == data.value) {
					data.running_value = 0;
					if(self._shop.length > 0 && self._character._gold > 0) self.spendUp();
					else self.fightEnemy();
				}
			}
		});
	}
}