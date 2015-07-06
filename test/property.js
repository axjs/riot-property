/* Riot property mixin 0.31.0, @license MIT, (c) 2015 Ax */

(function(riot) {
  "use strict"

  var propsGet = 'Get'
  var propsSet = 'Set'
  var propsChange = 'Change'
  var propsCheck = 'Check'
  var propsChecker = 'Checker'

    function property(object, name, value, opts) {
      var data, getter, setter, checker

      if (opts) {
        getter = opts.getter
        setter = opts.setter
        checker = opts.checker
      }

      var propGet = name + 'Get'
      var propSet = name + 'Set'
      var propChange = name + 'Change'
      var propCheck = name + 'Check'
      var propChecker = name + 'Checker'

      Object.defineProperty(object, name, {

        get: function() {
          this.trigger(propGet, data)
          this.trigger(propsGet, name, data)

          this[propGet] && this[propGet](data)
          this[propsGet] && this[propsGet](data)

          return getter ? getter.call(this, data) : data
        },

        set: function(value) {
          // check value
          if ((checker && !checker.call(this, value)) ||
            (this[propChecker] && !this[propChecker].call(this, value)) ||
            (this[propsChecker] && !this[propsChecker].call(this, name, value))) {

            this.trigger(propCheck, value)
            this.trigger(propsCheck, name, value)

            this[propCheck] && this[propCheck](value)
            this[propsCheck] && this[propsCheck](name, value)
            return
          }

          var value = setter ? setter.call(this, value) : value

          var isChange = data !== value

          data = value

          this.trigger(propSet, data)
          this.trigger(propsSet, name, data)

          this[propSet] && this[propSet](data)
          this[propsSet] && this[propsSet](name, data)

          if (isChange) {
            this.trigger(propChange, data)
            this.trigger(propsChange, name, data)

            this[propChange] && this[propChange](data)
            this[propsChange] && this[propsChange](name, data)
          }
        }

      });

      // init property by value
      object[name] = value
    }

    function properties(object, values, opts) {
      for (var name in values) {
        if (!values.hasOwnProperty(name))
          continue

        var value = values[name]
        property(object, name, value, opts)
      }
    }

  riot.mixin('property', {
    property: function(name, value, opts) {
      property(this, name, value, opts)
      return this
    },
    properties: function(values, opts) {
      properties(this, values, opts)
      return this
    },
  })

  riot.property = property
  riot.properties = properties

  if (typeof(module) !== "undefined") {
    module.exports = {
      property: property,
      properties: properties
    }
  }

})(typeof(riot) !== 'undefined' ? riot : require('riot'))