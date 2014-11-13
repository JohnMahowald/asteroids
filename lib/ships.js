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
  
  Ship.prototype.colors = function() {
    if (this.active) {
      return ["rgba(68, 150, 123, 1)", "rgba(150, 68, 95, 1)"]
    } else {
      return ["rgba(68, 150, 123, .5)", "rgba(150, 68, 95, .5)"]
    }
  }
  
  Ship.prototype.draw = function(ctx) {
    var start_x = this.pos[0] + this.radius * Math.cos(this.direction)
    var start_y = this.pos[1] + this.radius * Math.sin(this.direction)
    
    var right_x = this.pos[0] + this.radius * Math.cos(-5 * Math.PI / 6 + this.direction)
    var right_y = this.pos[1] + this.radius * Math.sin(-5 * Math.PI / 6 + this.direction)
    
    var left_x = this.pos[0] + this.radius * Math.cos(5 * Math.PI / 6 + this.direction)
    var left_y = this.pos[1] + this.radius * Math.sin(5 * Math.PI / 6 + this.direction)
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(right_x, right_y);
    ctx.lineTo(left_x, left_y);
    ctx.closePath();
    
    var bottom_x = (right_x + left_x) / 2
    var bottom_y = (right_y + left_y) / 2
    var gradient = ctx.createLinearGradient(start_x, start_y, bottom_x, bottom_y)
    var colors = this.colors();
    gradient.addColorStop(.8, colors[0]);
    gradient.addColorStop(1, colors[1]);
    ctx.fillStyle = gradient
    ctx.fill()
  }
  
  Ship.HIDDEN = "rgba(106, 222, 124, .5)"
  Ship.COLOR = "#33CC33";
  Ship.RADIUS = 25;
  Ship.DIRECTION = -(Math.PI / 2);
})();