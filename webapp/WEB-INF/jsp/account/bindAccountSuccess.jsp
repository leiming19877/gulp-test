<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>账号绑定成功</title>
    
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>

</head>
<body>
	<div data-role="page" id="pageone">
		<div data-role="header">
			<h1>账号绑定成功</h1>
		</div>

		<div data-role="content">
		  <p>你已成功绑定了${userName}会员账号。</p>	
		</div>	
	</div>
</body>
</html>
