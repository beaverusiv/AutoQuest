//TODO: generate fetch quests i.e. fetch 5 wolf pelts
QuestManager = {
	_name: '...',
	_target: 0,
	_progress: 0,
	_fetch_quests: {
		verbs: [ "Grab", "Find", "Collect", "Amass", "Accumulate" ],
		nouns: [ "Yeti Fur", "Venom Sac", "Bat Fang", "Boar Hide", "Mantis' Pride", "Dragon Hide" ]
	},
	_guard_quests: {
		verbs: [ "Guard", "Shepherd", "Protect", "Ward", "Escort" ],
		nouns: [ "the Prime Minister", "a grumpy Tigerman", "the King", "a Princess", "Walt", "an insane Goat" ]
	},
	_kill_quests: {
		verbs: [ "Assassinate", "Kill", "Murder", "Annihilate", "Slay" ],
		nouns: [ "the Prime Minister", "a grumpy Tigerman", "the King", "a Princess", "Walt", "an insane Goat" ]
	},
	_treasure_quests: {
		verbs: [ "Unearth", "Find", "Rediscover", "Retrieve", "Obtain" ],
		nouns: [ "the Veteran's Armour", "an old Toshiba", "the King's Scepter", "a War Poster", "Unicorns", "your sanity" ]
	},
	_explore_quests: {
		verbs: [ "Map", "Explore", "Prospect", "Traverse", "Hunt for" ],
		nouns: [ "New Zealand", "Mordor", "the Bathroom", "a Jungle", "Suspicious Terrain", "Feudal Japan" ]
	},

	progressQuest: function() {
		if(this._name == '...') {
			this.generateQuest();
			return false;
		}
		this._progress++;
		if(this._progress >= this._target) {
			this.generateQuest();
			return true;
		}
		return false;
	},

	getQuest: function() {
		return this._name;
	},

	generateQuest: function() {
		//Pick type of quest
		var rand = Math.floor(Math.random() * 6) - 1;
		this._progress = 0;
		switch(rand) {
			case 0:
				//fetch
				rand = Math.floor(Math.random() * this._fetch_quests.verbs.length + 1) - 1;
				this._name = this._fetch_quests.verbs[rand] + " ";
				var amount = Math.floor(Math.random() * 10) + 4;
				this._name += (amount==1)?"a":amount + " ";
				rand = Math.floor(Math.random() * this._fetchquests.nouns.length + 1) - 1;
				this._name += this._fetch_quests.nouns[rand] + ((amount>1)?"s":"");
				this._target = amount * 2;
				break;
			case 1:
				//guard
				rand = Math.floor(Math.random() * this._guard_quests.verbs.length + 1) - 1;
				this._name = this._guard_quests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * this._guard_quests.nouns.length + 1) - 1;
				this._name += this._guard_quests.nouns[rand];
				this._target = Math.floor(Math.random() * 11) - 1;
				break;
			case 2:
				//kill
				rand = Math.floor(Math.random() * this._kill_quests.verbs.length + 1) - 1;
				this._name = this._kill_quests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * this._kill_quests.nouns.length + 1) - 1;
				this._name += this._kill_quests.nouns[rand];
				this._target = Math.floor(Math.random() * 11) - 1;
				break;
			case 3:
				//treasure
				rand = Math.floor(Math.random() * this._treasure_quests.verbs.length + 1) - 1;
				this._name = this._treasure_quests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * this._treasure_quests.nouns.length + 1) - 1;
				this._name += this._treasure_quests.nouns[rand];
				this._target = Math.floor(Math.random() * 11) - 1;
				break;
			case 4:
				//explore
				rand = Math.floor(Math.random() * this._explore_quests.verbs.length + 1) - 1;
				this._name = this._explore_quests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * this._explore_quests.nouns.length + 1) - 1;
				this._name += this._explore_quests.nouns[rand];
				//looong quests
				this._target = Math.floor(Math.random() * 61) - 1;
				break;
		}
	},

	getProgress: function() {
		return 100 * this._progress / this._target;
	}
};