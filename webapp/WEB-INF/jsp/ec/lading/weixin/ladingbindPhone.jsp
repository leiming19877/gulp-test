<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<title>中拓钢铁官网</title>
<meta name="description" content="微信中拓钢铁网，提货券号，主营：螺纹钢，盘螺，高速线材，板材等。" />
<meta name="keywords" content="中拓钢铁提货券号，提货券号详情" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"content="height = device-height,width = device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/lading/weixin1.css");
</script>
<%
SignPackage signPackage = (SignPackage)request.getAttribute("sign");
%>
<script type="text/javascript">
//对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
    // 以下代码是用javascript强行关闭当前页面
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}
	function changeFormType() {
		var bindPhone = $('#bindPhone').val();
		var userId = $("#userId").val();
			var form1 = document.getElementById("bind");
			var form2 = document.getElementById("query");
			var form3 = document.getElementById("transLogin");
		if (bindPhone != "") {
			form1.style.display ="none";
			form2.style.display ="";
			if(userId=="0"){
				form3.style.dispaly ="";
			}else{
				form3.style.display="none";
			}
		} else {
			form1.style.display ="";
			form2.style.display ="none";
			form3.style.dispaly ="";
		}
		
	}
	window.onload = changeFormType;
	function checkMobile(str) {
	    if(str==""){
	    	var text = document.getElementById("checkPhone");
			text.style.color='red';
			text.innerHTML="手机号不能为空";
	        return false;
	    }
	    else{
	        var re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
	        if (re.test(str)) {
	        	var text = document.getElementById("checkPhone");
	        	text.style.color='green';
	        	text.innerHTML="手机格式正确";
	            return true;
	        } else {
	        	var text = document.getElementById("checkPhone");
				text.style.color='red';
				text.innerHTML="手机格式非法";
				return false;
	        }
	    }
	}
	function checkAll(form){
		var text=form.phone.value;
		if(checkMobile(text)){
			var text=document.getElementById("checkPhone");
			text.style.color='green';
			text.innerHTML="手机格式正确";
			return true;
		}else if(text==""){
			var text=document.getElementById("checkPhone");
			text.style.color='red';
			text.innerHTML="手机号不能为空";
			return false;
		}else{
			var text=document.getElementById("checkPhone");
			text.style.color='red';
			text.innerHTML="手机格式非法";
			return false;
		}
	}
</script>
</head>
<body>
 <div class="">
          <div class="connet">
                <div class="List lading_xq"style="line-height: 70px;"><!--详情列表样式 请添加样式 lading_xq  -->
                     <form id="bind" action="${ctx}/steel/lading/weixin/bindOpenidAndPhone.pfv"mothod="post"onsubmit="return checkAll(this)">
                     <ul>
                         <li style="margin-top:0px; border:0px;    margin-bottom: -20px;">
                             <dl><input type="text"id="phone"name="phone"size="20px"onblur="checkMobile(this.value)"style="height: 40px;width: 67%;text-align: center;"placeholder="请输入手机号"/><span id="checkPhone"style="width: 100%;height: 20px;line-height: 26px; margin-top: 0px;"></span></dl>
                         </li>
                     </ul>
                     <input type="submit" class="btn_b"value="绑定手机号" style="line-height: 20px; height: 40px;width: 70%;margin-left: 15%;"/>
                     <input type="hidden"name=openid value="<%=signPackage.getOpenid()%>">
                     </form>
                     
                      <form id="query" action="${ctx}/steel/lading/weixin/queryLadingWeixinInfo.pfv"mothod="post"onsubmit="javascript:{this.disabled=true;document.query.submit();}">
                      <input type="hidden" name="phone" value="${bindPhone}"> 
					  <input type="hidden" value="-1" name="verifyStatus"> 
					  <input type="hidden" value="1-10" name="range">
					  <input type="hidden" value="<%=Math.random()%>" name="rm">
                      <input id="sub_mit" type="submit" class="btn_b"value="查询提货券号" style="line-height: 20px; height: 40px;width: 70%;margin-left: 15%;"/>
                      </form>
                    <form id="transLogin" method="post"action="${ctx}/steel/lading/weixin/weixinLading.pfv"">
                    <input type="submit" class="btn_b"value="运输公司登录" style="line-height: 20px; height: 40px;width: 70%;margin-left: 15%;"/>
                    <input type="hidden"name=info value="3">
                    <input type="hidden"id="userId"name="userId"value="${userId}"/>
                    </form>
                    <input type="hidden"id="bindPhone"value="${bindPhone}"/>
                </div>
          </div>
     </div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/ladingbindPhone");
</script>
</html>