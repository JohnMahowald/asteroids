/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = this.newGame(canvasEl)
    this.ctx = canvasEl.getContext("2d");
    this.listenForKeypress();
  };
  
  GameView.prototype.start = function () {
    var gameView = this;
    window.setInterval(function() {
      gameView.setLifeCount();
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 20);
    
    window.setInterval(function() {
      gameView.game.addAsteroid();
    }, 10000)
  };
  
  GameView.prototype.newGame = function (canvas) {
    options = {
      canvas: canvas,
      gameView: this
    }
    return new Asteroids.Game(options)
  }
  
  GameView.prototype.endGame = function() {
    alert("game over")
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height); 
  }
  
  GameView.prototype.listenForKeypress = function() {
    var gameView = this;
    setInterval( function() {
      gameView.moveKeyEvents();
    }, 10);
    
    setInterval( function() {
      if (key.isPressed("space")) { gameView.game.ship.fireBullet() };
    }, 150)
  }
  
  GameView.prototype.moveKeyEvents = function() {
    var game = this.game
    
    if (key.isPressed('left')) { 
      game.ship.turn(-.08)
      game.ship.power(.01)
    }
    
    if (key.isPressed('right')) { 
      game.ship.turn(.08)
      game.ship.power(.01)
    }
    
    if (key.isPressed("up")) { game.ship.power(.08) };
    if (key.isPressed("down")) { game.ship.power(-.08) };
  };
  
  GameView.prototype.updateScore = function () {
    document.getElementById("score-count").innerHTML = this.game.score    
  };
  
  GameView.prototype.setLifeCount = function() {
    document.getElementById("life-count").innerHTML = this.game.life
  };
})();