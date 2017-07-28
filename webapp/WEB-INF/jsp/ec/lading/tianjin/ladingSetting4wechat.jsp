<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>报价单</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    seajs.use("${ctx}/css/module/ec/lading/tianjin/ladingSetting4wechat.css");
</script>
<title>提货设置</title>
</head>
<body>
	<div id="g-page" class="g-page">
		<div class="g-header">
			<a @click="backToUpPage" href="javascript:void(0)" class="u-back-left"></a>
			<h3 class="u-title">TD201710023232提货设置</h3>
		</div>
		<div id="g-content" class="g-content">
			<div class="weui-navbar navbar">
	             <div @tap="changeTab('lading-person',$event)" class="weui-navbar__item weui-bar__item_on">提货人</div>
	             <div @tap="changeTab('lading-car',$event)" class="weui-navbar__item">提货车</div>
	             <div @tap="changeTab('lading-fleet',$event)" class="weui-navbar__item">提货车队</div>
	         </div>
	         
	         <div name="content" id='lading-person' class="m-lading-content show">
	         	<div class="txt-line">
	         		<span class="red">*</span>接收提货券号手机：<input class="ipt" value="123456">
	         	</div>
	         	<div class="txt-line">
	         		<span class="red">*</span>选择提货人：<a  class="choose-btn weui-btn weui-btn_mini weui-btn_default">选择提货人</a>
	         	</div>
	         	<div style="height: 140px;">
		         	<table>
		         		<tr>
		         			<td>1</td>
		         			<td>张三</td>
		         			<td>430124199911010011</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         		<tr>
		         			<td>2</td>
		         			<td>李四</td>
		         			<td>430124199911010011</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         	</table>
	         	</div>
	         	<div class="txt-line">
	         		<a  class="choose-btn weui-btn weui-btn_mini weui-btn_default">保存设置</a>
	         	</div>
	         	<div class="txt-blank">
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>提示：</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;1.提货劵号是去仓库提货的关键凭证，为确保提货安全，建议不要填写司机手机号；待最终提货时再把提货劵号告知提货司机；</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;2.请在电子提单有效截止日期之前去仓库提货，如超过有效截止日期，电子提单失效，不能进行提货；</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;3.带*为必填项，在最终提货前，此信息可以维护。</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;4.本提单电子提单有效期截止日：2017-02-23</span>
	         	</div>
	         </div>
	         
	         <div name="content" id='lading-car' class="m-lading-content">
	         	<div class="txt-line">
	         		<span class="red">*</span>接收提货券号手机：<input class="ipt" value="123456">
	         	</div>
	         	<div class="txt-line">
	         		<span class="red">*</span>选择提货车牌号：<a  class="choose-btn weui-btn weui-btn_mini weui-btn_default">选择提货车</a>
	         	</div>
	         	<div style="height: 140px;">
		         	<table>
		         		<tr>
		         			<td>1</td>
		         			<td>湘ACR85</td>
		         			<td>未验证</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         		<tr>
		         			<td>2</td>
		         			<td>湘ACR85</td>
		         			<td>未验证</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         	</table>
	         	</div>
	         	<div class="txt-line">
	         		<a  class="choose-btn weui-btn weui-btn_mini weui-btn_default">保存设置</a>
	         	</div>
	         	<div class="txt-blank">
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>提示：</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;1.提货劵号是去仓库提货的关键凭证，为确保提货安全，建议不要填写司机手机号；待最终提货时再把提货劵号告知提货司机；</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;2.本电子提单有效期截止日：2017-02-23。请在电子提单有效截止日期之前去仓库提货，如超过有效截止日期，电子提单失效，不能进行提货；</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;3.带*为必填项，在最终提货前，此信息可以维护。</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;4.已验证的提货人或者提货车不可再修改。</span>
	         	</div>
	         </div>
	         
	         <div name="content" id='lading-fleet' class="m-lading-content">
	         	<div class="txt-line">
	         		<span class="red">*</span>接收提货券号手机：<input class="ipt" value="123456">
	         	</div>
	         	<div class="txt-line">
	         		<span class="red">*</span>选择提货车牌号：<a  class="choose-btn weui-btn weui-btn_mini weui-btn_default">选择提货车队</a>
	         	</div>
	         	<div style="height: 140px;">
		         	<table>
		         		<tr>
		         			<td>提货车队</td>
		         			<td>张三</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         		<tr>
		         			<td>车牌号</td>
		         			<td>湘ACW85</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         		<tr>
		         			<td>车牌号</td>
		         			<td>湘ACW85</td>
		         			<td><a htef="javascript:void(0)">删除</a></td>
		         		</tr>
		         	</table>
	         	</div>
	         	<div class="txt-line">
	         		<a  class="choose-btn weui-btn weui-btn_mini weui-btn_default">保存设置</a>
	         	</div>
	         	<div class="txt-blank">
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>提示：</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;1.提货劵号是去仓库提货的关键凭证，为确保提货安全，建议不要填写司机手机号；待最终提货时再把提货劵号告知提货司机；</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;2.本电子提单有效期截止日：2017-02-23。请在电子提单有效截止日期之前去仓库提货，如超过有效截止日期，电子提单失效，不能进行提货；</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;3.带*为必填项，在最终提货前，此信息可以维护。</span>
	         	</div>
	         	<div class="txt-tip-line">
	         		<span>&emsp;4.已验证的提货人或者提货车不可再修改。</span>
	         	</div>
	         </div>
		</div>
	</div>
	<!-- end -->
	</div>
</body>
<script type="text/javascript">
    seajs.use("module/ec/lading/tianjin/ladingSetting4wechat");
</script>
</html>