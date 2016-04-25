define(function(require, exports, module) {
	
	require("../../common/String");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page")
	// 确认对话框内容区
	var confirmPage = $("#confirm_detial");
	//报价模板
	var quoteTpl = require("./quote.html");
	//报价信息模板
	var quoteMessageTpl = require("./quoteMessagePage.html");

	var urlParams = getUrlParams();
	var bidId = urlParams['bidId'];
	var quoteId = "";//报价单id
	
	gPage.on("focusin",".u-ipt-min",function(e){
		this.select();
	});
	
	gPage.on("input",".u-ipt-min",function(e){
		var self = $(this);
		var val = self.val();
		if(self.prop("name") == "quotePrice"){
			var planBuyWeight = self.attr("data-plan-buy-weight");
			var priceMoney = val*planBuyWeight;
			debugger;
			priceMoney = priceMoney.toString().formatMoney(2);
			var tr = self.parent().parent();
			var index = tr.index();
			self.siblings(".quote-money").html(priceMoney);
			$("#quote-price-"+index+"-tip").html(val);
			$("#quote-money-"+index+"-tip").html(priceMoney);
			//总计金额
			var quoteTotalMoney = 0;
			$("span[name='quote-money']").each(function(index){
				var money = parseFloat($(this).html().removeDotToNumber());
				quoteTotalMoney+=money;
			});
			quoteTotalMoney = quoteTotalMoney.toString().formatMoney(2);
			$("#quote-total-money").html(quoteTotalMoney);
			$("#quote-total-money-tip").html(quoteTotalMoney);
		}else if(self.prop("name") == "freightMiscellaneous"){
			//设置提示项
			$("#freight-miscellaneous-tip").html(val);
		}
	});
	
	gPage.on("change","select[name='placeSteel']",function(e){
		var self = $(this);
		var tr = self.parent().parent();
		var index = tr.index();
		$("#place-steel-"+index+"-tip").html(self.find("option").not(
				function(){ 
					return !this.selected
					}).text());
	});
	
	gPage.on("tap",".quote-btn",function(e){
		$('#dialog1').show();
	});

	$.ajax({
		dataType:'json',
		url:'../../central/quote/getQuoteData',
		data:{
			'bidId':bidId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){			
			 loadingToast.hide();
			 //设置上一次报价id
			 quoteId = data.quote.quoteId||'';
			 // 1. Compile template function
			 var tempFn = doT.template(quoteTpl);
			 // 2. Use template function as many times as you like
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
			 
			 tempFn = doT.template(quoteMessageTpl);
			 resultHtml = tempFn(data);
			 //先清空
			 confirmPage.empty();
			 confirmPage.append(resultHtml);
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	
	$('#dialog1').on('click', '.default', function () {
		$('#dialog1').hide();
	});
	$('#dialog1').on('click', '.primary', function () {
		loadingToast.show("保存中...");
		var params = getSaveParams();
		$.ajax({
			type:'post',
			dataType:'json',
			url:'../../central/quote/saveCentralQuote',
			data:params,
			success:function(data, status, xhz){
				loadingToast.hide();
				if(data.success){
					window.alert("成功生成报价单：["+data.quoteCode+"]");
					window.location.href = "../bidConsole/bidListPage";
				}else{
					window.alert(data.msg);
				}
				
			},
			error:function(xhr, errorType, error){
				loadingToast.show("保存失败，请重新试试！");
			}
		});
    });
	
	/**
	 * 获取要保存的报价参数信息
	 */
	function getSaveParams(){
		var params ={};
		params['centralQuote.bidId'] = bidId;
		params['centralQuote.quoteId'] = quoteId;
		//运查费
		params['centralQuote.freightMiscellaneous'] = $("#freightMiscellaneous").val();
		var bidDetailIds  = $("input[name='bidDetailId']");//竞价报价id
		var placeSteels = $("select[name='placeSteel']");//产地
		var quotePrices = $("input[name='quotePrice']");//报价
		bidDetailIds.each(function(index){
			params['centralQuoteDetails['+index+'].bidDetailId'] = $(this).val();
		});
		placeSteels.each(function(index){
			params['centralQuoteDetails['+index+'].placeSteel'] = $(this).val();
		});
		quotePrices.each(function(index){
			params['centralQuoteDetails['+index+'].quotePrice'] = $(this).val();
		});
		
		return params;
	}
	
	/**
	 * 获取url中的竞价参数和报价参数
	 */
	function getUrlParams(){
		var params = {};
		params["bidId"] = "";
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			var params = {};
			params["bidId"] = m[1];

		}
		return params;
	}
});