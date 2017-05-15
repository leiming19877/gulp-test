<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%
SignPackage signPackage = (SignPackage)request.getAttribute("signPackage");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"content="width=device-width, initial-scale=1, user-scalable=no">
<title>提货密码设置</title>
<link href="/css/module/ec/lading/passwordkeyboard.css" rel="stylesheet" type="text/css" />
</head>
<link href="${ctx}/css/module/ec/lading/weixin1.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<body >
<div>
    <div style="text-align: center;padding-top: 10px;"><span id="set_text" style="font-size: large;"></span></div>
        <div style="text-align: center;padding-top: 20px;">
            <form id="password" style="text-align: center;" >
            <input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass pass_right" type="password"maxlength="1"value="">
            </form>
            <dl><dt><input id="btn_next" style="color:red" type="button"value="下&emsp;一&emsp;步"class="btn_next"disabled></dt></dl>
        </div>
</div>
<div id="keyboardDIV"></div>
<input id="userName" type="hidden"value="${userName}">
<input id="cellPhone" type="hidden"value="${phone}">
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/ladingPasswordSetting");
</script>
</html>