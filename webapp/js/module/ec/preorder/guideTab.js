/**
 * 导航菜单模块功能
 * @dependce loadingToast.js
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	var loadingToast = require("./loadingToast");
	// 导航元素
	var guideTab = $("#guide-tab");
	
	// 加载所有品种
	function loadVarietys() {

		$.getJSON('getAllVarietys', function(data) {
			if (!data) {
				return;
			}
			var tabs = $('<ul class="tabs"></ul>');
			guideTab.append(tabs);
			var firstTab = null;
			for (var i = 0; i < data.length; i++) {
				var varietyId = data[i].varietyId;
				var varietyName = data[i].varietyName;
				// 导航区
				var li = $('<li class="' + (i === 0 ? 'active' : '')
						+ '" data-varietyId="' + varietyId + '" ></li>');
				li.append('<a href="#" >' + varietyName + '</a>');
				li.appendTo(tabs);
				// 增加tab内容区域
				var tabContent = $('<div class="' + (i === 0 ? 'active' : '')
						+ '"></div>');
				if(i === 0){
					firstTab = li;
				}
				guideTab.append(tabContent);
			}
			//加载第一个tab 对应的品名内容
			firstTab.trigger("tap");	
		});
	}
	/**
	 * 加载指定品种的所有品类
	 * 
	 * @varietyId {Number} 品种id
	 * @tabIndex {Number} 加载第几个tab品名
	 */
	function loadBrands(varietyId, tabIndex) {
		//删除原来选择Tab内容
		guideTab.children("div.active").removeClass("active");
		var tabContent = guideTab.children("div").eq(tabIndex);
		tabContent.addClass("active");
		// 已经加载过内容
		if (tabContent.text() !== "") {
			return;
		}
		loadingToast.show("数据加载中");
		$.post('getBrandsByVarietyId', {
			"varietyId" : varietyId
		}, function(data) {
			loadingToast.hide();
			if (!data) {
				return;
			}

			var ul = $('<ul class="m-brand-names f-cb"></ul>');
			tabContent.append(ul);
			for (var i = 0; i < data.length; i++) {
				var brandId = data[i].brandId;
				var brandName = data[i].brandName;
				// 导航区
				var li = $('<li ></li>');
				li.attr({
					"data-brandId" : brandId
				});
				var a = $('<a href="#">' + brandName + '</a>')
				li.append(a);
				li.appendTo(ul);
			}

		},"json");
	}
	/**
	 * 注册tab切换事件
	 */
	function registerTabs() {
		guideTab.on("tap", "ul.tabs>li", function(e) {
			var self = $(this);
			var index = self.index();
			var varietyId = self.attr("data-varietyId");
			//将单击Tab设置选择状态
			self.siblings(".active").removeClass("active");
			self.addClass("active");
			loadBrands(varietyId, index);
		});
	}

	$(document).ready(function() {
		// 清空导航内所有html结构
		guideTab.empty();
		loadVarietys();
		registerTabs();
	});
});