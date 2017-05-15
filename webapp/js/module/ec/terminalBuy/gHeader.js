/**
 * 头部区域模块功能：
 *  1、当搜索框获头部点击时，显示第二页（g-page2）
 *  2、当第二页中的显示时，点击回退时显示第一页（第一页、第二页进行切换）
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	var gPage = $("#g-page");
	var gHeader = $("#g-header");
	var gContent = $("#g-content");
	//当头部输入框获取焦点时，将第一页隐藏，显示第二页，并设置第二页的搜索框获取到焦点
	var headerBrandNameSearch = $("#header-brand-name-search");
	
	var gPage2 = $("#g-page2");
	var brandNameSearch = $("#brand-name-search");
	// 回退按钮,单击时切换搜索、内容显示
	var leftBack = $("#left-back");
	
	
	//当内容向下滚动 超过100px时就对g-header元素添加背景，反之亦然
	gContent.scroll(function(e) {
		nScrollTop = this.scrollTop;
		//console.debug("nScrollTop:"+nScrollTop);
		if (nScrollTop > 100) {
			gHeader.addClass("bg1");
		} else {
			gHeader.removeClass("bg1");
		}
	});
	/**
	 * 头部点击时，将第一页隐藏，显示第二页，并设置第二页的搜索框获取到焦点
	 */
	headerBrandNameSearch.on("tap",function(e){
		gPage.hide();
		gPage2.show();
		brandNameSearch.focus();
	});
	
	/**
	 * 注册回退按钮tap事件，点击时将搜索区域隐藏，显示gPage内容
	 */
	leftBack.on("tap",function(e){
		gHeader.removeClass("bg1");
		gPage2.hide();
		gPage.show();
		gContent.prop("scrollTop",0);
		
	});
});