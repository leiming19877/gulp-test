<%@page import="com.ztds.weixin.util.SignUtil"%>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<html>
<head>
	<title>订单详情</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css">
    <%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
    <link type="text/css" rel="stylesheet" href="${ctx}/js/swiper/swiper.min.css">
    <script type="text/javascript" src="${ctx}/js/swiper/swiper.jquery.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/iscroll/iscroll-4.2.js"></script>
    <script src="${ctx}/js/doT/doT.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/Date.js" type="text/javascript"></script>
<body>
<style>
*{margin:0;padding:0;list-style-type:none;}
html{width:100%}
body{background-color:#F1F1F3;font:14px/180% Arial, Helvetica, sans-serif, "新宋体";height:100%;width:100%}
.image_left{width:20px;height:20px;float:left;position:absolute;bottom:10px;left:5px}
#bar{height:100px;padding-left:3%}
#status{height:210px;border:1px solid #CCCCCC;padding-left:2%}
#msghead{height:40px;line-height:40px;border:1px solid #CCCCCC;padding-left:2%;padding-right:2%}
#msg{height:80px;padding:10px 0;border:1px solid #CCCCCC;padding-right:2%}
#orprice{width:100%;height:40px;line-height:40px;border:1px solid #CCCCCC;padding-left:2%;padding-right:4%}
#orprice div{float:right;margin-right:5%}
.head{height:40px;line-height:40px;border:1px solid #CCCCCC;padding-left:2%;display:none}
.lgHead{height:40px;line-height:40px;border:1px solid #CCCCCC;padding-left:2%;}
#lginf{border:1px solid #CCCCCC;padding:2%;}
#lginf section{padding:5px}
#message{height:60px;border:1px solid #CCCCCC;padding:2%;display:none}
#status ul{padding:6px 0;}
#status li{padding:4px 0;}
#msgfont{float:right;padding-right:10%}
#msg li{padding:10px 0;}
.line{float:left;width:100%;margin:2px;text-align:center}
.line_a{float:left;padding-left:10px;text-align:left}
.line_r{float:left;padding-left:7.5%}
.line_l{float:left;}
.line_x{float:right;padding-right:5%}
.line_t{float:left;width:7%}
.line_s{float:left;padding-left:7.5%;text-align:left}
.red{color:#FF0000}
.blue{color:#3366FF}
.subtotal{height:30px;line-height:30px}
.subtotal div{float:right;padding-right:4%}
#img{height:320px;width:100%}
.swiper-container {
    width: 100%;
    height: 350px;
}
#subdiv{position:fixed;border:1px solid #ebebeb;background:#FFF;bottom:0;left:0;width:100%;height:50px;padding:0;display:none}
.confirmButton{position:fixed;background:#3366cc;color:#FFF;text-align:center;font-size:15px;width:50%;height:50px;line-height:50px;right:0;text-shadow:none}
.takeIssueButton{position:fixed;background:#F9F9F9;color:#606060;text-align:center;font-size:15px;width:50%;height:50px;line-height:50px;}

.ui-step {
	top: 10px;
	height: 70px;
    padding: 0 30px;
    margin: 0 auto;
    font-size: 14px;
    list-style: none;
    zoom: 1;
    position: relative;
    color: #b7b7b7;
}

.ui-step-5 li {
    width: 25%;
}

.ui-step li {
    float: left;
    height: 54px;
    margin: 0;
    width: 20%;
    position: relative;
}

.ui-step .done .ui-step-line {
    background: #fc9c27;
}

.ui-step .done .ui-step-icon .iconfont {
    background: #fc9c27;
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
    width: 50px;
}
.ui-step li.ui-step-end {
    position: absolute;
    top: 0;
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
</style>
</head>
<div data-role="page">
<div data-role="content" style="padding:0px">
<div data-role="header">
<div style="position:relative;width:40px;height:40px;float:left;" onclick="closeWin()"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
<h1>订单详情</h1>
</div>
<div id="bar">
<ol class="ui-step ui-step-5">
			    <li class="ui-step-start step1">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">订单提交</div>
			        </div>
			    </li>
			    <li class="step2">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">付款方式选择</div>
			        </div>
			    </li>
			    <li class="step3">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">物流选择</div>
			        </div>
			    </li>
			    <li class="step4">
			        <div class="ui-step-line">-</div>
			        <div class="ui-step-icon">
			            <div class="iconfont"></div>
			            <div class="ui-step-text">生成合同</div>
			        </div>
			    </li>
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
			</ol>
</div>
<!--订单状态栏-->
<div id="status">
    <ul>
        <li>订单编号：<span>${orderInfo.orderBusiId}</span></li>
        <li>提货单位：<span>${orderInfo.agentName}</span></li>
        <li>卖家：<span>${orderInfo.sellerName}</span></li>
        <li>下单时间：<span>${orderInfo.orderBeginDatetimeDesc}</span></li>
        <li>订单状态：<span class="blue"><strong>${orderInfo.orderStatusDesc}</strong></span></li>
        <li>交货时间：<span>${orderInfo.deliveryBeginDatetimeDesc}-${orderInfo.deliveryEndDatetimeDesc}</span></li>
    </ul>
</div>
<!--信息头-->
<div id="msghead">
    <strong>所有商品信息</strong>
    <div id="msgfont"><strong>${orderInfo.totalBuyQuantity}支/${orderInfo.totalBuyWeight}吨</strong></div>
</div>
<!--信息-->
	  <article id='information-list'>
    
      </article>
<article >
    <section id="orprice">
    <div>订单价格:&nbsp;&nbsp;<span class="red"><strong>${orderInfo.totalBuyMoney}元</strong></div>
    </span></section>
</article>
<div class="lgHead" id="lgHead">
    <strong>物流信息</strong>
</div>
<article id="lginf">
     <div id="zt" style="display:none">
     <section>配送方式：<span id="deliveryType">${orderInfo.deliveryTypeDesc}</span></section>
	 <section id="deliveryCarno">车牌号：<span>${orderInfo.deliveryCarno}</span></section>
	 <section id="deliveryPhoneNumber">联系电话：<span>${orderInfo.deliveryPhoneNumber}</span></section>
     </div>
     <div id="information-list1">
     </div>
</article>
<div class="head" id="paymentHead">
    <strong>付款信息</strong>
</div>
<div class="head" id="paymentInfo">
    ${orderInfo.payConditionDesc}
</div>
<div class="head">
    订单价格：<span class="red"> ${orderInfo.tempOrderStatus}</span>
</div>
<div class="head" id="messagehead">
    <strong>我要留言</strong>
</div>
<article id="message">
    <section>${orderInfo.buyerComment}</section>
</article>
<div id="here" style="height:50px;z-index:-1;width:100%;"></div>
<c:if test="${! empty imgList }">
<div style="height:30px;width:100%;line-height:30px;font-size:18px;text-align:center">订单照片</div>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <c:forEach items="${imgList}" var="li">
        <div class="swiper-slide">
        <div><img id="img" src="${li.absolutePath}"></div>
        </div>
        </c:forEach>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> 
</div>
</c:if>
<div id="subdiv">
       <div onclick="raiseObjOrder()" class="takeIssueButton" id="takeIssueButton">提出异议</div>
	   <div onclick="confirmOrder()" class="confirmButton" id="confirmButton">确定订单</div>
       </div>
</div>

</div>
</body>

<script id="information-list-tpl1" type="text/x-dot-template">
{{~data1:value:index}}
     <section>配送方式：<span>${orderInfo.deliveryTypeDesc}</span></section>
     <section>地址：<span>{{=value.address}}</span></section> 
     <section>联系人：<span>{{=value.name1}}</span></section>
	 <section>联系电话：<span>{{=value.phone1}}</span></section>
	 <section>身份证号：<span>{{=value.id_card1}}</span></section>
{{~}}
</script>
<script id="information-list-tpl" type="text/x-dot-template">
{{~data:value:index}}
 <article id="msg">
    <section class="line">
        <div class="line_r">{{=value.brandNameDesc}}</div> 
        <div class="line_a">{{=value.specification}}</div>     
    </section>
    <section class="line">
        <div class="line_t"><strong>{{=index+1}}</strong></div>
		<div class="line_l">{{=value.buyQuantity}}支/{{=value.buyWeight}}吨</div>
        <div class="red line_x"><strong>{{=value.buyPrice}}元/吨</strong></div>
    </section>
    <section class="line">
        <div class="line_s">{{=value.resComment}}</div>
    </section>
 </article>
 <section class="subtotal">
        <div><strong>小 计 :</strong>&nbsp;&nbsp;<span class="red"><strong>{{=value.buyMoney}}元</strong></span></div>
    </section>
{{~}}
</script>
<script type="text/javascript" src="${ctx}/js/weixin/jweixin-1.1.0.js"></script>
     <%
            String url = (String)request.getAttribute("_request_url");
            SignPackage sign = SignUtil.sign(Constants.JS_API_TICKET.getTicket(), url);
      %>
<script type="text/javascript">
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '<%=Constants.APPID %>', // 必填，公众号的唯一标识
            timestamp:<%=sign.getTimestamp() %> , // 必填，生成签名的时间戳
            nonceStr: '<%=sign.getNonceStr() %>', // 必填，生成签名的随机串
            signature: '<%=sign.getSignature() %>',// 必填，签名，见附录1
            jsApiList: ['hideOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
               wx.hideOptionMenu();
        });
    </script>
<script type="text/javascript">
var orderId;
var orderStatus;
var deliveryType;
var orderConsigneeVOList;
$(document).ready(function(){
	  orderStatus='${orderInfo.orderStatus}';
	  data=<%=request.getAttribute("str")%>;
	  /* alert(JSON.stringify(data)); */
	  orderId='${orderInfo.orderId}';
	  deliveryType = '${orderInfo.deliveryType}';
	  var informationList = $("#information-list-tpl").html();
	  var tempFn = doT.template(informationList);
	  var resultText = tempFn(data);
	  $("#information-list").html(resultText);
	  statusActive();
	  getlginfo();
	  setTimeout("changeDivStyle();", 100);
	  
	  var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    // 如果需要前进后退按钮
		     nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev'
		    // 如果需要滚动条
		    /* scrollbar: '.swiper-scrollbar', */
		  })        
	}
);
function statusActive(){
	if(orderStatus<31){
		$('#lgHead').hide();
	    $('#lginf').hide();
	}
    else if(orderStatus==31){
	    $('#messagehead').show();
	    $('#message').show();
	    $('#lgHead').hide();
	    $('#lginf').hide();
	}
	else if(orderStatus==32){
		$('#lgHead').hide();
	    $('#lginf').hide();
	    $('#subdiv').show();
	}
	else if(orderStatus==33||orderStatus==34){
		$('#lgHead').hide();
	    $('#lginf').hide();
	}
	else if(orderStatus==35||orderStatus==36||orderStatus==37){
		$('#paymentHead').show();
		$('#paymentInfo').show();
		$('#lgHead').hide();
	    $('#lginf').hide();
	}else if(orderStatus>42){
		$('#lgHead').hide();
	    $('#lginf').hide();
	}
}

function getlginfo(){
	if(deliveryType=='zt'){
		$('#zt').show();
	}else if(deliveryType=='bps'){
		  data1 = <%=request.getAttribute("orderConsigneeVOList")%>;
		  var informationList1 = $("#information-list-tpl1").html();
		  var tempFn = doT.template(informationList1);
		  var resultText1 = tempFn(data1);
		  $("#information-list1").html(resultText1);
	}
}

function confirmOrder(){
	$.post("confirmOrder",{orderId:orderId},function(result){
		if(result.success==true){
			alert(result.msg);
			window.location.href="${ctx}/preorder/getList"
		}else{
			alert(result.msg);
		}
	},'json');
}

function raiseObjOrder(){
	$.post("raiseObjOrder",{orderId:orderId},function(result){
		if(result.success==true){
			alert(result.msg);
			window.location.href="${ctx}/preorder/getList"
		}else{
			alert(result.msg);
		}
	},'json');
}
function closeWin(){
	window.location.href="${ctx}/preorder/getList"
}
function changeDivStyle(){
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
}
</script>
</html>