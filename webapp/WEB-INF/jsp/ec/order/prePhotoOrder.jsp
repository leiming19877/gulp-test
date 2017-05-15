<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
.ui-header, .ui-footer {
	position: fixed !important;
    border-width: 0 0 !important;
}
.ui-bottom{
    background: rgba(0,0,0,.1);
    position: fixed;
    width: 100%;
    height: 120px;
    bottom: 0px;
}
.ui-content{
    padding: 0;
}
.u-image-left{
    position: absolute;
    top:10px;
    left:6px;
    width:20px;
    height:20px;
}

/** 重载ui-page **/
.ui-page {
	background-size: 100%;
	background-position-y: 0px;
    background-repeat: no-repeat;
    background-image: url(${ctx}/images/base/photo-order.jpg);
}
/** 扩展ui-page **/
.ui-page.hasPhoto {
    background-image: url(${ctx}/images/base/photo-order-bg.jpg);
}

.sellerList {
	display: none;
    bottom: 0;
    padding: 0;
    margin-top: -2px;
}
.seller {
    height: 40px;
    line-height: 40px;
    margin-top: 3px;
    background-color: #3385ff;
    color: #fff;
    border: 1px solid #3180f5;
    position:fixed;
    bottom:65px;
    left:10%;
    width:79%;
    z-index:101;
    border-radius: 4px;
    text-shadow: none !important;
}

.line_l {
	float: left;
    font-size: 13px;
    width: 80px;
    padding-left: 10px;
    text-align: left;
    font-weight: bold;
}

.more{
    float: right;
    width:26px;
    height:26px;
    margin-top: -35px;
    margin-right: 8px;
    background-size: contain;
    background-image: url(${ctx}/images/icons/icon_logo_witre.png);
}

.submitNav{
	z-index:100;
	position:fixed;
	background:#eee;
	box-shadow: 0 0px 0px rgba(0,0,0,.2);
	bottom:5;
	left:0;
	width:100%;
	height:43px;
	padding:8px 0;
	text-shadow: none !important;
}

.choose{
    float:left;
	border-radius:4px;
	background:#436CB4;
	color:#FFF;
	text-align:center;
	font-size:15px;
	margin-left:10%;
	width:80%;
	height:43px;
	line-height:43px;
}

.submit{
	display: none;
	float: right;
	border-radius:4px;
	
	color:#FFF;
	text-align:center;
	font-size:15px;
	width:120px;
	height:43px;
	line-height:43px;
    margin-right: 10%;
}
.ui-bar-a, .ui-page-theme-a .ui-bar-inherit, html .ui-bar-a .ui-bar-inherit, html .ui-body-a .ui-bar-inherit, html body .ui-group-theme-a .ui-bar-inherit{background:none;}
{background:#436CB4;}
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
	border-width: 0 !important;
	border-radius: 0 !important;
    border-top: 1px solid #ddd !important;
}
.m-photoList{
  padding-top: 10px;
}
.m-photoList:after{
    display:block;
    clear:both;
/*     visibility:hidden; */
    height:59px;
    overflow:hidden;
    content:"";
}
.m-photoList .item{
    position:relative;
    float:left;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    box-sizing:border-box;
    height: 150px;
    width:50%;
    padding: 10px 15px 10px 10px;
}
.m-photoList  img{
   height: 130px;
   width: 100%; 
}
.m-photoList .del{
    position: absolute;
    width: 25px;
    height: 25px;
    right: 5px;
    top: 0;
    background: url(${ctx}/images/icons/icon_delete.png)  no-repeat;
    background-size:25px 25px;
}
</style>
</head>
<body ontouchstart="">
<form name="orderForm" id="orderForm">
	<input type="hidden" id="serverIds" name="serverIds" value=""/>
	<input type="hidden" id="placeOrderType" name="placeOrderType" value="2"/>
	<input type="hidden"  id="sellerMemberId" name="sellerMemberId" value="${defaultSeller.memberId }"/>
	<div data-role="page" >
		<!-- 后退箭头 
		<div data-role="header" data-position="fixed" style="background:rgba(255,255,255,.8);" >
  			<img src="${ctx}/images/icons/icon_left.png" class="u-image-left">
            <h1>照片下计划</h1>
            
		</div>
		-->
		<div data-role="content">

		    	<!-- 照片清单 -->
		        <div class="m-photoList" id="photoList">
		        	<%-- 
		        	//测试用的demo
		        	<div class="item">
		                  <img src="${ctx}/images/login/login_ad_01.jpg"/>
		                  <span class="del"></span>
		        	</div> 
		        	--%>
		        </div>
		        <!-- 卖家清单 -->
	        	<div class="sellerList" id="sellerList">
	        		<c:forEach items="${sellers }" var="seller" varStatus="se">
	        			    <input type="radio" data-sellerName="${seller.memberName}"  
	        			        data-sellerMemberId="${seller.memberId }" 
	        			        name="seller"  id="seller${se.index }"
	        			        ${defaultSeller.memberId == seller.memberId ?'checked="checked"':''} />
	        			    <label for="seller${se.index }" style="<c:if test='${se.last }'>border-bottom: 1px solid #ddd !important;</c:if>">${seller.memberName }</label>
	        		</c:forEach>
	        	</div>
		</div>
		<div class="ui-bottom">
			<div class="seller">
	                <div class="line_l">先选择卖家：</div>
	                <div id="chose-seller" class="line_r" memberid="${defaultSeller.memberId }">${defaultSeller.memberName }</div>
	                <div class="more" id="more-sellers" page="photo"></div>
	        </div>
			<div data-role="footer" class="submitNav" >
				<div id="choose" class="choose">拍照或选择照片</div>
				<div id="submit" class="submit">提交订单</div>
			</div>
	    </div>
	</div>
</form>
</body>
<script type="text/javascript">
$(document).ready(function(){
	
	//拍照或上传照片事件
	$(".choose").on("click", function(){
		wx.chooseImage({
		    count: 9, // 默认9
		    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        if (localIds && !$(".ui-page").hasClass("hasPhoto")) {
		        	$(".ui-page").addClass("hasPhoto");
		        	$(".choose").css({"width": "120px"});
		        	$(".submit").show();
	        	}
		        syncUpload(localIds);
		    }
		});
	});
	function syncUpload(localIds){
		var photoList = $("#photoList");
		var localId = localIds.pop();
		wx.uploadImage({
			 localId: localId,
			 isShowProgressTips: 1,
			 success: function (res) {
			    var serverId = res.serverId; // 返回图片的服务器端ID
			    //其他对serverId做处理的代码
			    var imgItem = $("<div class='item' serverid='"+serverId+"'></div>").appendTo(photoList);
			    imgItem.append($("<img src='"+localId+"'/>"));
			    imgItem.append($("<span class='del'></span>"));
				photoList =  null;
			    if (localIds.length > 0) {
			    	syncUpload(localIds);
			    }
			 }
		});
	}
	//Element#photoList代理照片删除事件
	$("#photoList").on("click", ".del", function(){
		var $this = $(this);
		//要上传图片结构item
		var imgItem = $this.closest(".item");
		imgItem.remove();
		//如果不存在一张图片，更换背景
		if ($("#photoList div.item").length === 0) {
        	$(".submit").hide();
        	$(".choose").css({"width": "80%"});
			$(".ui-page").removeClass("hasPhoto");
		}
	});
	//提交订单事件
	$(".submitNav").on("click", ".submit", function(){
		var $this = $(this);
		var serverIds = new Array();
		//防止用户重复操作
		if ($this.hasClass("ing")) {
			alert("正在提交订单，请勿重复操作！");
			return false;
		}
		if (!$("input[name='sellerMemberId']").val()) {
			alert("请选择卖家！");
			return false;
		}
		var photos = $("#photoList  div.item");
		if (photos.length === 0) {
			alert("您还没有上传照片！");
			return false;
		} else {
			photos.each(function(i){
				var $item = $(this);
				var serverid = $item.attr("serverid");
				serverIds.push(serverid);
			});
			
			$("input[name='serverIds']").val(serverIds);
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
		}
	});
	//更多卖家点击事件
	$("#more-sellers").on("click", function(){
		var self = $(this);
		self.hide();
		$("#photoList").hide();
        $("#sellerList").show();
	});
	//卖家选择事件
	$("input[name='seller']").on("click", function(){
		var self = $(this);
		//设置显示选择了那一个卖家
		$("#chose-seller").attr("memberid", self.attr("memberid")).text(self.attr("data-sellerName"));
        //将选择的卖家会员号设置到表单中
		$("#sellerMemberId").val(self.attr("data-sellerMemberId"));
		$("#more-sellers").show();
		$("#photoList").show();
		$("#sellerList").hide();
	});
	//注册返回事件
	$(".u-image-left").on("click", function(){
		$.mobile.loading("show"); 
		window.location.href="${ctx}/preorder/iWantBuy";
	});
});
</script>
</html>