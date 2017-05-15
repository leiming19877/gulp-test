define(function(require, exports, module) {
	require("../../common/String");		
	var $ = require("zepto");	
	 //dot模板引擎
	var doT = require("dot");
	//引入时间组件
	require("../../common/Date");
	//查询参数
	var params = require("../../common/Params");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");

	//详情模板
	var bidDetailTpl = require("./allocationDetail.html");
	var allocationId = getAllocationId();


	
	$.ajax({
		dataType:'json',
		url:'../../purchase/allocation/getAllocationsAndDetailsData',
		data:{
			'allocationId':allocationId,
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
			 var action = params.getParam("action");	
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	
	/**
	 * 获取url中的bidId
	 */
	function getAllocationId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?allocationId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}

	
});