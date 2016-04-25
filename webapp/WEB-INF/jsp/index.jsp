<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>微信首页</title>
    <link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css"> 
    <%-- 
	<link type="text/css" rel="stylesheet" href="${ctx}/js/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css"> 
    <script type="text/javascript" src="${ctx}/js/jquery/2.1.1/jquery-2.1.1.min.js" ></script>
    <script type="text/javascript" src="${ctx}/js/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js" ></script>
    --%>
    <%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>

</head>
<body>

	<!-- Start of first page -->
	<div data-role="page" id="foo">

		<div data-role="header">
			<h1>微信工程</h1>
		</div>
		<!-- /header -->

		<div role="main" class="ui-content">
			<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=<%=Constants.APPID %>&redirect_uri=http%3A%2F%2F<%=Constants.DOMAIN %>%2FunBindAccount&response_type=code&scope=snsapi_base&state=1212312#wechat_redirect">绑定账号</a>
            <br/>
            <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=<%=Constants.APPID %>&redirect_uri=http%3A%2F%2F<%=Constants.DOMAIN %>%2FgoBindAccount&response_type=code&scope=snsapi_base&state=1212312#wechat_redirect">解绑账号</a>
            <br/>
            <a href="preorder/iWantBuy" data-ajax="false">我要买</a>
            <br/>
		    <a href="central/bidConsole/bidListPage" data-ajax="false">竞价</a>
		    <br/>
		    <a href="central/order/list" data-ajax="false">集采我的订单</a>
		    <br/>
		    <a href="preorder/getList" data-ajax="false">订单模式订单</a>	   
		    <br/>
		    <a href="central/orderReceipt/list" data-ajax="false">订单收货</a>	   
		    <br/>
		    <a href="central/order/center" data-ajax="false">订单中心</a>	   
		</div>
		<!-- /content -->

		<div data-role="footer">
			<h4>微信工程</h4>
		</div>
		<!-- /footer -->
	</div>
	
</body>
</html>
