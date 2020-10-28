<template>
  <div class="container">
    <img :src=imgurl alt="img">
  </div>
</template>
<script>
let self = null;

export default {
  data () {
    return {
      imgurl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603695980571&di=80f902a36ace1c2aa0dedb2c51d7ec40&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg",
    };
  },
  created () {
    self = this;
    console.log(self.$route.params.index);
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import 'index.less';
</style>