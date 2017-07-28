/**
 * 竞价导航模块
 */
define(function(require, exports, module) {
	require("string");
	var $ = require("zepto");
	//数据加载提示
	//var loadingToast = require("./loadingToast");
	var pageScroller = require("./pageScroller");
	//竞价导航
	var bidTab = $("#bid-tab");

	bidTab.on("click",".weui_navbar_item",function(e){
		var self = $(this);
		self.siblings(".weui_bar_item_on").removeClass("weui_bar_item_on");
		self.addClass("weui_bar_item_on");
		var queryType = self.data("queryType");
		pageScroller.showQueryType(queryType);
	});
	
	
	
	module.exports ={
			
	}
});