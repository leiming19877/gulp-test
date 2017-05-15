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
	
	
	var useragent = navigator.userAgent;
	if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
	    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
	    var opened = window.open('about:blank', '_self');
	    opened.opener = null;
	    opened.close();
	}
	checkState();
	
	$("#name").blur(function(){
		checkName();
	});
	$("#passWord").blur(function(){
		checkPassWord();
	});
	$(".btn_b").click(function(){
		if(checkName()&&checkPassWord()){
            return true;
        }else{
            return false;
        }
	})
	wx.ready(function () {
		 wx.hideOptionMenu();
		});
	wx.error(function (res) {
	  //alert(res.errMsg);
	});
	var name,password;
    function checkName(){
        name=$("#name").val();
        var checktext = document.getElementById("checkName");
        if(name==""){
            checktext.style.color="red";
            checktext.innerHTML="用户名不能为空";
            return false;
        }else{
            checktext.innerHTML="";
            $.ajax({
            	url:'/lading/checkBindState.pfv',
            	data:{userName:name},
            	dataType:'json',
            	type:'post',
            	success:function(data){
            		if(data){
            			var conf = confirm("当前账号已绑定微信号，继续登陆将解除绑定，并绑定当前微信号，是否继续");
            			if(conf){
            				$("#submit").removeAttr("disabled",false);
            			}else{
            				$("#name").val("");
            			}
            		}else{
            			$("#submit").removeAttr("disabled",false);
            		}
            	}
            });
            return true;
        }
    }
    function checkPassWord(){
        password=$("#password").val();
        var checktext = document.getElementById("checkPassWord");
        if($("#name").val()!=''){
        	$("#submit").removeAttr("disabled",false);
        }
        if(password==""){
            checktext.style.color="red";
            checktext.innerHTML="请输入密码";
            return false;
        }else{
            checktext.innerHTML="";
            return true;
        }
    }
    function checkAll(form){
        if(checkName()&&checkPassWord()){
            return true;
        }else{
            return false;
        }
    }
    function checkState(){
    	var checkPassWord=document.getElementById("checkPassWord");
    		checkPassWord.style.color="red";
        var name=$("#name").val();
    	var checkName=document.getElementById("checkName");
    		checkName.style.color="red";
    	if($("#state").val()=="0"){
    		$("#name").val(name);
    		checkPassWord.innerHTML="密码不正确";
    	}else if($("#state").val()=="-1"){
    		checkName.innerHTML="用户名不存在";
    	}else{
    		checkName.innerHTML="";
    		checkPassWord.innerHTML="";
    	}
    }

});
