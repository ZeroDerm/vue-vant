<template>
  <div class="loginCon">
    <van-form @submit="onSubmit">
      <h2>直播间背景管理后台</h2>
      <div class="loginBg">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
         
        />
        <van-field
          v-model="password"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          
        />
      </div>
      <div style="margin: 16px;">
        <van-button round 
        block type="info" 
        native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import Vue from 'vue';
import { Field,Form } from 'vant';
import md5 from 'js-md5';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Field);
Vue.use(Form);

export default {
  name:'Login',
  data() {
    return {
      username: '',
      password: '',
      _t:''
    };
  },
  methods: {
    onSubmit(values) {
      this.toLogin(values.username,md5(values.pwd));
    },
    toLogin(username,pwd){
        //post请求接口
        let _this=this;
        _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/login',_this.$qs.stringify({username:username,pwd:pwd,_t:this._t}))
        .then(res=> {
          if(res.data.code){
            setTimeout(() =>{
                this.$router.push({name: 'Main'});
            },1500);
          }
          Toast(res.data.msg);
        })
        .catch(error=>{
          console.log(error)
        })
    },
    gettoken(){
        //post请求接口
        let _this=this;
        _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/getToken',_this.$qs.stringify({}))
        .then(res=> {
          _this._t = res.data._t;
        })
        .catch(error=>{
          console.log(error)
        })
    }
  },
  created(){
    this.gettoken();
  }
};
</script>
<style lang="less" scoped>
@import 'index.less';
</style>
