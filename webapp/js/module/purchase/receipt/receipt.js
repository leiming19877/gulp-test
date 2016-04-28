define(function(require, exports, module) {
	//引入时间组件
	require("../../common/Date");
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
		url:'../../purchase/orderReceipt/getReceiptDetailData',
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
	gPage.on("input",".sign-weight",function(e){
		var signWeight = $(this).val();
		var deliveryWeight = this.attributes.id.nodeValue;
		if(signWeight<0){
			window.alert("签收量不能为负数！");
			$(this).val($(this).attr("data-delivery-weight"))
		}
//		if(signWeight>1.08*deliveryWeight){
//			window.alert("签收重量远超过了发货重量。");
//			$(this).val($(this).attr("data-delivery-weight"))
//		}
//		if(signWeight<0.92*deliveryWeight){
//			window.alert("签收重量远少于了发货重量。");
//			$(this).val($(this).attr("data-delivery-weight"))
//		}
		refreshReceiptWeight();
	});
	
	gPage.on("tap",".receipt-btn",function(e){
		loadingToast.show("保存中...");
		var params = getSaveParams();
		$.ajax({
			type:'post',
			dataType:'json',
			url:'../../purchase/orderReceipt/confirmShipping',
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
		$("#receiptWeight").html(receiptWeight);
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