
## riot-property


[![Riot](https://muut.com/riotjs/logo/riot60x.png)](https://muut.com/riotjs/) `mixin` and helpers for declarative and reactive developing.

 - Named property triggered **.set**, **.change** events when set value
 - Can use **setter**, **getter**, **checker**  handlers
 - Can be set handler on value change
 - Isomorphic - work in tags and any observable objects
 - ...


#### Example

``` javascript
<timer>

  <p>Seconds Elapsed: { time }</p>

  this.mixin('property')
  this.property('time', opts.start || 0, this.update)

  tick() {
    this.time++ // Auto call update() when this.time changed
  }

  var timer = setInterval(this.tick, 1000)

  this.on('unmount', function() {
    clearInterval(timer)
  })

</timer>
```

#### API

  Creating property in riot tag
``` javascript
  this.property(name, [value], [onchange | options])
```

  Creating property in observable object
``` javascript
  riot.property(observer, name, [ value ], [ onchange | options ])
```

  Creating properties
``` javascript
  // in riot tag
  this.properties(values, [ onchange | options ])

  // in observable object
  riot.properties(observer, values, [ onchange | options])
```
 
- `name` - property name
- `value` - property initialisation whith this value
- `onchange` - callback function called when property value change
- `observer` - riot observable object
- `values` - properties `name` and `value` and the keys and values that are kept in object
- `options` - object with optional keys `setter`, `getter`, `checker`, `onchange`, `onset`
 
#### Usage

  Initialisation of mixin 
``` javascript
  this.mixin('property')
```

  Creating property by name and optional init value 
``` javascript
  this.property('time', 0)
```

  Listening property events `{property_name}.{event_type}`
``` javascript
  this.on('time.set', function (value) {...})
  this.on('time.change', function (value) {...})
  this.on('time.check', function (value) {...})
```

  Listening events of all properties object `*.{event_type}`
``` javascript
  this.on('*.set', function (name, value) {...})
  this.on('*.change', function (name, value) {...})
  this.on('*.check', function (name, value) {...})
```

  Creating many properties
``` javascript
  this.properties({
    data: {},
    time: Date.now(),
    counter: 0
  })
```

  Setting options of property 
``` javascript
  this.property('time', 0, {
    setter: function (value) { return value / 1000 },
    getter: function (value) { return value * 1000 },
    checker: function (value) { return value < 0 },
    // callbacks
    onchange: function () { this.update() },
    onset: function () { this.save() },
  })
```

  Setting property to observable object by `riot.property`
``` javascript
function Store() {
  if (!(this instanceof Store)) return new Store()

  riot.observable(this)
  
  riot.property(this, 'data', [])

  this.on('data.set', function(data) {
    this.save(data)
  })
  ...
} 

var store = new Store()
store.data = [1,2,3] // trigger data.set event
```

  Preventing auto trigger event `onchange` when property changed
``` javascript
  this.preventOnchange = true
  
  // onchange callback not run
  this.time++
  
  this.preventOnchange = false
```


[![MIT License][license-image]][license-url]


[![Riot Forum][riot-forum-image]][riot-forum-url]
[![Join the chat at https://gitter.im/axjs/riot-property][gitter-image]][gitter-url]
<!---
[![Join the chat at https://gitter.im/axjs/riot-property](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/axjs/riot-property?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
-->

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[riot-forum-image]:https://img.shields.io/badge/muut-JOIN_CHAT%E2%86%92-ff0044.svg?style=flat-square
[riot-forum-url]:https://muut.com/riotjs/forum/

[gitter-image]:https://img.shields.io/badge/GITTER-JOIN_CHAT_%E2%86%92-1dce73.svg?style=flat-square
[gitter-url]:https://gitter.im/axjs/riot-property?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

