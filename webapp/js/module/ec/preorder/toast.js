/**
 * 提示模块，对外提供以下功能
 * 1.显示指定内容，默认1秒后消失
 * 2、显示指定内容，指定时间后消失
 * 
 */
define(function(require, exports, module) {
	var $ = require("zepto");

	//提示元素
	var toastEl = $("#toast");
	//显示内容
	var toastContent = toastEl.find(".weui_toast_content");
	/**
	 * @param content {String} 显示内容
	 * @param delay {Number} 显示多少时长（毫秒）
	 */
	function toast(content,delay){
		if(typeof delay === undefined){
			delay  = 1000;
		}
		toastContent.text(content);
		toastEl.show();
		window.setTimeout(function(){
			toastEl.hide();
		}, delay)
	}
	
	module.exports ={
			"toast":toast
	}
});