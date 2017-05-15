define(function(require, exports, module) {
	var $ = require("zepto");
	var doc = $(document);
	 //dot模板引擎
	var doT = require("dot");
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
    
	var check_pass_word='';var passwords = $('#password').get(0);
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
	    var character,index=0;	$("input.pass").attr("disabled",true);	$("#password").attr("disabled",true);$("#keyboardDIV").html(div);
	    $('#keyboard li').click(function(){
	        if ($(this).hasClass('delete')) {
	        	$(passwords.elements[--index%6]).val('');
	        	if($(passwords.elements[0]).val()==''){
	        		index = 0;
	        	}
	            /*for(var i= 0,len=passwords.elements.length-1;len>=i;len--){
	                if($(passwords.elements[len]).val()!=''){
	                    $(passwords.elements[len]).val('');
	                    break;
	                }
	            }*/
	            return false;
	        }
	        if ($(this).hasClass('cancle')) {
	            parentDialog.close();
	            return false;
	        }
	        if ($(this).hasClass('symbol') || $(this).hasClass('tab')){
	            character = $(this).text();
				$(passwords.elements[index++%6]).val(character);
				if($(passwords.elements[5]).val()!=''){
	        		index = 0;
	        	}
	        /*for(var i= 0,len=passwords.elements.length;i<len;i++){
	            if($(passwords.elements[i]).val()== null ||$(passwords.elements[i]).val()==undefined||$(passwords.elements[i]).val()==''){
	                $(passwords.elements[i]).val(character);
	                break;
	            }
	        }*/
	        if($(passwords.elements[5]).val()!='') {
	        	
	            var temp_rePass_word = '';
	            for (var i = 0; i < passwords.elements.length; i++) {
	                temp_rePass_word += $(passwords.elements[i]).val();
	            }
	            check_pass_word = temp_rePass_word;
	            $("#key").hide();
	           	var action =document.getElementById("action").value;//"set"// 
	                $.ajax({
	                    url:'confirmLadingPassword.pfv',
	                    type:'post',
	                    data:{ladingPassword:check_pass_word},
	                    dataType:'json',
	                    success:function(data){
	                    	var result=JSON.stringify(data);
	                        if(result=="\"验证通过\""){
	                        	if(action=="modify"){
	                        		window.parent.document.getElementById("modify-div").style.display='';
	                        		window.parent.document.getElementById("modify-lading-password-btn").disabled='disabled';
	                        		window.parent.document.getElementById("oldLadingPassword").value=check_pass_word;
		                        	parentDialog.close();//如果验证成功关闭当前窗口并跳转到提单券号列表
	                        	}else if(action=="set"){
	                        		var evLadingId = parent.window.document.getElementById("evLadingId").value;
	                        		var ladingId = parent.window.document.getElementById("ladingId").value;
	                        		var ladingType =parent.window.document.getElementById("ladingType").value;
	                        		parent.window.location.href="indexSeting.pfv?ladingId="+ladingId +"&ladingType="+ladingType+"&evLadingId="+evLadingId+"&rm="+Math.random();//跳转到提货人或者车设置页面
		                        	//parentDialog.close();//如果验证成功关闭当前窗口并跳转到提单券号列表
	                        	}
	                        }else{
	                        	var result_text='\
	                           		<span>提货密码</span>\
	                           		<span style="color: red;">验证失败</span>\
	                           		';
	                        	$("#set_text").html(result_text);
	                        	$("#key").show();
	                        	for (var i = 0; i < passwords.elements.length; i++) {
	                				$(passwords.elements[i]).val('');
	            				}
	                        	/*var t=1;
								var t1 = window.setInterval(function(){
		    						t--;
		    						if(t==0){
			    						window.clearInterval(t1);
			    						if('set'==action){
			    							parent.window.location.href="queryLadingDetailWeixin.pfv?rm="+rm;
			    						}else if('modify'==action)
			                        		parent.window.location.href="weixinLading.pfv?info=2";
			    					}
		    					},1000);*/
	                        }
	                    },
	                    error:function(data){
	                        var result_text='\
	                           <span>网络异常</span>\
	                           <span style="color: red;">验证失败</span>\
	                           ';
	                        $("#set_text").html(result_text);
	                        var t=1;
								var t1 = window.setInterval(function(){
		    						t--;
		    						if(t==0){
			    						window.clearInterval(t1);
			    						if('set'==action){
			    							parent.window.location.href="queryLadingDetailWeixin.pfv?rm="+rm;
			    						}else if('modify'==action)
			                        		parent.window.location.href="weixinLading.pfv?info=2";
			    					}
		    					},1000);
	                    }
	                });
	            }
	                    }
	        return false;
	    });
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
		<span>请输入</span>\
		<span style="color: red;">提货密码</span>\
		<span>，验证本次操作</span>\
		';
	    $("#set_text").html(set_text);
	})();


});