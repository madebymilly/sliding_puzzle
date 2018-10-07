var Board = function( puzzle ) {

  this.tiles = [];

  var indexX = parseInt(puzzle.dimensionX),
    indexY = parseInt(puzzle.dimensionY);

  var i = 0;
  for( var x = 0; x < indexX; x++ ) {
    for ( var y = 0; y < indexY; y++ ) {
      var empty = ( x+1 == indexX && y+1 == indexY ) ? true : false;
      var tile = new Tile( i, x, y, empty );
      this.tiles.push( tile );
      i++;
   }
 }

};
