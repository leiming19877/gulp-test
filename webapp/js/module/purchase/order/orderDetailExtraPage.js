define(function(require, exports, module) {
	
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");

	//买家条款模板
	var orderDetailExtraTpl = require("./orderDetailExtraPage.html");
	var params = getParams();
	$.ajax({
		dataType:'json',
		url:'../../purchase/order/checkContractTerm',
		data:{
			'orderId':params['orderId'],
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 data.action = params['action'];
			 var tempFn = doT.template(orderDetailExtraTpl);
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);	
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	/**
	 * 获取url中的bidId
	 */
	function getParams(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?orderId=(\d*)\&action=(\w*)/g;
		var url = window.location.href;
		var params = [];
		var m = reg.exec(url);
		if(m && m.length == 3){
			params['orderId'] = m[1];
			params['action'] = m[2];
		}
		return params;
	}
});