<template>
  <div class="container">
    <!-- 侧边显示图片部分  -->
    <div class="aside">

    </div>
    <div class='content'>
      <div class="header">
        <span  v-for="(item,index) in themeList" :key="item.id" class="theme-text" v-bind:class="is_active == item.id?'span-active':''" @click="tapClass(item.id)">{{item.name}}</span>

        <i class="iconfont icon-shuangxiajiantou-"></i>
      </div>
      <div class="album">
        <div class="img-item" v-for="(i,d) in itemList" :key="i.id">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick" @click="checkTap(i.id)" :class="is_selectedArr.indexOf(i.id) == -1?'is_selected':''"></i>
        </div>
<!--         <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>
        <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>
        <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>
        <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>
        <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>
        <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>
        <div class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div>

        <div v-for="(item,index) in 4" :key="index" class="img-item">
          <img src="static/img/组9.png" alt="">
          <i class="iconfont icon-icon-test"></i>
          <i class="iconfont icon-tick"></i>
        </div> -->

      </div>
      <div class="paging">
        <van-pagination v-model="currentPage" :total-items="totalNum" :show-page-size="3" force-ellipses @change="turnPage(currentPage)" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Button, Pagination } from 'vant';

Vue.use(Pagination);
Vue.use(Button);
export default {
  name: 'Main',
  data () {
    return {
      active: 2,
      currentPage: 1,
      themeList:"",
      is_active:1,
      itemList:"",
      totalNum:'',
      is_selectedArr:[],
      class_id:1
    };
  },
  methods: {
      loadPost(){
        //post请求接口
        let _this=this;
        _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/getClassInfo',_this.$qs.stringify({tid:1}))
        .then(res=> {
          let data=res.data.data;
           _this.themeList = data;
        })
        .catch(error=>{
          console.log(error)
        })
      },
      tapClass(index){
        this.is_active = index;
        this.class_id = index;
        this.getItemInfo(this.class_id,this.currentPage);
      },
      getItemInfo(cid=1,currentPage){
        //post请求接口
        let _this=this;
        _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/getItemInfo',_this.$qs.stringify({tid:1,cid:cid,currPage:currentPage}))
        .then(res=> {
          let data=res.data.data;
          let pInfo = res.data.page;
          _this.itemList = data;
          _this.totalNum = pInfo.totalNum;
        })
        .catch(error=>{
          console.log(error)
        })
      },
      turnPage(curr){
        this.getItemInfo(this.class_id,this.currentPage)
      },
      checkTap(id){
        if(this.is_selectedArr.indexOf(id) == -1){
          this.is_selectedArr.push(id);
        }else{
          let i = this.is_selectedArr.indexOf(id);
          this.is_selectedArr.splice(i,1);
        }
      }
  },
  created(){
    this.loadPost();
    this.getItemInfo(this.class_id,this.currentPage);
  }
}

</script>
<style lang="less" scoped>
@import 'index.less';
</style>