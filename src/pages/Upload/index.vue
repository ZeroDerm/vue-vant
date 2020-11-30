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
	<van-field name="uploader_v" label="视频上传(zip压缩包)">
	  <template #input>
	    <van-uploader v-model="fileList_video" multiple :after-read="onRead_video"/>
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
    	allClass:8, //全部cid
    	cid:1,
		fileList: [],
		filesData:[],
		filesName:[],
		value1: '',
		value2: '',
		v_arr1:[],
		v_arr2:[],
		columns1: ['场景主题', '特效主题', '插播字幕', '服装列表'],
		columns2: [],
		showPicker1: false,
		showPicker2: false,
		fileList_video:[],

		xhr:new XMLHttpRequest(),
		form_data:new FormData(),
		LENGTH:1024 * 1024 * 5,
		start:0,
		end:1024 * 1024 * 5,
		blob:'',
		blob_num:1,
		is_stop:0,
		path:''
    };
  },
  methods:{
  	uploadFile(){
	    //post请求接口
	    let _this=this;
	    _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/uploadFile',_this.$qs.stringify({files:this.filesData,fnames:this.filesName,cid:_this.cid,tid:1,path:_this.path}))
	    .then(res=> {
			let data=res.data.data;
			Toast(res.data.msg);

			//初始化data
			Object.assign(this.$data, this.$options.data());
	    })
	    .catch(error=>{
	      console.log(error)
	    })
  	},
  	onRead(file){
  		let _this=this;
  		if (file instanceof Array && file.length > 1) {
  			file.forEach(function(item){
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
    	var i = this.columns2.indexOf(value);
    	this.cid = this.v_arr2[i];
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
		  	if(data[item].id != _this.allClass){
				_this.columns2.push(data[item].name);
				_this.v_arr2.push(data[item].id);
		  	}
		  }
		})
		.catch(error=>{
		  console.log(error)
		})
    },
  	onRead_video(file){
  		var _this = this;
		file.status = 'uploading';
		file.message = '上传中...';
  		var f = file.file;
  		if(!this.path){
  			this.path = Date.parse(new Date())/1000;//获取当前毫秒的时间戳，准确！
  		}
        var t = window.setInterval(function () {
			if(_this.is_stop){
				file.status = 'done';
				file.message = '上传成功';
			}
            if (_this.start < f.size) {
                _this.blob = _this.cutFile(f);
                _this.sendFile(_this.blob, f);
                _this.form_data = new FormData();
                _this.blob_num += 1;
            } else {
                window.clearTimeout(t);
            }
        }, 1000);
  	},
    //切割文件
    cutFile(file) {
        var file_blob = file.slice(this.start, this.end);
        this.start = this.end;
        this.end = this.start + this.LENGTH;
        return file_blob;
    },
    //发送文件
    sendFile(blob, file) {
    	var _this = this;
        var total_blob_num = Math.ceil(file.size / _this.LENGTH);
        _this.form_data.append('file', blob);
        _this.form_data.append('blob_num', _this.blob_num);
        _this.form_data.append('total_blob_num', total_blob_num);
        _this.form_data.append('file_name', file.name);
        _this.form_data.append('path', _this.path);
        _this.xhr.open('POST', 'http://192.168.1.25/studio_vr/public/index.php/uploadBlockFile', false);
        _this.xhr.onreadystatechange = function () {
        	if(_this.blob_num == total_blob_num){
        		_this.is_stop = 1;
        	}
        }
        _this.xhr.send(_this.form_data);
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
