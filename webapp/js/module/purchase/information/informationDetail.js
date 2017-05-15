define(function(require, exports, module) {
	
	require("../../common/String");
	require("../../common/Date");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//界面主内容区
	var gPage = $("#g-page");
	//资讯详情模板
	var informationDetailTpl = require("./informationDetail.html");

	gPage.on("click",".image_left", function(){
		window.history.back();
	});
	gPage.on("click",".more", function(){
		more();
	});
	var informId = getUrlParams();
	$.ajax({
		dataType:'json',
		url:'../../purchase/information/informDetailData',
		data:{
			'informId':informId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){	
			 loadingToast.hide();
			 //设置上一次报价id
			 var tempFn = doT.template(informationDetailTpl);
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	var flag = false;
	function more() {
		var detailMore = $("#detailMore");
		var imgMore = $("#imgMore");
		if (detailMore.css("display") == "none") {
			detailMore.css("display","block");
		} else {
			detailMore.css("display","none");
		}
		if (flag) {
			imgMore.attr("src","../../images/info/information_up.png");
			flag = false;
		} else {
			imgMore.attr("src","../../images/info/information_down.png");
			flag = true;
		}

	}
	
	/**
	 * 获取url中的竞价参数和报价参数
	 */
	function getUrlParams(){
		var informId=0;
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?informId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			informId = m[1];

		}
		return informId;
	}
});