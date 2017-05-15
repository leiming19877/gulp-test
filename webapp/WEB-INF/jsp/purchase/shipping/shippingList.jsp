<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>发货列表</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />

<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>

<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/purchase/shipping/shipping-list.css");
</script>

<body>

    <div class="g-pages">
        
        <div id="g-page" class="g-page" >
	        <div class="g-header">
	              <a href="../order/center" class="u-back-left" ></a>
	              <h3 class="u-title">发货单列表</h3>
		    </div>
            <div id="g-content" class="g-content" >
				<div id="shipping-list-tab" class="weui_tab">
					<div class="weui_navbar">
						<div class="weui_navbar_item weui_bar_item_on" data-query-type="signingShipping">签收中</div>
						<div class="weui_navbar_item" data-query-type="checkedShipping">已签收</div>
						<div class="weui_navbar_item" data-query-type="confirmedShipping">已确认</div>
					</div>
					<div class="weui_tab_bd">
					   <div id="wrapper" >
			                <div id="scroller">
			                    <div id="pullDown" class="pullDown">
			                        <span class="pullDownIcon"></span><span class="pullDownLabel show-page-loading-msg">下拉更新...</span>
			                    </div>
			                    <div id="tab-content">
			                        <div id="signing-shipping" class="m-shipping-list">
			                            <ul class="list">
			                            </ul>
                                        <div  class="no-recording" >
                                                                                                                                         无记录!
                                        </div>
			                        </div>
			                        
			                        <div id="checked-shipping" class="m-shipping-list" style="display: none;">
			                            <ul class="list">
			                            </ul>
                                        <div  class="no-recording" >
                                                                                                                                         无记录!
                                        </div>
			                        </div>
			                        
			                         <div id="confirmed-shipping" class="m-shipping-list" style="display: none;">
			                            <ul class="list">
			                            </ul>
                                        <div  class="no-recording" >
                                                                                                                                         无记录!
                                        </div>
			                        </div>
								</div>
								<!-- end tab-content -->
								<div id="pullUp" class="pullUp" >
			                        <span class="pullUpIcon"></span><span class="pullUpLabel show-page-loading-msg">上拉加载...</span>
			                    </div>
			                    
			                </div>
			                <!-- end scroller -->
			            </div>
					  <!-- end wrapper -->
					</div>
					<!-- weui_tab_bd -->
				</div>

			</div>
           
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
    seajs.use("module/purchase/shipping/shippingListPage");
</script>
</html>