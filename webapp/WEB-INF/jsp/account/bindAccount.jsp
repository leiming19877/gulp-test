<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html >
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>绑定用户</title>
    
    <%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
    <script type="text/javascript">
        function check(){
        	var userName = $.trim($("#userName").val());
        	var password = $.trim($("#user-password").val());
        	var bindBtn = $("#bind-btn");
        	if(userName != "" && password != ""){
        		bindBtn.val("绑定中...");
        		bindBtn.prop("disabled",true);
        		bindBtn.button("refresh");
        		return true;
        	}
        	return false;
        }
    </script>
    <style>
          .logo{width:224px;height:129px;margin:20px auto;background:url(../../../../images/icons/icon_logo.png) no-repeat center top;background-size:224px 129px;}
          .ui-input-text input, .ui-input-search input{line-height:38px; height:38px;}
          .ui-field-contain{ border-bottom-width: 0px;}
          .ui-page-theme-a{background-color: #fff;}
          .ui-body-a{border-width: 0px; background-color:none;bottom:0px; margin-bottom:0px;border-radius: 0px;}
          .ui-content{
                      padding:0px;
                      background: -webkit-gradient(linear,left bottom,right top,color-stop(0%,#6621bb),color-stop(100%,#336FC8));
                      background: linear-gradient(45deg, #6621bb 0px, #336FC8 100%) repeat scroll 0 0 rgb(0, 0, 0);}
          .ui-page-theme-a .ui-btn, html .ui-bar-a .ui-btn, html .ui-body-a .ui-btn{
                    background:#336FC8;  text-shadow: 0 0px 0 #f3f3f3;color: #fff;
          }
          .ui-corner-all>.ui-content:first-child{border-radius:8px 8px 8px 8px;margin:10px 0px 0px 0px;}
          .logoing_msg {background:rgba(204,51,51,.8);border:0px solid rgb(204,51,51); color:#fff;  text-shadow: 0 0px 0 #f3f3f3; text-align:center;padding:0px 0px 0px 0px;line-height:28px;border-radius:8px 8px 8px 8px;} 
    </style>
</head>
<body>
	<div data-role="page" id="pageone" data-theme="a">
		<!-- 
		<div data-role="header">
			<h1>绑定用户</h1>
		</div>
		 -->
		<div data-role="content">
			<div class="logo"></div>
			<form action="${ctx}/account/bindAccount" class="ui-body ui-body-a ui-corner-all" onsubmit="return check();" method="post" data-ajax="false">
			   
			    <div  data-role="content" class="logoing_msg" >${msg}</div>
			    <input type="hidden" name="redirectUrl" value="${redirectUrl}" />
			    <input type="hidden" name="openId" value="${openId}" />
			    <input type="hidden" name="unionId" value="${unionId}" />
			    <input type="hidden" name="publicWechatId" value="<%=Constants.PUBLIC_WECHAT_ID %>" />
			    <input type="hidden" name="publicWechatName" value="<%=Constants.PUBLIC_WECHAT_NAME %>" />
				<div class="ui-field-contain">
					<input type="text" required="required" name="userName" id="userName" value="${userName}" placeholder="请输入账号" value="">
                    <input type="password" required="required" name="userPassword" id="user-password" placeholder="请输入密码" value="">
                </div>
                <input type="submit" id="bind-btn"  class="ui-btn ui-corner-all"   value="绑定账号" />
			</form>

		</div>

		<!-- <div data-role="footer">
			<h1>集中采购电商平台</h1>
		</div> -->
	</div>
</body>
</html>
