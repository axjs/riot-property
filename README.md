
## riot-property


[Riot](https://muut.com/riotjs/) mixin. 
 - Create named property triggered **.set**, .**get**, **.change** events. 
 - Auto call update() when set value.
 - Check value on set, triggered **.check** event


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

  Set property *time* to *this* and init by *0*
``` javascript
  this.property('time', 0)
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

