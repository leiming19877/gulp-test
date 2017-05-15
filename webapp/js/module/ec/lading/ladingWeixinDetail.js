define(function(require, exports, module) {
	var $ = require("zepto");
	var doc = $(document);
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示
   //初始化
	init();
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
		    jsApiList: [ 'onMenuShareQQ','hideAllNonBaseMenuItem','showMenuItems','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
		});
	});

	var appid=$('#appid').val();
	var timestamp=$('#timestamp').val();
	var nonceStr=$('#nonceStr').val();
	var signature=$('#signature').val();
	
	$(".btn_b").click(function(){
		toConfirmLadingPassword();
	})
	var dataForWeixin = {
	        title: '电子提单提货券号',  
	        desc: '提货券号:'+$("#ladingPasswordShow").html()+'\n订单号:'+$("#orderBusiId").html()+'\n提单号:'+$("#ladingCode").html(),  
	        imgUrl: $("#img")[0].src,  
	        link: window.location.href  
	    };
		wx.ready(function() {
			wx.hideOptionMenu();
			wx.showMenuItems({
			    menuList: ['menuItem:share:appMessage','menuItem:share:qq']
			});
			wx.onMenuShareTimeline({  
	            title: dataForWeixin.title, // 分享标题  
	            link: dataForWeixin.link, // 分享链接  
	            imgUrl: dataForWeixin.imgUrl, // 分享图标  
	            success: function () {   
	                alert("分享成功");
	            },  
	            cancel: function () {   
	                // 用户取消分享后执行的回调函数  
	            }  
	        });  
	        wx.onMenuShareAppMessage({  //分享给微信朋友
	        	title: dataForWeixin.title, // 分享标题  
	        	desc: dataForWeixin.desc, // 分享描述  
	        	link: dataForWeixin.link, // 分享链接  
	        	imgUrl: dataForWeixin.imgUrl, // 分享图标  
	        	type: '', // 分享类型,music、video或link，不填默认为link  
	        	dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空  
	        	success: function () {   
	            	alert("分享成功");
	        	},  
	        	cancel: function () {
	        	}  
	    	});
	        wx.onMenuShareQQ({
	    	    title: dataForWeixin.title, // 分享标题
	    	    desc: dataForWeixin.desc, // 分享描述
	    	    link: dataForWeixin.link, // 分享链接
	    	    imgUrl: dataForWeixin.imgUrl, // 分享图标
	    	    success: function () {
	    	    },
	    	    cancel: function () { 
	    	    }
	    	});
		});
		wx.error(function(res) {
			
		});
		function toConfirmLadingPassword(){
			var param = $("#param").val();
			var userName= $("#userName").val();
			var diag = new Dialog();
	        diag.Drag=false;
	        diag.Width=$(document.body).width();
	        diag.Height='100%';
	        diag.URL = "ladingPasswordConfirm.pfv?action=set&param="+param+"&userName="+userName+"&t="+Math.random();
	        diag.show();
		}
		
	    function init(){
	        var width=$(window).width();
	        var height=$(window).height();
	        $("body").css("height",height);
	        $("body").css("width",width);
	    }
});