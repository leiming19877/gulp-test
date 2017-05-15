define(function(require, exports, module) {
	var $ = require("zepto");
	var doc = $(document);

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
		wx.ready(function () {
			 wx.hideOptionMenu();
			});
			wx.error(function (res) {
	    });
		
	});
	

	$("#modify-lading-password-btn").on("click",function(){
		modifyLadingPassword();
	});
	
		$('.saveLadingPassword').click(function(){
			saveLadingPassword();
		});
		
		var number = 4; //定义条目数
		function list() {
			var mylist;
			for (i = 1; i <= number; i++) {
				mylist = eval('state' + i);
				mylist.style.display = 'none';
			}
		}

		
		function modifyLadingPassword(){//修改提货密码前弹出密码验证窗口
				var diag = new Dialog();
		        diag.Drag=false;
		        diag.Width=$(window).width();
		        diag.Height=$(window).height();
		        diag.URL = "ladingPasswordConfirm.pfv?action=modify&userName="+$("#userName").val()+"&phone="+$("#cellPhone").val();
		        diag.show();
		}
		function saveLadingPassword(){ //确认修改时保存提货密码
			if($("#newLadingPassword").val().length==6&&/^\d{6}$/.test($("#newLadingPassword").val())){
				$('#save_btn').attr("disabled",true);
			    $.ajax({
			    	type:'POST',
			    	url:'/lading/saveLadingPassword.pfv?action=modify',
			    	data:{oldLadingPassword:$('#oldLadingPassword').val(),newLadingPassword:$('#newLadingPassword').val()},
			    	dataType:'json',
			    	success:function(data){
			    		var result = JSON.stringify(data);
			    		if(result=="\"保存成功\""){
			    			$('#save_btn').attr("disabled",false);
			    			$('#modify-div').css('display','none');
					   		$('#modify-lading-password-btn').attr("disabled",false);
					   		$("#newLadingPassword").val("");
			    			alert(result);
			    		}else{
			    			$('#save_btn').attr("disabled",false);
			    			alert(result);
			    		}
			    	},
			    	error:function(data){
			    		$('#remove_btn').attr("disabled",false);
			    		alert("网络异常，稍后再试!");
			    	}
			    });
			}else{
				alert("请输入新的六位数字提货密码");
			}
		    
		}
		

});