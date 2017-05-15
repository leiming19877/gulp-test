/**
 * 竞价导航模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	var pageScroller = require("./shippingListScoller");
	//收货导航
	var shippginListTab = $("#shipping-list-tab");
	shippginListTab.on("click",".weui_navbar_item",function(e){
		
		var self = $(this);
		self.siblings(".weui_bar_item_on").removeClass("weui_bar_item_on");
		self.addClass("weui_bar_item_on");
		var queryType = self.data("queryType");
		pageScroller.showQueryType(queryType);
	});
	
	
	
	module.exports ={
			
	};
});