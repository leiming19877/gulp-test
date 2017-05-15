<head>
</head>
<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/ec/lading/ladingTag.jsp"%>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/bootstrap-switch.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/jquery.alerts_new.js"></script>
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<input type="hidden"value="${evLadingId}"id="evLadingId">
<input type="hidden"value="${ladingId}"id="ladingId">
<input type="hidden"value="${ladingType}" id="ladingType">
<body>
	<div id="content" class="">
	</div>
</body>
<!-- 提货设置页面首页,首次导入相关Jquery文件避免后续文件重复导入冲突 -->

<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/indexSeting");
</script>
</html>
