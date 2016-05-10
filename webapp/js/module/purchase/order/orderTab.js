/**
 * 竞价导航模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	//数据加载提示
	//var loadingToast = require("./loadingToast");
	var pageScroller = require("./pageScroller");
	//竞价导航
	var orderTab = $("#order-tab");

	orderTab.on("click",".weui_navbar_item",function(e){
		var self = $(this);
//		self.siblings(".weui_bar_item_on").removeClass("weui_bar_item_on");
//		self.addClass("weui_bar_item_on");
		var queryType = self.data("queryType");
		pageScroller.setSelectedType(queryType);
		pageScroller.showQueryType(queryType);
	});
	
	
	
	module.exports ={
			
	}
});