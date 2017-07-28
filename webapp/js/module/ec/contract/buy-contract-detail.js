define(function(require, exports, module) {
	var $ = require("zepto");
	var Vue = require("vue");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	Vue.http.options.emulateJSON = true;//设置表单提交
	// weui
	var weui = require("weui");
	require("date");
	var p = require("params");
	var contractId = p.getParam('contractId');
	var timeLen = 120;//获取验证码时长
	var vT = 0;//获取验证码定时器
	//
	var queryVue = new Vue({
			el: "#app",
			data: {
				stampUri:'',
				contract:{
					detailList:[]
				},
				buyMember:{
					memberBank:{
						
					}
				},
				//供方信息
				sapClientVOForDemander:{
					
				},
				phone:'',
				isShowConfirmContract:false,//是否异常确认合同界面
				vcode:'',//输入验证码
				gvcode:''//系统生成的验证码
				
			},
			computed:{
				
			},
			created:function(){
				this.loadContractDetail();
			},
			methods: {
			
				loadContractDetail: function() {
					var loading = weui.loading('加载中...', {
						   
					});
					
					var params = {
							'contractId':contractId
					};
					var self = this;
					this.$http.post("../../ec/contract/getBuyContractDetail",params).then(function(rs){
						    var data = rs.data;
						    self.stampUri = data.stampUri;
						    self.contract = data.contract;
						    self.buyMember = data.buyMember;
						    self.sapClientVOForDemander = data.sapClientVOForDemander;
						    self.phone = data.phone;
						    return ;
					  },function(error){
						  weui.toast('网络异常!', 3000);
					  }).catch(function(rs){
						 
					  }).finally(function(){
						  loading.hide();
						
					  });
					
				},
				showConfirmContract:function(){
					this.isShowConfirmContract = true;
				},
				hideConfirmContract:function(){
					this.isShowConfirmContract = false;
				},
				//获取验证码
				getRandomCode:function(){
					var self = this;
					$("#get-vcode-btn").attr("disabled","disabled");
					this.$http.post("../../ec/contract/getContractConfirmVCode").then(function(rs){
					    var data = rs.data;
					    if(data.success){
					    	self.gvcode = data.randomCode;
					    	console.log(data.randomCode);
					    	vT = window.setInterval(function(){
					    		 if(timeLen === 0){
					    			 $("#get-vcode-btn").attr("disabled","");
					    			 $("#get-vcode-btn").html("重新获取");
					    			 timeLen = 120;//初始化时长
					    			 window.clearInterval(vT);
					    			 return ;
					    		 }
					    		 if(timeLen == 120){
					    			 $("#get-vcode-btn").attr("disabled","disabled");
					    		 }
					    		 $("#get-vcode-btn").html(timeLen+"秒");
					    		 timeLen--;
					    		 return ;
					    	},1000);
					    }else{
					    	$("#get-vcode-btn").attr("disabled","");
					    	weui.alert(data.msg);
					    }
					    return ;
				  },function(error){
					  weui.toast('网络异常!', 3000);
				  }).catch(function(rs){
					 
				  }).finally(function(){
					
				  });
				},
				confirmContract:function(){
					if(!this.vcode){
						weui.alert("请输入验证码");
						return ;
					}
					if(this.vcode !== this.gvcode){
						weui.alert("输入的验证码不对");
						return ;
					}
					var params = {
							'contractId':this.contract.contractId,
							'vcode':this.vcode
					};
					var loading = weui.loading('确认中...', {
						   
					});
					this.$http.post("../../ec/contract/buyContractConfirm",params).then(function(rs){
					    var data = rs.data;
			
					    if(data.success){
					    	window.location.reload();
					    }else{
					    	weui.alert(data.msg);
					    }
					    return ;
				  },function(error){
					  weui.toast('网络异常!', 3000);
				  }).catch(function(rs){
					 
				  }).finally(function(){
					  loading.hide();
				  });
				}
				
			}
		});
	
	
});