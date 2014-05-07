//TODO: generate fetch quests i.e. fetch 5 wolf pelts
function Quests() {
	this._name = '...';
	this._target = 0;
	this._progress = 0;
	this._fetchquests = {
		verbs: [ "Grab", "Find", "Collect", "Amass", "Accumulate" ],
		nouns: [ "Yeti Fur", "Venom Sac", "Bat Fang", "Boar Hide", "Mantis' Pride", "Dragon Hide" ]
	};
	this._guardquests = {
		verbs: [ "Guard", "Shepherd", "Protect", "Ward", "Escort" ],
		nouns: [ "the Prime Minister", "a grumpy Tigerman", "the King", "a Princess", "Walt", "an insane Goat" ]
	};
	this._killquests = {
		verbs: [ "Assassinate", "Kill", "Murder", "Annihilate", "Slay" ],
		nouns: [ "the Prime Minister", "a grumpy Tigerman", "the King", "a Princess", "Walt", "an insane Goat" ]
	};
	this._treasurequests = {
		verbs: [ "Unearth", "Find", "Rediscover", "Retrieve", "Obtain" ],
		nouns: [ "the Veteran's Armour", "an old Toshiba", "the King's Scepter", "a War Poster", "Unicorns", "your sanity" ]
	};
	this._explorequests = {
		verbs: [ "Map", "Explore", "Propsect", "Traverse", "Hunt for" ],
		nouns: [ "New Zealand", "Mordor", "the Bathroom", "a Jungle", "Suspicious Terrain", "Feudal Japan" ]
	};
	self = this;
	
	this.progressQuest = function() {
		if(this._name == '...') {
			generateQuest();
			return false;
		}
		this._progress++;
		if(this._progress >= this._target) {
			generateQuest();
			return true;
		}
		return false;
	};
	
	this.getQuest = function() {
		return this._name;
	};
	
	generateQuest = function() {
		//Pick type of quest
		var rand = Math.floor(Math.random() * 6) - 1;
		self._progress = 0;
		switch(rand) {
			case 0:
				//fetch
				rand = Math.floor(Math.random() * self._fetchquests.verbs.length + 1) - 1;
				self._name = self._fetchquests.verbs[rand] + " ";
				var amnt = Math.floor(Math.random() * 10) + 4;
				self._name += (amnt==1)?"a":amnt + " ";
				rand = Math.floor(Math.random() * self._fetchquests.nouns.length + 1) - 1;
				self._name += self._fetchquests.nouns[rand] + ((amnt>1)?"s":"");
				self._target = amnt * 2;
				break;
			case 1:
				//guard
				rand = Math.floor(Math.random() * self._guardquests.verbs.length + 1) - 1;
				self._name = self._guardquests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * self._guardquests.nouns.length + 1) - 1;
				self._name += self._guardquests.nouns[rand];
				self._target = Math.floor(Math.random() * 11) - 1;
				break;
			case 2:
				//kill
				rand = Math.floor(Math.random() * self._killquests.verbs.length + 1) - 1;
				self._name = self._killquests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * self._killquests.nouns.length + 1) - 1;
				self._name += self._killquests.nouns[rand];
				self._target = Math.floor(Math.random() * 11) - 1;
				break;
			case 3:
				//treasure
				rand = Math.floor(Math.random() * self._treasurequests.verbs.length + 1) - 1;
				self._name = self._treasurequests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * self._treasurequests.nouns.length + 1) - 1;
				self._name += self._treasurequests.nouns[rand];
				self._target = Math.floor(Math.random() * 11) - 1;
				break;
			case 4:
				//explore
				rand = Math.floor(Math.random() * self._explorequests.verbs.length + 1) - 1;
				self._name = self._explorequests.verbs[rand] + " ";
				rand = Math.floor(Math.random() * self._explorequests.nouns.length + 1) - 1;
				self._name += self._explorequests.nouns[rand];
				//looong quests
				self._target = Math.floor(Math.random() * 61) - 1;
				break;
		}
	};
	
	this.getProgress = function() {
		return 100 * this._progress / this._target;
	}
}