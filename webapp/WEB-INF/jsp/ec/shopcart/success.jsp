<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>下单成功</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/shopcart/success.css");
</script>
<body>
<div id="g-page" class="g-page" v-cloak>
	<div id="g-content" class="g-content">
		<div class="success">
			<div v-text="'订单提交成功，等待卖家审核'"></div>
			<div v-text="'订单号：'+orderId"></div>
		</div>
		<div class="btn">
			<a @tap="backToFirstPage($event)" href="javascript:;"class="weui-btn weui-btn_mini weui-btn_primary">返回首页</a>
			<a @tap="viewOrderDetail(orderId)" href="javascript:;"class="weui-btn weui-btn_mini weui-btn_primary">查看订单</a>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/shopcart/success");
</script>

</script>
</html>
