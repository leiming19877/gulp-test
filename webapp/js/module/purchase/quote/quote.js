define(function(require, exports, module) {
	
	require("string");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");
	// 确认对话框内容区
	var confirmPage = $("#confirm_detial");
	//报价模板
	var quoteTpl = require("./quote.html");
	//报价信息模板
	var quoteMessageTpl = require("./quoteMessagePage.html");

	//界面主内容区
	var gPageMftk = $("#g-page-mflk");
	//买方条款
	var quoteDetailExtraTplFn = doT.template(require("./quoteDetailExtra.html"));
	
	var urlParams = getUrlParams();
	var bidId = urlParams['bidId'];
	var quoteId = "";//报价单id
	
	gPage.on("focusin",".u-ipt-min",function(e){
		this.select();
	});
	gPage.on("click",".u-ipt-min",function(e){
		var d = $("#dialog2")[0]; 
		d["currentInput"]=this;
		$("#money").find("input").val($(this).val());
		$("#dialog2").show();
		$("#money").find("input").focus();
		$("#money").find("input").select();
	
	});
	$('#dialog2').on('click', '.default', function () {
		$('#dialog2').hide();
	});
	$('#dialog2').on('click', '.primary', function () {
		var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
		var value = $("#money").find("input").val();
		//要映射的输入框dom对象
		var input =$($('#dialog2')[0].currentInput);
		if(!reg.test(value)){
			window.alert("只能为非负数，且小数位数不超过2位");
			$("#money").find("input").focus();
			$("#money").find("input").select();
			return;
		}
		input.val(Number(value));
		var val = input.val();
		if(input.prop("name") == "quotePrice"){
			var planBuyWeight = input.attr("data-plan-buy-weight");
			var priceMoney = val*planBuyWeight;
			priceMoney = priceMoney.toString().formatMoney(2);
			var tr = input.parent().parent();
			var d = tr.index();
			input.siblings(".quote-money").html(priceMoney);
			$("#quote-price-"+d+"-tip").html(val);
			$("#quote-money-"+d+"-tip").html(priceMoney);
			//总计金额
			var quoteTotalMoney = 0;
			$("span[name='quote-money']").each(function(i){
				var money = parseFloat($(this).html().removeDotToNumber());
				quoteTotalMoney+=money;
			});
			quoteTotalMoney = quoteTotalMoney.toString().formatMoney(2);
			$("#quote-total-money").html(quoteTotalMoney);
			$("#quote-total-money-tip").html(quoteTotalMoney);
		}else if(input.prop("name") == "freightMiscellaneous"){
			//设置提示项
			$("#freight-miscellaneous-tip").html(val);
		}
		$('#dialog2').hide();
	});	
	gPage.on("change","select[name='placeSteel']",function(e){
		var self = $(this);
		var tr = self.parent().parent();
		var i = tr.index();
		$("#place-steel-"+i+"-tip").html(self.find("option").not(
				function(){ 
					return !this.selected;
					}).text());
	});
	
	gPage.on("click",".quote-btn",function(e){
		if(!checkParam()){
			return ;
		}
		$('#dialog1').show();
	});
	gPage.on("click",".mftk-btn",function(e){
		gPage.removeClass("f-slide-in").addClass("f-slide-out");
		gPageMftk.removeClass("f-slide-out").addClass("f-slide-in");

	});
	gPageMftk.on("click",".u-back-left",function(e){
		gPageMftk.removeClass("f-slide-in").addClass("f-slide-out");
		gPage.removeClass("f-slide-out").addClass("f-slide-in");
		
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
	
			 //买方条款
			 resultHtml = quoteDetailExtraTplFn(data);
			 gPageMftk.append(resultHtml);
			 
			 
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
	

	function checkParam(){
		var checkIsOk = true;
		//运查费
		var freightMiscellaneous = $("#freightMiscellaneous");
		if(freightMiscellaneous.disabled &&( freightMiscellaneous.val() ==0 
				|| freightMiscellaneous.val() == "")){
			checkIsOk = false;
			window.alert("运杂费必填。");
			freightMiscellaneous.focus();
			return checkIsOk;
		}
		var quotePrices = $("input[name='quotePrice']");//报价
		quotePrices.each(function(index,item){
			if(this.value == 0){
				checkIsOk = false;
				window.alert("你有没有填写的报价，请该资源进行报价。");
				this.focus();
				this.select();
				return false;
			}
		});
		
		return checkIsOk;
	}
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
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			params["bidId"] = m[1];

		}
		return params;
	}
});