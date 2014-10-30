/*global Asteroids */

(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util
  
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Util.randomVel(2);
    options.radius = Asteroid.radius();
    options.color = Asteroid.color();
    options.game = options.game;
    options.pos = options.pos;
    options.wrap = true;
    
    Asteroids.MovingObject.call (this, options)
  };
  
  Util.inherits.call(Asteroid, Asteroids.MovingObject);
  
  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc( 
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false 
    );
    
    ctx.fill();
  };
  
  Asteroid.radius = function () {
    return (Math.random() + 1)  * 20
  }
  
  Asteroid.color = function() {
    var randomIdx = Math.floor(Math.random() * 3)
    return Asteroid.COLORS[randomIdx]
  }

  Asteroid.COLORS = ["#3B003B", "#5200A3", "#390072"]
})();