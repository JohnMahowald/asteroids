/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.ctx = canvasEl.getContext("2d");
  };
  
  GameView.prototype.start = function () {
    var that = this;
    window.setInterval((function() {
      that.game.step();
      that.game.draw(that.ctx);
    }).bind(that), 20);
  };
})();