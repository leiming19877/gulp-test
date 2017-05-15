<%@ page pageEncoding="utf-8"%>

<style>
<!--
.no-close .ui-dialog-titlebar-close {
display: none;
}
-->
</style>

<c:if test="${INDEX_INCLUDE == 1}">   <%--非首先包含时引入JS文件和相关样式文件 --%>
	<link rel="stylesheet" type="text/css" href="${ctx}/style/css/zt906.min.css">
</c:if>
<link href="${ctx}/css/module/ec/lading/index.css" rel="stylesheet" type="text/css">  
<link href="${ctx}/css/module/ec/lading/home.css" rel="stylesheet" type="text/css"> <!--中拓钢铁首页样式-->