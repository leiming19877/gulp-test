<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../comm/taglib.jsp" %>
<!DOCTYPE html>
<html>
  <head>
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="STYLESHEET" type="text/css" href="<spring:url value="/codebase/dhtmlx.css"/>">
    <link rel="STYLESHEET" type="text/css" href="<spring:url value="/css/component/layout.css"/>">
    <link rel="stylesheet" type="text/css" href="<spring:url value="/codebase/skins/skyblue/dhtmlx.css"/>"/>
    <script>
		var require = {baseUrl: "${pageContext.request.contextPath}/js" };
		var contextPath = "${pageContext.request.contextPath}";
	</script>
	<script src="<spring:url value="/js/lib/require.js"/>"></script>
	<script src="<spring:url value="/js/common.js"/>"></script>
    <sitemesh:write property='head'/>
  </head>
  <body>
  	<sitemesh:write property='body'/>
  </body>
</html>