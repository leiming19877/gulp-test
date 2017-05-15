define(function(require, exports, module) {
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	require("fastclick");
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
	    // 这里警告框会阻塞当前页面继续加载
	    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
	    // 以下代码是用javascript强行关闭当前页面
	    var opened = window.open('about:blank', '_self');
	    opened.opener = null;
	    opened.close();
	}
	
	wx.ready(function () {
		 wx.hideOptionMenu();
		});
		wx.error(function (res) {
		  //alert(res.errMsg);
		});
		
     init();
	 function init(){
	    var width=$(window).width();
	    var height=$(window).height();
	    $("body").css("height",height);
	    $("body").css("width",width);
	 }
	 window.addEventListener('load', function() {
		  FastClick.attach(document.body);
		}, false);
	 
	 var pass_word='';var rePass_word='';var passwords = $('#password').get(0);
	 $(function(){
	     var div = '\
	 	<div id="key" style="position:absolute;background-color:#A8A8A8;width:99.5%;bottom:0px;">\
	 		<ul id="keyboard" style="font-size:20px;margin:2px -2px 1px 2px">\
	 			<li class="symbol"><span class="off">1</span></li>\
	 			<li class="symbol"><span class="off">2</span></li>\
	 			<li class="symbol btn_number_"><span class="off">3</span></li>\
	 			<li class="tab"><span class="off">4</span></li>\
	 			<li class="symbol"><span class="off">5</span></li>\
	 			<li class="symbol btn_number_"><span class="off">6</span></li>\
	 			<li class="tab"><span class="off">7</span></li>\
	 			<li class="symbol"><span class="off">8</span></li>\
	 			<li class="symbol btn_number_"><span class="off">9</span></li>\
	 			<li class="delete lastitem">删除</li>\
	 			<li class="symbol"><span class="off">0</span></li>\
	 			<li class="cancle btn_number_">取消</li>\
	 		</ul>\
	 	</div>\
	 	';
	     var character;	$("input.pass").attr("disabled",true);	$("#password").attr("disabled",true);$("#keyboardDIV").html(div);
	     $('#keyboard li').click(function(){
	         if ($(this).hasClass('delete')) {
	             for(var i= 0,len=passwords.elements.length-1;len>=i;len--){
	                 if($(passwords.elements[len]).val()!=''){
	                     $(passwords.elements[len]).val('');
	                     if($(passwords.elements[5]).val()== null ||$(passwords.elements[5]).val()==undefined||$(passwords.elements[5]).val()==''){
	                         if(pass_word==''){
	                             $("#btn_next").attr("disabled",true);
	                         }
	                     }
	                     break;
	                 }
	             }
	             return false;
	         }
	         if ($(this).hasClass('cancle')) {
	             parentDialog.close();
	             return false;
	         }
	 		if ($(this).hasClass('symbol') || $(this).hasClass('tab')){
	 			character = $(this).text();
	 		}
	 		for(var i= 0,len=passwords.elements.length;i<len;i++){
	 			if($(passwords.elements[i]).val()== null ||$(passwords.elements[i]).val()==undefined||$(passwords.elements[i]).val()==''){
	 				$(passwords.elements[i]).val(character);
	 				break;
	 			}
	 		}
	 		if(!($(passwords.elements[5]).val()== null ||$(passwords.elements[5]).val()==undefined||$(passwords.elements[5]).val()=='')) {
	 			if (pass_word == '') {
	 				$("#btn_next").removeAttr("disabled");
	 			} else {
	 				var temp_rePass_word = '';
	 				for (var i = 0; i < passwords.elements.length; i++) {
	 					temp_rePass_word += $(passwords.elements[i]).val();
	 				}
	 				rePass_word = temp_rePass_word;
	 				$("#key").hide();
	 				if(rePass_word!=''&&pass_word==rePass_word){
	 					$("#key").hide();
	 					var result_text='\
	 						<span>两次密码一致</span>\
	 						';
	 					$("#set_text").html(result_text);
	 					$("input.pass").attr("disabled",true);
	 					$("#password").attr("disabled",true);
	 					$.ajax({
	 						url:'saveLadingPassword.pfv?action=set',
	 						type:'post',
	 						data:{userName:$("#userName").val(),ladingPassword:rePass_word},
	 						dataType:'json',
	 						success:function(data){
	 							var result_text='\
	 								<span>提货密码</span>\
	 								<span style="color: red;">设置成功</span>\
	 								<span style="color: red;">正在自动跳转</span>\
	 								';
	 							$("#set_text").html(result_text);
	 							var t=2;
	 							var t1 = window.setInterval(function(){
	 	    						t--;
	 	    						if(t==0){
	 		    						window.clearInterval(t1);
	 		    						var phone = $("#cellPhone").val();
	 		    						window.location.href="afterSaveLadingPassword.pfv?phone="+phone;
	 		    					}
	 	    					},1000);
	 						},
	 						error:function(data){
	 							
	 						}
	 					});
	 				}else{
	 					var result_text='\
	 						<span>两次</span>\
	 						<span style="color: red;">提货密码</span>\
	 						<span>不一致，请重新输入</span>\
	 						';
	 					$("#set_text").html(result_text);
	 					for(var i=0;i<passwords.elements.length;i++){
	 						$(passwords.elements[i]).val('');
	 					}
	 					rePass_word='';
	 					$("#key").show();
	 				}
	 			}
	 		}
	 		return false;
	 	});
	 });
	 $("#btn_next").click(function(){
	 	var reset_text='\
	 	<span>请再次输入</span>\
	 	<span style="color: red;">提货密码</span>\
	 	';
	 	$("#set_text").html(reset_text);
	 	var temp_password='';
	 	for(var i=0;i<passwords.elements.length;i++){
	 		temp_password+=$(passwords.elements[i]).val();
	 		$(passwords.elements[i]).val('');
	 	}
	 	pass_word=temp_password;
	 	$("#btn_next").attr("hidden",true);
	 });
	 (function () {
	 	function tabForward(e) {
	 		e = e || window.event;
	 		var target = e.target || e.srcElement;
	 		if (target.value.length === target.maxLength) {
	 			var form = target.form;
	 			for (var i = 0, len = form.elements.length-1; i < len; i++) {
	 				if (form.elements[i] === target) {
	 					if (form.elements[i++]) {
	 						form.elements[i++].focus();
	 					}
	 					break;
	 				}
	 			}
	 		}
	 	}
	 	var form = document.getElementById("password");
	 	form.addEventListener("keyup", tabForward, false);
	 	var set_text='\
	 	<span>设置</span>\
	 	<span style="color: red;">提货密码</span>\
	 	<span>,建议与</span>\
	 	<span style="color: red;">登陆密码</span>\
	 	<span>不同</span>\
	 	';
	 	$("#set_text").html(set_text);
	 })();

});





















