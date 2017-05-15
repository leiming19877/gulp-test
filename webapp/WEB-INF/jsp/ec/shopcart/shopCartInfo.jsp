<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />

<title>购物车信息</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css">
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>
<style type="text/css">
body {
	background: #fafafa;
	padding: 3px 0;
	overflow: hidden;
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
    margin-top: -34px;
    margin-right: 7px;
    color: #3879d9;
    text-decoration:none;
    border: 1px solid #3879d9;
    border-radius:4px;
    padding:2px 5px;
}

.head{
	position:relative;
    background-color: #fff;
	padding: 5px 8px 0px 8px;
    border-bottom: 8px solid #ddd;
}
.top .manage:hover {
    color: #3e82f7;
    border: 1px solid #3e82f7;
}
.unit {
	position: relative;
	margin-bottom: 5px;
	background: #FFF;
}

.unit .ui-content {
	padding: 0;
	position: absolute;
    margin-top: 45px;
    width: 100%;
    height: -webkit-calc(100% - 45px * 2);
    background:#fafafa;
    border-radius:4px;
    border-bottom: 1px solid #ebebeb;
}

.buttonNav{
	z-index:8;
	position:fixed;
	background:#eee;
	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	bottom:0;
	left:0;
	width:100%;
	height:43px;
	padding:8px 0;
	text-shadow: none;
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

.to-delete{
	float: right;
	display: none;
	border-radius:4px;
	background:red;
	color:#FFF;
	text-align:center;
	font-size:15px;
	margin-right:10px;
	width:20%;
	height:43px;
	line-height:43px;
}

.all-check-wrap {
	width: 20px;
    height: 20px;
    display: none;
    background-color: #fff;
    float: left;
    position: relative;
    margin-top: 10px;
    margin-left: 8px;
    border-radius: 50%;
    border: 1px solid #888;
}

.all-check{
	width: 16px;
    height: 16px;
    background-color: red;
    float: left;
    display: none;
    position: relative;
    margin-top: 1px;
    margin-left: 1px;
    border-radius: 50%;
    border: 1px solid #fff;
}

.line {
	height: 50px;
    line-height: 25px;
    width: 100%;
    padding: 0px 8px 0px 20px;
}

.checkWrap {
	width: 20px;
    height: 20px;
    background-color: #fff;
    float: left;
    margin-top: 20px;
    border-radius: 50%;
    border: 1px solid #888;
}

.checked {
	width: 16px;
    height: 16px;
    background-color: red;
    float: left;
    display: none;
    position: relative;
    margin-top: 1px;
    margin-left: 1px;
    border-radius: 50%;
    border: 1px solid #fff;
}

.info {
	width: auto;
    padding: 0 5px 0 0px;
    font-size: 13px;
    font-weight: normal;
    margin-top:2px;
}

.info span{ margin-left:10px; line-height: 18px;}
.info .add{
	float: left;
	width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    text-align: center;
    margin: 1px 0 0 0px;
    background:#ffffff;
    font-size:24px;
    color:#666;
}

.info .dec{
	float: left;
	width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    margin: 1px 0 0 0;
    text-align: center;
    background:#ffffff;
    font-size:24px;
    color:#666;
}
/**.info .add:hover,.info .dec:hover{background:#ebebeb;}**/
.info .desc{
	float: left;
    margin-left: 5px;
    line-height: 30px;
}

.info .ui-input-text {
	float: left;
    height: 30px;
    line-height: 30px;
    width: 50px;
    min-width: 50px;
    margin: 0 !important;
    background-color: #fff;
    box-shadow: inset 0 0px 0px rgba(0,0,0,.01);
    border:1px solid #ebebeb;
}

.info .ui-input-text input{
    font-size: 13px;
    text-align: center;
    padding:0px;
    
    border-radius:0px;
    min-height: 30px; line-height: 30px;border-radius:0px;border:1px solid #ddd;
    box-shadow: inset 0 0px 0px rgba(0,0,0,.01);
}


.ui-content .ui-listview {
	margin: 0;
}

.ui-btn-icon-right:after{
	display: none;
}

.ui-listview>li.ui-last-child>a.ui-btn {
	border-bottom-width: 0;
}

.content {
	padding: 0;
}

.behind {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
}
.behind a.ui-btn {
	width: 68px;
	height: 28px;
	margin: 0;
	float: right;
	border: none;
	line-height: 28px;
}
.behind a.delete-btn, .behind a.delete-btn:active, .behind a.delete-btn:visited, .behind a.delete-btn:focus, .behind a.delete-btn:hover {
	color: white;
	background-color: red;
	text-shadow: none;
}
.behind a.ui-btn.pull-left {
	float: left;
}
.behind a.edit-btn, .behind a.edit-btn:active, .behind a.edit-btn:visited, .behind a.edit-btn:focus, .behind a.edit-btn:hover {
	color: white;
	background-color: orange;
	text-shadow: none;
}
.ui-listview .li-shopcart a{ padding:8px 0px ;background-color:#ffffff;border-bottom: 1px solid #ebebeb;border-width: 0px 0 1 0px;}
.ui-listview>li>a{border-bottom: 1px solid #ebebeb;}
.ui-listview .li-shopcart{margin:0px 0px 10px 0px;} 
.ui-listview>.ui-li-static, .ui-listview>.ui-li-divider, .ui-listview>li>a.ui-btn{border-width: 0px 0 0;  border-bottom:1px solid #ebebeb;}
</style>
</head>
<body ontouchstart="" style="background:#fafafa;">
<form name="orderForm" id="orderForm" action="${ctx}/preorder/prePlaceOrder" data-ajax="false">
	<input type="hidden" name="shopCartIds" value=""/>
	<input type="hidden" name="quantitys" value=""/>
	<input type="hidden" name="weights" value=""/>
	<input type="hidden" name="placeOrderType" value="1"/>
	<div data-role="page" class="unit">
		<!-- 后退箭头 -->
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>购物车</h1>
				<div class="manage">编辑</div>
				<div style="clear: both;"></div>
			</div> 
		</div>
		<div data-role="content">
			<ul data-role="listview" class="swipe-delete">
				<c:forEach items="${shopCartList }" var="shopCart" varStatus="status">
					<li class="li-shopcart" shopcartid="${shopCart.shopcartId }" style="<c:if test='${status.last}'>border-bottom: 1px solid #ddd;</c:if>">
						<div class="behind">
							<a href="#" class="ui-btn delete-btn">删除</a>
						</div>
						<a class="content" href="#">
							<div class="line">
								<div class="checkWrap">
									<div class="checked"></div>
								</div>
								<div class="info">
									<span>${shopCart.brandNameDesc }</span><br/><span>${shopCart.textureDesc }*${shopCart.specification }</span>
								</div>
								<div class="info quantity" style="float: left; height: 38px; padding: 0 5px 0 8px;">
									<div class="dec">－</div>
									<input type="text" name="shopCarts[${status.index }].buyQuantity" value="<fmt:formatNumber value="${shopCart.buyQuantity }" pattern="#0"/>"/>
									<div class="add">＋</div><div class="desc">支</div>
								</div>
								<div class="info weight" style="float: left;">
									<input type="text" name="shopCarts[${status.index }].buyWeight" value="<fmt:formatNumber value="${shopCart.buyWeight }" pattern="#0.000"/>"/><div class="desc">吨</div>
								</div>
							</div>
							<div style="clear:both;"></div>
						</a>
					</li>
				</c:forEach>	
			</ul>
			<div style="clear:both;"></div>
		</div>
		<!--按钮-->
		<div class="buttonNav">
			<div class="to-delete">删除</div>
			<div class="submit">下单</div>
			<div class="all-check-wrap">
				<div class="all-check"></div>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
$(document).ready(function(){
	var header_height  = $(".top").outerHeight();//头部高度
	var footer_height  = $(".buttonNav").outerHeight();//底部高度
	$(".ui-content").css("height", (document.body.offsetHeight - header_height - footer_height)+"px");
    function doDelete(element, ids){
    	if (element.hasClass("ing")) {
			alert("正在删除购物车，请勿重复操作！");
			return false;
		}
    	//删除
    	$.ajax({
            url: '${ctx}/preorder/shopcart/delete',
            dataType: "json",
            traditional: true,
            data: {
           	 	"ids": ids.join(",")
    		},
    		beforeSend: function () {
    			//增加等待样式
    			element.addClass("ing");
    			$.mobile.loading("show");
    		},
            error: function (XMLHttpRequest, textStatus, errorThrown) 
            { 
            	alert("删除失败，请稍后再试！");
            },
            success: function (result) {
            	if (result) {
    				alert(result.msg);
    				//添加成功后跳转至管理界面
    				if (result.success == true) {
   						$.each(ids, function(i, item) {
   							if ($("ul>li[shopcartid="+item+"]").length){
   								$("ul>li[shopcartid="+item+"]").remove();
   							}
   						});
    			    }
    			} else {
    				alert("删除失败，请稍后再试！");
    			}
            },
            complete: function () {
            	//去除等待样式
				element.removeClass("ing");
            	$.mobile.loading("hide"); 
            }
        });
    }
    
    //下单按钮事件
    $(".submit").on("click", function(){
    	var $this = $(this);
		//防止用户重复操作
		if ($this.hasClass("ing")) {
			alert("正在下单，请勿重复操作！");
			return false;
		}
    	var weights = new Array();
    	var quantitys = new Array();
    	var shopCartIds = new Array();
    	var checkShopCart = $(".li-shopcart.choosed").length;//选择的货物
    	var shopCartLength = "${fn:length(shopCartList)}";//购物车数量
    	if (!shopCartLength) {
    		alert("购物车中还没有东西呢，快去挑选货物吧！");
			return false;
    	} else if (checkShopCart === 0) {
    		alert("请选择需要下单的货物！");
			return false;
    	} else {
    		//购物车数据
    		$(".li-shopcart.choosed").each(function(){
    			shopCartIds.push($(this).attr("shopcartid"));
    			var quantity = $(this).find("input[name*='buyQuantity']").val();
    			var weight = $(this).find("input[name*='buyWeight']").val();
    			if (parseFloat(quantity) < 0 && parseFloat(weight) < 0) {
    				alert("数量与重量必须有一个值大于0！");
    				return false;
    			} else {
    				weights.push(weight);
    				quantitys.push(quantity);
    			}
    		});
    	}
    	$("input[name='weights']").val(weights);
    	$("input[name='quantitys']").val(quantitys);
    	$("input[name='shopCartIds']").val(shopCartIds);
    	//修改购物车信息
    	$.ajax({
            url: '${ctx}/preorder/shopcart/update',
            type: "POST",
            dataType: "json",
            traditional: true,
            data: {
           	    "weights": weights,
           	 	"quantitys": quantitys,
            	"shopCartIds": shopCartIds
    		},
    		beforeSend: function () {
    			//增加等待样式
    			$this.addClass("ing");
    			$.mobile.loading("show");
    		},
            error: function (XMLHttpRequest, textStatus, errorThrown) 
            { 
            	alert("添加失败，请稍后再试！");
            },
            success: function (result) {
            	if (result) {
    				if (result.success == true) {
    					//购物车信息修改成功,跳转至下单界面
    					$("form[name='orderForm']").submit();
    			    }
    			} else {
    				alert("下单失败，请稍后再试！");
    			}
            },
            complete: function () {
            	//去除等待样式
				$this.removeClass("ing");
            	$.mobile.loading("hide"); 
            }
        });
    });
    
    //编辑按钮点击事件
    $(".manage").on("click", function(){
    	var $this = $(this);
    	if ($(".all-check-wrap").is(":hidden")) {
    		//点击编辑，显示多选按钮和底部操作按钮
    		$this.text("完成");
    		$(".submit").hide();
    		$(".to-delete").show();
    		$(".all-check-wrap").show();
    	} else {
    		//点击取消，隐藏多选按钮和底部操作按钮
    		$this.text("编辑");
    		$(".submit").show();
    		$(".to-delete").hide();
    		$(".all-check-wrap").hide();
    	}
    	//移除选中状态
    	$("ul>li").each(function(){
			$(this).removeClass("choosed");
			$(this).find("a.content>.line>.checkWrap>.checked").hide();
		});
    });
    
    //多选按钮事件
    $(".all-check-wrap").on("click", function(event){
    	var $this = $(this);
    	var $checked = $this.find(".all-check");
    	if ($checked.is(":hidden")) {
    		$("ul>li").each(function(){
    			var $li = $(this);
    			$li.addClass("choosed");
    			$li.find("a.content>.line>.checkWrap>.checked").show();
    		});
    		$checked.show();
    	} else {
    		$("ul>li").each(function(){
    			var $li = $(this);
    			$li.removeClass("choosed");
    			$li.find("a.content>.line>.checkWrap>.checked").hide();
    		});
    		$checked.hide();
    	}
    	event.stopPropagation();
    });
    
    //删除按钮事件
    $(".to-delete").on("click", function(){
    	var $this = $(this);
    	var ids = new Array();
    	var checked = $("ul>li.choosed").length;
    	if (checked == 0) {
    		alert("请选择需要删除的项！");
    		return false;
    	} else {
    		$("ul>li.choosed").each(function(){
    			var shopcartid = $(this).attr("shopcartid");
    			ids.push(shopcartid);
    		});
    		doDelete($this, ids);
    	}
    });
    
  	//复选按钮事件
    $(".checkWrap").on("click", function(event){
    	var $this = $(this);
    	var $checked = $this.find(".checked");
    	if ($checked.is(":hidden")) {
    		$this.closest("li").addClass("choosed");
    		$checked.show();
    	} else {
    		$this.closest("li").removeClass("choosed");
    		$checked.hide();
    	}
    	event.stopPropagation();
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
    
  //注册返回按钮事件,后退事件
	$(".image_left").on("click", function(){
		$.mobile.loading("show");
		window.location.href="${ctx}/preorder/iWantBuy";
	});
});
</script>
</html>