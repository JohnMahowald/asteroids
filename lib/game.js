/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function (options) {
    this.canvas = options.canvas
    this.gameView = options.gameView
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.life = 3;
    this.score = 0;
    this.ship = this.addShip();
    this.background = this.setBackground();
  };
  
  Game.NUM_ASTEROIDS = 10;
  
  Game.prototype.addAsteroid = function () {
    var asteroid = new Asteroids.Asteroid({
      pos: this.randomOffscreenPos(),
      game: this
    })
    this.add(asteroid)
  }
  
  Game.prototype.randomOffscreenPos = function () {
    /* Generates 0 or 1 randomly */
    var leftOrRight = Math.floor(Math.random() * 2)
    /* Places the asteroid offscreen randomly */
    var x_pos = (leftOrRight == 0 ? 0 : (Math.random() * this.canvas.width))
    var y_pos = (x_pos == 0 ? (Math.random() * this.canvas.height) : 0)
    return [x_pos, y_pos]
  }
  
  Game.prototype.addAsteroids = function () {
    while (this.asteroids.length < Game.NUM_ASTEROIDS) {
      var asteroid = new Asteroids.Asteroid({
        pos: this.randomPos(this.canvas.width, this.canvas.height),
        game: this
      });
      
      this.asteroids.push(asteroid)
    }
  };
  
  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({ 
      pos: this.centerPos(),
      game: this
    });
    
    ship.reset();
    
    return ship
  };
  
  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj)
    } else {
      this.bullets.push(obj)
    }
  }
  
  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1)
    } else {
      this.bullets.splice(this.bullets.indexOf(obj), 1)
    }
  }
  
  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets)
  };
  
  Game.prototype.randomPos = function () {
    return [
      Math.floor(Math.random() * this.canvas.width),
      Math.floor(Math.random() * this.canvas.height)
    ];
  };
  
  Game.prototype.centerPos = function() {
    return [
      Math.floor(this.canvas.width / 2),
      Math.floor(this.canvas.height / 2)
    ];
  };
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(ctx);
    
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };
  
  Game.prototype.setBackground = function() {
    var img = new Image();
    img.src = 'https://farm4.staticflickr.com/3381/4617550311_da70dd1ff2_b.jpg'
    return img
  }
  
  Game.prototype.drawBackground = function (ctx) {
    ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
  };
  
  Game.prototype.moveObjects = function () {
    var objects = this.allObjects()
    this.allObjects().forEach( function (object) { object.move(); });
  };
  
  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects()
    var numObjects = objects.length
    
    for (var i = 0; i < numObjects; i ++ ) {
      for (var j = 0; j < numObjects; j ++ ) {
        if (i !== j) {
          if (objects[i].isCollidedWith(objects[j])) {
            objects[i].collideWith(objects[j]);
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
  
  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];
    
    if (x < 0) { x += this.canvas.width; }
    if (x > this.canvas.width) { x -= this.canvas.width; }
    if (y < 0) { y += this.canvas.height; }
    if (y > this.canvas.height) { y -= this.canvas.height; }
    
    return [x, y];
  };
  
  Game.prototype.addPoints = function(points) {
    this.score += points;
    this.gameView.updateScore();
  };
  
  Game.prototype.removeLife = function() {
    this.life = this.life - 1
    if (this.life <= 0) { this.gameView.endGame() };
    this.ship.reset();
    this.gameView.setLifeCount();
  };
})();