function TileEngine() {
	this._terrain = [
		'green',
		'brown',
		'grey',
		'blue'
	]
	this._tiles = [
		[0, 1, 1],
		[0, 0, 3],
		[0, 0, 0]
	];

	var self = this;

	this.draw = function() {
		for(var i = 0; i < self._tiles[0].length; i++) {
			for(var j = 0; j < self._tiles.length; j++) {
				document.getElementById('tile'+i+'x'+j).style.backgroundColor = self._terrain[self._tiles[i][j]];
			}
		}
	}
}