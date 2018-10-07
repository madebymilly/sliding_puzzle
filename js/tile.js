var Tile = function( i, x, y, empty ) {

  this.id = i; // IS DEES ECHT NODIG?! object heeft al index van zichzelf.
  this.x = x;
  this.y = y;
  this.correctX = x;
  this.correctY = y;
  this.empty = empty;

};
