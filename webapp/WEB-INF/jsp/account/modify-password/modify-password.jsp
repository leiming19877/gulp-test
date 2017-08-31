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
    <title>修改密码</title>
    <link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
    <link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />
    <script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
    <script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/account/modify-password/modify-password.css");
</script>
</head>
<body>
       <div id="g-page" class="g-page" >
            <div id="g-content" class="g-content">
              <div class="m-logo">
                <div class="wrap"></div>
              </div>

             
         		<form  id="update-form" action="${ctx}/account/updatePassword" method="post" class="m-bind-form">
	                  <c:if test="${msg!=''}">
                  		<div class="err-msg">${msg}</div>
	  				  </c:if>
	                  <input type="hidden" name="actionType"  id="actionType" value="1" />
	    			  <div class="input-box" >
	                    <input id="PSW" name="PSW" type="password" placeholder="请输入原密码" required="required"   />
	                  </div>
	                  <div class="input-box" >
	                    <input id="newPSW" name="newPSW" type="password" placeholder="请输入新密码" required="required"  maxlength="16"  />
	                  </div>
	                  <div class="input-box" >
	                    <input id="againNewPSW" name="againNewPSW" type="password" placeholder="请再次输入新密码" required="required"  maxlength="16"  />
	                  </div>  
	                    <button id="submit-btn" type="button" class="weui_btn weui_btn_primary">确认</button> 
                  </form>  
	                                  
			
              
                 <a id="cancel-btn" href="javascript:;" class="weui_btn weui_btn_default">返回主页</a>
               
            </div>
            <!-- end g-msg -->
            <!-- end g-content -->

        </div>
        <!-- end g-page -->
       
	<script type="text/javascript">
		//加载主模块js
		seajs.use("module/account/modify-password/modify-password.js");
	</script>
</body>
</html>
