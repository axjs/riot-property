function MenuStore() {
  if (!(this instanceof MenuStore)) return new MenuStore()

  var self = this

  riot.observable(self)
  
  riot.property(self, 'current')
  this.on('currentChange', function(data) {
   riot.trigger('menu.changed', data)    
  })
  
  self.menu = []
  self.arrGroups = [];

  var filterGoodsGroups = function(goodsGroups) {
    goodsGroups = goodsGroups || [];
    goodsGroups = goodsGroups.filter(function(group) {
      group.goods = (group.goods || []).filter(function(good, i) {
        return !!good.name;
      })
      group.groups = filterGoodsGroups(group.groups || []);
      var ok = (group.goods.length || group.groups.length);
//      if (!ok)
  //      console.info("kill group", group.Name);
      return ok;
    }, this);
    return goodsGroups;
  }

  var treeGroups = function(arr, level) {
    for (var i = 0; i < arr.length; ++i) {
      var group = arr[i];
      var id = group.Id;

      self.arrGroups[id] = group;

      treeGroups(group.groups, level + 1);
    }
  }

  riot.on('menu.init', function(item) {
    $.getJSON('menu.json', function(data) {
      self.menu = filterGoodsGroups(data)
      treeGroups(self.menu || [], 0);

      riot.trigger('menu.group', self.menu[0].Id)
    });
  })

  riot.on('menu.group', function(id) {
    var group = self.arrGroups[id];
    if (!group)
      return;
    riot.route('menu/'+id)

    //        console.info(JSON.stringify(group, 0, 2))
    var goods = group.goods || [];
    var groups = group.groups || [];
    var arr = [],
      columns, rows
    arr.push({
      groupId: self.menu[0].Id || 0,
      name: 'MENU',
      colorCode: "green",
      lagerId: 0,
      service: true
    })
    var addQtty = 1
    if (group.ParentId > 1) {
      ++addQtty;
      arr.push({
        groupId: group.ParentId,
        name: '<-',
        colorCode: "green",
        lagerId: 0,
        service: true
      })
    }
    var qtty = goods.length + groups.length + addQtty;
    if (qtty <= 25) {
      columns = 5;
      rows = 5;
    } else if (qtty <= 36) {
      columns = 6;
      rows = 6;
    } else if (qtty <= 42) {
      columns = 6;
      rows = 7;
    } else if (qtty <= 49) {
      columns = 7;
      rows = 7;
    } else if (qtty <= 56) {
      columns = 7;
      rows = 8;
    } else if (qtty <= 64) {
      columns = 8;
      rows = 8;
    } else {
      columns = 9;
      rows = 9;
    }

    groups.forEach(function(group, i) {
      arr.push({
        groupId: group.Id,
        name: group.Name,
        colorCode: "green",
        lagerId: 0
      })
    });
    goods.forEach(function(good, i) {
      arr.push({
        groupId: 0,
        name: good.name,
        colorCode: "red",
        lagerId: good.LagerId
      })
    });

    while (arr.length < columns*rows) {
      arr.push({name:''})  
    }
    
    var a = []
    do {
      a.push(arr.splice(0, rows))
    } while (arr.length)

    self.current = a
  })

  riot.on('menu.click', function(item) {
    console.log(item)
    if (item.groupId) {
      riot.trigger('menu.group', item.groupId)
    } else {
      alert(item.lagerId)
    }
  })

}