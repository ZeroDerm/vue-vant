import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main/index.vue'
import SceneTheme from '@/pages/SceneTheme'
import ImageSwiper from '@/pages/ImageSwiper'
import Login from '@/pages/Login'
import Upload from '@/pages/Upload'
import TaskList from '@/pages/TaskList'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Login',
    },
    {
      path: '/ImageSwiper',
      name: 'ImageSwiper',
      component: ImageSwiper,
    },
    {
      path: '/Main',
      name: 'Main',
      redirect:'/SceneTheme',
      component: Main,

      meta: {
        title: '淘宝H5',
        keepAlive: true // 此组件需要被缓存
      },
      children: [
        {
          path: '/SceneTheme',
          component: SceneTheme,
          name: 'SceneTheme',
          meta: {
            keepAlive: true // 此组件需要被缓存
          }
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload,
    },
    {
      path: '/TaskList',
      name: 'TaskList',
      component: TaskList,
    }

  ]
})
