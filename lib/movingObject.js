/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.wrap = options.wrap;
  };
  
  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.wrap) { this.pos = this.game.wrap(this.pos); }
  };
  
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var ox = otherObject.pos[0];
    var oy = otherObject.pos[1];
    var x = this.pos[0];
    var y = this.pos[1];
    
    var base = Math.abs(ox - x);
    var height = Math.abs(oy - y);
    var distance = Math.sqrt((Math.pow(base, 2) + Math.pow(height, 2)));

    var sharedRadius = (this.radius + otherObject.radius);
    
    return distance < sharedRadius ? true : false
  };
  
  MovingObject.prototype.collideWith = function (otherObject) {};
})();