// inherits from MovingObject

(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = Asteroids = {};
  }
  
  var Bullet = Asteroids.Bullet = function (options) {
    options.pos = options.pos;
    options.vel = options.vel;
    options.radius = Bullet.RADIUS;
    options.color = Bullet.COLOR;
    options.wrap = false;
    
    Asteroids.MovingObject.call(this, options)
  };
  
  Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject)
  
  Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
  
  Bullet.prototype.collideWith = function (object) {
    if (object instanceof Asteroids.Asteroid) { 
      this.game.remove(object);
      this.game.remove(this);
      this.game.addPoints(100)
      this.game.addAsteroid();
    };
  }
  
  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc( 
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false 
    );
    
    ctx.fill();
  };
  
  Bullet.RADIUS = 3
  Bullet.COLOR = "#FF9966"
})();