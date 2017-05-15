<%@page import="com.ztds.weixin.util.SignUtil"%>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<html>
<head>
	<title>常用发货人</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css">
    <%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
    <script type="text/javascript" src="${ctx}/js/iscroll/iscroll-4.2.js"></script>
    <script src="${ctx}/js/doT/doT.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/common/Date.js" type="text/javascript"></script>
	<style>
	body{background:#F2F2F2;margin: 0;padding:3px 0;height:100%;width:100%}
	.gray{background:#EFEFF1;}
	.white{background:#FFF;}
	.orange{background:#FFFFCD;}
	.header{position:relative;padding:10px 13px;border-bottom:1px solid #EEEEEE;}
	.content{padding:10px 13px;border-bottom:1px solid #CCCCCC;}
	.line{height:20px;line-height:20px;width:100%;float:left;}
	.line_l{float:left;color:#999999;font-size:12px;width:50px;height:20px;line-height:20px;}
	.line_r{float:left;color:#606060;font-size:14px;padding-left:20px;height:20px;line-height:20px;}
	.test{border:1px red solid;}
	.tag{text-align:right;padding-right:2px;}
	.cancellation{position:absolute;top:5px;right:0;width:90px;height:30px;color:#6c6c6c;text-shadow:none;background:url(${ctx}/images/icons/lable_bg.png) no-repeat 0px -60px;background-size:90px 90px;line-height:30px;height:30px;font-size:12px;text-align:center}
	.dealing{position:absolute;top:5px;right:0;width:120px;height:30px;color:#376BCE;text-shadow:none;background:url(${ctx}/images/icons/lable_bg.png) no-repeat;background-size:120px 90px;line-height:30px;height:30px;font-size:12px;text-align:center}
	.complete{position:absolute;top:5px;right:0;width:90px;height:30px;color:#FFF;text-shadow:none;background:url(${ctx}/images/icons/lable_bg.png) no-repeat 0px -30px;background-size:90px 90px;line-height:30px;height:30px;font-size:12px;text-align:center}
     #a{ 
    height: 500px;
    line-height:500px;
    background: #FFF;
    font-size: 16px;
    font-weight: bold;
    color: #CBCBCB;
    text-align: center;
    border-bottom: 1px solid #ebebeb; 
    } 
 	#wrapper {
    position:absolute; z-index:1;
    top:40px; bottom:0; left:-9999px;
    width:100%;
    background:#aaa;
    overflow:auto;
}
    #scroller {
    position:absolute; z-index:1;
/*  -webkit-touch-callout:none;*/
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    width:100%;
    padding:0;
}
	#pullDown, #pullUp {
    background:#fff;
    height:40px;
    line-height:40px;
    padding:5px 10px;
    border-bottom:1px solid #ccc;
    font-weight:bold;
    font-size:14px;
    color:#888;
}
    #pullDown .pullDownIcon, #pullUp .pullUpIcon  {
    display:block; float:left;
    width:40px; height:40px;
    background:url(/images/icons/pull-icon@2x.png) 0 0 no-repeat;
    -webkit-background-size:40px 80px; background-size:40px 80px;
    -webkit-transition-property:-webkit-transform;
    -webkit-transition-duration:250ms;  
}
    #pullDown .pullDownIcon {
    -webkit-transform:rotate(0deg) translateZ(0);
}
    #pullUp .pullUpIcon  {
    -webkit-transform:rotate(-180deg) translateZ(0);
}

    #pullDown.flip .pullDownIcon {
    -webkit-transform:rotate(-180deg) translateZ(0);
}

    #pullUp.flip .pullUpIcon {
    -webkit-transform:rotate(0deg) translateZ(0);
}

    #pullDown.loading .pullDownIcon, #pullUp.loading .pullUpIcon {
    background-position:0 100%;
    -webkit-transform:rotate(0deg) translateZ(0);
    -webkit-transition-duration:0ms;

    -webkit-animation-name:loading;
    -webkit-animation-duration:2s;
    -webkit-animation-iteration-count:infinite;
    -webkit-animation-timing-function:linear;
}

    @-webkit-keyframes loading {
    from { -webkit-transform:rotate(0deg) translateZ(0); }
    to { -webkit-transform:rotate(360deg) translateZ(0); }
}
</style>
</head>
<body>
   <div data-role="page">
   <div data-role="header">
      <h1>常用发货人</h1>
   </div>
   <div data-role="content" id="totalcontent"> 
		<article>
			<div><span>发货人</span></div>
			<input name="shippingName"value=""placeholder="发货人姓名"required="required">
			<div><span>发货人电话</span></div>
			<input name="phone"value=""placeholder="发货人电话"required="required">
			<div><span>发货地址</span></div>
			<input name="shippingAddr"value=""placeholder="填写发货仓库地址"required="required">
			<input type="submit"value="保存为常用"onclick="saveContracts()">
			<input type="button"value="返回"onclick="goBack()">
		</article>
		<article class="block_l"style="float:left;width:80%;">
			<section class="line">
				<div>常用联系人列表</div>
			</section>
			<div style="clear:both;"></div>
			<section class="line">
				<div><span>序号</span><span style="padding-left: 3%;padding-right: 3%;">发货人</span><span>发货人电话</span><span style="padding-left: 40px;">发货地址</span></div>
			</section>
			<div style="clear:both;"></div>
		</article>
		<article class="block_r"style="float:right;width:20%;">
		</article>
		<article id="information-list"></article>
	   <div id="footer">
	   </div>
</div>
</div>
<script id="information-list-shipping" type="text/x-dot-template">
	{{~data:value:index}}
    <section class="{{=value.orderStatus==1?'white':(value.orderStatus==2?'orange':'gray')}}">
	<article class="block_l"style="float:left;width:85%;border-bottom: 1px solid #808080;font-size: 12px;">
        <section class="line">
				<div><span style="border-right:1px dotted #A88E8E;">&emsp;1&emsp;</span><span style="padding-left: 3%;padding-right: 3%;border-right:1px dotted #A88E8E;">张小二</span><span style="border-right:1px dotted #A88E8E;">155xxxx5555</span><span>湖南长沙五一大道53号</span></div>
			</section>
			<div style="clear:both;"></div>
	</article>
	<article class="block_r"style="float:right;width:15%;border-bottom: 1px solid #808080;font-size: 12px;">
		<section class="line">
				<a style="width:100%;padding-left: 0px;"><span>编辑</span></a>
				<a style="width:100%;padding-left: 0px;"><span>删除</span></a>
			</section>
			<div style="clear:both;"></div>
	</article>
    </section>
	 {{~}}
</script>
</body>
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
var pageno = 1;
var rowsize = 5;
var pageCount = 1;
    $(document).ready(function(){
    loadData();
});
    function loadData(){
    	pageno=1;
    	$.post("/central/order/loadlistData?pageno="+pageno+"&rowsize="+rowsize,function(result){
    		pageCount = result.total;
    		data = result.list;
    		if(data.length>0){
    		var informationList = $("#information-list-shipping").html();
    	    var tempFn = doT.template(informationList);
    	    var resultText = tempFn(data);
    	    $("#information-list").empty();
    	    $("#information-list").append(resultText);
    	    }else{
    	    $("#totalcontent").empty();
    	    $("#totalcontent").append("<div id='a'>没有相关信息 </div>");
    	    }
    	},'json');
    }
    
    function reLoadData(){
    	$.post("/central/order/loadlistData?pageno="+pageno+"&rowsize="+rowsize,function(result){
    		pageCount = result.total;
    		data = result.list;
    		var informationList = $("#information-list-shipping").html();
    	    console.log(informationList);
    	    var tempFn = doT.template(informationList);
    	    var resultText = tempFn(data);
    	    $("#information-list").append(resultText);
    	},'json');
    }  
</script>
</html>