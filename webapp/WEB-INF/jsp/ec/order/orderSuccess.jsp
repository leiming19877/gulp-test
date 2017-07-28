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
    float: left;
    color: #3879d9;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin-left: 15%;
    width: 100px;
    height: 35px;
    border: 1px solid;
    border-radius: 7px;
    line-height: 35px;
}
.submitNav .view.logistics{
    margin-left: 10%;
}
.submitNav .order{
    float: right;
    
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin-right: 15%;
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
.ui-step {
	top: 10px;
	min-height: 60px;
    padding: 5px 30px 0px 30px;
    margin: 5px auto;
    font-size: 14px;
    list-style: none;
    zoom: 1;
    position: relative;
    color: #b7b7b7;
    overflow: hidden;
    width:80%;
    background:#fff;
    border-radius: 4px;
    box-shadow: 1px 3px 3px #ebebeb;
    
}
.ui-step-a {
    min-height: 260px;
    text-shadow: 0px 0px 0px #ebebeb;
    color:#000;
    margin-top:10px;
}

.ui-step-5 li {
    width: 25%;
}

.ui-step li {
    float: left;
    height: 54px;
    margin: 0;
    width:33%;
    position: relative;
}

.ui-step .done .ui-step-line {
    background: #3879d9;
}

.ui-step .done .ui-step-icon .iconfont {
    background: #3879d9;
}

.ui-step li .ui-step-line {
    height: 1px;
    background: #b9b9b9;
    display: block;
    margin-top: 14px;
    line-height: 1;
    overflow: hidden;
}
.ui-step li .ui-step-icon {
    height: 50px;
    position: absolute;
    top: 0;
    width: 150px;
    text-align: center;
    left: -25px;
    font-family: tahoma;
}
.ui-step-icon .ui-step-number {
    line-height: 14px;
    font-style: normal;
    position: absolute;
    top: 7px;
    left: 0;
    padding: 0 20px;
    font-weight: 700;
    color: #fff;
}
.ui-step-icon .ui-step-text {
	color: #333;
   /*  height: 20px;
    line-height: 20px; */
    font-size: 13px;
    position: relative;
    /* text-shadow: 0 1px 0 #fff;
    left: -50px; */
    top: 10px;
    width: 90px;
    text-align:left;
}
.ui-step li.ui-step-end {
    position: absolute;
    top: 5;
    right: -110px;
    width: 137px;
    zoom: 1;
    _clear: both;
}
.iconfont {
    width: 15px;
    height: 15px;
    background-color: #b9b9b9;
    border-radius: 50%;
    margin-top: 7px;
    margin-left: 14px;
}
.ui-step li.ui-step-end .ui-step-line {
    display: none;
}
.ui-step:after {
    clear: both;
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
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
			<ol class="ui-step ui-step-5">
			    <li class="ui-step-start step1">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">订单已提交</div>
			        </div>
			    </li>
			    <li class="step2">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">备货中</div>
			        </div>
			    </li>
			    <li class="step3">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">送货中</div>
			        </div>
			    </li>
			    <li class="ui-step-end step4">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text"  style=" left:-0px;">已完成</div>
			        </div>
			    </li>
			    <!--  
			    <li class="step5">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">保证金</div>
			        </div>
			    </li>
			    <li class="ui-step-end step6">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">已完成</div>
			        </div>
			    </li>
			    -->
			</ol>
			<div style="clear: both;"></div>
        <div class="ui-step ui-step-a">
			<div class="success"></div>
			<div class="desc">
				<c:choose>
					<c:when test="${orderStatus == 35 }">
						恭喜您，付款方式选择成功！
					</c:when>
					<c:when test="${orderStatus == 36 }">
						恭喜您，物流方式选择成功！
					</c:when>
					<c:otherwise>
						恭喜您，订单提交成功！
					</c:otherwise>
				</c:choose>
			</div>
			<div class="orderNo">订单编号：${orderBusiId }</div>
			<div class="submitNav">
				<div class="view <c:if test='${orderStatus == 35 }'>logistics</c:if>">查看订单</div>
				<div class="order <c:if test='${orderStatus == 35 }'>logistics</c:if>">
					<c:choose>
						<c:when test="${orderStatus == 35 }">
							继续选择物流方式
						</c:when>
						<c:otherwise>
							再次下单
						</c:otherwise>
					</c:choose>
				</div>
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
	if (orderStatus >= 31 && orderStatus <= 42) { //订单提交
		$("li.step1").addClass("done");
	}
	if (orderStatus >= 35 && orderStatus <= 42) { //付款方式选择
		$("li.step1").addClass("done");
		$("li.step2").addClass("done");
	} 
	if (orderStatus >= 36 && orderStatus <= 42) { //确定物流方式
		$("li.step1").addClass("done");
		$("li.step2").addClass("done");
		$("li.step3").addClass("done");
	} 
	if (orderStatus >= 39 && orderStatus <= 42) { //生成合同
		$("li.step1").addClass("done");
		$("li.step2").addClass("done");
		$("li.step3").addClass("done");
		$("li.step4").addClass("done");
	} 
	if (orderStatus >= 40 && orderStatus <= 42) {//保证金
		$("li.step1").addClass("done");
		$("li.step2").addClass("done");
		$("li.step3").addClass("done");
		$("li.step4").addClass("done");
		$("li.step5").addClass("done");
	} 
	if (orderStatus == 42) { //已完成
		$("li.step1").addClass("done");
		$("li.step2").addClass("done");
		$("li.step3").addClass("done");
		$("li.step4").addClass("done");
		$("li.step5").addClass("done");
		$("li.step6").addClass("done");
	}
	//注册返回事件
	$(".image_left").on("click", function(){
		$.mobile.loading("show");
		/* if (orderStatus < 34) {
			window.location.href="${ctx}/ec/preorder/iWantBuy";
		} else {
			window.location.href="${ctx}/ec/preorder/getList";
		} */
		window.history.back();
	});
	
	//查看订单事件
	$(".view").on("click", function(){
		$.mobile.loading("show");
		window.location.href="${ctx}/ec/preorder/getOrderDetail?orderId="+orderId;
	});
	
	//再次下单事件
	$(".order").on("click", function(){
		var $this = $(this);
		$.mobile.loading("show");
		/* if ($this.hasClass("logistics")) {
			window.location.href="${ctx}/ec/preorder/selectLogisticsType?orderId="+orderId;
		} else {
			window.location.href="${ctx}/ec/preorder/iWantBuy";
		} */
		window.history.back();
	});
});
</script>
</html>