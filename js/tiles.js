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

var CMap = (function() {

    var cachedChunks  = 0;
    var chunkCache    = {};

    var C = function(params) {
      this.viewRect      = {x:0, y:0, w:800, h:600};
      this.xTileMin      = 0;
      this.xTileMax      = 0;
      this.yTileMin      = -1;
      this.yTileMax      = -1;
      this.xOffset       = 0;
      this.yOffset       = 0;
      this.visibleChunks = 0;
      this.generation    = {
        min       : DEFAULT_GEN_MIN,
        max       : DEFAULT_GEN_MAX,
        quality   : DEFAULT_GEN_QUAL,
        seed      : DEFAULT_GEN_SEED,
        _delta    : -1,
        _num      : 0,
        _float    : 0.0
      };

      for ( var i in params ) {
        if ( this.generation.hasOwnProperty(i) ) {
          this.generation[i] = params[i];
        }
      }

      this.generation._num   = Game.Utils.createSeed(this.generation.seed);
      this.generation._float = parseFloat('0.' + Math.abs(this.generation._num));
      this.generation._delta = this.generation.quality + this.generation._float;

      this.update();
      this.tick();
    };

    C.prototype.destroy = function() {
      console.warn('Game.Scene::CMap', 'Shut down!');
    };

    C.prototype.initialize = function() {
      this.noise = new Game.SimplexNoise(this.generation._num);
    };

    /**
     * On render
     */
    C.prototype.tick = function(timeSinceLastFrame) {
      this.viewRect.x = (canvasWidth / 2)  + player.getX() + this.xOffset;
      this.viewRect.y = (canvasHeight / 2) + player.getY() + this.yOffset;

      this.xTileMin = Math.floor((this.viewRect.x) / CHUNK_SIZE);
      this.xTileMax = Math.floor((this.viewRect.x + this.viewRect.w) / CHUNK_SIZE);
      this.yTileMin = Math.floor((this.viewRect.y) / CHUNK_SIZE);
      this.yTileMax = Math.floor((this.viewRect.y + this.viewRect.h) / CHUNK_SIZE);
    };

    /**
     * Get noise for position
     */
    C.prototype.generate = function(cx, cy, tx, ty, layer) {
      layer = (typeof layer === 'undefined') ? 0 : layer;
      var d = this.generation._delta;
      var s = this.generation._float;
      var n = this.noise.snoise(
            ((((cx * CHUNK_TILES) + (tx))) / s) / d,
            ((((cy * CHUNK_TILES) + (ty))) / s) / d,
            layer);

      return n;
    };

    /**
     * Draw map tiles or overlays
     */
    C.prototype.draw = function(timeSinceLastFrame, context, overlays) {
      var x, y, visibleChunks = 0, c;

      for ( y = this.yTileMin; y <= this.yTileMax; y++ ) {
        for ( x = this.xTileMin; x <= this.xTileMax; x++ ) {
          c = this.drawChunk(x, y);
          if ( c !== false ) {
            visibleChunks++;
          }
        }
      }
      this.visibleChunks = visibleChunks;
    };

    /**
     * Check if we can remove chunks from cache
     */
    C.prototype.checkChunks = function() {
      var i, l, c, remove = [];
      for ( i in chunkCache ) {
        c = chunkCache[i];
        if ( c.isTimedOut() && !c.inRange(this.viewRect) ) {
          remove.push(i);
        }
      }

      i = 0;
      l = remove.length;
      for ( i; i < l; i++ ) {
        delete chunkCache[remove[i]];
        cachedChunks--;
      }
    };

    /**
     * Clear chunks
     */
    C.prototype.clearChunks = function() {
      chunkCache = {};
      cachedChunks = 0;
    };

    /**
     * Remove chunk
     */
    C.prototype.deleteChunk = function(px, py) {
      var cname = hashPair(px, py);
      if ( chunkCache[cname] ) {
        delete chunkCache[cname];

        return true;
      }
      return false;
    };

    /**
     * Create chunk
     */
    C.prototype.createChunk = function(px, py) {
      var cname = hashPair(px, py);
      if ( chunkCache[cname] ) {
        return chunkCache[cname];
      }
      chunkCache[cname] = new CChunk(px, py);

      cachedChunks++;

      return chunkCache[cname];
    };

    /**
     * Draw chunk on to canvas if in range
     */
    C.prototype.drawChunk = function(x, y) {
      var visible = this.isChunkVisible(x, y);
      if ( visible === false ) return false;

      var chunk = this.createChunk(x, y);
      document.getElementById('tile'+x+'x'+y).innerHTML = 'chunk.res';

      return chunk;
    };

    /**
     * Check if chunk x,y is in viewable range
     */
    C.prototype.isChunkVisible = function(x, y) {
      var pos = this.getChunkPosition(x, y);
      if ( !Game.Utils.intersectRect( // AABB
          {top:pos.r1.y,left:pos.r1.x,bottom:pos.r1.y+pos.r1.h,right:pos.r2.x+pos.r2.w},
          {top:pos.r2.y,left:pos.r2.x,bottom:pos.r2.y+pos.r2.h,right:pos.r2.x+pos.r2.w}
        ) ) {
        return false;
      }

      return {x: pos.px, y: pos.py};
    };

    /**
     * Get chunk absolute position
     */
    C.prototype.getChunkPosition = function(x, y) {
      var r1 = {x:(x * CHUNK_SIZE), y:(y * CHUNK_SIZE), w:CHUNK_SIZE, h:CHUNK_SIZE};
      var r2 = this.viewRect;
      var px = r1.x - r2.x; //(x * CHUNK_SIZE) - viewRect.x;
      var py = r1.y - r2.y; //(y * CHUNK_SIZE) - viewRect.y;

      return {r1:r1, r2:r2, px:px, py:py};
    };

    /**
     * Get a chunk by position
     */
    C.prototype.getChunk = function(x, y, checkVisible) {
      if ( checkVisible ) {
        var v = this.isChunkVisible(x, y);
        if ( this.isChunkVisible(x, y) == false ) return false;
      }
      var c = chunkCache[hashPair(x, y)];
      return c;
    };

    /**
     * Get cached chunk count
     */
    C.prototype.getCachedChunks = function() {
      return cachedChunks;
    };

    /**
     * Get visible chunk count
     */
    C.prototype.getVisibleChunks = function() {
      return this.visibleChunks;
    };

    return C;
  })();