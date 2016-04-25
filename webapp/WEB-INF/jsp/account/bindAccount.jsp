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
        	var password = $.trim($("#password").val());
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
</head>
<body>
	<div data-role="page" id="pageone" data-theme="a">
		<!-- 
		<div data-role="header">
			<h1>绑定用户</h1>
		</div>
		 -->
		<div data-role="content">
			
			<form action="${ctx}/bindAccount" class="ui-body ui-body-a ui-corner-all" onsubmit="return check();" method="post" data-ajax="false">
			   
			    <div  data-role="content" style="color: red;" >${msg}</div>
			     <input type="hidden" name="redirectUrl" value="${redirectUrl}" />
			    <input type="hidden" name="openId" value="${openId}" />
			    <input type="hidden" name="unionId" value="${unionId}" />
			    <input type="hidden" name="publicWechatId" value="<%=Constants.PUBLIC_WECHAT_ID %>" />
			    <input type="hidden" name="publicWechatName" value="<%=Constants.PUBLIC_WECHAT_NAME %>" />
				<div class="ui-field-contain">
					    <label for="textinput-1">用户名:</label>      
					<input type="text" required="required"
						name="userName" id="userName" value="${userName}" placeholder="用户名" value="">
				</div>
				<div class="ui-field-contain">
                    <label for="textinput-1">密码:</label>      
                    <input type="password" required="required"
                        name="password" id="password" placeholder="密码" value="">
                </div>
                <input type="submit" id="bind-btn"  class="ui-btn ui-corner-all"   value="绑定" />
			</form>

		</div>

		<!-- <div data-role="footer">
			<h1>集中采购电商平台</h1>
		</div> -->
	</div>
</body>
</html>
