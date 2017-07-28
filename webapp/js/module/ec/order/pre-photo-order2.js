define(function(require, exports, module) {

	var $ = require("zepto");
	var wx = require("jweixin");
	var weui = require("weui");
	var Vue = require("vue");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	Vue.http.options.emulateJSON = true;//设置表单提交
	var url = window.location.href;
	var isInitWXSDK = false;//是否初始化好微信sdk
	$.post("../../../../getSignUrl",{"url":url},function(data){
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: ['scanQRCode','getLocalImgData','chooseImage','uploadImage','hideOptionMenu','hideAllNonBaseMenuItem','closeWindow'] // 必填，需要使用的JS接口列表
		});
		wx.ready(function(){
			wx.hideOptionMenu();
			isInitWXSDK  = true;
		});
	},"json");
	
	var app = new Vue({
		el:'#app',
		data:{
			isShowGpSellers:false,//卖家列表是否展示
			sellers:[],//卖家列表
			sellerMemberId: 0,//当前选择的卖家
			sellerMemberName: '',//当前选择的卖家名字
			buyerComment:'',//买家留言
			placeOrderType: 2,//订单类型
			pictures: [],//当前上传成功的图片id例表
			localIds:[]//当前选择上传的列表
		},
		created:function(){
			this.getSellers();
		},
		methods:{
			showGpSellers:function(){
				this.isShowGpSellers = true;
			},
			hideGpSellers:function(){
				this.isShowGpSellers = false;
			},
			pickPictures:function(){
				//如果微信js sdk 还没有初始化好
				if(!isInitWXSDK){
					return ;
				}
				var self = this;
				wx.chooseImage({
				    count: 9, // 默认9
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				        self.localIds = localIds;
				        self.syncUpload();
				    }
				});
			},
			syncUpload:function(){
				var self = this;
				var localId = this.localIds.pop();
				wx.uploadImage({
					 localId: localId,
					 isShowProgressTips: 1,
					 success: function (res) {
					    var serverId = res.serverId; // 返回图片的服务器端ID
					    var pic = {
					    		'serverId': serverId,
						    	'localId': localId,
						    	'localData':''
						    	
					    };
					  
					    //ios wkwebview组件
					    if(window.__wxjs_is_wkwebview){
					    	wx.getLocalImgData({
						        localId: localId, // 图片的localID
						        success: function (res) {
						            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
						            //pic['localData'] = 'data:image/jpg;base64,'+localData;
						            pic['localData'] = localData;
						        },
						        error:function(){
						        	window.alert("error");
						        }
						    });
					    }else{
					    	pic['localData'] =localId;
					    }
						    
						self.pictures.push(pic);
		
					    if (self.localIds.length > 0) {
					    	self.syncUpload();
					    }
					 }
				});
			},
			getSellers:function(){
				var loading = weui.loading('', {
					   
				});
				 var self = this;
				 this.$http.post("../../ec/futures/getSellerMemberList").then(function(rs){
						  loading.hide();
					 	  var data = rs.data;
						  if(data.length>0){
							  //选择第一个作为显示
							  self.sellerMemberId = data[0].sellerId;
							  self.sellerMemberName = data[0].sellerName;
						  }
						  data.forEach(function(t){
							  self.sellers.push({
								  'sellerId':t.sellerId,
								  'sellerName':t.sellerName
							  });
						  });
						  return ;
					  }).catch(function(rs){
						  loading.hide();
						  weui.toast('网络异常!', 3000);
					  });
			},
			chooseSeller:function(sellerMemberId,sellerMemberName){
				this.sellerMemberId = sellerMemberId;
				this.sellerMemberName = sellerMemberName;
			},
			submitOrder:function(){
				var loading = weui.loading('提交中...', {
					   
				});
				var self = this;
				var params = {};
				if(!this.sellerMemberId){
					loading.hide();
					weui.alert("请选择卖家");
					return ;
				}
				params['sellerMemberId'] = this.sellerMemberId;
				if(this.pictures.length === 0){
					loading.hide();
					weui.alert("你还没有上传照片");
					return ;
				}
				var serverIds =  [];
				this.pictures.forEach(function(e){
					serverIds.push(e.serverId);
				});
				params['serverIds'] = serverIds.join(",");
				params['buyerComment'] = this.buyerComment;
				params['placeOrderType'] = 2;
				
				this.$http.post("../../ec/preorder/placeOrder",params).then(function(rs){
						  loading.hide();
						  var data = rs.data;
						     //添加成功后跳转至管理界面
		    				if (data.success == true) {
		    					///window.location.href="../../ec/preorder/placeOrderRes?orderId="+data.orderId;
		    					window.location.href="../../ec/preorder/submitOrderSuccess?orderId="+data.orderId;
		    					//window.location.href="../../ec/order/toDetail?orderId="+data.orderId;
		    				} else {
		    			    	weui.alert(data.msg);
		    			    }
						  return ;
					  }).catch(function(rs){
						  loading.hide();
						  weui.toast('网络异常!', 3000);
					  });
			}
		}
	});

});