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
			orderId:"",
			type:""
		},
		methods: {
			backToFirstPage:function(e){
				if (this.type == "quote") {
					window.location.href = "../quote/list";
				} else {
					window.location.href = "../futures/publishDemand";
				}
			},
			viewOrderDetail:function(orderId){
				window.location.href = "../order/toDetail?orderId="+orderId;
			}
		},
		created:function(){
			var url = window.location.href;
			var m = url.substring(url.indexOf("=")+1);
			var orderId = m.substring(0,m.indexOf("&"));
			var type = m.substring(m.indexOf("=")+1);
			this.orderId = orderId;
			this.type = type;
		},
	});
	
	
	
});
