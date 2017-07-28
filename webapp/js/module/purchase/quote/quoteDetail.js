define(function(require, exports, module) {
	require("string");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");

	//报价详情模板
	var quoteDetailTplFn = doT.template(require("./quoteDetail.html"));


	//界面主内容区
	var gPageMftk = $("#g-page-mflk");
	//买方条款
	var quoteDetailExtraTplFn = doT.template(require("./quoteDetailExtra.html"));
	
	var urlParams = getUrlParams();
	var bidId = urlParams['bidId'];
	var quoteSn = urlParams['quoteSn'];	

	gPage.on("click",".mftk-btn",function(e){

		gPage.removeClass("f-slide-in").addClass("f-slide-out");
		gPageMftk.removeClass("f-slide-out").addClass("f-slide-in");

	});
	gPageMftk.on("click",".u-back-left",function(e){
		gPageMftk.removeClass("f-slide-in").addClass("f-slide-out");
		gPage.removeClass("f-slide-out").addClass("f-slide-in");
		
	});
	
	$('#g-page').on('click', '.up-btn', function () {
		var quoteIndex = $("#quoteSn").attr("data-quote-sn")-1;
		if(quoteIndex<1){
			alert("已经是第一单了！");
			return;
		}
		loadingToast.show("正在查找上一报价单");
		$.ajax({
			dataType:'json',
			url:'../../purchase/quote/getQuoteDetailData',
			data:{
				'bidId':bidId,
				'quoteSn':quoteIndex,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
			 	loadingToast.hide();
			 
				var resultHtml = quoteDetailTplFn(data);
				gPage.empty();
				gPage.append(resultHtml);
				loadingToast.hide();
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
		});
	});
	$("#g-page").on("click",".next-btn",function(){
		var quoteIndex = Number($("#quoteSn").attr("data-quote-sn"))+1;
		if(quoteIndex > quoteSn){
			alert("已经是最后一次！");
			return;
		}
		loadingToast.show("正在查找下一报价单");
		$.ajax({
			dataType:'json',
			url:'../../purchase/quote/getQuoteDetailData',
			data:{
				'bidId':bidId,
				'quoteSn':quoteIndex,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
			 	loadingToast.hide();
				var resultHtml = quoteDetailTplFn(data);
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
		url:'../../purchase/quote/getQuoteDetailData',
		data:{
			'bidId':bidId,
			'quoteSn':quoteSn,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 //买方条款
			 var resultHtml = quoteDetailTplFn(data);
			 gPage.append(resultHtml);

			 resultHtml = quoteDetailExtraTplFn(data);
			 gPageMftk.append(resultHtml);
		
			
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
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)&quoteSn=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 3){
			params["bidId"] = m[1];
			params["quoteSn"] = m[2];
		}
		return params;
	}
});