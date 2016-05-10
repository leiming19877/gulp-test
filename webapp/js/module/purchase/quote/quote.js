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
	gPage.on("click",".u-ipt-min",function(e){
		$("#dialog2").show();
		var inputs = $(".u-ipt-min");
		var index = inputs.indexOf($(this)[0]);
		$("#dialog2").attr("data-input-index",index);
		$("#money").find("input").val($(this).val());
		$("#money").find("input").focus();
		$("#money").find("input").select();
	});
	$('#dialog2').on('click', '.default', function () {
		$('#dialog2').hide();
	});
	$('#dialog2').on('click', '.primary', function () {
		$('#dialog2').hide();
		var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
		var index = $("#dialog2").attr("data-input-index");
		var value = $("#money").find("input").val();
		var self = $(".u-ipt-min")[index];
		self = $(self);
		var price = self.attr("data-quote-price");
		if(!reg.test(value)){
			window.alert("金额只能为非负数，且小数位数不超过2位");
			$("#money").find("input").val(price);
			$("#money").find("input").focus();
			$("#money").find("input").select();
			self.val(price);
			return;
		}
		self.val(Number(value));
		$("#money").find("input").val(0);
		var val = self.val();
		if(self.prop("name") == "quotePrice"){
			var planBuyWeight = self.attr("data-plan-buy-weight");
			var priceMoney = val*planBuyWeight;
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
	
	gPage.on("click",".quote-btn",function(e){
		var isFirstQuote = $("#g-content").attr("data-first-quote");
		var stepType = $("#g-content").attr("data-step-type");
		var discountStep = $("#g-content").attr("data-discount-step");
		if(isFirstQuote=="false"){
		var lastQuoteTotalMoney = $("#quote-total-money").attr("data-quote-total");
		var currentQuoteTotalMoney = $("#quote-total-money").html().removeDotToNumber();
//			if(stepType==1){
//				if(discountStep > (lastQuoteTotalMoney - currentQuoteTotalMoney)){
//					alert("报价降价幅度不能小于最小降价幅度"+discountStep+"元");
//					return;
//				}
//			}else if(stepType==2){
//				if(discountStep > (lastQuoteTotalMoney - currentQuoteTotalMoney)/lastQuoteTotalMoney*100){
//					alert("报价降价幅度不能小于最小降价幅度"+discountStep+"%");
//					return;
//				}
//			}
		}
		$('#dialog1').show();
	});

	$.ajax({
		dataType:'json',
		url:'../../purchase/quote/getQuoteData',
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
		$('#dialog1').hide();
		loadingToast.show("保存中...");
		var params = getSaveParams();
		$.ajax({
			type:'post',
			dataType:'json',
			url:'../../purchase/quote/saveCentralQuote',
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