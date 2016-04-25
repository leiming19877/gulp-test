define(function(require, exports, module) {
	
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page")

	//报价详情模板
	var quoteDetailExtraTpl = require("./quoteDetailExtra.html");

	var urlParams = getUrlParams();
	var bidId = urlParams['bidId'];
	var quoteSn = urlParams['quoteSn'];	
	var linkFrom = urlParams["linkFrom"];
	$.ajax({
		dataType:'json',
		url:'../../central/quote/getQuoteData',
		data:{
			'bidId':bidId,
			'quoteSn':quoteSn,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 data['linkFrom'] = linkFrom;
			 data['quoteSn'] = quoteSn;
			 // 1. Compile template function
			 var tempFn = doT.template(quoteDetailExtraTpl);
			 // 2. Use template function as many times as you like
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.html(resultHtml);
	
			 //设置当前为第几次报价
			 $("#quote-sn").html(quoteSn);
			
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	/**
	 * 获取url中的竞价参数和报价参数
	 */
	function getUrlParams(){
		var params = {};
		params["bidId"] = "";
		params["quoteSn"] = "";
		params["linkFrom"] = "";
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)&quoteSn=(\d*)&linkFrom=(\w+)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 4){
			var params = {};
			params["bidId"] = m[1];
			params["quoteSn"] = m[2];
			params["linkFrom"] = m[3];
		}
		return params;
	}
});