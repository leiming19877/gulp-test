define(function(require, exports, module) {
	var $ = require("zepto");
	var wx = require("jweixin");
	var toast = require("../../common/toast");
	var form = $("#bind-form");
	var updateform = $("#update-form");
	//手机输入框
	var phone = $("#phone");
	
	var clearPhone = $("#clear-phone"); 
	
	//新密码
	var newPSW = $("#newPSW"); 
	var againNewPSW = $("#againNewPSW"); 
	//验证码按钮
	var codeBtn = $("#code-btn");
	var bindBtn = $("#bind-btn");
	var submitBtn = $("#submit-btn");
	var isGetRandomCode = false;//是否获取过验证码
	
	
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
	
	phone.on("input",function(){
		var val = this.value;
		if( val != "" && !isGetRandomCode && !codeBtn.hasClass("code-active-btn") ){
			codeBtn.addClass("code-active-btn");
		}
		if(val != "" && clearPhone.hasClass("f-dn")){
			clearPhone.removeClass("f-dn");
		}
		if(val == "" && !clearPhone.hasClass("f-dn")){
			clearPhone.addClass("f-dn");
		}
	});
	//清空手机输入框
	clearPhone.on("click",function(){
		phone.val("");
		clearPhone.addClass("f-dn");
		codeBtn.removeClass("code-active-btn");
	});
	
	codeBtn.on("click",function(){
		var self = $(this);
		if(!self.hasClass("code-active-btn")){
			return ;
		}
		var val = phone.val();
		var reg = /^1\d{10}$/g;
		if(!reg.test(val)){
			toast.toast("请输入11位正确手机号",2000);
			return ;
		}
		self.removeClass("code-active-btn");
		var time = 121;
		var t1 = window.setInterval(function(){
			    if(time  == 0){
			    	window.clearTimeout(t1);
			    	codeBtn.html("重新获取");
			    	codeBtn.addClass("code-active-btn");
			    	return ;
			    }
			    codeBtn.html(--time +"秒");
		}, 1000);
		isGetRandomCode = true;
		$.post("../../../../account/getSmsRandomCode",{"phone":phone.val()},function(data){

		},"json");
	});
	bindBtn.on("click",function(){
		var val = phone.val();
		var reg = /^1\d{10}$/g;
		if(!reg.test(val)){
			toast.toast("请输入11位正确手机号",2000);
			return ;
		}
		var phoneCode = $("#phone-code").val();
		reg = /^\d{6}$/g;
		if(!reg.test(phoneCode)){
			toast.toast("请输入6位验证",2000);
			return ;
		}
		$(this).prop("disabled","disabled");
		form.submit();
		return ;
	});
	$("#cancel-btn").on("click",function(e){
		wx.closeWindow();
	});
	
	submitBtn.on("click",function(){
		var againPSW= againNewPSW.val();
		var PSW = newPSW.val();
		reg =/^\[a-zA-Z]\w{5,15}$/g;
		if(PSW.length>5 && againPSW.length>5&&!reg.test(PSW)){
			 if(againPSW==PSW){
			    	updateform.submit();
			    	return ;
			    }else{
			    	//密码不一致清除密码
			    	againNewPSW.val('');
			    	newPSW.val('');
			        toast.toast("密码不一致,请重新输入！",2000);
					return ;
			    }
		}else{
	        toast.toast("设置密码长度应在6至16位数字、字母、下划线组成！",2000);
			return ;
		}

	});
});