<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>订单发货</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />

<script type="text/javascript" src="${ctx}/js/common/Date.js"></script>

<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/purchase/shipping/shipping-detail.css");
</script>

<body>

    <input hidden id="action"value="${action}"/>
        
        <div id="g-page" class="g-page" >
           
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
<div class="weui_dialog_confirm" id="dialog2" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">请输入数量</strong></div>
        <div id="quantity" class="weui_cell weui_cell_">
        	<input class="m-shipping-dialog-quantity" min="0" max="10000" maxlength="5" type="number" placeholder="请输入数量"name="quantity">
        </div>
        <div class="weui_dialog_ft m-receipt-dft">
            <a href="javascript:;" class="weui_btn_dialog default">取消</a>
            <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
        </div>
    </div>
</div>
<div class="weui_dialog_confirm" id="dialog3" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">请输入重量</strong></div>
        <div id="weight" class="weui_cell weui_cell_">
        	<input class="m-shipping-dialog-weight" min="0" max="10000" maxlength="5" type="number" placeholder="请输入重量"name="weight">
        </div>
        <div class="weui_dialog_ft m-receipt-dft">
            <a href="javascript:;" class="weui_btn_dialog default">取消</a>
            <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
        </div>
    </div>
</div>
      <!-- end 加载提示 -->
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/purchase/shipping/shippingPage");
</script>
</html>
