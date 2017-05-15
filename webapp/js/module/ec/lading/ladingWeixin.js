define(function(require, exports, module) {
	var $ = require("zepto");
	var doc = $(document);
	 //dot模板引擎
	var doT = require("dot");
	//数据加载提示

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
		    jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
		});
	});
	
	function init(){
		$("#all").on('click',function(){
			var self = $(this);
			var phone = self.attr("data-phone");
			toLadingWeixin(phone,-1)
		});
		
		$("#unDelivery").on("click",function(){
			var self = $(this);
			var phone = self.attr("data-phone");
			toLadingWeixin(phone,0)
		});
		
		$("#deliverying").on("click",function(){
			var self = $(this);
			var phone = self.attr("data-phone");
			toLadingWeixin(phone,1)
		});
		
		$(".btn").on("click",function(){
			var self = $(this);
			var phone = self.attr("data-phone");
			var evLadingId = self.attr("data-evLadingId");
			var ladingId = self.attr("data-ladingId");
			var ladingType = self.attr("data-ladingType");
			var ladingPasswordShow = self.attr("data-ladingPasswordShow");
			toladingDetail(phone,evLadingId,ladingId,ladingType,ladingPasswordShow);
		});
		$('.toladingDetail').on("click",function(){
			var self = $(this);
			var phone = self.attr("data-phone");
			var evLadingId = self.attr("data-evLadingId");
			var ladingId = self.attr("data-ladingId");
			var ladingType = self.attr("data-ladingType");
			var ladingPasswordShow = self.attr("data-ladingPasswordShow");
			toladingDetail(phone,evLadingId,ladingId,ladingType,ladingPasswordShow);
		});
	}

	
	
	function toLadingWeixin(phone,verifyStatus){
		
		var url = "/lading/queryLadingWeixinInfo.pfv?phone="+phone+"&verifyStatus="+verifyStatus +"&range=1-10&rm="+Math.random();

		$.post(url,function(response){
			$("#content").html(response);
			if(verifyStatus == -1){
				$("#unDelivery").removeAttr("class");
				$("#deliverying").removeAttr("class");
				$("#all").attr("class", "on");
				
			}else if(verifyStatus == 0){
				$("#all").removeAttr("class");
				$("#deliverying").removeAttr("class");
				$("#unDelivery").attr("class","on")
			}else{
				$("#all").removeAttr("class");
				$("#unDelivery").removeAttr("class");
				$("#deliverying").attr("class","on")
			}
			init();
			
		});
	}
	function toladingDetail(phone,evLadingId,ladingId,ladingType,ladingPasswordShow){
		var param = encode64(phone+";"+ladingId+";"+ladingType+";"+ladingPasswordShow+";"+evLadingId);
		var url = "/lading/queryLadingDetailWeixin.pfv?rm="+param+"&t="+Math.random();
		window.location.href = url;

	}
	function encode64(str) {
		
	     var c1, c2, c3;
         var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                
         var i = 0, len= str.length, string = '';
         while (i < len){
         	c1 = str.charCodeAt(i++) & 0xff;
            if (i == len){
	        	string += base64EncodeChars.charAt(c1 >> 2);
	            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
	            string += "==";
	        	break;
	        }
            c2 = str.charCodeAt(i++);
            if (i == len){
                    string += base64EncodeChars.charAt(c1 >> 2);
                    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    string += "=";
                    break;
            }
            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            string += base64EncodeChars.charAt(c3 & 0x3F);
	}
         
         return string;

	}

});