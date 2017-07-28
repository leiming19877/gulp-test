define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var  Clipboard = require("clipboard");
	require("date");
	var ladingId = getLadingId();
	
	 var clipboard = new Clipboard('#copy_lading_code');
		clipboard.on('success', function(e) {
			weui.toast('复制成功', 1000);
		});
		clipboard.on('error',function(e){
			weui.toast('复制失败', 1000);
		});
	
	var ladingDetail = new Vue({
		el: "#lading-detail",
		data: {
			ladingInfo:{
				ecLadingCode:'',
				totalQuantity:'',
				totalWeight:'',
				totalRealQuantity:'',
				totalRealWeight:'',
				totalMoney:'',
				totalRealMoney:'',
				ladingComment:'',
				isTrafficExpense:'',
				warehouseOutWay:'',
				isOutWarehouseExpense:'',
				isVendorPay:'',
				deliveryTypeDsec:'',
				settleTypeDesc:'',
				sellerName:'',
				salesman:'',
				createdDatetime:'',
				agentName:'',
				projectText:'',//这个字段提货信用
				ladingDetailList:[]
			}
		},
		methods: {
			loadDetail:function(ladingId){
				var loading = weui.loading('加载中...', {});
				var params = {
						ladingId:ladingId
				};
				$.ajax({
			        type: 'POST',
			        url: "../../lading/detail",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	ladingDetail.ladingInfo = resp;
			        	//$('#copy_lading_code').attr('data-clipboard-text',ladingDetail.ladingInfo.ecLadingCode);
			        	loading.hide(); 
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 3000);
			        }
		      });
			}
		},
		created:function(){
			this.loadDetail(ladingId);
		}
	});	
	/**
	 * 获取url中的orderId
	 */
	function getLadingId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?ladingId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
});


