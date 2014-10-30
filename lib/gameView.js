/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game(canvasEl);
    this.ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
  };
  
  GameView.prototype.start = function () {
    var gameView = this;
    window.setInterval((function() {
      gameView.game.setLifeCount();
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }), 10);
  };
  
  GameView.prototype.bindKeyHandlers = function() {
    var game = this.game
    
    key('left', function() { game.ship.turn(-.4) })
    key('right', function() { game.ship.turn(.4) })
    key('up', function() { game.ship.power(1) })
    key('down', function() { game.ship.power(-1) })
    
    key('space', function() { game.ship.fireBullet() });
  };
})();