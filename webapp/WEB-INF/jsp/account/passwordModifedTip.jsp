<%@page import="java.net.URLEncoder"%>
<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%
    String bindAccountUrl = "http://"+Constants.DOMAIN+"/goBindAccount";
	StringBuffer sb = new StringBuffer("https://open.weixin.qq.com/connect/oauth2/authorize");
	sb.append("?appid=").append(Constants.APPID);
	sb.append("&redirect_uri=");
	sb.append(URLEncoder.encode(bindAccountUrl, "utf-8"));
	sb.append("&response_type=code&scope=snsapi_base&state=#wechat_redirect");
%>
<!DOCTYPE HTML>
<html >
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>验证错误</title>
	<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.js"></script>

</head>
<body>
	<div data-role="page" id="pageone" data-theme="a">
		<div data-role="header">
			<h1>验证错误</h1>
		</div>
		<div data-role="content" class="ui-body ui-body-a ui-corner-all">
			  
			<div class="ui-body ui-body-a ui-corner-all">
				<p>提示：您 的密码已经修改过，你需要重新绑定账号，才能正常地使用我们的服务。</p>
			</div>
			<a href="<%=sb.toString() %>" class="ui-btn ui-corner-all">重新绑定</a>
			<button id="cancel-btn"  class="ui-btn ui-corner-all">取消</button>
		</div>
	</div>
</body>
    <script type="text/javascript">
    //加载主模板块
    seajs.use("module/account/passwordModifedTip");
    </script>
</html>
