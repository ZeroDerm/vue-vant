<template>
	<div class="taskListCon">
		<van-row>
		  <van-col span="8" class="header-left">
		  	<van-button type="default" v-on:click="back"><van-icon name="arrow-left" />返回</van-button>
		  </van-col>
		  <van-col span="8"></van-col>
		  <van-col span="8" class="header-right">
			<van-button type="default" @click="releaseTask()"><van-icon name="checked" />发布任务</van-button>
		  </van-col>
		</van-row>
		<van-row>
			<table>
				<tr>
					<th>任务名称</th>
					<th>编辑</th>
					<th>删除</th>
					<th>选择</th>	
				</tr>
				<tr v-for="(item,index) in taskList" :key="index">
					<td>{{item.name}}</td>
					<td><van-icon name="records" @click="editTask(item.id)"/></td>
					<td><van-icon name="close" @click="delTask(item.id)"/></td>
					<td class="checkTask"><van-icon name="circle" class="td-q" /><i class="td-g" :class="is_opacityArr.indexOf(item.id) == -1?'td-hide':''" @click="checkTask(item.id)">√</i></td>
				</tr>
			</table>
		</van-row>
	</div>
</template>
<script>
import Vue from 'vue';
import { Col, Row, Button, Icon, Toast } from 'vant';

Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Toast);

export default {
  data () {
    return {
    	taskList:'',
    	is_opacityArr:[]
    };
  },
  methods: {
  	getTaskList(){
        //post请求接口
        let _this=this;
        _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/getTaskList',_this.$qs.stringify({}))
        .then(res=> {
          let data=res.data.data;
          _this.taskList = data;
        })
        .catch(error=>{
          console.log(error)
        })
  	},
  	editTask(id){
  		this.$router.push({
  			path:'/SceneTheme',
  			query:{
  				id:id
  			}
  		})
  	},
  	delTask(id){
  		let msg = "您真的确定要删除吗？"; 
		if (confirm(msg)==true){ 
			let i = this.taskList.indexOf(id);
			this.taskList.splice(i,1);
			this.requestUpdateTask(id,'-1','删除成功!');
		}else{ 
			return false; 
		} 
  	},
  	requestUpdateTask(id,type,msg){
        //post请求接口
        let _this=this;
        _this.$axios.post('http://192.168.1.25/studio_vr/public/index.php/updateTask',_this.$qs.stringify({id:id,type:type}))
        .then(res=> {
          let data=res.data;
          if(data.code){
          	Toast(msg);
          }else{
          	Toast(data.msg);
          }
        })
        .catch(error=>{
          console.log(error)
        })
  	},
  	checkTask(id){
        if(this.is_opacityArr.indexOf(id) == -1){
          this.is_opacityArr.push(id);
        }else{
          let i = this.is_opacityArr.indexOf(id);
          this.is_opacityArr.splice(i,1);
        }
  	},
  	releaseTask(){
		for(let key  in this.taskList){
			let i = this.is_opacityArr.indexOf(this.taskList[key].id);
			if( i != -1){
				this.taskList.splice(key,1);
			}
		}
  		this.requestUpdateTask(this.is_opacityArr,1,'发布成功!');
  	},
  	back(){
        this.$router.go(-1);//返回上一层
    },
  },
  created(){
  	this.getTaskList();
  }
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>