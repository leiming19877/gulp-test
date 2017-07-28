define(function(require, exports, module) {
	require("string");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");
	//竞价详情模板
	var orderDetailTpl = require("./orderDetail.html");

	var params = getParams();
	$.ajax({
		dataType:'json',
		url:'../../purchase/order/getDetailInfoData',
		data:{
			'orderId':params.orderId,
			'bidId':params.bidId,
			'orderStatus':params.orderStatus,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			data.action = params['action'];
			loadingToast.hide();
			var tempFn = doT.template(orderDetailTpl);
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
	 * 获取url中的orderId
	 */
	function getParams(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?orderId=(\d*)\&bidId=(\d*)\&orderStatus=(\d*)\&action=(\w*)/g;
		var url = window.location.href;
		var params = [];
		var m = reg.exec(url);
		if(m && m.length == 5){
			params['orderId'] = m[1];
			params['bidId'] = m[2];
			params['orderStatus'] = m[3];
			params['action'] = m[4];
			return params;
		}
		return 0;
	}
});