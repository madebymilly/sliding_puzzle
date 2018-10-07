var Board = function( puzzle ) {

  var indexX = parseInt(puzzle.dimensionX),
    indexY = parseInt(puzzle.dimensionY);

  this.tiles = createTilesObject();

  function createTilesObject() {
    var tiles = [];
    var i = 0;
    for( var x = 0; x < indexX; x++ ) {
      for ( var y = 0; y < indexY; y++ ) {
        var empty = ( x+1 == indexX && y+1 == indexY ) ? true : false;
        var tile = new Tile( i, x, y, empty );
        tiles.push( tile );
        i++;
     }
   }
   return tiles;
 }

};
