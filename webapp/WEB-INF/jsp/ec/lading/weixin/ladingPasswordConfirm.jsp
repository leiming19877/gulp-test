<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport"content="width=device-width,initial-scale=1, user-scalable=no">
</head>
<link href="${ctx}/css/module/ec/lading/passwordkeyboard.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/fastclick.js"></script>
<body>
<div>
    <div style="text-align: center;padding-top: 10px;p"><span id="set_text" style="font-size: large;"></span></div>
    <div style="padding-top: 20px;text-align: center;">
        <form id="password" >
            <input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass" type="password"maxlength="1"value=""><input readonly class="pass pass_right" type="password"maxlength="1"value="">
        </form>
    </div>
</div>
<div id="keyboardDIV"></div>

<input id="action"type="hidden"value="${action}"/>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/ladingPasswordConfirm");
</script>
</html>