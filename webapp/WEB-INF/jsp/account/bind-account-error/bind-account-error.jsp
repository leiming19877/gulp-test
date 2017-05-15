<%@page import="com.ztds.weixin.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html >
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>加载绑定用户出错</title>
    <link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
    <link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />
    <script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
    <script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/account/bind-account-error/bind-account-error.css");
</script>
</head>
<body>
       <div id="g-page" class="g-page" >
            <div id="g-content" class="g-content">
                <div class="weui_btn_area">
                     <div class="f-tip">提示：加载绑定用户出错，请重新试试。</div>
                     <a id="cancel-btn" href="javascript:;" class="weui_btn weui_btn_primary">返回主页</a>
                </div>             
            </div>
            <!-- end g-msg -->
            <!-- end g-content -->

        </div>
        <!-- end g-page -->
       
	<script type="text/javascript">
		//加载主模块js
		seajs.use("module/account/bind-account-error/bind-account-error");
	</script>
</body>
</html>
