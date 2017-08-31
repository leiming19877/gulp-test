define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	var jq = require("jquery");
	
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			orderIds:[],
			orderBusiIds:[],
			type:""
		},
		methods: {
			backToFirstPage:function(e){
				/*if (this.type == "quote") {
					window.location.href = "../quote/list";
				} else {
					window.location.href = "../futures/publishDemand";
				}*/
				window.location.href = "../../navigation/toBuyNavigationPage";
			},
			viewOrderDetail:function(orderIds){
				if (orderIds.length > 1) {
					window.location.href = "../order/toList4wechat";
				} else {
					window.location.href = "../order/toDetail?orderId="+orderIds[0];
				}
			}
		},
		created:function(){
			var url = window.location.href;
			var m = url.substring(url.indexOf("=")+1);
			var orderIds = m.substring(0,m.indexOf("&"));
			
			var typestr = m.substring(m.indexOf("=")+1);
			var type = typestr.substring(0,typestr.indexOf("&"));
			
			var orderBusiIds = typestr.substring(typestr.indexOf("=")+1);
			
			this.orderIds = orderIds.split(",");
			this.orderBusiIds = orderBusiIds.split(",");
			this.type = type;
		},
	});
	
	
	
});
