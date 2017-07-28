define(function(require, exports, module) {
	//引入时间组件
	require("date");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page")
	//收货详情模板
	var receiptTpl = require("./receipt.html");
	var shippingId = getShipingId();
	var orderId = "";
	$.ajax({
		dataType:'json',
		url:'../../purchase/shipping/getReceiptDetailData',
		data:{
			'shippingId':shippingId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 orderId = data.shipping.orderId;
			 loadingToast.hide();
			 // 1. Compile template function
			 var tempFn = doT.template(receiptTpl);
			 // 2. Use template function as many times as you like
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
			 refreshReceiptWeight();
			 
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	gPage.on("focus",".u-ipt-min",function(e){
		this.select();
	});
	gPage.on("click",".sign-weight,.sign-quantity",function(e){
		var target = e.target||e.srcElement;
		var self = $(this);
		if($(target).hasClass("sign-weight")){
			$("#dialog2").show();
			var weightInputs = $("input[name='signWeight']");
			var i = weightInputs.indexOf($(this)[0]);
			$("#dialog2").attr("data-input-index",i);
			$("#weight").find("input").val($(this).val());
			$("#weight").find("input").focus();
		}else{
			$("#dialog1").show();
			var quantityInputs = $("input[name='signQuantity']");
			var j = quantityInputs.indexOf($(this)[0]);
			$("#dialog1").attr("data-input-index",j);
			$("#quantity").find("input").val($(this).val());
			$("#quantity").find("input").focus();
		}
		
	});
	$("#dialog1").on("click",".default",function(e){
		$("#dialog1").hide();
	}).on("click",".primary",function(e){
		var reg = new RegExp("^[0-9]*$");
		var index = $("#dialog1").attr("data-input-index");
		var value = $("#quantity").find("input").val();
		var selectInput = $("input[name='signQuantity']")[index];
		selectInput = $(selectInput);
		var quantity = selectInput.attr("data-delivery-quantity");
		if(!reg.test(value)){
			window.alert("签收量只能为非负整数！");
			$("#quantity").find("input").val(quantity);
			$("#quantity").find("input").focus();
			$("#quantity").find("input").select();
			return;
		}
		selectInput.val(Number(value));
		$("#quantity").find("input").val(0);
		$("#dialog1").hide();
		var signQuantity = selectInput.val();
		if(!reg.test(signQuantity)){
			window.alert("签收量只能为非负整数！");
			selectInput.val(quantity)
		}
	});
	$("#dialog2").on("click",".default",function(e){
		$("#dialog2").hide();
	}).on("click",".primary",function(e){
		var reg = new RegExp("^[0-9]+(.[0-9]{1,3})?$");
		var index = $("#dialog2").attr("data-input-index");
		var value = $("#weight").find("input").val();
		var selectInput = $("input[name='signWeight']")[index];
		selectInput = $(selectInput);
		var weight = selectInput.attr("data-delivery-weight");
		if(!reg.test(value)){
			window.alert("签收量只能为非负数，且小数位数不超过3位！");
			$("#weight").find("input").val(weight);
			$("#weight").find("input").focus();
			$("#weight").find("input").select();
			return;
		}
		selectInput.val(Number(value));
		$("#weight").find("input").val(0);
		$("#dialog2").hide();
		var signWeight = selectInput.val();
		if(!reg.test(signWeight)){
			window.alert("签收量只能为非负数，且小数位数不超过3位！");
			$(this).val(weight)
		}
		refreshReceiptWeight();
	});
	gPage.on("click",".receipt-btn",function(e){
		$("#dialog3").show();
	});	
	$("#dialog3").on("click",".default",function(e){
		$("#dialog3").hide();
	}).on("click",".primary",function(e){
		$("#dialog3").hide();
		loadingToast.show("保存中...");
		var params = getSaveParams();
		$.ajax({
			type:'post',
			dataType:'json',
			url:'../../purchase/shipping/confirmShipping',
			data:params,
			success:function(data, status, xhz){
				loadingToast.hide();
				if(data.success){
					window.alert("成功保存收货单。");
					window.location.href = "toReceiptList?orderId="+orderId;
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
		params['shipping.id'] = shippingId;
		//收货人
		params['shipping.shippingUserName'] = $("#shippingUserName").val();
		//收货电话
		params['shipping.shippingUserTel'] = $("#shippingUserTel").val();
		var shippingDetailIds  = $("input[name='shippingDetailId']");//
		//签收数量
		var signQuantitys = $("input[name='signQuantity']");
		//收货量
		var signWeights = $("input[name='signWeight']");
		shippingDetailIds.each(function(index){
			params['listShippingDetail['+index+'].id'] = $(this).val();
		});
		signQuantitys.each(function(index){
			params['listShippingDetail['+index+'].signQuantity'] = $(this).val();
		});
		signWeights.each(function(index){
			params['listShippingDetail['+index+'].signWeight'] = $(this).val();
		});
		return params;
	}
	/**
	 * 刷新本次收货总计
	 */
	function refreshReceiptWeight(){
		var receiptWeight = 0;
		var signWeights = $("input[name='signWeight']");
		signWeights.each(function(index){
			receiptWeight += Number($(this).val());
		});
		$("#receiptWeight").html(parseFloat(receiptWeight).toFixed(3));
	}
	/**
	 * 获取url中的收货单/发货单参数
	 */
	function getShipingId(){
		var params = {};
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?shippingId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
});