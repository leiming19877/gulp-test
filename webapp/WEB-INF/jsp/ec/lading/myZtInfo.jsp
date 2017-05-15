<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>我的中拓</title>
<meta name="viewport"content="width=device-width,min-width=480px,initial-scale=1, user-scalable=no">
<link href="${ctx}/css/module/ec/lading/weixin1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/js/module/ec/lading/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/dialog.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/drag.js"></script>
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
</head>
<style>
    dl{text-align: center;padding-top: 20px;}
    div dl dt input{background: #87CEFF; width: 100%; height: 100%;}
    div dl dt input:hover{background:#87CEFF;color:#ff6633;border:1px solid #ff6633; }
    div dl dd form dl input{margin-bottom: 10px;width: 56%;height:45px;}
</style>
<body style="background: white;">
<div>
	<dl>
		<dt   class="showlist"  >
			<a href="javascript:;"><input type="button"value="提&emsp;货&emsp;密&emsp;码" style="margin-bottom: 10px;"></a>
		</dt>
		<dd id="state2" >
			<form style="border: 1px dotted #ff6633">
				<dl><input id="modify-lading-password-btn" class="btn_b modifyLadingPassword" type="button" value="修&emsp;改&emsp;密&emsp;码"style="width: 84%; margin-bottom: 0px; line-height: 50%;"/></dl>
				<div id="modify-div" style="display: none">
					<dl><label>手机号</label><input readonly="readonly" type="text" id="cellPhone"value="${cellPhone}"/></dl>
					<dl><label>旧密码</label><input readonly="readonly" type="text" id="oldLadingPassword"value=""/></dl>
					<dl><label>新密码</label><input type="text" id="newLadingPassword" value=""></dl>
					<dl style="padding-bottom: 10px;">
						<input id="save_btn" class="btn_b saveLadingPassword" type="button"value="确&emsp;认&emsp;修&emsp;改"style="width: 84%; margin-bottom: 0px; line-height: 50%;"/>
					</dl>
				</div>
		
			</form>
		</dd>
		
	</dl>
</div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/myZtInfo");
</script>
</html>