<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%SignPackage signPackage = (SignPackage)request.getAttribute("signPackage");%>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="description" content="微信中拓钢铁网，提货券号，主营：螺纹钢，盘螺，高速线材，板材等。" />
<meta name="keywords" content="中拓钢铁提货券号，提货券号详情" />
<meta name="viewport"content="width=device-width, initial-scale=1, user-scalable=no">
<link href="${ctx}/css/module/ec/lading/weixin1.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<title>运输公司登录</title>
<style>
    dl{text-align: center;}
    dl span{width: 100%; text-align: left; line-height: 26px; margin-top: 0px;}
</style>

</head>
<body >
    <form method="post"action="${ctx}/lading/transComLogin.pfv"  >
        <dl style="padding-top: 40px;"><lable>用户名:</lable><input type="text"id="name"name="userName"size="20"style="height: 46px;width: 60%;" placeholder="请输入用户名"/></dl>
        <dl style="height: 30px;"><span id="checkName"></span></dl>
        <dl><lable>密&emsp;码:</lable><input type="password"id="password"name="passWord"size="20"style="height: 46px;width: 60%" placeholder="请输入密码"required/></dl>
        <dl style="height: 30px;"><span id="checkPassWord"></span></dl>
        <dl><input id="submit" class="btn_b" type="submit"value="登&emsp;录" size="20px" disabled="disabled" style="height: 46px;width: 80%;margin-left: 0%;"/></dl>
	    <input type="hidden" id="openid" name="openid" value="${openid}"/>
    </form>
    <input type="hidden" id="state" value="${state}"/>
	
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/transCompanyLogin");
</script>
</html>