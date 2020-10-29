<template>
  <div class="uploadCon">
	<van-field
	  readonly
	  clickable
	  name="picker"
	  :value="value1"
	  label="tid"
	  placeholder="点击选择"
	  @click="showPicker1 = true"
	/>
	<van-popup v-model="showPicker1" position="bottom">
	  <van-picker
	    show-toolbar
	    :columns="columns1"
	    @confirm="onConfirm1"
	    @cancel="showPicker1 = false"
	  />
	</van-popup>
	<van-field
	  readonly
	  clickable
	  name="picker"
	  :value="value2"
	  label="tid"
	  placeholder="点击选择"
	  @click="showPicker2 = true"
	/>
	<van-popup v-model="showPicker2" position="bottom">
	  <van-picker
	    show-toolbar
	    :columns="columns2"
	    @confirm="onConfirm2"
	    @cancel="showPicker2 = false"
	  />
	</van-popup>
	<van-field name="uploader" label="文件上传">
	  <template #input>
	    <van-uploader v-model="fileList" multiple :after-read="onRead"/>
	  </template>
	</van-field>
	<van-button type="default" @click="uploadFile()">提交</van-button>
  </div>
</template>
<script>
import Vue from 'vue';
import { Uploader,Button,Popup,Form,Field,Picker,Toast  } from 'vant';

Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Popup);
Vue.use(Picker);

export default {
  data() {
    return {
      fileList: [],
      filesData:[],
      filesName:[],
      value1: '',
      value2: '',
      columns1: ['场景主题', '特效主题', '插播字幕', '服装列表'],
      columns2: [],
      showPicker1: false,
      showPicker2: false,
    };
  },
  methods:{
  	uploadFile(){
	    //post请求接口
	    let _this=this;
	    _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/uploadFile',_this.$qs.stringify({files:this.filesData,fnames:this.filesName,cid:1,tid:1}))
	    .then(res=> {
			let data=res.data.data;
			Toast(res.data.msg);
	    })
	    .catch(error=>{
	      console.log(error)
	    })
  	},
  	onRead(file){
  		let _this=this;
  		if (file instanceof Array && file.length > 1) {
  			file.forEach(function(item){
  				console.log(item)
				_this.filesData.push(item.content);
				_this.filesName.push(item.file.name);
          　　})
  		}else{
  			_this.filesData.push(file.content);
  			_this.filesName.push(file.file.name);
  		}
  	},
  	onConfirm1(value) {
      this.value1 = value;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.value2 = value;
      this.showPicker2 = false;
    },
    loadPost(){
		//post请求接口
		let _this=this;
		_this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/getClassInfo',_this.$qs.stringify({tid:1}))
		.then(res=> {
		  let data=res.data.data;
		  for(let item in data){
		   _this.columns2.push(data[item].name);
		  }
		})
		.catch(error=>{
		  console.log(error)
		})
    }
  },
  created(){
  	this.loadPost();
  }
};
</script>
<style lang="less" scoped>
@import 'index.less';
</style>
