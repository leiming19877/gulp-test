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
    <title>找回密码</title>
    <link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
    <link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />
    <script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
    <script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/account/forget-password/forget-password.css");
</script>
</head>
<body>
       <div id="g-page" class="g-page" >
            <div id="g-content" class="g-content">
              <div class="m-logo">
                <div class="wrap"></div>
              </div>
     		  <c:if test="${checkOk=='0'||checkOk==''}">
               <form  id="bind-form" action="${ctx}/account/checkModifyCode" method="post" class="m-bind-form">
                  <input name="userName" id="phone"   type="hidden" disabled="disabled"  value="${userPhone}" maxlength="16" />
                	 <c:if test="${msg!=''}">
                  		<div class="err-msg">${msg}</div>
	  				</c:if>
	                <div class="input-box" >
                    <div class="phone-left">
                        <div class="phone-input">
                            <input name="userName"  disabled="disabled"  value="${phone}" maxlength="16" />
                        </div>
                    </div>
                    <div class="phone-right">
                        <i id="clear-phone" class="clear f-dn iconfont icon-del"></i>
                        <a id="code-btn" href="javascript:;" class="code-btn code-active-btn weui_btn weui_btn_mini">获取验证码</a>
                    </div>
                  </div>
                  <div class="input-box" >
                    <input id="phone-code" name="phoneCode" type="number" placeholder="请输入验证码" required="required"  maxlength="6"  />
                  </div>
                  <button id="bind-btn" type="button" class="weui_btn weui_btn_primary">下一步</button>
                 </form>
                  </c:if>
                  <c:if test="${checkOk=='1'}">
               			<form  id="update-form" action="${ctx}/account/updatePassword" method="post" class="m-bind-form">
	                      	                      
	                      <input type="hidden" name="actionType"  id="actionType" value="2" />
	                      <div class="input-box" >
		                    <input id="newPSW" name="newPSW" type="password" placeholder="请输入密码" required="required"  maxlength="16"  />
		                  </div>
		                  <div class="input-box" >
		                    <input id="againNewPSW" name="againNewPSW" type="password" placeholder="请再次输入密码" required="required"  maxlength="16"  />
		                  </div>  
		                    <button id="submit-btn" type="button" class="weui_btn weui_btn_primary">提交</button> 
	                  </form>  
	                                  
				  </c:if>
              
                 <a id="cancel-btn" href="javascript:;" class="weui_btn weui_btn_default">返回主页</a>
               
            </div>
            <!-- end g-msg -->
            <!-- end g-content -->

        </div>
        ${msg}
        <!-- end g-page -->
       
	<script type="text/javascript">
		//加载主模块js
		seajs.use("module/account/forget-password/forget-password.js");
	</script>
</body>
</html>
