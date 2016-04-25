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
	body{height:100%;width:100%;padding:0;margin:0;background-color:#F1F1F3;color:#333;font:14px/180% Arial, Helvetica, sans-serif, "新宋体";}
    .total{background:#fff;font-size:14px}
    #ordernum{height:50px;border:1px solid #CCCCCC;padding-left:2%;padding-right:15px;position:relative;}
    #orderinf{height:100px;border:1px solid #CCCCCC;padding-left:2%;color:#BBBBBB}
    #orderprice{height:50px;line-height:50px;border:1px solid #CCCCCC;padding-left:2%;}
    #orderprice span{color:#EE0000}
    #ordermsg section{margin:7px 0;}
    #status{width:70px;position:absolute;right:5px;top:0;display:table;height:50px;text-align:center;color:#EE0000}
    #status div{vertical-align:middle;display:table-cell;}
    #word{padding-top:15px;}
    a{text-decoration:none;color:#0000FF;}
    #completearea div{height:40px;line-height:40px;width:20%;background:#CCCCCC;color:#FFFFFF;text-align:center;float:right;}
    .aline{width:100%;text-align:center;border:1px solid #CCCCCC;position:absolute;top:350px;background:#fff;z-index:9999;display:none}
    .line_a{height:40px;line-height:40px;border:1px solid #CCCCCC}
    #completearea{height:70px}
    button{height:30px;background:#fff;margin:13px 3px 0; float:right;border-radius:5px;border:1px solid #999999;}
    #button1{color:#CCCCCC;border:1px solid #CCCCCC;}
    #button2{color:#ff6600;border:1px solid #ff6600;}
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
    <div data-role="navbar">
    <%-- <ul>
      <li><a href="${ctx}/central/order/list"  data-ajax="false">集采订单</a></li>
      <li ><a href="#" class="ui-btn-active ui-state-persist" data-ajax="false">订单模式订单</a></li>
    </ul> --%>
    <h1>我的订单</h1>
    </div>
   </div>
   <div data-role="content" id="totalcontent" style="padding:0"> 
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
<article class="aline" id="aline">
    <section id="completearea">
	    <div id="complete" onclick="cancelOrder()">完成</div>
    </section>
    <section class="line_a" id="pricepro">价格不符合期望</section>
    <section class="line_a" id="matpro">资源不能满足需求</section>
	<section class="line_a" id="othpro">其它原因</section>
	<section id="completearea">
	</section>
</article>
</div>
</div>
</body>
<script id="information-list-tpl" type="text/x-dot-template">
	{{~data:value:index}}
        <article class="total">
		<section id="ordernum"><div id="word">{{=index+1}}>&nbsp;<span>{{=value.orderBusiId}}</span></div><div id="status"><div>{{=value.orderStatusDesc}}</div></div></section>
		<section id="orderinf" onclick="getOrderDetail({{=value.orderId}})">
		    <article id="ordermsg">
			    <section>交货日期：<span>{{=value.deliveryBeginDatetimeDesc}}-{{=value.deliveryEndDatetimeDesc}}</span></section>
				<section>下单时间：<span>{{=new Date(value.orderBeginDatetime).formatDate("yyyy-MM-dd HH:mm:ss")}}</span></section>
				<section>下单量：<span>{{=value.totalBuyQuantity}}支/{{=value.totalBuyWeight}}</span>吨</section>
			</article>
		</section>
		<section id="orderprice">订单价格:<span>{{=value.totalBuyMoney}}/元</span>
        {{if(value.orderStatus==31){}}
        <button id="button1" onclick="return showPopup('{{=value.orderId}}');">取消订单</button>
        {{}else if(value.orderStatus==32){}}
        <button onclick="confirmOrder('{{=value.orderId}}')" id="button2">确认订单</button>
        <button id="button1" onclick="return showPopup('{{=value.orderId}}');">取消订单</button>
        {{}else if(value.orderStatus==33){}}
        <button id="button1" onclick="return showPopup('{{=value.orderId}}');">取消订单</button>
         {{}else if(value.orderStatus==34){}}
        <button  id="button2" onclick="confirmPayType('{{=value.orderId}}')">选择付款方式</button>
        <button id="button1" onclick="return showPopup('{{=value.orderId}}');">取消订单</button>
        {{}else if(value.orderStatus==35){}}
        <button id="button2" onclick="selectLogisticsType('{{=value.orderId}}')">选择物流方式</button>
        <button id="button1" onclick="return showPopup('{{=value.orderId}}');">取消订单</button>
         {{}else if(value.orderStatus==37){}}
        <button id="button2" onclick="confirmLogisticsType('{{=value.orderId}}')">确认物流信息</button>
        <button id="button1" onclick="return showPopup({'{=value.orderId}}');">取消订单</button>
        {{}else if(value.orderStatus==38){}}
        <button id="button1" onclick="return showPopup('{{=value.orderId}}');">取消订单</button>
        {{}else if(value.orderStatus>=39&&value.orderStatus<=42){}}
        <button id="button2"  onclick="queryPreOrderContract('{{=value.orderBusiId}}')">查看合同</button>
        {{ } }}
		</section>
        </article>
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
var cancel_type = 1;
var cancel_note = '';
 var orderId = 0; 
    $(document).ready(function(){
    loadData();
     $('#complete').unbind('click'); 
    $('#pricepro').click(function(){
   	 this.style.background='#F78554';
   	 $('#complete').css({"background":'#F78554'});
   	 $('#matpro').css({"background":'#fff'});
   	 $('#othpro').css({"background":'#fff'});
   		 cancel_type=1;
   		 cancel_note=$('#pricepro').text();
   		  $('#complete').bind('click'); 
   	});
    $('#matpro').click(function(){
   	 this.style.background='#F78554';
   	 $('#complete').css({"background":'#F78554'});
   	 $('#pricepro').css({"background":'#fff'});
   	 $('#othpro').css({"background":'#fff'});
   	 cancel_type=2;
		 cancel_note=$('#matpro').text();
		 $('#complete').bind('click'); 
    });
    
    $('#othpro').click(function(){
   	 this.style.background='#F78554';
   	 $('#complete').css({"background":'#F78554'});
   	 $('#matpro').css({"background":'#fff'});
   	 $('#pricepro').css({"background":'#fff'});
   	 cancel_type=7;
		 cancel_note=$('#othpro').text();
		  $('#complete').bind('click'); 
    });
});
    
   function cancelOrder(){
   	$.post("cancelOrder",{orderId:orderId,cancel_type:cancel_type,cancel_note:cancel_note},function(result){
   		if(result.success==true){
   			alert(result.msg);
   			 window.location.reload(); 
   		}else{
   			alert(result.msg);
   		}
   	},'json');
   }
   
    function loadData(){
    	pageno=1;
    	$.post("${ctx}/preorder/getOrderInfo?pageno="+pageno+"&rowsize="+rowsize,function(result){
    		/* pageCount = result.total; */
    		data = result;
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
    	$.post("${ctx}/preorder/getOrderInfo?pageno="+pageno+"&rowsize="+rowsize,function(result){
    		/* pageCount = result.total; */
    		data = result;
    		var informationList = $("#information-list-tpl").html();
    	    
    	    var tempFn = doT.template(informationList);
    	    var resultText = tempFn(data);
    	    $("#information-list").append(resultText);
    	    myScroll.refresh(); 
    	},'json');
    }
    
    function showPopup(num){
        orderId = num;
   	 document.getElementById("aline").style.display = "block";
   	}
   	function hidePopup(){
   	 document.getElementById("aline").style.display = "none";
   	}
   	document.getElementById("aline").onclick = function(e){
   	 e = e || window.event;
   	 if(window.event){
   	  e.cancelBubble = true;
   	 } else {
   	  e.stopPropagation();
   	 }
   	};
   	document.body.onclick = function(e){
   	 e = e || window.event;
   	 var target = e.target || e.srcElement;
   	 if(target.id === "button1") return;
   	 hidePopup();
   	};
   	
   	function getOrderDetail(orderId){
   		$.mobile.loading("show");
    	window.location.href="getOrderDetail?orderId="+orderId;
    }
    
    function confirmOrder(orderId){
    	$.post("confirmOrder",{orderId:orderId},function(result){
    		if(result.success==true){
    			alert(result.msg);
    			 window.location.reload(); 
    		}else{
    			alert(result.msg);
    		}
    	},'json');
    }
    
    function confirmPayType(orderId){
    	window.location.href="confirmPayType?orderId="+orderId;
    }
    
    function selectLogisticsType(orderId){
    	window.location.href="selectLogisticsType?orderId="+orderId;
    }
    
    function confirmLogisticsType(orderId){
    	window.location.href="confirmLogisticsType?orderId="+orderId;
    }
    
    function queryPreOrderContract(orderBusiId){
    	window.location.href="queryPreOrderContract?orderBusiId="+orderBusiId;
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