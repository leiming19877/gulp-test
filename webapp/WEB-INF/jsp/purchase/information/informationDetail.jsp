<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<!doctype html>
<html>
<head>

<meta name="viewport"content="width=device-width, initial-scale=1.0, user-scalable=yes" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>资讯详情</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />

<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/purchase/information/informationDetail.css");
</script>
</head>
<body>
   <div class="g-pages">
        
        <div id="g-page" class="g-page" >
             <!-- end -->
        </div>
        <!-- end g-page -->
        
    </div>
    <!-- end g-pages -->
    
    
     <!-- 加入成功提示  -->
     <div id="toast" style="display:none;z-index: 3;">
            <div class="weui_mask_transparent"></div>
            <div class="weui_toast">
                <i class="weui_icon_toast"></i>
                <p class="weui_toast_content">加入成功</p>
            </div>
     </div>
     <!-- end 加入成功提示  -->
      
     <!-- 加载提示  -->
     <div id="loading-toast" class="weui_loading_toast" style="z-index: 3;">
          <div class="weui_mask_transparent"></div>
          <div class="weui_toast">
              <div class="weui_loading">
                  <!-- :) -->
                  <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                  <div class="weui_loading_leaf weui_loading_leaf_11"></div>
              </div>
              <p class="weui_toast_content">数据加载中</p>
          </div>
      </div>
      <!-- end 加载提示 -->
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/purchase/information/informationDetail");
</script>
</html>