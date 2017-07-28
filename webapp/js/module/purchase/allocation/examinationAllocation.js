define(function(require, exports, module) {
	require("string");		
	var $ = require("zepto");	
	 //dot模板引擎
	var doT = require("dot");
	//引入时间组件
	require("date");
	//查询参数
	var params = require("params");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");

	//详情模板
	var bidDetailTpl = require("./examinationAllocation.html");
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
	
		
	gPage.on('click','.revokeExamination',function (e){
			var orderId=$("#orderId").val();
	      	$.ajax({
				url:"../../purchase/allocation/revokeExamination",
				data:{
					'allocationId':allocationId,
					'_t':new Date().getTime()
				},
				dataType:"json",
				success:function(data, status, xhz){
					loadingToast.hide();
					if(status=="success"&&data!=""&&data.success==true){
						window.location.href="../../purchase/allocation/toAllocationListPage?orderId="+orderId;
					}else{
						alert(data.msg);
					}
				},
				error:function(data, status, xhz){
					loadingToast.show("网络异常，请刷新重试...");
				}
		});	
	  }
	)
	
	
	gPage.on('click','.realLadingExamination',function (e){
			var orderId=$("#orderId").val();
	      	$.ajax({
				url:"../../purchase/allocation/realLadingExamination",
				data:{
					'allocationId':allocationId,
					'_t':new Date().getTime()
				},
				dataType:"json",
				success:function(data, status, xhz){
					loadingToast.hide();
					if(status=="success"&&data!=""&&data.success==true){
						window.location.href="../../purchase/allocation/toAllocationListPage?orderId="+orderId;
					}else{
						alert(data.msg);
					}
				},
				error:function(data, status, xhz){
					loadingToast.show("网络异常，请刷新重试...");
				}
		});	
	  }
	)
	
	
	
});