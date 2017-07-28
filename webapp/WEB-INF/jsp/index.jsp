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
    <link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css"> 
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
			<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=<%=Constants.APPID %>&redirect_uri=http%3A%2F%2F<%=Constants.DOMAIN %>%2Faccount%2FtoUnbindAccount&response_type=code&scope=snsapi_base&state=1212312#wechat_redirect">解绑账号</a>
            <br/>
            <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=<%=Constants.APPID %>&redirect_uri=http%3A%2F%2F<%=Constants.DOMAIN %>%2Faccount%2FgoBindAccount&response_type=code&scope=snsapi_base&state=1212312#wechat_redirect">绑定账号</a>
            <br/>
            <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=<%=Constants.APPID %>&redirect_uri=http%3A%2F%2F<%=Constants.DOMAIN %>%2Faccount%2FtoDriverPhoneBind&response_type=code&scope=snsapi_base&state=1212312#wechat_redirect">师机手机账号绑定</a>
            <br/>
            <a href="ec/terminalSupply/terminalBuy" data-ajax="false">终端我要买</a>
            <br/>
            <a href="preorder/iWantBuy" data-ajax="false">我要买</a>
            <br/>
            <a href="ec/futures/buyNav" data-ajax="false">买家导航</a>
            <br/>
            <a href="ec/futures/publishDemand" data-ajax="false">发布需求</a>
            <br/>
		    <a href="purchase/bidConsole/bidListPage" data-ajax="false">竞价</a>
            <br/>
		    <a href="purchase/bidConsoleForWuHan/bidListPage" data-ajax="false">竞价(武汉)</a>
		    <br/>
		    <a href="purchase/order/list" data-ajax="false">集采我的订单</a>
		    <br/>
		    <a href="preorder/getList" data-ajax="false">订单模式订单</a>	   
		    <br/>
		    <a href="purchase/shipping/toOrderReceiptPage" data-ajax="false">订单收货</a>	   
		    <br/>
		    <a href="purchase/order/center" data-ajax="false">订单中心</a>	 
		    <br/>
		    <a href="purchase/favorite/toFavorite" data-ajax="false">我的偏好</a>	
		    <br/>
		    <a href="navigation/toBuyNavigationPage" data-ajax="false">我要买导航</a>	   
		    <br/>
		    <a href="navigation/toSellNavigationPage" data-ajax="false">我要卖导航</a>	  
		    <br/>   
		    <a href="navigation/toMyServiceNavigationPage" data-ajax="false">我的服务导航</a>	
		    <br/>   
		    <a href="purchase/order/toOrderCenterPage" data-ajax="false">调拨单订单中心</a>	
		    <br/> 
		    <a href="ec/quote/list" data-ajax="false">报价单列表页面</a>	
		    <br/>
		    <a href="ec/order/toList4wechat" data-ajax="false">订单管理</a>	
		    <br/>
		    <a href="lading/toList4wechat" data-ajax="false">提单管理</a>	
		    <br/> 
		    <a href="ec/checkbill/list/init" data-ajax="false">对账单管理</a>	
		    <br/> 
		    <a href="ec/contract/toBuyContract" data-ajax="false">合同管理-买</a>    
            <br/> 
		</div>
		<!-- /content -->

		<div data-role="footer">
			<h4>微信工程</h4>
		</div>
		<!-- /footer -->
	</div>
	
</body>
</html>
