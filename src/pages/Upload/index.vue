<template>
  <div class="uploadCon">
	<van-field
	  readonly
	  clickable
	  name="picker"
	  :value="value"
	  label="tid"
	  placeholder="点击选择"
	  @click="showPicker = true"
	/>
	<van-popup v-model="showPicker" position="bottom">
	  <van-picker
	    show-toolbar
	    :columns="columns"
	    @confirm="onConfirm"
	    @cancel="showPicker = false"
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
import { Uploader,Button,Popup,Form,Field,Picker  } from 'vant';

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
      value: '',
      columns: ['场景主题', '特效主题', '插播字幕', '服装列表'],
      showPicker: false,
    };
  },
  methods:{
  	uploadFile(){
	    //post请求接口
	    let _this=this;
	    _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/uploadFile',_this.$qs.stringify({files:this.filesData,fnames:this.filesName}))
	    .then(res=> {
	      // let data=res.data.data;
	      console.log(res)
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
  	onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
  }
};
</script>
<style lang="less" scoped>
@import 'index.less';
</style>
