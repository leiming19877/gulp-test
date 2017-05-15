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
    seajs.use("${ctx}/css/module/account/no-bind-tip/no-bind-tip.css");
</script>
</head>
<body>
       <div id="g-page" class="g-page" >
            <div id="g-content" class="g-content">
                <div class="msg">
                <div class="weui_msg">
                    <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
                    <div class="weui_text_area">
                        <h2 class="weui_msg_title">提示</h2>
                        <p class="weui_msg_desc">你还没有进行任务账号绑定。</p>
                    </div>
                    <div class="weui_opr_area">
                        <p class="weui_btn_area">
                            <a id="bind-btn" href="javascript:;" class="weui_btn weui_btn_primary">绑定账号</a>
                            <a id="cancel-btn" href="javascript:;" class="weui_btn weui_btn_default">返回主页</a>
                        </p>
                    </div>
                    <div class="weui_extra_area">
                       <!--  <a href="">查看详情</a> -->
                    </div>
                </div>
                </div>
            </div>
            <!-- end g-msg -->
            <!-- end g-content -->

        </div>
        <!-- end g-page -->
       
	<script type="text/javascript">
		//加载主模板块
		seajs.use("module/account/no-bind-tip/no-bind-tip");
	</script>
</body>
</html>
