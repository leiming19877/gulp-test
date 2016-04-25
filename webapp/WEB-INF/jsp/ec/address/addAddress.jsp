<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />

<title>收货地址信息</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css">
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>
<style type="text/css">
body {
	background: #F2F2F2;
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
	position: absolute;
    margin-top: 40px;
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

.submit:active{
	background:#436CB4;
}

.myselect {
    border-radius: 4px;
    height: 2.2em;
    line-height: 25px;
    font-size: 13px;
}

.line {
	height: 40px;
    line-height: 40px;
    width: 100%;
    padding: 5px 8px;
}

.line_l {
	float: left;
    font-size: 13px;
    width: 65px;
    text-align: left;
}

.line_r {
	float: left;
	width: 70%;
}

.line_r .ui-input-text {
    height: 27px;
    margin: 0.4em 0;
    background-color: #fff;
}

.line_r .ui-input-text input{
    font-size: 13px;
}
</style>
</head>
<body ontouchstart="">
<form name="form1" method="POST">
	<input type="hidden" name="orderId" value="${orderId }"/>
	<div data-role="page" class="unit">
		<!-- 后退箭头 -->
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>添加地址</h1>
				<div class="manage">管理</div>
				<div style="clear: both;"></div>
			</div> 
		</div>
		<div data-role="content">
			<div class="line">
				<div class="line_l"><span style="color: red;">*</span>所在地区</div>
				<div class="select-addr" data-enhance="false">
					<select name="province" class="myselect" data-role="none">
						<option value="">请选择</option>
						<c:forEach items="${provinces}" var="province" varStatus="status">
							<option value="${province}">${province}</option>
						</c:forEach>
					</select>
					<select name="areaId" style="width: 75px;" class="myselect" data-role="none">
						<option value="">请选择</option>
					</select>
					<select name="districtId" style="width: 75px;" class="myselect" data-role="none">
						<option value="">请选择</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="line_l"><span style="color: red;">*</span>详细地址</div>
				<div class="line_r">
					<input type="text" name="address"/>
				</div>
			</div>
			<div class="line">
				<div class="line_l"><span style="color: red;">*</span>单位名称</div>
				<div class="line_r">
					<input type="text" name="companyName"/>
				</div>
			</div>
			<div class="line">
				<div class="line_l"><span style="color: red;">*</span>收货人</div>
				<div class="line_r">
					<input type="text" name="shippingName"/>
				</div>
			</div>
			<div class="line">
				<div class="line_l"><span style="color: red;">*</span>证件号码</div>
				<div class="line_r">
					<input type="text" name="idCard"/>
				</div>
			</div>
			<div class="line">
				<div class="line_l"><span style="color: red;">*</span>手机号码</div>
				<div class="line_r">
					<input type="text" name="mobile"/>
				</div>
			</div>
			<div style="clear:both;"></div>
		</div>
		<!--保存按钮-->
		<div class="submitNav">
			<div class="submit">保存</div>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
$(document).ready(function(){
	var cities = eval('(' + '${areaJson}' + ')');
	var districts = eval('(' + '${districtJson}' + ')');
	//省份下拉框change事件
	$("select[name='province']").on("change", function() {
		var $this = $(this);
		var provinceName = $this.val();
		var $citysSelect = $("select[name='areaId']");
		var $districtSelect = $("select[name='districtId']");
		//清空城市下拉框
		$citysSelect.empty().append($("<option value=''>请选择</option>"));
		$districtSelect.empty().append($("<option value=''>请选择</option>"));
		//添加城市
		$.each(cities, function(i, item) {
			if(item.provinceName == provinceName){
				$citysSelect.append($("<option value='"+item.areaId+"'>"+item.areaName+"</option>"));
			}
		});
		$citysSelect.focus();
	});
	//城市下拉框change事件
	$("select[name='areaId']").on("change", function() {
		var $this = $(this);
		var areaId = $this.val();
		var $districtSelect = $("select[name='districtId']");
		//清空区县下拉框
		$districtSelect.empty().append($("<option value=''>请选择</option>"));
		//添加区县
		$.each(districts, function(i, item) {
			if(item.areaId == areaId){
				$districtSelect.append($("<option value='"+item.districtId+"'>"+item.districtName+"</option>"));
			}
		});
		$districtSelect.focus();
	});
	
	//区县change事件[解决IOS选择下拉框时界面放大不自动还原问题]
	$("select[name='districtId']").on("change", function() {
		$("input[name='address']").blur();
		$("input[name='address']").focus();
	});
	
	//添加按钮事件
	$(".submit").on("click", function(){
		var $this = $(this);
		//防止用户重复操作
		if ($this.hasClass("ing")) {
			alert("正在添加收货地址，请勿重复操作！");
			return false;
		}
		var province = $("select[name='province']").val();//省
		var areaid = $("select[name='areaId']").val();//市
		var district = $("select[name='districtId']").val();//区
		var address = $("input[name='address']").val();//详细地址
		var company = $("input[name='companyName']").val();//收货单位
		var shipname = $("input[name='shippingName']").val();//收货人
		var idcard = $("input[name='idCard']").val();//证件号码
		var mobile = $("input[name='mobile']").val();//手机号码
		//简单校验
		if (province == "") {
			alert("请选择省份！");
			return false;
		}
		if (areaid == "") {
			alert("请选择城市！");
			return false;
		}
		if (district == "") {
			alert("请选择区县！");
			return false;
		}
		if (address == "") {
			alert("请填写详细地址！");
			$("input[name='address']").blur();
			$("input[name='address']").focus();
			return false;
		}
		if (company == "") {
			alert("请填写单位名称！");
			$("input[name='companyName']").blur();
			$("input[name='companyName']").focus();
			return false;
		}
		if (shipname == "") {
			alert("请填写收货人！");
			$("input[name='shippingName']").blur();
			$("input[name='shippingName']").focus();
			return false;
		}
		if (idcard == "") {
			alert("请填写证件号码！");
			$("input[name='idCard']").blur();
			$("input[name='idCard']").focus();
			return false;
		}
		if (mobile == "") {
			alert("请填写手机号码！");
			$("input[name='mobile']").blur();
			$("input[name='mobile']").focus();
			return false;
		} else {
			var regu = /^\d{11}$/;
			var re = new RegExp(regu);
			if(!(re.test(mobile) || new RegExp(/^1[34578][0-9]{9}$/).test(mobile))){
				alert("手机号码格式不正确");
				$("input[name='mobile']").blur();
				$("input[name='mobile']").focus();
				return false;
			}
		}
		
		$.ajax({
            url: '${ctx}/preorder/address/addRes',
            type: "POST",
            dataType: "json",
            traditional: true,
            data: {
            	"areaId": areaid,
           	    "districtId": district,
           	 	"address": address,
           	 	"companyName": company,
           	 	"shippingName": shipname,
           	 	"idCard": idcard,
           	 	"mobile": mobile
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
    				alert(result.msg);
    				//添加成功后跳转至管理界面
    				if (result.success == true) {
    					window.location.href="${ctx}/preorder/selectLogisticsType?orderId="+$("input[name='orderId']").val();
    			    }
    			} else {
    				alert("添加失败，请稍后再试！");
    			}
            },
            complete: function () {
            	//去除等待样式
				$this.removeClass("ing");
            	$.mobile.loading("hide"); 
            }
        });
	});
	
	//收货地址管理事件
	$(".manage").on("click", function(){
		window.location.href="${ctx}/preorder/address/manager";
	});
	
	//注册后退事件
	$(".image_left").on("click", function(){
		$.mobile.loading("show");
		window.location.href="${ctx}/preorder/selectLogisticsType?orderId="+$("input[name='orderId']").val();
	});
});
</script>
</html>