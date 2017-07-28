define(function(require, module, exports) {
	//组件样式
    require("../../../swiper/swiper.min.css");
    var Swiper = require("../../../swiper/swiper.min");
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var Clipboard = require("clipboard");

	
	require("date");
	var orderId = getOrderId();
	
    var clipboard = new Clipboard('#copy_order_no');
	
	clipboard.on('success', function(e) {
		weui.toast('复制成功', 1000);
	});
	clipboard.on('error',function(e){
		weui.toast('复制失败', 1000);
	});
	
	var orderDetail = new Vue({
		el: "#order-detail",
		data: {
			orderInfo:{
				orderBusiId:'',
				orderId:'',
				totalBuyQuantity:'',
				totalBuyWeight:'',
				totalBuyMoney:'',
				orderLadingQuanity:'',
				orderLadingWeight:'',
				totalReallyQuantity:'',
				totalReallyWeight:'',
				transportFeeType:'',
				salesman:'',
				salemanPhone:'',
				userDisplayName:'',
				userCellphone:'',
				preOrderContractId:'',
				orderTypeDesc:'',
				buyerComment:'',
				orderType:'',
				balanceType:'',
				agentName:'',
				iteams:[],
				imgList:[]
			}
		},
		methods: {
			loadDetail:function(orderId){
				var self = this;
				var loading = weui.loading('加载中...', {});
				var params = {
						orderId:orderId
				};
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/detail",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	orderDetail.orderInfo = resp.orderInfo;//订单信息
			        	orderDetail.orderInfo.imgList = resp.imgList;//图片信息
			        	//$('#copy_order_no').attr('data-clipboard-text',orderDetail.orderInfo.orderBusiId);
			        	//DOM 还没有更新
						Vue.nextTick(function(){
							 // DOM 更新了
							self.initSwiper();
						 });
			        	loading.hide(); 
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 3000);
			        }
		      });
			},
			toLadeList:function(orderId){
				window.location.href = "../../lading/toList4wechat?orderId="+orderId;
			},
			initSwiper:function(){
				var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal',
				    loop: false,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				    // 如果需要前进后退按钮
				     nextButton: '.swiper-button-next',
				    prevButton: '.swiper-button-prev'
			  	});   
			},
			toContractDetail:function(preOrderContractId){
				window.location.href = "../contract/toBuyContractDetail?contractId="+preOrderContractId;
				return ;
			}
		},
		created:function(){
			this.loadDetail(orderId);
		}
	});	
	/**
	 * 获取url中的orderId
	 */
	function getOrderId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?orderId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
	
	
});


