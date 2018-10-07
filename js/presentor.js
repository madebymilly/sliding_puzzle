var Presentor = function( puzzle ) {

	this.puzzle = puzzle;

	var root = document.getElementById( 'root' );
  var board = document.getElementById( 'board' );

	this.boardWidth = board.offsetWidth;
	this.boardHeight = board.offsetHeight;
	this.tileWidth  = this.boardWidth / puzzle.dimensionX;
	this.tileHeight = this.boardHeight / puzzle.dimensionY;

	console.log(this.boardWidth);

	this.drawTiles = function() {

		board.innerHTML = "";

    var i = 0;
    for ( tile in puzzle.board.tiles ) {
      var tile = puzzle.board.tiles[tile];

			var div = document.createElement( 'div' );
      div.className = 'tile';
      div.id = i;
      div.style.width = this.tileWidth;
      div.style.height = this.tileHeight;
      div.style.top = ( tile.x * this.tileWidth ) + 'px';
      div.style.left = ( tile.y * this.tileHeight ) + 'px';

			// Closure to add click event:
			(function (x) {
        div.addEventListener ('click', function(e) {
          puzzle.moveTile( x );
        }, false );
      }(i));
      i++;

			var imagePart = this.drawImagePart( tile );
			div.appendChild( imagePart );

			getEmptyTile( div );

			board.appendChild( div );
		}
	};

	this.drawImagePart = function( tile ) {
		var imagePart = document.createElement( 'span' ),
			bgPosX = -( tile.correctX * this.tileWidth ),
			bgPosY = -( tile.correctY * this.tileHeight );
		console.log(this.tileWidth);
		imagePart.style.backgroundSize = `${this.boardWidth}px ${this.boardHeight}px`;
		imagePart.style.backgroundPosition = `${bgPosY} ${bgPosX}`;
		return imagePart;
	};

	this.drawExample = function() {
		var example = document.createElement( 'div' );
    example.id = 'example';
    example.innerHTML = '<h2>Example:</h2><div></div>';
    root.appendChild( example );
	};

	this.moveUp = function( tile ) {
    var el = document.getElementById( tile.id );
    el.style.top = parseInt(el.style.top) - this.tileHeight + 'px';
  };
  this.moveDown = function( tile ) {
    var el = document.getElementById( tile.id );
    el.style.top = parseInt(el.style.top) + this.tileHeight+ 'px';
  };
  this.moveLeft = function( tile ) {
    var el = document.getElementById( tile.id );
    el.style.left = parseInt(el.style.left) - this.tileWidth + 'px';
  };
  this.moveRight = function( tile ) {
    var el = document.getElementById( tile.id );
    el.style.left = parseInt(el.style.left) + this.tileWidth + 'px';
  };

	var getEmptyTile = function( t ) {
		if ( parseInt(t.id) === 15 ) { // TO DO
      t.className = 'tile empty-tile';
			t.innerHTML = '';
    }
	}


};
