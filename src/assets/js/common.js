export default {
  a: 'hello',

  Addfunc: function (a, b) {
    return a + b
  },

  GOGO: function () {
    console.log('GOGO')
  },

  // 初始尺码
  InitialSize: function (size) {
    // 男初始尺寸
    var maleinitsize = ['29', '76', 'M']
    // 女初始尺寸
    var femaleinitsize = ['22', '58', 'S']
    if (localStorage.getItem('sex') === 'n') {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < size.length; j++) {
          if (size[j].size === maleinitsize[i]) {
            return j
            break
          }
        }
      }
    } else {
      var isfindInitsize = false
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < size.length; j++) {
          if (size[j].size === femaleinitsize[i]) {
            isfindInitsize = true
            return j
          }
        }
      }
      if (!isfindInitsize) {
        for (var k = 0; k < size.length; k++) {
          if (size[k].size === 'M') {
            return k
          }
        }
      }
    }
  },
}
