/*global Asteroids */
(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = {};
  
  Util.inherits = function (ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    this.prototype = new Surrogate();
  };

  Util.randomVel = function (length) {
    var x = 0;
    var y = 0;
    
    while (x === 0) {
      x = Util.generateRand(length);
    }
    
    while (y === 0) {
      y = Util.generateRand(length);
    }
    return [x, y];
  };
  
  Util.generateRand = function (length) {
    var negative = Math.floor(Math.random() * 2);
    var num = Math.floor(Math.random() * length);
    
    return negative === 1 ? -num : num
  };
})();

