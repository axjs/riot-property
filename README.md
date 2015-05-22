
## riot-property


[Riot](https://muut.com/riotjs/) mixin. 
 - Create named property triggered **.set**, .**get**, **.change** events. 
 - May check value on set, trigger **.check** event
 - Auto call update() when set value.


#### Example

``` javascript
<timer>

  <p>Seconds Elapsed: { time }</p>

  this.mixin('property')
  this.property('time', opts.start || 0 )

  tick() {
    ++this.time
  }

  var timer = setInterval(this.tick, 1000)

  this.on('unmount', function() {
    clearInterval(timer)
  })

</timer>
```

#### Usage

  Init mixin 
``` javascript
  this.mixin('property')
```

  Create property by name and init value 
``` javascript
  this.property('time', 0)
```

  Listen property events `{property_name}.{event_type}`
``` javascript
  this.on('time.set', function (value) {...})
  this.on('time.change', function (value) {...})
  this.on('time.check', function (value) {...})
```

  Listen events of all object properties `*.{event_type}`
``` javascript
  this.on('*.set', function (name, value) {...})
  this.on('*.change', function (name, value) {...})
  this.on('*.check', function (name, value) {...})
```

  Create many properties
``` javascript
  this.properties({
   data: {},
   time: Date.now(),
   counter: 0
  })
```

  Set property options
``` javascript
  this.property('time', 0 {
   setter: function (value) { return time / 1000 },
   getter: function (value) { return time * 1000 },
   checker: function (value) { return value < 0 },
   preventUpdate: true
  })
```

  Set property to observable object by `riot.property`
``` javascript
function Store() {
  if (!(this instanceof Store)) return new Store()

  riot.observable(this)
  
  riot.property(this, 'data', [])

  this.on('data.set', function(data) {
   this.save(data)
  })
  
  ...
  
    this.data = [1,2,3] // trigger data.set event
```

  Prevent auto call `update()` when object set
``` javascript
  this.preventUpdate = true
  
  // not auto call update() on property set
  ++this.time
  
  this.preventUpdate = false
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

