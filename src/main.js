// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 导入全局样式表

import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Url from './pages/Common/Path.vue'
import VueWechatTitle from 'vue-wechat-title'
import Common from './assets/js/Common.js'

import qs from 'qs'
import Vconsole from 'vconsole'

import VueAwesomeSwiper from 'vue-awesome-swiper'


import 'swiper/css/swiper.css'
import './assets/css/font.css'
import './assets/css/normalize.css'
import './assets/css/iconfont.css'

import './assets/css/global.css'
import App from './App'
import router from './router'
import { Icon } from 'vant';
// import 'amfe-flexible/index.js'

// let vConsole = new Vconsole()
// Vue.use(vConsole)

/* Using these kinds of IScroll class for different cases. */

Vue.use(VueAwesomeSwiper)
Vue.use(Icon);
Vue.prototype.$axios = Axios
Vue.prototype.$qs = qs
Vue.prototype.$URL = Url.url
Vue.config.productionTip = false
Vue.prototype.switchIndex = 0
Vue.prototype.Common = Common
// Vue.use(ElementUI)
Vue.use(VueWechatTitle)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
