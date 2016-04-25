<%@page import="com.ztds.weixin.util.SignUtil"%>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<html>
<head>
	<title>我的订单</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css">
    <%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
    <script type="text/javascript" src="${ctx}/js/iscroll/iscroll-4.2.js"></script>
    <script src="${ctx}/js/doT/doT.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/Date.js" type="text/javascript"></script>
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
<%--     <div data-role="navbar">
    <ul>
      <li><a href="#" class="ui-btn-active ui-state-persist">集采订单</a></li>
      <li><a href="${ctx}/preorder/getList"  data-ajax="false">订单模式订单</a></li>
    </ul>
    </div> --%>
   <h1>我的订单</h1>
   </div>
   <div data-role="content" id="totalcontent"> 
      <div id="wrapper">
      <div id="scroller">
         <div id="pullDown">
            <span class="pullDownIcon"></span><span class="pullDownLabel">下拉更新...</span>
         </div>
      <article id="information-list">
      </article>
      <div id="pullUp">
            <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载...</span>
      </div>
      </div>
      </div>
      <div id="footer"></div>
</div>
</div>
</body>
<script id="information-list-tpl" type="text/x-dot-template">
	{{~data:value:index}}
	<a data-ajax="false"  href="detailInfo?orderId={{=value.orderId}}&bidId={{=value.bidId}}&orderStatus={{=value.orderStatus}}&_t={{=new Date().getTime()}}">
    <section class="{{=value.orderStatus==1?'white':(value.orderStatus==2?'orange':'gray')}}">
	<article class="header">
        <section class="line">
			<div class="line_l ">订单编号</div>
			<div class="line_r ">[&nbsp;{{=value.orderCode}}&nbsp;]</div>
		</section>
        <div style="clear:both;"></div>
		<section class="line">
			<div class="line_l ">竞价单号</div>
			<div class="line_r ">[&nbsp;{{=value.bidCode}}&nbsp;]</div>
		</section>
		<div style="clear:both;"></div>
		<section class="{{=value.orderStatus==1?'dealing':(value.orderStatus==2?'complete':'cancellation')}}">
			<span id='status'>{{=value.orderStatus==1?'待供应商确认':(value.orderStatus==2?'已完成':'已作废')}}</span>
        </section>
		<div style="clear:both;"></div>
	</article>
	<article class="content">
        <section class="line">
			<div class="line_l ">总需求</div>
			<div class="line_r "><span style="color:#c33333" >{{=value.orderTotalWeight}}</span>&nbsp;&nbsp;吨</div>
		</section>
        <div style="clear:both;"></div>
		<section class="line">
			<div class="line_l ">总金额</div>
			<div class="line_r "><span style="color:#c33333" >{{=value.orderTotalMoney}}</span>&nbsp;&nbsp;元</div>
		</section>
		<div style="clear:both;"></div>
	</article>
    </section>
    </a>
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
    		var informationList = $("#information-list-tpl").html();
    	    var tempFn = doT.template(informationList);
    	    var resultText = tempFn(data);
    	    $("#information-list").empty();
    	    $("#information-list").append(resultText);
    	    myScroll.refresh();
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
    		var informationList = $("#information-list-tpl").html();
    	    console.log(informationList);
    	    var tempFn = doT.template(informationList);
    	    var resultText = tempFn(data);
    	    $("#information-list").append(resultText);
    	    myScroll.refresh(); 
    	},'json');
    }  
</script>
<script type="text/javascript">
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

function pullDownAction () {
    setTimeout(function () {    
    	loadData();
    }, 1000);   
}

function pullUpAction () {
    setTimeout(function () {    
        ++pageno;
        if (pageno > pageCount) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多数据了...';
			return;
		}
    reLoadData();
    }, 1000);   
}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');   
    pullUpOffset = pullUpEl.offsetHeight;
    
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';                
                pullDownAction();   
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
                pullUpAction(); 
            }
        }
    });
    
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

/* document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); */

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
</script>
</html>