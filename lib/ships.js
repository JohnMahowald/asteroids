// inherits from MovingObject

(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util
  
  var Ship = Asteroids.Ship = function(options) {
    this.active = true
    this.direction = Ship.DIRECTION
    
    options.pos = options.pos,
    options.vel = [0, 0],
    options.radius = Ship.RADIUS,
    options.game = options.game
    options.wrap = true
    
    Asteroids.MovingObject.call(this, options)
  }
  
  Util.inherits.call(Asteroids.Ship, Asteroids.MovingObject);
  
  Ship.prototype.turn = function (direction) {
    this.direction += direction
  }
  
  Ship.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      if (this.active) {
        this.game.removeLife(); 
      }
    }
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse * Math.cos(this.direction);
    this.vel[1] += impulse * Math.sin(this.direction);
  };
  
  Ship.prototype.fireBullet = function() {
    var vel_x = Math.cos(this.direction) * 20
    var vel_y = Math.sin(this.direction) * 20
    var bullet = new Asteroids.Bullet({
      vel: [vel_x, vel_y],
      pos: this.pos,
      game: this.game
    })
    
    this.game.add(bullet)
  }
  
  Ship.prototype.setToActive = function() {
    this.active = true
  }
  
  Ship.prototype.reset = function() {
    this.pos = [this.game.canvas.width / 2, this.game.canvas.height / 2]
    this.vel = [0, 0]
    this.direction = Ship.DIRECTION;
    this.active = false
    var ship = this;
    setTimeout( function() {
      ship.setToActive();
    }, 3000);
  }
  
  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = (this.active ? Ship.COLOR : Ship.HIDDEN);
    ctx.lineWidth = 2.5;

    //front to bottom right
    ctx.beginPath();
    ctx.moveTo(
      this.pos[0] + this.radius * Math.cos(this.direction),
      this.pos[1] + this.radius * Math.sin(this.direction)
    );
    ctx.lineTo(
      this.pos[0] + this.radius * Math.cos(2 * Math.PI / 3 + this.direction),
      this.pos[1] + this.radius * Math.sin(2 * Math.PI / 3 + this.direction)
    );
    ctx.strokeStyle = Ship.COLOR;
    ctx.stroke();

    // back-line, bottom right to bottom left
    ctx.beginPath();
    ctx.moveTo(
      this.pos[0] + this.radius * Math.cos(2 * Math.PI / 3 + this.direction),
      this.pos[1] + this.radius * Math.sin(2 * Math.PI / 3 + this.direction)
    );
    ctx.lineTo(
      this.pos[0] + this.radius * Math.cos(4 * Math.PI / 3 + this.direction),
      this.pos[1] + this.radius * Math.sin(4 * Math.PI / 3 + this.direction)
    );
    ctx.strokeStyle = "#CACACA";
    ctx.stroke();

    // bottom left to front
    ctx.beginPath();
    ctx.moveTo(
      this.pos[0] + this.radius * Math.cos(4 * Math.PI / 3 + this.direction),
      this.pos[1] + this.radius * Math.sin(4 * Math.PI / 3 + this.direction)
    );
    ctx.lineTo(
      this.pos[0] + this.radius * Math.cos(this.direction),
      this.pos[1] + this.radius * Math.sin(this.direction)
    );
    ctx.strokeStyle = Ship.COLOR;
    ctx.stroke();
  }
  
  Ship.HIDDEN = "rgba(106, 222, 124, .5)"
  Ship.COLOR = "#33CC33";
  Ship.RADIUS = 20;
  Ship.DIRECTION = -(Math.PI / 2);
})();