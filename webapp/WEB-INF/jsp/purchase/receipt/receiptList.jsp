<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>收货列表</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />

<script type="text/javascript" src="${ctx}/js/Date.js"></script>

<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/purchase/receipt/receipt-list.css");
</script>

<body>
	      <div id="g-page" class="g-page" >
	          <div class="g-header">
	                <a href="list" class="u-back-left" ></a>
                    <h3 class="u-title">收货单列表<a id="showActionSheet" href="javascript:void(0)" class="weui_btn weui_btn_mini weui_btn_primary m-receipt-search">搜索收货单</a></h3>
	          </div>
	          <div id="g-content" class="g-content">
				<div id="receipt-tab" class="weui_tab">
					<div id="weui_navbar" class="weui_navbar">
						<div class="weui_navbar_item weui_bar_item_on" data-query-type="prepareReceipt">待签收</div>
						<div class="weui_navbar_item" data-query-type="checkedReceipt">已签收</div>
					</div>
					<div class="weui_tab_bd">
					   <div id="wrapper" >
			                <div id="scroller">
			                    <div id="pullDown" class="pullDown">
			                        <span class="pullDownIcon"></span><span class="pullDownLabel show-page-loading-msg">下拉更新...</span>
			                    </div>
			                    <div id="tab-content">
			                        <div id="prepare-receipt" class="m-receipt-list">
			                            <ul class="list">
			                            </ul>
	                                    <div  class="no-recording" >
	                                                                                                        无记录!
	                                    </div>
			                        </div>
			                        <div id="checked-receipt" class="m-receipt-list" style="display: none;">
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
<div class="weui_dialog_confirm" id="dialog1" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">手动收货</strong></div>
        <div class="weui_cell weui_cell_">
        <div class="weui_cell_hd"><label class="weui_label">请输入</label></div>
            <div class="weui_cell_bd weui_cell_primary">
                <input id="code" class="weui_input" pattern="[0-9]*" placeholder="收货单号" type="number">
            </div>
        </div>
        <div class="weui_dialog_ft">
            <a href="javascript:;" class="weui_btn_dialog default">取消</a>
            <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
        </div>
    </div>
</div>
				
	<div id="actionSheet_wrap">
    <div style="display: none;" class="weui_mask_transition" id="mask"></div>
    <div class="weui_actionsheet" id="weui_actionsheet">
        <div class="weui_actionsheet_menu">
            <div class="weui_actionsheet_cell" id="actionsheet_scan">扫码收货</div>
            <div class="weui_actionsheet_cell" id="actionsheet_input">手输收货</div>
        </div>
        <div class="weui_actionsheet_action">
            <div class="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
        </div>
    </div>
</div>
   
		</div>
         
      <!-- end -->
      </div>
      <!-- end g-page -->
      
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
     <div id="loading-toast" class="weui_loading_toast" style="display:none;z-index: 3;">
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
    seajs.use("module/purchase/receipt/receiptList");
</script>
</html>