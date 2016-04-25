define(function(require, exports, module) {
	require("../../common/String");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page")

	//报价详情模板
	var quoteDetailTpl = require("./quoteDetail.html");

	
	var urlParams = getUrlParams();
	var bidId = urlParams['bidId'];
	var quoteSn = urlParams['quoteSn'];	

	$('#g-page').on('click', '.m-quote-detail-up', function () {
		var quoteIndex = $("#quoteSn").attr("data-quote-sn")-1;
		if(quoteIndex<1){
			alert("已经是第一单了！");
			return;
		}
		loadingToast.show("正在查找上一报价单");
		$.ajax({
			dataType:'json',
			url:'../../central/quote/getQuoteDetailData',
			data:{
				'bidId':bidId,
				'quoteSn':quoteIndex,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
			 	loadingToast.hide();
			 	var tempFn = doT.template(quoteDetailTpl);
				var resultHtml = tempFn(data);
				gPage.empty();
				gPage.append(resultHtml);
				loadingToast.hide();
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
		});
	});
	$("#g-page").on("click",".m-quote-detail-down",function(){
		var quoteIndex = Number($("#quoteSn").attr("data-quote-sn"))+1;
		if(quoteIndex > quoteSn){
			alert("已经是最后一次！");
			return;
		}
		loadingToast.show("正在查找下一报价单");
		$.ajax({
			dataType:'json',
			url:'../../central/quote/getQuoteDetailData',
			data:{
				'bidId':bidId,
				'quoteSn':quoteIndex,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
			 	loadingToast.hide();
			 	var tempFn = doT.template(quoteDetailTpl);
				var resultHtml = tempFn(data);
				gPage.empty();
				gPage.append(resultHtml);
				loadingToast.hide();
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
		});
		
	});

	$.ajax({
		dataType:'json',
		url:'../../central/quote/getQuoteDetailData',
		data:{
			'bidId':bidId,
			'quoteSn':quoteSn,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 // 1. Compile template function
			 var tempFn = doT.template(quoteDetailTpl);
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
	 * 获取url中的竞价参数和报价参数
	 */
	function getUrlParams(){
		var params = {};
		params["bidId"] = "";
		params["quoteSn"] = "";
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)&quoteSn=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 3){
			var params = {};
			params["bidId"] = m[1];
			params["quoteSn"] = m[2];
		}
		return params;
	}
});