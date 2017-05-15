define(function(require, exports, module) {
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	$ = require("jquery");
	var wx = require("jweixin");
	var url = window.location.href;
	$.getJSON("../../../getSignUrl",{"url":url},function(data){
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
		});
	});
	
	wx.ready(function () {
		 wx.hideOptionMenu();
		});
		wx.error(function (res) {
		  //alert(res.errMsg);
		});
		
	// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
	var useragent = navigator.userAgent;
	if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
	    // 这里警告框会阻塞当前页面继续加载
	    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
	    // 以下代码是用javascript强行关闭当前页面
	    var opened = window.open('about:blank', '_self');
	    opened.opener = null;
	    opened.close();
	}	
	show();
	function show() {
	    var t=document.getElementById("time").innerHTML;
	    var t1 = setInterval(function(){
	    	t--;
	    	document.getElementById("time").innerHTML=t;
	    	if(t===0){
		    	window.clearInterval(t1);
		    	window.location.href="lading/weixinLading.pfv?info=1";
		    }
	    },1000);
	}

});
