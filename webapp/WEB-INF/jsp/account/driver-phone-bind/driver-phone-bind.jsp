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
    <title>绑定提示</title>
    <link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
    <link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />
    <script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
    <script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/account/driver-phone-bind/driver-phone-bind.css");
</script>
</head>
<body>
       <div id="g-page" class="g-page" >
            <div id="g-content" class="g-content">
              <div class="m-logo">
                <div class="wrap"></div>
              </div>
               <form  id="bind-form" action="${ctx}/account/driverPhoneBind" method="post" class="m-bind-form">
                  <input type="hidden" name="openId" value="${openId}" />
                  <input type="hidden" name="unionId" value="${unionId}" />
                  <input type="hidden" name="publicWechatId" value="<%=Constants.PUBLIC_WECHAT_ID %>" />
                  <input type="hidden" name="publicWechatName" value="<%=Constants.PUBLIC_WECHAT_NAME %>" />
                  
                  <div class="tip">提示：手机号绑定功能只针对司机查看电子提单，如使用更多功能，请使用账号绑定功能。</div>
                  <c:if test="${msg != null}">
                  <div class="err-msg">${msg}</div>
                  </c:if>
                  <div class="input-box" >
                    <div class="phone-left">
                        <div class="phone-input">
                            <input name="userName" id="phone" type="number" placeholder="请输入手机号码" value="${userName}" maxlength="11" />
                        </div>
                    </div>
                    <div class="phone-right">
                        <i id="clear-phone" class="clear ${userName == null ?'f-dn':''} iconfont icon-del"></i>
                        <a id="code-btn" href="javascript:;" class="code-btn ${userName == null ?'':'code-active-btn'} weui_btn weui_btn_mini">获取验证码</a>
                    </div>
                  </div>
                  
                  <div class="input-box" >
                    <input id="phone-code" name="phoneCode" type="number" placeholder="请输入验证码" required="required"  maxlength="6"  />
                  </div>
                 <button id="bind-btn" type="button" class="weui_btn weui_btn_primary">绑定手机号</button>
                 <a id="cancel-btn" href="javascript:;" class="weui_btn weui_btn_default">返回主页</a>
               </form>
               
            </div>
            <!-- end g-msg -->
            <!-- end g-content -->

        </div>
        <!-- end g-page -->
       
	<script type="text/javascript">
		//加载主模块js
		seajs.use("module/account/driver-phone-bind/driver-phone-bind.js");
	</script>
</body>
</html>
