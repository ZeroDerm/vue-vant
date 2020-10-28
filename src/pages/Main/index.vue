<template>
  <div class="container">
    <div class="aside">

    </div>
    <div class="main">
      <div class="header">
        <span class="selected">
          <i class="iconfont icon-chakan"></i>
          查看已选
        </span>
        <span class="confrom">
          <i class="iconfont icon-fabuxuqiu"></i>
          确定发布
        </span>
      </div>
      <div class="nav">
        <van-tabs v-model="active">
          <van-tab title="场景主题" to="SceneTheme"></van-tab>
          <van-tab title="特效主题" disabled></van-tab>
          <van-tab title="插播字幕" disabled></van-tab>
          <van-tab title="服饰列表" disabled></van-tab>
          <van-tab title="更多功能" disabled></van-tab>
        </van-tabs>
      </div>
      <div class="content">
        <keep-alive>
          <!-- 当前进入的路由 meta里面 keepAlive为true时走这里 -->
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 当前进入的路由 meta里面 keepAlive为false时走这里 下面 if 判断进行了取反处理 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>

      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
// import ImageSwiper from '@/pages/ImageSwiper'
Vue.use(Tab);
Vue.use(Tabs);

export default {
  name: 'Main',
  //   components: {
  //     ImageSwiper
  //   },
  data () {
    return {
      active: 0,
    };
  },
}
</script>

<style lang="less" scoped>
@import 'index.less';
</style>