(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Store = factory()
}(this, function() {
  'use strict';

  var STORAGE_KEY = 'property'

  function Store(obj) {
    if (this instanceof Store) return Store(obj)

    var self = this

    var keys = Object.keys(obj)
    riot.observable(obj)
    obj.on('Change', function(key, value) {
      localStorage.setItem(STORAGE_KEY + '/' + key, JSON.stringify(value))
    })

//    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    
    for (var i=0, l= keys.length; i< l; ++i) { 
      console.log(keys[i], obj[keys[i]])
      riot.property(obj, keys[i], obj[keys[i]])
    }
    
    return obj
  }

  return Store
}));