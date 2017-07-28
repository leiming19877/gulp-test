<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />

<title></title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css">
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>
<style type="text/css">
body {
	padding: 3px 0;
	overflow: hidden;
	background:#ebebeb;
}

.top {
    width: 100%;
	position: fixed;
    background-color: #fff;
    z-index: 8;
}

.top .imageWrap{
    float:left;
    width:20px;
    height:20px;
    margin-top: 10px;
    margin-left: 6px;
}

.top .ui-title{
    font-size: 15px;
	margin: 0 10px;
}

.top .image_left{
	width: 20px;
	height: 20px;
}


.top .manage {
	float: right;
    font-weight: normal;
    font-size: 13px;
    margin-top: -27px;
    margin-right: 7px;
    color: #298fbe;
    text-decoration: underline;
}

.head{
	position:relative;
    background-color: #fff;
	padding: 5px 8px 0px 8px;
    border-bottom: 8px solid #ddd;
}

.unit {
	position: relative;
	margin-bottom: 5px;
}

.unit .ui-content {
	padding: 0;
	position: absolute;
    margin-top: 40px;
    width: 100%;
    height: -webkit-calc(100% - 45px * 2);
    
}

.submitNav{
    position: relative;
    text-shadow: none;
    top: 20px;
    left: 0;
    width: 100%;
    height: 43px;
    padding: 8px 0;
}

.submitNav .view{
    float: right;
    color: #3879d9;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin-right: 15%;
    width: 100px;
    height: 35px;
    border: 1px solid;
    border-radius: 7px;
    line-height: 35px;
}

.submitNav .home{
    float: left;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin-left: 15%;
    width: 100px;
    height: 35px;
    border: 1px solid #3879d9;
    background:#3879d9;color:#fff;
    border-radius: 7px;
    line-height: 35px;
}
.submitNav .order.logistics{
    width: 130px;
    margin-right: 10%;
}

.iconfont {
    width: 15px;
    height: 15px;
    background-color: #b9b9b9;
    border-radius: 50%;
    margin-top: 7px;
    margin-left: 14px;
}

.success{
	width: 80px;
    height: 80px;
    margin: 15px auto 0;
    background-size: contain;
    background-image: url(${ctx}/images/icons/icon_success.png);
    background-size:100%;
}
.desc{
    margin-top:10px;
    height: 35px;
    line-height: 35px;
    font-weight: bold;
    text-align: center;
}
.orderNo{
    color: #000;
    font-size: 15px;
    text-align: center;
}
.ui-overlay-a, .ui-page-theme-a, .ui-page-theme-a .ui-panel-wrapper{background-color: #ebebeb ;}
</style>
</head>
<body ontouchstart="">
<form name="form1" method="POST">
	<input type="hidden" name="orderId" value="${orderId }"/>
	<input type="hidden" name="orderStatus" value="${orderStatus }"/>
	<input type="hidden" name="orderBusiId" value="${orderBusiId }"/>
	<div data-role="page" class="unit">
		<!-- 后退箭头 -->
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>提交成功</h1>
			</div> 
		</div>
		<div data-role="content">
	        <div class="ui-step ui-step-a">
				<div class="success"></div>
				<div class="desc">
					恭喜您，订单提交成功！
				</div>
				<div class="orderNo">订单编号：${orderBusiId }</div>
				<div class="submitNav">
				    <div class="home">返回首页</div>
					<div class="view">查看订单</div>
				</div>
			</div>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
$(document).ready(function(){
	var orderId = $("input[name='orderId']").val();
	var orderStatus = $("input[name='orderStatus']").val();
	
	//注册返回事件
	$(".image_left").on("click", function(){
		$.mobile.loading("show");
		window.history.back();
	});
	
	//查看订单事件
	$(".view").on("click", function(){
		$.mobile.loading("show");
		window.location.href="${ctx}/ec/order/toDetail?orderId="+orderId;
	});
	
	//再次下单事件
	$(".home").on("click", function(){
		//var $this = $(this);
		//$.mobile.loading("show");
		/* if ($this.hasClass("logistics")) {
			window.location.href="${ctx}/ec/preorder/selectLogisticsType?orderId="+orderId;
		} else {
			window.location.href="${ctx}/ec/preorder/iWantBuy";
		} */
		//window.history.back();
		wx.closeWindow();
	});
});
</script>
</html>