define(function(require, exports, module) {
	var $ = require("zepto");
	var wx = require("jweixin");
	
	var url = window.location.href;
	$.post("../../../../getSignUrl",{"url":url},function(data){
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: ['closeWindow','hideOptionMenu'] // 必填，需要使用的JS接口列表
		});
		wx.ready(function(){
			wx.hideOptionMenu();
		});
	},"json");
	
	//设置解绑url
	$.getJSON("../../../../account/getAccountBindUrl",function(data){
		$("#bind-btn").prop("href",data.url);
	});
	

	$("#cancel-btn").on("click",function(e){
		wx.closeWindow();
	});

});