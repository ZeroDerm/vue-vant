<template>
  <div class="container">
    <div class="aside">

    </div>
    <div class="main">
      <div class="header">
        <span class="selected" @click="showTask()">
          <i class="iconfont icon-chakan"></i>
          <span class="iconfont" v-show="taskNum">{{taskNum}}</span>
          查看任务
        </span>
        <span class="confrom" @click="confrom()">
          <i class="iconfont icon-fabuxuqiu"></i>
          创建任务
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
          <router-view v-if="$route.meta.keepAlive" @getMessage="showMsg"></router-view>
        </keep-alive>
        <!-- 当前进入的路由 meta里面 keepAlive为false时走这里 下面 if 判断进行了取反处理 -->
        <router-view v-if="!$route.meta.keepAlive" @getMessage="showMsg"></router-view>

      </div>
      <van-overlay :show="show" @click="show = false" :z-index="999999">
        <div class="wrapper" @click.stop>
          <div class="hideCon">
            <p>创建任务 <van-icon name="cross" @click="show = false" /></p>
            <div class="inner">
                <van-field v-model="value" />
            </div>
            <div class="menu">
              <van-button type="default" @click="createTask()">确认</van-button>
              <van-button type="default" @click="show = false">取消</van-button>  
            </div>
            
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs, Overlay, Field, Button, Toast } from 'vant';
// import ImageSwiper from '@/pages/ImageSwiper'
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Overlay);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);

export default {
  name: 'Main',
  //   components: {
  //     ImageSwiper
  //   },
  data () {
    return {
      active: 0,
      is_selectedArr:[],
      class_id:1,
      imgSelected:'',
      show:false,
      value: '',
      taskNum:0,
    };
  },
  methods:{
    confrom(){
      if(this.is_selectedArr.length){
        this.show = !this.show;
      }else{
        Toast("暂未选择!");
      }
    },
    showMsg (val) {   // methods方法  val即为子组件传过来的值
      // console.log(val)
      this.is_selectedArr = val[0];
      this.class_id = val[1];
      this.imgSelected = val[2];
    },
    createTask(){
      //post请求接口
      let _this=this;
      _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/createTask',_this.$qs.stringify({tid:1,cid:this.class_id,str:this.is_selectedArr,name:this.value,imgSelected:this.imgSelected}))
      .then(res=> {
        let data=res.data;
        if(data.code){
          _this.show = false;
        }
        Toast(data.msg);
      })
      .catch(error=>{
        console.log(error)
      })
    },
    showTask(){
      this.$router.push({name:'TaskList'})
    },
    getTaskNum(){
      //post请求接口
      let _this=this;
      _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/getTaskNum',_this.$qs.stringify({}))
      .then(res=> {
        let data=res.data;
        if(data.data){
          _this.taskNum = data.data;
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }  
  },
  created(){
    this.getTaskNum();
  }
}
</script>

<style lang="less" scoped>
@import 'index.less';
</style>
<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>