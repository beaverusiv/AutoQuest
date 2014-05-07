function Item(pl, st, pr, n) {
	this._place = pl;
	this._stats = st;
	this._price = pr;
	this._name = n;
}

function ItemManager() {
	//TODO: spawn items that aren't equipment
	this._qualities = [
		//Bad
		{ name: "Rotten", p: 0.3, minlevel: 0, maxlevel: 2 },
		{ name: "Cracked", p: 0.7, minlevel: 0, maxlevel: 5 },
		{ name: "Old", p: 0.9, minlevel: 0, maxlevel: 10 },
		//Good
		{ name: "Superior", p: 1.3, minlevel: 8, maxlevel: 100 },
		{ name: "Master", p: 1.7, minlevel: 18, maxlevel: 100 },
		{ name: "Legendary", p: 2.4, minlevel: 25, maxlevel: 100 }
		];
	this._bases = [
		//Amulets
		[ { name: "Amulet", stat: 0, min: 0, max: 0, level: 0, price: 15 },
		  { name: "Pendant", stat: 0, min: 0, max: 0, level: 10, price: 25 },
		  { name: "Necklace", stat: 0, min: 0, max: 0, level: 25, price: 50 },
		  { name: "Chain", stat: 0, min: 0, max: 0, level: 50, price: 100 } ],
		[ { name: "Helmet", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Headgear", stat: 5, min: 1, max: 10, level: 10, price: 10 },
		  { name: "Hat", stat: 5, min: 5, max: 20, level: 30, price: 25 },
		  { name: "Skullcap", stat: 5, min: 18, max: 26, level: 60, price: 100 } ],
		[ { name: "Ring", stat: 0, min: 0, max: 0, level: 0, price: 15 },
		  { name: "Loop", stat: 0, min: 0, max: 0, level: 10, price: 25 },
		  { name: "Band", stat: 0, min: 0, max: 0, level: 25, price: 50 } ],
		[ { name: "Ring", stat: 0, min: 0, max: 0, level: 0, price: 15 },
		  { name: "Loop", stat: 0, min: 0, max: 0, level: 10, price: 25 },
		  { name: "Band", stat: 0, min: 0, max: 0, level: 25, price: 50 } ],
		[ { name: "Pauldrons", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Spaulders", stat: 5, min: 1, max: 10, level: 10, price: 10 },
		  { name: "Shoulder Pads", stat: 5, min: 5, max: 20, level: 30, price: 25 } ],
		[ { name: "Cuirass", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Breastplate", stat: 5, min: 1, max: 5, level: 2, price: 5 },
		  { name: "Plate", stat: 5, min: 4, max: 8, level: 5, price: 12 },
		  { name: "Armour", stat: 5, min: 5, max: 12, level: 10, price: 17 },
		  { name: "Vest", stat: 5, min: 5, max: 20, level: 30, price: 25 } ],
		[ { name: "Gloves", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Mittens", stat: 5, min: 1, max: 10, level: 10, price: 10 },
		  { name: "Bracers", stat: 5, min: 5, max: 20, level: 30, price: 25 } ],
		[ { name: "Belt", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Girdle", stat: 5, min: 1, max: 10, level: 10, price: 10 },
		  { name: "Cincture", stat: 5, min: 5, max: 20, level: 30, price: 25 },
		  { name: "Waistband", stat: 5, min: 18, max: 26, level: 60, price: 100 } ],
		[ { name: "Pants", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Leggings", stat: 5, min: 1, max: 10, level: 10, price: 10 } ],
		[ { name: "Boots", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Greaves", stat: 5, min: 1, max: 10, level: 10, price: 10 },
		  { name: "Shoes", stat: 5, min: 5, max: 20, level: 30, price: 25 } ],
		[ { name: "Sword", stat: 6, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Axe", stat: 6, min: 1, max: 5, level: 2, price: 5 },
		  { name: "Bastard Sword", stat: 6, min: 4, max: 8, level: 5, price: 12 },
		  { name: "Dagger", stat: 6, min: 5, max: 12, level: 7, price: 14 },
		  { name: "Club", stat: 6, min: 7, max: 15, level: 8, price: 17 },
		  { name: "Mace", stat: 6, min: 9, max: 16, level: 10, price: 18 },
		  { name: "Staff", stat: 6, min: 11, max: 18, level: 15, price: 20 },
		  { name: "Falchion", stat: 6, min: 15, max: 20, level: 30, price: 35 } ],
		[ { name: "Shield", stat: 5, min: 1, max: 2, level: 0, price: 1 },
		  { name: "Aegis", stat: 5, min: 1, max: 10, level: 10, price: 10 },
		  { name: "Bulwark", stat: 5, min: 5, max: 20, level: 30, price: 25 },
		  { name: "Buckler", stat: 5, min: 18, max: 26, level: 60, price: 100 } ]
	];
	//TODO: Need a fn which input variables and it spits out a valid item (location, level, source(monster, chest)...
	//TODO: Resistance items
	this._prefices = [
		//DEF prefices
		{ name: "Lined", stat: 5, min: 1, max: 4, level: 0, price: 2 },
		{ name: "Reinforced", stat: 5, min: 3, max: 7, level: 10, price: 10 },
		{ name: "Plated", stat: 5, min: 7, max: 12, level: 25, price: 200 },
		//DMG prefices
		{ name: "Lined", stat: 6, min: 1, max: 4, level: 0, price: 5 },
		{ name: "Reinforced", stat: 6, min: 3, max: 7, level: 10, price: 20 },
		{ name: "Plated", stat: 6, min: 7, max: 12, level: 25, price: 500 },
		//HP prefices
		{ name: "Healthy", stat: 3, min: 1, max: 10, level: 0, price: 5 },
		{ name: "Enduring", stat: 3, min: 3, max: 17, level: 10, price: 15 },
		{ name: "Hearty", stat: 3, min: 20, max: 40, level: 25, price: 750 },
		//MP prefices
		{ name: "Magic", stat: 4, min: 1, max: 20, level: 0, price: 2 },
		{ name: "Wise", stat: 4, min: 5, max: 25, level: 10, price: 12 },
		{ name: "Wizard's", stat: 4, min: 22, max: 50, level: 25, price: 300 }
	];
	this._suffices = [
		//STR suffices
		{ name: "of the Harpy", stat: 0, min: 1, max: 4, level: 0, price: 1 },
		{ name: "of the Boar", stat: 0, min: 3, max: 7, level: 10, price: 10 },
		{ name: "of the Titan", stat: 0, min: 7, max: 12, level: 25, price: 200 },
		//DEX suffices
		{ name: "of Budding", stat: 1, min: 1, max: 4, level: 0, price: 1 },
		{ name: "of Thorns", stat: 1, min: 3, max: 7, level: 2, price: 10 },
		{ name: "of Spikes", stat: 1, min: 5, max: 10, level: 8, price: 200 },
		//INT suffices
		{ name: "of Dampness", stat: 2, min: 1, max: 4, level: 0, price: 1 },
		{ name: "of Moisture", stat: 2, min: 2, max: 7, level: 8, price: 10 },
		{ name: "of Juciness", stat: 2, min: 9, max: 21, level: 35, price: 200 },
		//Speed suffices
		{ name: "of Hitching", stat: 7, min: 1, max: 4, level: 0, price: 1 },
		{ name: "of Running", stat: 7, min: 2, max: 7, level: 8, price: 10 },
		{ name: "of Riding", stat: 7, min: 9, max: 14, level: 15, price: 100 }
	];
	
	this.getItem = function(m_lvl, c_lvl) {
		var st = [0,0,0,0,0,0,0,0,0,0,0,0];
		var pr = 0;
		var pl = Math.floor(Math.random() * 12 + 1) - 1; //Random item type.
		var rand = Math.floor(Math.random() * this._bases[pl].length + 1) - 1;
		while(this._bases[rand].level > c_lvl) rand = Math.floor(Math.random() * this._bases.length + 1) - 1;
		var b = this._bases[pl][rand].name;
		st[this._bases[pl][rand].stat] += Math.floor(Math.random() * (this._bases[pl][rand].max - this._bases[pl][rand].min + 1)) + this._bases[pl][rand].min;
		pr += this._bases[pl][rand].price;
		rand = Math.floor(Math.random() * this._prefices.length + 1) - 1;
		while(this._prefices[rand].level > c_lvl) rand = Math.floor(Math.random() * this._prefices.length + 1) - 1;
		var p = this._prefices[rand].name;
		st[this._prefices[rand].stat] += Math.floor(Math.random() * (this._prefices[rand].max - this._prefices[rand].min + 1)) + this._prefices[rand].min;
		pr += this._prefices[rand].price;
		rand = Math.floor(Math.random() * this._suffices.length + 1) - 1;
		while(this._suffices[rand].level > c_lvl) rand = Math.floor(Math.random() * this._suffices.length + 1) - 1;
		var s = this._suffices[rand].name;
		st[this._suffices[rand].stat] += Math.floor(Math.random() * (this._suffices[rand].max - this._suffices[rand].min + 1)) + this._suffices[rand].min;
		pr += this._suffices[rand].price;
		//TODO: Not always have a quality
		rand = Math.floor(Math.random() * this._qualities.length + 1) - 1;
		while(this._qualities[rand].minlevel > c_lvl || this._qualities[rand].maxlevel <= c_lvl) rand = Math.floor(Math.random() * this._qualities.length + 1) - 1;
		var q = this._qualities[rand].name;
		//adjust mods with quality
		for(ss in st) {
			st[ss] = Math.round(st[ss] * this._qualities[rand].p);
		}
		pr = Math.round(pr * this._qualities[rand].p);
		if(q != "") n = q+" "+p+" "+b+" "+s;
		else n = p+" "+b+" "+s;
		return new Item(pl, st, pr, n);
	};
}