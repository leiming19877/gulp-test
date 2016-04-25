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
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css">
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<link type="text/css" rel="stylesheet" href="${ctx}/js/mobiscroll-2.5.2/mobiscroll.core-2.5.2.css"> 
<script type="text/javascript" src="${ctx}/js/mobiscroll-2.5.2/mobiscroll.core-2.5.2.js"></script>
<script type="text/javascript" src="${ctx}/js/mobiscroll-2.5.2/mobiscroll.datetime-2.5.1.js"></script>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>
<style type="text/css">
body {
	background: #F2F2F2;
	padding: 3px 0;
	overflow: hidden;
}
.ui-header, .ui-footer {
    border-width: 0 0 !important;
}
.swiper-container {
    margin: 0 auto;
    overflow: visible;
    z-index: 1;
}
.ui-btn{
	font-family: arial,"Microsoft Yahei","Hiragino Sans GB",sans-serif !important;
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
	background: #FFF;
}

.unit .ui-content {
	padding: 0;
    margin-top: 45px;
    width: 100%;
    height: -webkit-calc(100% - 45px * 2);
}

.submitNav{
	z-index:8;
	position:fixed;
	background:#eee;
	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	bottom:0;
	left:0;
	width:100%;
	height:43px;
	text-shadow: none !important;
	padding:8px 0;
}

.submit{
	border-radius:4px;
	position:fixed;
	background:#436CB4;
	color:#FFF;
	text-align:center;
	font-size:15px;
	margin-left:10%;
	width:80%;
	height:43px;
	line-height:43px;
}

.submit:active{
	background:#436CB4;
}

.line {
	height: 40px;
    line-height: 40px;
    width: auto;
    padding: 0px 8px;
    border-bottom: 1px solid #ccc;
}

.line_l {
	float: left;
    font-size: 13px;
    width: 75px;
    text-align: left;
    font-weight: bold;
}

.line_r {
	float: left;
	width: auto;
	font-size: 13px;
}

.line_r .ui-input-text {
    height: 27px;
    margin: 0.4em 0;
    background-color: #fff;
}

.line_r .ui-input-text input{
    font-size: 13px;
}

.detail {
    line-height: 25px;
    padding: 0px 8px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #d8d8d8;
}

.detail .sn{
	float: left;
    height: 80px;
    line-height: 80px;
    padding: 0 5px 0 0;
    font-size: 13px;
    font-weight: bold;
}

.detail .info.weight .ui-input-text{
	width: 80px;
}

.info {
	width: auto;
    padding: 0 5px 0 16px;
    font-size: 13px;
    font-weight: normal;
}

.info .add{
	float: left;
	width: 25px;
    height: 25px;
    border: 1px solid #888;
    line-height: 25px;
    text-align: center;
    margin: 1px 0 0 0;
}

.info .dec{
	float: left;
	width: 25px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #888;
    margin: 1px 0 0 0;
    text-align: center;
}

.info .desc{
	float: left;
    margin-left: 5px;
    line-height: 28px;
}

.info .ui-input-text {
	float: left;
    height: 27px;
    width: 50px;
    margin: 0 !important;
    background-color: #fff;
}

.info .ui-input-text input{
    font-size: 13px;
    text-align: center;
}

.remark {
	float: left;
    width: 100%;
    margin-top: -10px;
}

.remark .ui-input-text {
    height: 27px;
    margin: 0.4em 0;
    background-color: #fff;
}

.remark .ui-input-text input{
    font-size: 13px;
}

.deliveryTime {
	height: 40px;
	padding-left: 10px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
}

.deliveryTime .ui-input-text {
    float: left;
	width: 95px;
    height: 27px;
    margin: 0 !important;
    background-color: #fff;
}

.deliveryTime .ui-input-text input{
    font-size: 13px;
}

.leaveMsg .ui-input-text {
	height: 70px !important;
	font-size: 13px;
}

.more{
    float: right;
    width:30px;
    height:30px;
    margin-top: 5px;
    background-size: contain;
    background-image: url(${ctx}/images/icons/icon_go.png);
}
.sellerList {
	position: absolute;
	display: none;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
}
.seller {
	height: 40px;
    line-height: 40px;
}

.ui-radio{
	margin: 0 !important;
}

.ui-radio .ui-btn{
    height: 40px;
    font-size: 13px;
    padding: 0 0 0 2.5em !important;
    line-height: 40px;
    font-weight: normal;
	background-color: #fff;
	border-radius: 0 !important;
}
</style>
</head>
<body ontouchstart="">
<form name="orderForm" id="orderForm" action="">
	<input type="hidden" name="sellerMemberId" value="${defaultSeller.memberId }"/>
	<div data-role="page" class="unit">
		<!-- 后退箭头 -->
		<div data-role="header" class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>下单</h1>
			</div> 
		</div>
		<div data-role="content">
			<div class="line">
				<div class="line_l">提货单位：</div>
				<div class="line_r">${company.memberName }</div>
			</div>
			<div class="line seller">
				<div class="line_l">选择卖家：</div>
				<div class="line_r" memberid="${defaultSeller.memberId }">${defaultSeller.memberName }</div>
				<div class="more" page="order"></div>
			</div>
			<div style="clear: both;"></div>
        	<div class="line">
				<div class="line_l">商品清单</div>
			</div>
			<!-- 商品清单  -->
			<div class="goodslist" style="border-bottom: 1px solid #ccc;">
				<c:forEach items="${shopCarts }" var="shopCart" varStatus="shop">
					<div class="detail">
						<input type="hidden" name="shopCarts[${shop.index }].shopcartId" value="${shopCart.shopcartId }"/>
						<input type="hidden" name="shopCarts[${shop.index }].brandName" value="${shopCart.brandName }"/>
						<input type="hidden" name="shopCarts[${shop.index }].brandNameDesc" value="${shopCart.brandNameDesc }"/>
						<input type="hidden" name="shopCarts[${shop.index }].texture" value="${shopCart.texture }"/>
						<input type="hidden" name="shopCarts[${shop.index }].textureDesc" value="${shopCart.textureDesc }"/>
						<input type="hidden" name="shopCarts[${shop.index }].specification" value="${shopCart.specification }"/>
						<div class="sn">${shop.count }</div>
						<div class="info">
							<span>${shopCart.brandNameDesc }</span><br/><span style="display: block;margin-top: -7px;font-size:smaller;">${shopCart.textureDesc }*${shopCart.specification }</span>
						</div>
						<div class="info quantity" style="float: left; height: 38px; padding: 0 5px 0 4px;">
							<div class="dec">－</div> 
							<input type="text" name="shopCarts[${shop.index }].buyQuantity" value="<fmt:formatNumber value="${shopCart.buyQuantity }" pattern="#0"/>"/>
							<div class="add">＋</div><div class="desc">支</div>
						</div>
						<div class="info weight" style="float: left;">
							<input type="text" name="shopCarts[${shop.index }].buyWeight" value="<fmt:formatNumber value="${shopCart.buyWeight }" pattern="#0.000"/>"/><div class="desc">吨</div>
						</div>
						<div class="remark">
							<input type="text" name="shopCarts[${shop.index }].remark" placeholder="产地及备注" value="" maxlength="20"/>
						</div>
						<div style="clear: both;"></div>
					</div>
				</c:forEach>
				<div class="deliveryTime">
					<div class="line_l">*交货日期：</div>
					<div class="line_r" style="margin: 5px 0;">
						<input type="text" name="deliveryBeginDatetime" value=""/>
						<div style="float: left;margin: 0 5px;height: 30px;line-height: 30px">一</div>
						<input type="text" name="deliveryEndDatetime" value=""/>
					</div>
				</div>
				<div style="clear:both;"></div>
				<div class="leaveMsg">
					<textarea name="buyerComment" placeholder="我要留言" clos="20" rows="5" maxlength="100"></textarea>
				</div>
			</div>
		    <!-- 卖家清单  -->
        	<div class="sellerList">
        		<c:forEach items="${sellers }" var="seller" varStatus="se">
        			<div class="seller" memberid="${seller.memberId }"><input type="radio" sellerid="${seller.memberId }" name="seller" id="seller${se.index }"/><label for="seller${se.index }">${seller.memberName }</label></div>
        		</c:forEach>
        	</div>
			<div style="clear:both;"></div>
		</div>
		<!--提交报价按钮-->
		<div data-role="footer" class="submitNav">
			<div class="submit">提交</div>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
$(document).ready(function(){
	var header_height  = $(".top").outerHeight();//头部高度
	var footer_height  = $(".submitNav").outerHeight();//底部高度
	$(".ui-content").css("height", (document.body.offsetHeight - header_height - footer_height)+"px");
	//日期选择
	var currYear = (new Date()).getFullYear();
	var option = {};
	option.begin = {
	        preset: 'date', //日期
	        theme: 'Default', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式-滚动
	        dateFormat: 'yy-mm-dd', // 日期格式
	        minDate: new Date(), //最小日期
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        endYear: currYear+10, //结束年份
	        onSelect: _beginDateOnSelect
	};
	option.end = {
	        preset: 'date', //日期
	        theme: 'Default', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式-滚动
	        dateFormat: 'yy-mm-dd', // 日期格式
	        minDate: new Date(), //最小日期
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        endYear: currYear+10, //结束年份
	        onSelect: _endDateOnSelect
	};
	//控制结束日期只能选择开始日期之后的日期
	function _beginDateOnSelect(data){
		option.end.minDate = new Date(data);
		$("input[name='deliveryEndDatetime']").mobiscroll(option.end);
		var endDate = $("input[name='deliveryEndDatetime']").val();
		if (endDate && (new Date(data) > new Date(endDate))) {
			alert("开始日期应该小于结束日期！");
			$("input[name='deliveryBeginDatetime']").focus();
		}
	}
	//控制结束日期>=开始日期
	function _endDateOnSelect(data){
		var beginDate = $("input[name='deliveryBeginDatetime']").val();
		if (beginDate && (new Date(data) < new Date(beginDate))) {
			alert("结束日期应该大于开始日期！");
			$("input[name='deliveryEndDatetime']").focus();
		}
	}
	$("input[name='deliveryBeginDatetime']").mobiscroll(option.begin);
	$("input[name='deliveryEndDatetime']").mobiscroll(option.end);
	//更多卖家点击事件
	$(".more").on("click", function(){
		var $this = $(this);
		var sellerId = $("input[name='sellerMemberId']").val();
		if ($this.attr("page") == "order") {
			$this.hide();
			$this.attr("page", "seller");
			$(".goodslist").hide();
			$(".sellerList").show();
			$("input[sellerid='"+sellerId+"']").attr("checked", true);
		    $("input[type='radio']").checkboxradio("refresh");
		}
	});
	
	//卖家选择事件
	$("input[name='seller']").on("click", function(){
		$(this).closest(".seller").addClass("checked");
		$(this).closest(".seller").siblings().removeClass("checked");
		$(".more").show().attr("page", "order");
		var $seller = $(".sellerList .seller.checked");
		$(".seller .line_r").attr("memberid", $seller.attr("memberid")).text($seller.text());
		$("input[name='sellerMemberId']").val($seller.attr("memberid"));
		$(".goodslist").show();
		$(".sellerList").hide();
	});
	
	$(".submit").on("click", function(){
		var $this = $(this);
		//防止用户重复操作
		if ($this.hasClass("ing")) {
			alert("正在提交订单，请勿重复操作！");
			return false;
		}
		//验证
		$(".detail").each(function(){
			var quantity = $(this).find("input[name*='buyQuantity']").val();
			var weight = $(this).find("input[name*='buyWeight']").val();
			if (!parseFloat(quantity) && !parseFloat(weight)) {
				alert("数量与重量必须有一个值大于0！");
				return false;
			} 
		});
		if (!$("input[name='deliveryBeginDatetime']").val() && !$("input[name='deliveryEndDatetime']").val()) {
			alert("交货日期必须填写！");
			return false;
		}
		//提交订单
		$.ajax({
            url: '${ctx}/preorder/placeOrder',
            dataType: "json",
            data: $("form[name='orderForm']").serialize(),
    		beforeSend: function () {
    			//增加等待样式
    			$this.addClass("ing");
    			$.mobile.loading("show");
    		},
            error: function (XMLHttpRequest, textStatus, errorThrown) 
            { 
            	alert("提交订单失败，请稍后再试！");
            },
            success: function (result) {
            	if (result) {
    				//添加成功后跳转至管理界面
    				if (result.success == true) {
    					window.location.href="${ctx}/preorder/placeOrderRes?orderId="+result.orderId;
    			    } else {
    			    	alert(result.msg);
    			    }
    			} else {
    				alert("提交订单失败，请稍后再试！");
    			}
            },
            complete: function () {
            	//去除等待样式
				$this.removeClass("ing");
            	$.mobile.loading("hide"); 
            }
	    });
	});
	
	//数量文本框失去焦点事件
    $("input[name*='buyQuantity']").on("blur", function(){
    	var $this = $(this);
    	var quantity = $this.val();
    	if (isNaN(quantity)) {
    		alert("数量必须为数字！");
    		$this.focus();
    		return false;
    	} else if (!new RegExp(/^[0-9]*[1-9][0-9]*$/).test(quantity)) {
    		alert("数量必须为正整数！");
    		$this.focus();
    		return false;
    	}
    });
    
  	//重量文本框失去焦点事件
    $("input[name*='buyWeight']").on("blur", function(){
    	var $this = $(this);
    	var weight = $this.val();
    	if (isNaN(weight)) {
    		alert("重量必须为数字！");
    		$this.focus();
    		return false;
    	}
    });
  	
  	//“＋”号事件
  	$(".add").on("click", function(){
  		var $this = $(this);
  		var $thisInput = $this.closest(".info").find("input[name*='buyQuantity']");
  		var quantity = $thisInput.val();
  		$thisInput.val(parseInt(quantity)+1);
  	});
  	
    //“-”号事件
  	$(".dec").on("click", function(){
  		var $this = $(this);
  		var $thisInput = $this.closest(".info").find("input[name*='buyQuantity']");
  		var quantity = $thisInput.val();
  		if (quantity > 1) {
  			$thisInput.val(parseInt(quantity)-1);
  		}
  	});
	
	//注册返回事件
	$(".image_left").on("click", function(){
		$.mobile.loading("show");
		window.location.href="${ctx}/preorder/iWantBuy";
	});
});
</script>
</html>