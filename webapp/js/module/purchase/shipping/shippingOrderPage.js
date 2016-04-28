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
	// 确认对话框内容区
	var confirmPage = $("#confirm_detial");
	//发货详情模板
	var shippingOrderTpl = require("./shippingOrder.html");
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
		if(val==""){
			alert("该项为必填项！");
			this.select();
		}
	});
	gPage.on("input",".u-ipt-min",function(e){
		var target = e.target||e.srcElement;
		var self = $(this);
		if($(target).hasClass("quantity")){
			if(self.val()<0){
				alert("发货数量不能小于0！");
				self.val(0);
			}
			return;
		}
		var val = parseFloat(self.val()).toFixed(2);
		if(val<0){
			alert("发货重量不能为负数");
			self.val(0);
			return;
		}
		self.val(val);
		var span = self.next().next().next();
		var data = span.attr("data-remain-weight");
		var remainWeight = data-self.val();
		if(remainWeight<0){
			alert("输入重量不能超过订单量！");
			self.val(0);
			span.html(data);
		}else{
			span.html(remainWeight);
		}
		var shippingWeight = 0;
		var remainShipWeight = 0;
		var remainShipWeightTotal = $("#remainShipWeight").attr("data-remain-ship-weight");
		$("input[name='weight']").each(function(index){
			var weight = parseFloat($(this).val());
			shippingWeights[index] = weight;
			shippingWeight +=weight;
			remainShipWeight = remainShipWeightTotal - shippingWeight;
		});
		$("input[name='quantity']").each(function(index){
			var quantity = $(this).val();
			quantitys[index] = quantity;
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
			if(content==""){
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
			url:'../../purchase/shippingOrder/loadlistData',
			async:false,
			data:{
				'orderId':params.orderId,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				 $('#dialog1').hide();
				 data.shippingUserName = $("#shippingUserName").val();
				 data.shippingUserTel = $("#shippingUserTel").val();
				 data.shippingWeight = $("#shippingWeight").html();
				 data.remainShipWeight = $("#remainShipWeight").html();
				 data.orderDetails.forEach(function(list,index){
				 	if(typeof shippingWeights[index] != 'undefined'){
					 	list.shippingWeight = shippingWeights[index];
				 	}else{
				 		list.shippingWeight = 0;
				 	}
				 	if(typeof remainWeights[index] != 'undefined'){
					 	list.remainWeight = remainWeights[index];
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
		$('#dialog1').show().on('click', '.default', function () {
			$('#dialog1').off('click').hide();
		});
		$('#dialog1').show().on('click', '.primary', function () {
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
			var $input = $("input[name='weight']");
			params['consignorAddress'] = $consignorAddress[0].value;
			params['consignor'] = $consignor[0].value;
			params['consignorTel'] = $consignorTel[0].value;
			params['consignorCarNumber'] = $consignorCarNumber[0].value;
			params['shippingUserName'] = $shippingUserName[0].value;
			params['shippingUserTel'] = $shippingUserTel[0].value;
			params['consignorAddress'] = $consignorAddress[0].value;
			$input.forEach(function(e){
				params[$(e).attr("id")] = e.value;
			})
			return params;
		}
        });
		}
	});
	var params = getParams();
	$.ajax({
		dataType:'json',
		url:'../../purchase/shippingOrder/loadlistData',
		data:{
			'orderId':params.orderId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 var tempFn = doT.template(shippingOrderTpl);
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