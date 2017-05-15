define(function(require, exports, module) {
	//引入时间组件
	require("../../common/Date");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");
	//发货详情模板
	var shippingDetailTpl = require("./shippingDetail.html");
	//发货确认模板
	var confirmMessageTpl = require("./confirmMessage.html");
	var shippingId = getParams();
	gPage.on("click",".up-btn,.next-btn",function(e){
		    var action ="";
			var target = e.target||e.srcElement;
			target = $(target);
			var currentShippingId = $("#g-content").attr("data-shipping-id");
			if(target.hasClass("up-btn")){
				loadingToast.show("数据加载中");
				action = "up";
			}else if(target.hasClass("next-btn")){
				loadingToast.show("数据加载中");
				action = "down";
			}
			$.ajax({
			dataType:'json',
			url:'../../purchase/shipping/getNextOrUpShipingDetail',
			data:{
				'shippingId':currentShippingId,
				"action":action,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				loadingToast.hide();
				if(data.isLast){
					if(action == "up"){
						alert("已经是第一条发货单！");	
					}else{
						alert("已经是最后一条发货单！");	
					}
					return;
				}
			
				 var tempFn = doT.template(shippingDetailTpl);
				 var resultHtml = tempFn(data);
				 //先清空
				 gPage.empty();
				 gPage.append(resultHtml);
			
			},
			error:function(xhr, errorType, error){
				loadingToast.show("数据加载失败，请重新试试！");
			}
		});
	});
	//供应商确认发货单
	gPage.on("click",".confirmed-btn",function(e){
		$("#dialog1").show();
	});
	$("#dialog1").on("click",".primary",function(e){
		$("#dialog1").hide();
		loadingToast.show("数据保存中");
		var currentShippingId = $("#g-content").attr("data-shipping-id");
		$.ajax({
			dataType:'json',
			url:'../../purchase/shipping/confirmSellerShipping',
			data:{
				'shippingId':currentShippingId,
				'_t':new Date().getTime()
			},
		success:function(data, status, xhz){
			loadingToast.hide();
			if(data.success){
				window.alert("恭喜，交易完成。");
				var orderId =  $("#g-content").attr("data-order-id");
				window.location.href = "toShippingList?orderId="+orderId;
			}else{
				window.alert("数据保存失败，请重新试试。");
			}
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
		});
	});
	$("#dialog1").on("click",".default",function(e){
		$("#dialog1").hide();
	});
	$.ajax({
		dataType:'json',
		url:'../../purchase/shipping/getShippingDetail',
		data:{
			'shippingId':shippingId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 var tempFn = doT.template(shippingDetailTpl);
			 var resultHtml = tempFn(data);
			 var confFn = doT.template(confirmMessageTpl);
			 var confHtml = confFn(data);
			 $("#confirm_detail").empty();
			 $("#confirm_detail").html(confHtml);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
		
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	/**
	 * 获取url中的orderId
	 */
	function getParams(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?shippingId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
});