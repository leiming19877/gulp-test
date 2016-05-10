<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>偏好设置</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />

<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/purchase/favorite/favorite.css");
</script>

<body>
        
        <div id="g-page" class="g-page" >
            <div id="g-content" class="g-content" >
				<div id="favorite-tab" class="weui_tab">
					<div class="weui_navbar">
						<a id="variety-setting-tab" class="weui_navbar_item weui_bar_item_on" href="#/variety-setting">品种设置</a>
						<a id="steel-factory-setting-tab" class="weui_navbar_item" href="#/steel-factory-setting" >钢厂设置</a>
						<a id="delivery-address-setting-tab" class="weui_navbar_item" href="#/delivery-address-setting" >交货设置</a>
					</div>
					<div class="weui_tab_bd">
						<div id="variety-setting" class="m-variety-setting tab-content">
							无记录!
						</div>
	
						<div id="steel-factory-setting" class="m-steel-factory-setting tab-content"
							style="display: none;">
							无记录!
						</div>
	
						<div id="delivery-address-setting"
							class="m-delivery-address-setting tab-content" style="display: none;">
							无记录!
						</div>

				</div>
					<!-- weui_tab_bd -->
				</div>

			</div>
           
             <!-- end -->
        </div>
        <!-- end g-page -->

    
    
      
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
      
<div class="weui_dialog_confirm" id="dialog1" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">发货确认</strong></div>
        <div id="confirm_detial" class="weui_cell weui_cell_"style="height: 280px;overflow: auto;text-align: left;"></div>
        <div class="weui_dialog_ft">
            <a href="javascript:;" class="weui_btn_dialog default">取消</a>
            <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
        </div>
    </div>
</div>
      <!-- end 加载提示 -->
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/purchase/favorite/favoritePage");
</script>
</html>
