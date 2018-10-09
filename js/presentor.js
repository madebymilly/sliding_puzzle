var Presentor = function( puzzle ) {

	this.puzzle = puzzle;

	var root = document.getElementById( 'root' );
  var board = document.getElementById( 'board' );

	this.boardWidth = board.offsetWidth;
	this.boardHeight = board.offsetHeight;
	this.tileWidth  = this.boardWidth / puzzle.dimensionX;
	this.tileHeight = this.boardHeight / puzzle.dimensionY;

	this.drawStartBtn = function() {
		var btn = document.createElement( 'button' );
		btn.innerHTML = 'Start Puzzle!';
		btn.id = 'start';
		btn.addEventListener ('click', function(e) {
			puzzle.start();
		}, false );
		board.appendChild( btn );
	};

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

	this.disableSettings = function() {
		// get all inputs and add disabled:
		var settings = document.getElementById( 'settings' ).getElementsByTagName( 'input' );
		for ( var i = 0; i < settings.length; i++ ) {
			settings[i].setAttribute( 'disabled', true );
			settings[i].parentElement.className = 'disabled';
		}
	}

	this.drawSettings = function() {
		var settingsDiv = document.createElement( 'div' );
		settingsDiv.id = 'settings';

		// TO DO: vanuit puzzle.js aangeven voor welke dimensions er een createRadio aangemaakt moet worden.
	 	settingsDiv.appendChild( createInput( 'radio', 'dimensions', '3x3', '3x3', false ) );
		settingsDiv.appendChild( createInput( 'radio', 'dimensions', '4x4', '4x4', true ) );
		settingsDiv.appendChild( createInput( 'radio', 'dimensions', '5x5', '5x5', false ) );
		settingsDiv.appendChild( createInput( 'checkbox', 'seeExample', '', 'Want to see example?', false ) );

		root.insertBefore( settingsDiv, board );
	};

	// TO DO: combine these functions
	var createInput = function( type, name, value, text, checked, disabled ) {
		var input = document.createElement( 'input');
    var label = document.createElement( 'label' );
    input.type =  type;
    input.value = value;
    input.name = name;
    input.checked = checked;
		input.id = name;
    label.appendChild( input );
    label.appendChild( document.createTextNode( text ) );
    return label;
	}

	this.moveUp = function( i ) {
    var el = document.getElementById( i );
    el.style.top = parseInt(el.style.top) - this.tileHeight + 'px';
  };
  this.moveDown = function( i ) {
    var el = document.getElementById( i );
    el.style.top = parseInt(el.style.top) + this.tileHeight+ 'px';
  };
  this.moveLeft = function( i ) {
    var el = document.getElementById( i );
    el.style.left = parseInt(el.style.left) - this.tileWidth + 'px';
  };
  this.moveRight = function( i ) {
    var el = document.getElementById( i );
    el.style.left = parseInt(el.style.left) + this.tileWidth + 'px';
  };

	var getEmptyTile = function( t ) {
		if ( parseInt(t.id) === puzzle.board.tiles.length-1 ) {
      t.className = 'tile empty-tile';
			t.innerHTML = '';
    }
	}


};
