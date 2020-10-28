<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view v-wechat-title="$route.meta.title"> </router-view>
  </div>
</template>

<script>

export default {
  name: 'App'

}
</script>

<style scoped>
</style>
