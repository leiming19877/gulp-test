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
	var displayData = null;//要显示的数据

	gPage.on("click",".u-ipt-min",function(e){
		//如果当前输入按钮是禁用的就不打开输入框
		if(this.disabled){
			return ;
		}
		if($(this).hasClass("ware-house")){
			var d = $("#dialog3")[0]; 
			d["currentInput"]=this;
			$("#warehouse").find("input").val($(this).val());
			$("#dialog3").show();
			$("#warehouse").find("input").focus();
			$("#warehouse").find("input").select();
			var value = $(this).val();
			$.ajax({
			dataType:'json',
			url:'../../purchase/quoteForWuHan/getWareHouseList',
			data:{
				'depot':value+"",
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				var length = data.warehouses.length;
				var html = "";
				if(length>4){
					length = 4;
				}
				for(var i=0;i<length;i++){
					var warehouse = data.warehouses[i];
					html += '<div class="u-warehouse"><strong>'+warehouse+'</strong></div>';
				}
				$("#warehouse-info").html(html);
			},
			error:function(xhr, errorType, error){
			}
		});
		}else{
			var d = $("#dialog2")[0]; 
			d["currentInput"]=this;
			$("#money").find("input").val($(this).val());
			$("#dialog2").show();
			$("#money").find("input").focus();
			$("#money").find("input").select();
		}
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
			var quoteWeight = input.siblings("input[name='quoteWeight']").val();
			var priceMoney = val*quoteWeight;
			//第几行
			var trIndex = input.closest("tr").index();
			displayData.listQuoteDetail[trIndex].quotePrice = val;
			displayData.listQuoteDetail[trIndex].quoteMoney = priceMoney;
			priceMoney = priceMoney.toString().formatMoney(2);
			input.siblings(".quote-money").html(priceMoney);
			setQuoteTotalMoney();
		}else if(input.prop("name") == "quoteWeight"){
			var quotePrice = input.siblings("input[name='quotePrice']").val();
			var priceMoney = val*quotePrice;
			//第几行
			var trIndex = input.closest("tr").index();
			displayData.listQuoteDetail[trIndex].quoteWeight = val;
			displayData.listQuoteDetail[trIndex].quoteMoney = priceMoney;
			priceMoney = priceMoney.toString().formatMoney(2);
			input.siblings(".quote-money").html(priceMoney);
			setQuoteTotalMoney();
		}else if(input.prop("name") == "freightMiscellaneous"){
			//设置提示项
			displayData.quote.freightMiscellaneous = val;
		}
		$('#dialog2').hide();
	});
	$("#dialog3").on("input",".u-dialog-money-ipt",function(e){
		var value = $(this).val();
		$.ajax({
		dataType:'json',
		url:'../../purchase/quoteForWuHan/getWareHouseList',
		data:{
			'depot':value+"",
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			var length = data.warehouses.length;
			var html = "";
			if(length>4){
				length = 4;
			}
			for(var i=0;i<length;i++){
				var warehouse = data.warehouses[i];
				html += '<div class="u-warehouse"><strong>'+warehouse+'</strong></div>';
			}
			$("#warehouse-info").html(html);
		},
		error:function(xhr, errorType, error){
		}
		});
	});
	$("#dialog3").on("click",".u-warehouse",function(){
		var val = $(this).find("strong").html();
		$("#warehouse").find("input").val(val);
		$("#warehouse").find("input").focus();
		$("#warehouse").find("input").select();
		$("#warehouse-info").html('');
	});
	$('#dialog3').on('click', '.default', function () {
		$('#dialog3').hide();
	});
	$('#dialog3').on('click', '.primary', function () {
		var value = $("#warehouse").find("input").val();
		var input =$($('#dialog3')[0].currentInput);
		if(value.trim()==""||value=="null"||value.trim()=="null"){
			window.alert("请输入合法仓库名，且不能为空");
			$("#warehouse").find("input").focus();
			$("#warehouse").find("input").select();
			$("#warehouse").find("input").val('');
			return;
		}
		input.val(value);
		$("#info-warehouse").html(value);
		var trIndex = input.closest("tr").index();
		displayData.listQuoteDetail[trIndex].ztWarehouse = value;
		$('#dialog3').hide();
	});
	function setQuoteTotalMoney(){
		//总计金额
		var quoteTotalMoney = 0;
		$("span[name='quote-money']").each(function(i){
			var money = parseFloat($(this).html().removeDotToNumber());
			quoteTotalMoney+=money;
		});
		quoteTotalMoney = quoteTotalMoney.toString().formatMoney(2);
		$("#quote-total-money").html(quoteTotalMoney);
		
		displayData.quote.quoteTotalMoney = quoteTotalMoney;
	}
	
	gPage.on("click",".quote-btn",function(e){
		if(!checkParam()){
			return ;
		}
		 tempFn = doT.template(quoteMessageTpl);
		 resultHtml = tempFn(displayData);
		 //先清空
		 confirmPage.empty();
		 confirmPage.append(resultHtml);
		$('#dialog1').show();
	});
	gPage.on("click",".copy-btn",function(e){
		var self = $(this);
		var bidDetailId = self.attr("data-bid-detail-id");
		var placeSteelsCount = self.attr("data-place-steels-count");
		var table = self.closest("table");
		var bidDetailIds = table.find("input[name='bidDetailId'][value='"+bidDetailId+"']");
		if(bidDetailIds.length >= placeSteelsCount){
			window.alert("所有产地都以复制完，无法进行复制！");
			return ;
		}
		var tr = self.closest("tr");
		var trIndex = tr.index();//第几行。
		var quoteDetail = $.extend({},displayData.listQuoteDetail[trIndex]);
		
		//将新数据插入到数组里
		displayData.listQuoteDetail.splice(trIndex+1,0,quoteDetail);
		var newTr = tr.clone();
		//将复制的行数据设置为可以删除
		newTr.find(".copy-btn").removeClass("copy-btn icon-add")
					.addClass("remove-btn icon-delete");
		var selectedPlaceSteels = table.find("select[data-bid-detail-id='"+bidDetailId+"'] option")
		.not(function(){ 
					return !this.selected;
			});
		var options = newTr.find("select option");
		for(var i=0;i<options.length;i++){
			var isFound = false;
			for(var j=0;j<selectedPlaceSteels.length;j++){
				if(options[i].value == selectedPlaceSteels[j].value){
					isFound = true;
					break;
				}
			}
			if(!isFound){
				//设置新选择的产地
				quoteDetail.placeSteel = options[i].value;
				newTr.find("select[name='placeSteel']").attr("data-place-steel",options[i].value);
				options[i].selected  = true;
				break;
			}
		}
		newTr.insertAfter(tr);
	});
	gPage.on("click",".remove-btn",function(e){
		var self = $(this);
		var tr = self.closest("tr");
		var trIndex = tr.index();
		tr.remove();
		displayData.listQuoteDetail.splice(trIndex,1);
	});
	gPage.on("click",".mftk-btn",function(e){
		gPage.removeClass("f-slide-in").addClass("f-slide-out");
		gPageMftk.removeClass("f-slide-out").addClass("f-slide-in");

	});
	gPage.on("change","select[name='placeSteel']",function(e){
		var self = $(this);
		var currentSelect = this;
		var bidDetailId = self.attr("data-bid-detail-id");
		//上次选择中的产地
		var oldSelectedPlaceSteel = self.attr("data-place-steel");
		var table = self.closest("table");
		var bidDetailIds = table.find("input[name='bidDetailId'][value='"+bidDetailId+"']");

		var selectedPlaceSteels = table.find("select[data-bid-detail-id='"+bidDetailId+"']")
			.not(function(){
				return this == currentSelect;
			}).find("option")
			.not(function(){ 
						return !this.selected;
			});
		
		var isFound = false;
		for(var i=0;i<selectedPlaceSteels.length;i++){
			if(self.val() == selectedPlaceSteels[i].value){
				isFound = true;
				break;
			}
		}
		if(isFound){
			window.alert("已经存在相同的报价产地。");
			self.val(oldSelectedPlaceSteel);
			return ;
		}else{
			//第几行
			var trIndex = self.closest("tr").index();
			displayData.listQuoteDetail[trIndex].placeSteel = self.val();
			self.attr("data-place-steel",self.val());
		}
		return false;
	});
	
	
	gPageMftk.on("click",".u-back-left",function(e){
		gPageMftk.removeClass("f-slide-in").addClass("f-slide-out");
		gPage.removeClass("f-slide-out").addClass("f-slide-in");
		
	});
	
	$.ajax({
		dataType:'json',
		url:'../../purchase/quoteForWuHan/getQuoteData',
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
			 displayData = data;
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
			url:'../../purchase/quoteForWuHan/saveCentralQuote',
			data:params,
			success:function(data, status, xhz){
				loadingToast.hide();
				if(data.success){
					window.alert("成功生成报价单：["+data.quoteCode+"]");
					window.location.href = "../bidConsoleForWuHan/bidListPage";
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
		var deliveryType = $("#deliveryType").val();
		//运查费
		var freightMiscellaneous = $("#freightMiscellaneous");
		if(freightMiscellaneous.disabled &&( freightMiscellaneous.val() ==0 
				|| freightMiscellaneous.val() == "")){
			checkIsOk = false;
			window.alert("运杂费必填。");
			freightMiscellaneous.focus();
			return checkIsOk;
		}
		var quoteWeights = $("input[name='quoteWeight']");//可供量
		var quotePrices = $("input[name='quotePrice']");//报价
		if(deliveryType==2){
			var warehouses = $("input[name='warehouse']");//仓库
		}
		var isExistQuote = false;
		for(var i=0;i<quoteWeights.length;i++){
			var quoteWeight = quoteWeights[i].value;
			var quotePrice =  quotePrices[i].value;
			if(deliveryType==2){
				var warehouse =  warehouses[i].value;
				if(quoteWeight > 0 && quotePrice> 0){
					if(warehouse && $.trim(warehouse)!=""&& $.trim(warehouse)!="null"){
						checkIsOk = true;
						isExistQuote = true;
					}else{
						checkIsOk = false;
						window.alert("请填入合法的仓库！");
						quotePrices[0].focus();
						break;
					}
				}
			}else{
				if(quoteWeight > 0 && quotePrice> 0){
					checkIsOk = true;
					isExistQuote = true;
				}
			}
		}
		if(!isExistQuote){
			window.alert("至少需要存在一条物料的报价！");
			quotePrices[0].focus();
			return isExistQuote;
		}
		if(!checkIsOk){
			window.alert("你存在必填项未填写，请保证报价、重量、仓库都填写正确再报价。");
			quotePrices[0].focus();
			return checkIsOk;
		}
		
		for(var i=0;i<quoteWeights.length;i++){
			var quoteWeight = quoteWeights[i].value;
			var quotePrice =  quotePrices[i].value;
			if(quoteWeight == 0 && quotePrice > 0){
				checkIsOk = window.confirm("你有没填写完的可供量,你确认是否保存，\n如果保存，对应报价信息不会保存。");
				if(!checkIsOk){
					quoteWeights[i].focus();
				}
				break;
			}else if(quoteWeight > 0 && quotePrice == 0){
				checkIsOk = window.confirm("你有没填写完的报价,你确认是否保存，\n如果保存，对应报价信息不会保存。");
				if(!checkIsOk){
					quotePrices[i].focus();
				}
				break;
			}
		}
	
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
		if(typeof params['centralQuote.freightMiscellaneous'] == 'undefined'){
			params['centralQuote.freightMiscellaneous'] = 0;
		}
		var bidDetailIds  = $("input[name='bidDetailId']");//竞价报价id
		var placeSteels = $("select[name='placeSteel']");//产地
		var quoteWeights = $("input[name='quoteWeight']");//可供量
		var quotePrices = $("input[name='quotePrice']");//报价
		var deliveryType = $("#deliveryType").val();
		if(deliveryType==2){
			var warehouses = $("input[name='warehouse']");//仓库
		}
		var dataIndex = 0;
		quoteWeights.each(function(index){
			var bidDetailId = bidDetailIds[index].value;
			var placeSteel = placeSteels[index].value;
			var quoteWeight  = $(this).val();
			var quotePrice = quotePrices[index].value;
			if(deliveryType==2){
				var warehouse = warehouses[index].value;
			}
			if(quoteWeight > 0 && quotePrice> 0 && warehouse && $.trim(warehouse)!="" && deliveryType==2){
				params['centralQuoteDetails['+dataIndex+'].bidDetailId'] = bidDetailId;
				params['centralQuoteDetails['+dataIndex+'].placeSteel'] = placeSteel;
				params['centralQuoteDetails['+dataIndex+'].quoteWeight'] = quoteWeight;
				params['centralQuoteDetails['+dataIndex+'].quotePrice'] = quotePrice;
				params['centralQuoteDetails['+dataIndex+'].ztWarehouse'] = warehouse;
				dataIndex++;
			}else if(quoteWeight > 0 && quotePrice> 0 && deliveryType==1){
				params['centralQuoteDetails['+dataIndex+'].bidDetailId'] = bidDetailId;
				params['centralQuoteDetails['+dataIndex+'].placeSteel'] = placeSteel;
				params['centralQuoteDetails['+dataIndex+'].quoteWeight'] = quoteWeight;
				params['centralQuoteDetails['+dataIndex+'].quotePrice'] = quotePrice;
				params['centralQuoteDetails['+dataIndex+'].ztWarehouse'] = '';
				dataIndex++;
			}
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