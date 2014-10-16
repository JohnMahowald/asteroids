/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var MO = Asteroids.MovingObject = function (args) {
    this.pos = args.pos,
    this.vel = args.vel,
    this.radius = args.radius, 
    this.color = args.color;
    this.game = args.game
  };
  
  MO.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc( 
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false 
    );
    
    ctx.fill();
  };
  
  MO.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = Asteroids.Game.wrap(this.pos);
  };
  
  MO.prototype.isCollidedWith = function (otherObject) {
    var ox = otherObject.pos[0];
    var oy = otherObject.pos[1];
    var x = this.pos[0];
    var y = this.pos[1];
    
    var base = Math.abs(ox - x);
    var height = Math.abs(oy - y);
    var distance = Math.sqrt((Math.pow(base, 2) + Math.pow(height, 2)));

    var sharedRadius = (this.radius + otherObject.radius);
    
    if (distance < sharedRadius) {
      return true;
    }
    return false;
  };
  
  MO.prototype.collideWith = function (otherObject) {
    var game = this.game;
    game.remove(this);
    game.remove(otherObject);
  };
})();