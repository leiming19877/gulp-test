define(function(require, exports, module) {
	require("string");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//引入时间组件
	require("date");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");
	// 数量输入对话框
	var dialog2 = $("#dialog2");
	// 重量输入对话框
	var dialog3 = $("#dialog3");
	//竞价详情模板
	var bidDetailTpl = require("./editAllocation.html");
	//发货重量
	var shippingWeights = {};
	//发货数量
	var quantitys = {};
	var allocationId = getAllocationId();
	$.ajax({
		dataType:'json',
		url:'../../purchase/allocation/getAllocationsAndDetailsData',
		data:{
			'allocationId':allocationId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 // 1. Compile template function
			 var tempFn = doT.template(bidDetailTpl);
			 // 2. Use template function as many times as you like
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
		
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
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
		}else if( $(target).hasClass("weight") ) {
			dialog3.show();
			var inputs = $("input[name='weight']");
			var index = inputs.indexOf($(this)[0]);
			$("#dialog3").attr("data-input-index",index);
			$("#weight").find("input").val($(this).val());
			$("#weight").find("input").focus();
		}
		
	});
	gPage.on("click",".submit",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		if(target.hasClass("u-back-left")){
			return ;
		}
	   var orderId=$("#orderId").val();
		var flag = true;
		var inputs = $(".number");
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
		if(flag==true){
	//		if(flag==true){
	//			$('#dialog1').show();
	//		}
	//		$('#dialog1').on('click', '.default', function () {
	//			$('#dialog1').off('click').hide();
	//		});
	// 	$('#dialog1').on('click', '.primary', function () {
	//			$('#dialog1').hide();
				loadingToast.show("保存中...");
				var params = checkParams(allocationId);
				$.ajax({
					url:"../../purchase/allocation/updateAllocationData",
					data:{'params':JSON.stringify(params)},
					dataType:"json",
					success:function(data, status, xhz){
						loadingToast.hide();
						if(data.warn==true){
							alert(data.msg);
						}else if(status=="success"&&data!=""){
							window.location.href="../../purchase/allocation/toAllocationListPage?orderId="+orderId;
						}else{
							alert("实提录入失败");
						}
					},
					error:function(data, status, xhz){
						loadingToast.show("网络异常，请刷新重试...");
					}
				});
			function checkParams(allocationId){
				var params = {};
				params['allocationId'] = allocationId;
				params['orderId'] = $("#orderId").val();
				params['allocationStatus'] = $("#allocationStatus").val();
				var $inputWeight = $("input[name='weight']");
				var $inputQuantity = $("input[name='quantity']");
				var $inputSupplyPrice = $("input[name='supplyPrice']");
				var allocationDetailIds  = '';
		   		var quantitys  = '';
		        var weights ='';
		        var supplyPrices='';
				$inputWeight.forEach(function(e){
					allocationDetailIds+=$(e).attr("id")+',';
					weights+=parseFloat(e.value)+',';
				});
				$inputQuantity.forEach(function(e){
					quantitys+=parseInt(e.value)+',';
				});
				$inputSupplyPrice.forEach(function(e){
					supplyPrices+=parseFloat(e.value)+',';
				});
				params['quantitys'] = quantitys;
				params['weights'] = weights;
				params['supplyPrices'] = supplyPrices;
				params['allocationDetailIds'] = allocationDetailIds;
				return params;
			}
		}
        });

//	});
	

	dialog2.on("click",".default",function(e){
	dialog2.hide();
	}).on("click",".primary",function(e){
		var reg = new RegExp("^[0-9]*$");
		var index = $("#dialog2").attr("data-input-index");
		var value = $("#quantity").find("input").val();
		var selectInput = $("input[name='quantity']")[index];
		selectInput = $(selectInput);
		var  selectRemainingQuantity = $("input[name='remainingQuantity']")[index];
		selectRemainingQuantity = $(selectRemainingQuantity);
	    var data =selectRemainingQuantity.val();
		if(!reg.test(value)){
			window.alert("实提量只能为非负整数！");
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
			window.alert("实提量只能为非负整数！");
			selectInput.val(0)
			return;
		}
		                  
		var span = selectInput.next().next().next();
		var remainingQuantity =$("input[name='remainingQuantity']")[index];
		
		var remainingQuantity = data-shippingQuantity;
		if(remainingQuantity<0){
			alert("输入实提量不能超过订单量！");
			selectInput.val(0);
			span.html(data);
		}else{
			span.html(remainingQuantity);
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
			window.alert("实提量只能为非负数，且小数位数不超过3位！");
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
			window.alert("实提量只能为非负数，且小数位数不超过3位！");
			$(this).val(weight)
			return;
		}
		var span = selectInput.next().next().next();
		var data = span.attr("data-remain-weight");
		var remainWeight =$("input[name='remainWeight']")[index];
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
	
	
	
	/**
	 * 获取url中的bidId
	 */
	function getAllocationId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?allocationId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
});