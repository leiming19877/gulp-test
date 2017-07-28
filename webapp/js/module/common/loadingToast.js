/**
 * 加载模块，对外提供以下功能
 * 1、显示加载模块
 * 2、隐藏加载模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	var loadingToastTpl = require("./loadingToast.html");
	//加载提示元素
	var $loadingToast = $("#loading-toast");
	//显示内容
	var $loadingToastContent = $loadingToast.find(".weui_toast_content");
	
	$(document).ready(function(){
		if($loadingToast.length == 0){
			$("body").append(loadingToastTpl);
			$loadingToast = $("#loading-toast");
			$loadingToastContent = $loadingToast.find(".weui_toast_content");
		}
	});
	
	/**
	 * 显示加载模块
	 * @param content {String} 显示内容
	 */
	function  show(content){
		$loadingToastContent.text(content);
		$loadingToast.show();
	}
	/**
	 * 隐藏加载模块
	 */
	function hide(){
		$loadingToast.hide();
	}
	
	module.exports ={
			"show":show,
			"hide":hide
	};
});