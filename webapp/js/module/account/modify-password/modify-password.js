define(function(require, exports, module) {
	var $ = require("zepto");
	var wx = require("jweixin");
	var toast = require("../../common/toast");
	var updateform = $("#update-form");

	//密码
	var PSW = $("#PSW");
	var newPSW = $("#newPSW"); 
	var againNewPSW = $("#againNewPSW"); 
	//按钮
	var submitBtn = $("#submit-btn");
	
	
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
	


	
	$("#cancel-btn").on("click",function(e){
		wx.closeWindow();
	});
	
	submitBtn.on("click",function(){
		var psw = PSW.val();
		var newPsw = newPSW.val();
		var againPSW= againNewPSW.val();
		reg =/^\[a-zA-Z]\w{5,15}$/g;
		if(psw==newPsw){
			toast.toast("新旧密码不能相同，请重新输入。",2000);
			return ;
		}
		if(newPsw.length>5 && againPSW.length>5&&!reg.test(newPsw)){
			 if(newPsw==againPSW){
			    	updateform.submit();
			    	return ;
			    }else{
			    	//密码不一致清除密码
			    	againNewPSW.val('');
			    	newPSW.val('');
    				toast.toast("两次密码不一致,请重新输入。",2000);
					return ;
			    }
		}else if(newPsw.length==0||againPSW.length==0){
			toast.toast("密码设置不能为空。",2000);
			return ;
		}else{
			toast.toast("设置密码长度应在6至16位数字、字母、下划线组成。",2000);
			return ;
		}
		
	   
	})
	
	
	
	
});