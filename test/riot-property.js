/* Riot property mixin 0.31.0, @license MIT, (c) 2015 Ax */

(function(riot) {
  "use strict"

  function trigger(value, name, obj, type) {
    var event = name + type
    var eventAll = '*' + type

    obj.trigger(event, value)
    obj.trigger(eventAll, value, name)
    property.trigger(eventAll, value, name, obj)
  }

  function get(obj, opts) {
    var value = opts.getter ? opts.getter.call(obj, opts.data) : opts.data
    trigger(value, opts.name, obj, 'Get')
    return value
  }

  function set(obj, value, opts) {
    // check value
    if (opts.checker && !opts.checker.call(obj, value)) {
      trigger(value, opts.name, obj, 'Check')
      return
    }

    value = opts.setter ? opts.setter.call(obj, value) : value

    var isChange = opts.data !== value

    opts.data = value

    trigger(opts.data, opts.name, obj, 'Set')

    if (isChange) {
      trigger(opts.data, opts.name, obj, 'Change')
    }
  }

  function bind(obj, value, opts) {
    unbind(obj, opts)

    function onGet(data, key, obj) {
      opts.events.push({
        key: key,
        obj: obj
      })
    }

    function recalc() {
      // console.log('Recalc')
      var value = opts.binder.call(obj)
      set(obj, value, opts)
    }

    property.on('*Get', onGet)

    opts.binder = value
    value = opts.binder.call(obj)

    property.off('*Get', onGet)

    for (var i = 0, l = opts.events.length; i < l; ++i) {
      var obj = opts.events[i].obj
      var key = opts.events[i].key

      obj.on(key + 'Set', recalc)
    }
  }

  function unbind(obj, opts) {
    //TODO: off events
    opts.events = opts.events || []
    opts.events.length = 0
    opts.binder = null
  }

  function on(obj, events) {}

  function off(obj, events) {}

  function property(object, name, value, options) {
    // properties
    if (typeof(name) === 'object') {
      var values = name
      options = value
      for (name in values) {
        values.hasOwnProperty(name) && property(object, name, values[name], options)
      }
      return
    }

    var opts = {
      name: name
    }

    opts.data = opts.data

    if (options) {
      opts.getter = options.getter
      opts.setter = options.setter
      opts.checker = options.checker
    }


    Object.defineProperty(object, name, {

      get: function() {
        return get(this, opts)
      },

      set: function(value) {
        if (typeof(value) === 'function') {
          bind(this, value, opts)
        } else {
          opts.binder && unbind(this, opts)
        }

        set(this, value, opts)
      }
    });

    // init property by value
    object[name] = value
  }

  property.settings = {

  }

  riot.observable(property)


  riot.mixin('property', {
    property: function(name, value, opts) {
      property(this, name, value, opts)
      return this
    }
  })

  riot.property = property

  if (typeof(module) !== "undefined") {
    module.exports = property
  }

})(typeof(riot) !== 'undefined' ? riot : require('riot'))