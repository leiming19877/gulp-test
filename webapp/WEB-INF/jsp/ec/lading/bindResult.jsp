<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%SignPackage signPackage = (SignPackage)request.getAttribute("sign");%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<meta name="viewport"content="width=device-width, initial-scale=1, user-scalable=no">
<title>绑定结果</title>
</head>
<body >
<center><h1><%=request.getAttribute("result")%></h1></center>
<center>页面将在<b id="time">3</b>秒后自动跳转，如没有跳转请<a href="${ctx}/lading/weixinLading.pfv?info=1">点击这里跳转</a></center>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/bindResult.js");
</script>
</html>
