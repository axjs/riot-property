/* Riot lazy-update mixin 0.11, @license MIT, (c) 2015 Ax */ 

(function(riot) {
  "use strict"

  var requestAnimation = typeof(requestAnimationFrame) !== 'undefined' ? requestAnimationFrame : function(callback, element) {
    setTimeout(callback, 1000 / 60)
  }

  function lazy(obj, name) {

    // save old update function
    var original = obj[name]

    // current flag
    var prevent = false;

    var callback = (function() {
      original.apply(this)
      prevent = false
    }).bind(obj)

    obj.update = function() {
      if (arguments.length)
        return original.apply(obj, arguments)

      if (prevent)
        return

      prevent = true;
      requestAnimation(callback)
    }
  }

  riot.mixin('lazy-update', {
    init: function() {
      lazy(this, 'update')
    }
  })

})(typeof(riot) !== 'undefined' ? riot : require('riot'))