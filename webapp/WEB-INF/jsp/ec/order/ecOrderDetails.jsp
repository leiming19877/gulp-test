<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <title>订单详情</title>
    <link href="${ctx}/css/module/ec/order/order-detail.css" type="text/css" rel="stylesheet" />	
	<link href="${ctx}/js/photoswipe/photoswipe.css" type="text/css" rel="stylesheet" />
	<style>
		html,body{background: #f2f2f2;width:100%;font-size: 14px;}
		.header{
			padding: 20px 0;
			width: 100%;
			background: #FFF;
			margin: 5px 0;
		}
		
		.red {color:#FE2D2C;}
		.orange{color:#FF761B;}
		.title{color:#656565;font-size: 12px;padding:3px 0;}
		.padding_b{padding: 0 1%;}
		.line{height: 20px;line-height: 20px;position: relative;}
		.line_t{font-size: 10px;width:50px;color:#999999;display: inline-block; }
		.content{color: #606060;font-size:13px;width:80%;display: inline-block;}
		.num{font-size: 12px;padding-right:10px;}
		.line_content{float:left;width: 100%;}
		.line_r{float:left;}
		.line_b{border-bottom:1px solid #ebebeb;padding: 12px 0; }
		.goods{border-bottom:1px solid #ebebeb;}
		.goodsName{color:#606060;font-size: 15px;}
		.tag{margin: 5px 0;}
		.x{color:#67CB33;font-size: 12px;border-radius: 4px;border: 1px solid #67CB33;padding: 1px 4px;margin-right:5px ;}
		.c{color:#FF6D0D;font-size: 12px;border-radius: 4px;border: 1px solid #FF6D0D;padding: 1px 4px;margin-right:5px ;}
		.y{color:#059ACD;font-size: 12px;border-radius: 4px;border: 1px solid #059ACD;padding: 1px 4px;margin-right:5px ;}
		.d{color:#67CB33;font-size: 12px;border-radius: 4px;border: 1px solid #67CB33;padding: 1px 4px;margin-right:5px ;}
		.span{font-size: 10px;color:#999999;display: inline-block;padding-right: 20px;}
		.line_m{font-size: 10px;color:#999999;display: inline-block;padding-right: 20px;position: absolute;right: 0px;top:6px;}
		.pull_r{float: right;}
		.pull_l{float: left;}
		.pos{position: absolute;right: 20px;top:6px;}
		.total{position: relative;padding:20px 0 0  0}
		#footer{float: left; position: fixed;left:0;bottom: 0;border-top: 1px solid #ebebeb; z-index: 999;width: 100%;background: #fff;}
		.footer_u{width:49%;text-align: center;padding: 10px 0;color:#999999;}
		.footer_u:hover{background: #f2f2f2;}
	</style>
</head>
<body>
<!--订单抬头-->
<article class="header">
	<section class="padding_b title " > 
		${orderDetail.data.client}   ${orderDetail.data.status} 
	</section>

	<section class="line_b ">
		<article class="padding_b line" >
			<span class=" line_t ">下单</span> <span class="content"> ${orderDetail.data.tQuantity} 件/${orderDetail.data.totalBuyWeightDesc}吨 </span><span class="orange pos">￥${orderDetail.data.totalBuyMoneyDesc} </span>
		</article> 
		<article class="padding_b line">
			<span class=" line_t">实发</span> <span class="content"> ${orderDetail.data.reallyQuantity}件/${orderDetail.data.totalReallyWeightDesc}吨 </span><span class="red pos ">￥${orderDetail.data.totalReallyMoneyDesc}</span>
		</article> 
	</section>
	
	<section class="line_b  ">		                 
		
	 <!-- 自提 -->
			<article class="padding_b line" >
				<span class=" line_t ">交货方式</span> <span class="content"> ${orderDetail.data.deleveryType}</span>
			</article> 
			 <c:if  test="${orderDetail.data.deleveryType=='配送'}">
				<article class="padding_b line">
					<span class=" line_t">提货人</span> <span class="content">${orderDetail.data.receiver.name1} </span>
				</article> 
				<article class="padding_b line">
					<span class=" line_t">手机</span> <span class="content">${orderDetail.data.receiver.tel1} </span>
				</article> 
				<article class="padding_b line">
					<span class=" line_t">身份证</span> <span class="content">${orderDetail.data.receiver.id_card1} </span>
				</article>
			</c:if>

	</section>
 
 <c:if test="${orderDetail.data.ladingCode!=''}">		
	<article style="padding:10px 1% 0 1%" class="padding_b line" >
		<span class=" line_t">提货单</span> <span class="content">${orderDetail.data.ladingCode} </span>
	</article>
 </c:if>
	  
</article>
<!--订单货物详情-->
<article class="header">
	<section class="padding_b title " > 
			货物信息
	</section>

    <c:forEach var="item" items="${orderDetail.data.rlist}" varStatus="res">
        <section class="line_b ">
	    	<article class="padding_b  goodsName line"> ${item.factory} ${item.material} ${item.spec} ${item.kind} </article> 
	        <article class="padding_b tag"><c:if  test="${item.isPromotion=='1'}"><span class="x">促</span></c:if> <c:if  test="${item.isNew=='1'}"><span class="c">新</span></c:if> <c:if  test="${item.isPresell=='1'}"><span class="y">预</span></c:if></article>
	    	<article class="padding_b line  ">
	    		 <span class="span ">  ${item.wareHouse}</span>  <span class="span"> ${item.count}件/${item.weight}吨</span> <span class=" orange pos">￥ ${item.price}/吨</span> 
	    	
	    	</article>
	    	<article class="padding_b line ">
	    		 <span class="span ">${orderDetail.data.vendor}</span>  <span class="span line_m">
	    		 <c:if  test="${item.deliveryType=='bps'}">包配送</c:if>
	    		 <c:if  test="${item.deliveryType!='bps'}">自提</c:if> 
	    		 <c:if  test="${item.measureType=='0'}">磅计</c:if>
	    		 <c:if  test="${item.measureType=='1'}">理计</c:if>
	    		 <c:if  test="${item.measureType=='2'}">抄牌</c:if>
	    		</span> 
	    	</article>
	    	<article class="padding_b line  ">
		        <c:if  test="${orderDetail.data.deleveryType=='配送'}">
		    		 		<a class="line_m " >运费：<span style="color:#FF761B;">￥ ${item.freightExtra}/吨</span></a>
				</c:if>
			</article>
    	</section>  
    </c:forEach>
    
<!--     <section class="line_b ">
    	<article class="padding_b  goodsName line"> 江西萍钢 HRB400 12*12 螺纹钢</article> 
        <article class="padding_b tag"><span class="x">促</span> <span class="c">新</span> <span class="y">预</span></article>
    	<article class="padding_b line  ">
    		 <span class="span ">武汉国储337库 res.wareHouse</span>  <span class="span"> 60件/120吨</span> <span class="orange pos">￥8910.00</span> 
    	</article>
    	<article class="padding_b line ">
    		 <span class="span ">长沙建材部</span>  <span class="span line_m">自提 磅计 长沙  res.measureType</span> 
    	</article>
    </section> -->
    <section class="total"><span class="orange pos" style="top:15px;"><span class="title" >合计</span>￥${orderDetail.data.totalBuyMoneyDesc}  </span>  </section>
</article>
<!--订单信息-->
<article class="header">
	<section class="line_b  ">
		<article class="padding_b line" >
			<span class=" line_t ">卖家</span> <span class="content">  ${orderDetail.data.vendor}  </span>
		</article> 
	</section>
	<c:if test="${orderDetail.data.projectName!=''}">	
		<section class="line_b  ">
			<article class="padding_b line" >
				<span class=" line_t ">所属项目</span> <span class="content"> ${orderDetail.data.projectName}  </span>
			</article> 
		</section>
	 </c:if>
	<section class="line_b  ">
		<article class="padding_b line" >
			<span class=" line_t ">订单号</span> <span class="content">  ${orderDetail.data.orderNum} </span>
		</article> 
		<article class="padding_b line">
			<span class=" line_t">下单时间 </span> <span class="content"> ${orderDetail.data.cTime} </span>
		</article> 
		<article class="padding_b line">
			<span class=" line_t">下单人 </span> <span class="content"> ${orderDetail.data.creator.name} 
			<c:if test="${orderDetail.data.createType=='1'}">	
				（卖方）
			 </c:if>
			${orderDetail.data.creator.tel}</span>
		</article> 
		<article class="padding_b line">
			<span class=" line_t">客户经理 </span> <span class="content">${orderDetail.data.salesman.name}  ${orderDetail.data.salesman.tel}</span>
		</article> 
		<article class="padding_b line">
			<span class=" line_t" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">买方留言</span> <span class="content" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"> ${orderDetail.data.bMemo}</span>
		</article>
		<article class="padding_b line">
			<span class=" line_t"style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">卖方留言</span> <span class="content" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"> ${orderDetail.data.vMemo}  </span>
		</article>
		<article class="padding_b line">
			<span class=" line_t">订单类型</span> <span class="content">${orderDetail.data.orderTypeDesc} </span>
		</article>
		<article class="padding_b " style="overflow:hidden;zoom:1;" >
			<span class=" line_t">原始凭证</span>
			<div id="MainContent" >
				<div id="Gallery" >
				    <c:forEach var="items" items="${orderDetail.data.files}" varStatus="res1">
						<div class="gallery-item" ><a href="${items.path}"><img src="${items.path}" alt="" /></a></div>
					</c:forEach> 
				</div>
			</div>
		</article>
	</section>
</article>
<article style="height:15px;"></article>
<!--联系人-->
<article id="footer">
	 <c:if test="${orderDetail.data.statusId=='25'}">
            <c:if test="${orderDetail.data.salesman.tel!=''}">			
            	<a href="tel:${orderDetail.data.salesman.tel}"><section class="pull_l footer_u " style="border-right:1px solid #ebebeb;">联系业务员</section></a>
            </c:if>
            <c:if test="${orderDetail.data.salesman.tel==''}">			
            	<a onclick="alert('暂未维护业务员电话号码')"><section class="pull_l footer_u " style="border-right:1px solid #ebebeb;">联系业务员</section></a>
            </c:if>
			<a href="/ecorder/confirmOrder?orderId=${orderId}&environment=${environment}"  style="text-decoration:none;" ><section class="pull_l footer_u ">确认订单</section></a>
	</c:if>
    <c:if test="${orderDetail.data.statusId!='25'}">
            <c:if test="${orderDetail.data.salesman.tel!=''}">			
            	<a href="tel:${orderDetail.data.salesman.tel}"><section class="pull_l " style="width:100%;text-align: center;padding: 10px 0;color:#999999;">联系业务员</section></a>
            </c:if>
            <c:if test="${orderDetail.data.salesman.tel==''}">			
            	<a onclick="alert('暂未维护业务员电话号码')"><section class="pull_l  " style="width:100%;text-align: center;padding: 10px 0;color:#999999;">联系业务员</section></a>
            </c:if>
	</c:if>
</article>
</body>
<script src="${ctx}/js/photoswipe/simple-inheritance.min.js" type="text/javascript"></script>
<script src="${ctx}/js/photoswipe/code-photoswipe-1.0.11.min.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/echo/echo.min.js"></script>

<script src="${ctx}/js/weixin/jweixin-1.1.0.js" type="text/javascript"></script>
<script type="text/javascript">
	document.addEventListener('DOMContentLoaded', function(){
			
			Code.photoSwipe('a', '#Gallery');
			
	}, false);
	/*图片懒加载*/
	 echo.init({
      offset: 1,
      throttle: 25,
      unload: false,
      callback: function (element, op) {
        //console.log(element, 'has been', op + 'ed')
      }
    });

</script>
</html>