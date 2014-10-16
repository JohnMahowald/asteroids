/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function () {
    this.asteroids = this.addAsteroids();
  };
  
  Game.DIM_X = window.innerWidth / 1.3;
  Game.DIM_Y = window.innerWidth / 1.2;
  Game.NUM_ASTEROIDS = 10;
  
  Game.prototype.addAsteroids = function () {
    var result = [];
    
    while (result.length < Game.NUM_ASTEROIDS) {
      result.push(
        new Asteroids.Asteroid(
          this.randomPos(Game.DIM_X, Game.DIM_Y),
          this
      ));
    }
    
    return result;
  };
  
  Game.prototype.randomPos = function () {
    return [
      Math.floor(Math.random() * Game.DIM_X),
      Math.floor(Math.random() * Game.DIM_Y)
    ];
  };
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    this.asteroids.forEach(function (stroid) {
      stroid.draw(ctx);
    });
  };
  
  Game.prototype.moveObjects = function () {
    this.asteroids.forEach( function (asteroid) {
      asteroid.move();
    });
  };
  
  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i ++ ) {
      for (var j = 0; j < this.asteroids.length; j ++ ) {
        if (i !== j) {
          if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
            this.asteroids[i].collideWith(this.asteroids[j]);
          }
        }
      }  
    };
    return false;
  };
  
  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  }
  
  Game.prototype.remove = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };
  
  Game.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];
    
    if (x < 0) { x += Game.DIM_X; }
    if (x > Game.DIM_X) { x -= Game.DIM_X; }
    if (y < 0) { y += Game.DIM_Y; }
    if (y > Game.DIM_Y) { y -= Game.DIM_Y; }
    
    return [x, y];
  };

})();