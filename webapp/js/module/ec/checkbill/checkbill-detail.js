define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	require("date");
	var checkBillId = getCheckBillId();
	var checkBillDetail = new Vue({
		el: "#checkBill-detail",
		data: {
			checkbill:{
				chkBillCode:'',
				priceType:'',
				hasOtherExpenses:'',
				chargingModel:'',
				deliveryUnitName:'',
				comment:'',
				createdDatetime:'',
				totalQuantity:'',
				totalWeight:'',
				totalMoney:'',
				totalOtherMoney:'',
				totalOtherExpenses:'',
				iteams:[]
			}
		},
		methods: {
			loadDetail:function(checkBillId){
				var loading = weui.loading('加载中...', {});
				var params = {
						checkBillId:checkBillId
				};
				$.ajax({
			        type: 'POST',
			        url: "../../ec/checkbill/detail",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	checkBillDetail.checkbill = resp;
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
			this.loadDetail(checkBillId);
		}
	});	
	/**
	 * 获取url中的checkBillId
	 */
	function getCheckBillId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?checkBillId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
});


