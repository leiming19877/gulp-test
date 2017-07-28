define(function(require, exports, module) {
	//引入时间组件
	require("date");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");
	// 确认对话框内容区
	var confirmPage = $("#confirm_detial");
	// 数量输入对话框
	var dialog2 = $("#dialog2");
	// 重量输入对话框
	var dialog3 = $("#dialog3");
	//发货详情模板
	var shippingTpl = require("./shipping.html");
	//发货确认模板
	var shippingMessageTpl = require("./shippingMessage.html");
	//发货重量
	var shippingWeights = {};
	//发货数量
	var quantitys = {};
	//剩余发货量
	var remainWeights = {};
	gPage.on("focus",".u-ipt-min",function(e){
		this.select();
	});
	gPage.on("blur",".u-ipt-min",function(e){
		var val = $(this).val();
		if(val===""){
			alert("该项为必填项！");
			this.select();
		}
	});
	gPage.on("click",".u-ipt-min",function(e){
		var target = e.target||e.srcElement;
		var self = $(this);
		if($(target).hasClass("quantity")){
			dialog2.show();
			var inputs = $("input[name='quantity']");
			var index = inputs.indexOf($(this)[0]);
			$("#dialog2").attr("data-input-index",index);
			$("#quantity").find("input").val($(this).val());
			$("#quantity").find("input").focus();
			return;
		}else{
			dialog3.show();
			var inputs = $("input[name='weight']");
			var index = inputs.indexOf($(this)[0]);
			$("#dialog3").attr("data-input-index",index);
			$("#weight").find("input").val($(this).val());
			$("#weight").find("input").focus();
		}
		
	});
	dialog2.on("click",".default",function(e){
		dialog2.hide();
	}).on("click",".primary",function(e){
		var reg = new RegExp("^[0-9]*$");
		var index = $("#dialog2").attr("data-input-index");
		var value = $("#quantity").find("input").val();
		var selectInput = $("input[name='quantity']")[index];
		selectInput = $(selectInput);
		if(!reg.test(value)){
			window.alert("签收量只能为非负整数！");
			$("#quantity").find("input").val(0);
			$("#quantity").find("input").focus();
			$("#quantity").find("input").select();
			return;
		}
		dialog2.hide();
		selectInput.val(Number(value));
		$("#quantity").find("input").val(0);
		var shippingQuantity = selectInput.val();
		if(!reg.test(shippingQuantity)){
			window.alert("发货量只能为非负整数！");
			selectInput.val(0)
			return;
		}
		$("input[name='quantity']").each(function(index){
			var quantity = $(this).val();
			quantitys[index] = quantity;
		});
	});
	dialog3.on("click",".default",function(e){
		dialog3.hide();
	}).on("click",".primary",function(e){
		var reg = new RegExp("^[0-9]+(.[0-9]{1,3})?$");
		var index = $("#dialog3").attr("data-input-index");
		var value = $("#weight").find("input").val();
		value = (value===""?0:value);
		value = parseFloat(value).toFixed(3);
		var selectInput = $("input[name='weight']")[index];
		selectInput = $(selectInput);
		if(!reg.test(value)){
			window.alert("发货量只能为非负数，且小数位数不超过3位！");
			$("#weight").find("input").val(0);
			$("#weight").find("input").focus();
			$("#weight").find("input").select();
			return;
		}
		selectInput.val(Number(value));
		$("#weight").find("input").val(0);
		dialog3.hide();
		var shippingWeight = selectInput.val();
		if(!reg.test(shippingWeight)){
			window.alert("发货量只能为非负数，且小数位数不超过3位！");
			$(this).val(weight)
			return;
		}
		var span = selectInput.next().next().next();
		var data = span.attr("data-remain-weight");
		var remainWeight = data-shippingWeight;
		if(remainWeight<0){
			alert("输入重量不能超过订单量！");
			selectInput.val(0);
			span.html(data);
		}else{
			span.html(remainWeight);
		}
		shippingWeight = 0;
		var remainShipWeight = 0;
		var remainShipWeightTotal = $("#remainShipWeight").attr("data-remain-ship-weight");
		$("input[name='weight']").each(function(index){
			var weight = parseFloat($(this).val());
			shippingWeights[index] = weight;
			shippingWeight +=weight;
			remainShipWeight = remainShipWeightTotal - shippingWeight;
		});
		$("span[name='remainWeight']").each(function(index){
			var weight = parseFloat($(this).html());
			remainWeights[index] = weight;
		});
		$("#shippingWeight").html(shippingWeight);
		$("#remainShipWeight").html(remainShipWeight);
	});
	gPage.on("click","a",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		if(target.hasClass("u-back-left")){
			return ;
		}
		var flag = true;
		var inputs = $(".m-shipping div input");
		for(var i=0;i<inputs.length;i++){
			var content = $(inputs[i]).val().trim();
			$(inputs[i]).css("border","1px solid #A9A9A9");
			if(content===""){
				alert("该项为必填项！");
				$(inputs[i]).css("border","2px solid red");
				inputs[i].select();
				inputs[i].focus();
				flag = false;
				break;
			}
		}
		if(flag){
		var params = getParams();
		$.ajax({
			dataType:'json',
			url:'../../purchase/shipping/getShippingListData',
			async:false,
			data:{
				'orderId':params.orderId,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				 $('#dialog1').hide();
				 data.shippingUserName = $("#shippingUserName").html();
				 data.shippingUserTel = $("#shippingUserTel").val();
				 data.shippingWeight = $("#shippingWeight").html();
				 data.remainShipWeight = $("#remainShipWeight").html();
				 data.order.orderDetails.forEach(function(list,index){
				 	if(typeof shippingWeights[index] != 'undefined'){
					 	list.shippingWeight = shippingWeights[index];
				 	}else{
				 		list.shippingWeight = 0;
				 	}
				 	if(typeof remainWeights[index] != 'undefined'){
					 	list.remainShipWeight = remainWeights[index];
				 	}
				 });
				 var tempFn = doT.template(shippingMessageTpl);
				 var resultHtml = tempFn(data);
				 //先清空
				 confirmPage.empty();
				 confirmPage.append(resultHtml);
				 $('#dialog1').show();
			},
			error:function(xhr, errorType, error){
				loadingToast.show("数据加载失败，请重新试试！");
			}
		});
		$('#dialog1').on('click', '.default', function () {
			$('#dialog1').off('click').hide();
		});
		$('#dialog1').on('click', '.primary', function () {
			$('#dialog1').hide();
			loadingToast.show("保存中...");
			var params = checkParams(getParams().orderId);
			$.ajax({
				url:"saveShippingOrder",
				data:{'params':JSON.stringify(params)},
				dataType:"json",
				success:function(data, status, xhz){
					loadingToast.hide();
					if(status=="success"&&data!=""){
						alert("发货单【"+data+"】已保存");
						window.location.href="../order/center";
					}else{
						alert("发货单保存失败");
					}
				},
				error:function(data, status, xhz){
					loadingToast.show("网络异常，请刷新重试...");
				}
			});
		function checkParams(orderId){
			var params = {};
			params['orderId'] = orderId;
			var $consignorAddress = $("#consignorAddress");//发货地址
			var $consignor = $("#consignor");//发货人
			var $consignorTel = $("#consignorTel");//发货人电话
			var $consignorCarNumber = $("#consignorCarNumber");//发货车牌号
			var $shippingUserName = $("#shippingUserName");//收货人
			var $shippingUserTel = $("#shippingUserTel");//收货人电话
			var $inputWeight = $("input[name='weight']");
			var $inputQuantity = $("input[name='quantity']");
			params['consignorAddress'] = $consignorAddress[0].value;
			params['consignor'] = $consignor[0].value;
			params['consignorTel'] = $consignorTel[0].value;
			params['consignorCarNumber'] = $consignorCarNumber[0].value;
			params['shippingUserName'] = $shippingUserName[0].value;
			params['shippingUserTel'] = $shippingUserTel[0].value;
			params['consignorAddress'] = $consignorAddress[0].value;
			$inputWeight.forEach(function(e){
				params[$(e).attr("id")] = e.value;
			});
			$inputQuantity.forEach(function(e){
				params["quantity"+$(e).attr("id")] = e.value;
			});
			return params;
		}
        });
		}
	});
	var params = getParams();
	$.ajax({
		dataType:'json',
		url:'../../purchase/shipping/getShippingListData',
		data:{
			'orderId':params.orderId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 var tempFn = doT.template(shippingTpl);
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
	 * 获取url中的orderId
	 */
	function getParams(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?orderId=(\d*)/g;
		var url = window.location.href;
		var params = [];
		var m = reg.exec(url);
		if(m && m.length == 2){
			params['orderId'] = m[1];
			return params;
		}
		return 0;
	}
});