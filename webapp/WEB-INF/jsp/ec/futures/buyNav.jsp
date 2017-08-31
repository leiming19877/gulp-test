<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>我要买</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/futures/buyNav.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/zmd.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>

<body>

	   <div id="g-page" class="g-page">
          <div class="button-sp-area">
              <a href="javascript:;" class="weui-btn weui-btn_primary">订单采购</a>
              <a href="publishDemand" class="weui-btn weui-btn_primary">分销合同下单</a>
              <a href="javascript:;" class="weui-btn weui-btn_primary">配供合同下单</a>
          </div>
        </div> 

   
</body>
<script type="text/javascript">
	//加载主模块
	seajs.use("module/ec/futures/buyNav.js");
</script>

