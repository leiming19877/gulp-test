define(function(require, exports, module) {
	
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");

	//数据加载提示
	var loadingToast = require("../../common/loadingToast");	
	//界面主内容区
	var gPage = $("#g-page");

	//详情模板
	var bidDetailTpl = require("./user-info.html");

	gPage.on("click",".grid-tapmode",function(){
		 loadingToast.show("数据加载中");
	});
	
	var bidId = getBidId();
	
	$.ajax({
		dataType:'json',
		url:'../../account/getUserInfo',
		data:{
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
	function getBidId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
	

});