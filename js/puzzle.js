var Puzzle = function() {

  var dimension = '4x4'; // TO DO get via settings
  this.dimensionX = dimension.substring(0, 1);
  this.dimensionY = dimension.substring(2, 3);

  this.started = false;
  this.board = new Board( this );
  this.presentor = new Presentor( this );

  var findEmptyTile = function(tiles) {
    return tiles.empty === true;
  }

  var emptyTile = this.board.tiles.find(findEmptyTile); // var?

  this.shuffle = function() {

    // Random 100 moves:
    var timesToMove = 10;
    for (var i = 0; i < timesToMove; i++ ) {
      var moveableTiles = [];
      for ( tile in this.board.tiles ) {
        // get a tile that has the emptytile next to it
        var t = this.board.tiles[tile];
        var emptytilePosRow = emptyTile.x,
          emptytilePosCol = emptyTile.y;
        if ( (t.x - 1 == emptytilePosRow && t.y == emptytilePosCol) ||
          (t.x + 1 == emptytilePosRow && t.y == emptytilePosCol) ||
          (t.x == emptytilePosRow && t.y - 1 == emptytilePosCol) ||
          (t.x == emptytilePosRow && t.y + 1 == emptytilePosCol) ) {
            moveableTiles.push( t );
        }
      }
      // pick one and swap with empty
      var randomT = moveableTiles[Math.floor(Math.random()*moveableTiles.length)];
      var randomTx = randomT.x,
        randomTy = randomT.y,
        emptyTx = emptyTile.x,
        emptyTy = emptyTile.y;
      randomT.x = emptyTx;
      randomT.y = emptyTy;
      emptyTile.x = randomTx;
      emptyTile.y = randomTy;
    }
    this.presentor.drawTiles();
  };

  this.checkIfSolved = function() {
  var correctTiles = 0;
  var tiles = this.board.tiles;
  for ( tile in this.board.tiles ) {
    var tile = this.board.tiles[tile];
    if ( tile.x == tile.correctX && tile.y == tile.correctY ) {
      correctTiles++;
    } else {
      return false;
    }
    if ( correctTiles ==  tiles.length ) {
      setTimeout( function() {
        alert('Congrats! You have solved the puzzle.');
      }, 300 );
    }
  }
}

this.moveTile = function( index ) {
  var currentTile = this.board.tiles[index],
    emptytilePosRow = emptyTile.x,
    emptytilePosCol = emptyTile.y,
    posRow = currentTile.x,
    posCol = currentTile.y;

  if (posRow - 1 == emptytilePosRow && posCol == emptytilePosCol) {
    this.presentor.moveUp( index );
    posRow--;
    emptytilePosRow++;
  } else if (posRow + 1 == emptytilePosRow && posCol == emptytilePosCol) {
    this.presentor.moveDown( index );
    posRow++;
    emptytilePosRow--;
  } else if (posRow == emptytilePosRow && posCol - 1 == emptytilePosCol) {
     this.presentor.moveLeft( index );
     posCol--;
     emptytilePosCol++;
  } else if (posRow == emptytilePosRow && posCol + 1 == emptytilePosCol) {
    this.presentor.moveRight( index );
    posCol++;
    emptytilePosCol--;
  }

  // Update array items:
  currentTile.x = posRow;
  currentTile.y = posCol;
  emptyTile.x = emptytilePosRow;
  emptyTile.y = emptytilePosCol;

  // Check if solved:
  this.checkIfSolved();
};

  this.init = function() {
    if ( !this.started ) {
      this.presentor.drawExample();
      this.presentor.drawTiles();
      this.shuffle();
      // Test:
      console.log(this.board);
    }
  };



};
