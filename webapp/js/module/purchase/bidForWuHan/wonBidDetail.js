define(function(require, exports, module) {
	
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//引入时间组件
	require("date");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");

	//竞价详情模板
	var bidDetailTpl = require("./wonBidDetail.html");

	var params = getParams();
	$.ajax({
		dataType:'json',
		url:'../../purchase/bidConsoleForWuHan/wonBidDetailData',
		data:{
			'bidId':params['bidId'],
			'bidDetailId':params['bidDetailId'],
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 // 1. Compile template function
			 var tempFn = doT.template(bidDetailTpl);
			 // 2. Use template function as many times as you like
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
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)\&bidDetailId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		var params = [];
		if(m && m.length == 3){
			params['bidId'] = m[1];
			params['bidDetailId'] = m[2];
			return params;
		}
		return 0;
	}
});