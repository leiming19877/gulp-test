<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>终端配供-我要买</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />



<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
	//加载本模块样式
	seajs.use("../../css/module/ec/terminalBuy/terminal-buy.css");
</script>

<body>
	<form id="orderForm"  name="orderForm"  action="${ctx}/preorder/prePlaceOrder" method="post" >
		<input type="hidden" name="placeOrderType"  value="0"/>
		<input type="hidden" name="shopCarts[0].brandName" value=""/>
		<input type="hidden" name="shopCarts[0].brandNameDesc" value=""/>
		<input type="hidden" name="shopCarts[0].texture" value=""/>
		<input type="hidden" name="shopCarts[0].textureDesc" value=""/>
		<input type="hidden" name="shopCarts[0].specification" value=""/>
		<input type="hidden" name="shopCarts[0].buyQuantity" value="1"/>
		<input type="hidden" name="shopCarts[0].buyWeight" value="1"/>
	</form>
	
    <!-- end g-header -->   
    <div class="g-pages">
        
	    <div id="g-page" class="g-page" >
	    
	        <!-- 头部搜索等内容 -->
	        <div id="g-header" class="g-header f-cb">
	                <div class="g-h-left">
	                    <div class="g-h-left-c">
	                            <input autofocus="false" type="search" id="header-brand-name-search" name="header-brand-name-search" placeholder="品名..." class="u-ipt-search" />
	                    </div> 
	                </div>
	                <div class="g-h-right">
	                    <a href="${ctx}/ec/preorder/shopcart/view" class="m-shop-car">
	                        <span class="num">0</span>
	                    </a>
	                </div>
	         </div>
	        <div id="g-content" class="g-content">
	
	            <div id="banner" class="m-banner"></div>
	           
	            <div id="guide-tab" class="m-guide-tab" >
	               <!-- guide-tab程序会自动填充 -->
	            </div>
	            <!--end m-guide-tab -->  
	            <div id="recent-buy-record-list" class="m-recent-buy-record-list" >
	                    <div class="recent-buy-title f-cb">
	                                                          最近购买
	                       <span class="u-push"></span>
	                    </div>
	                    <div class="swiper-container">
	                        <div class="swiper-wrapper">
	                             <!-- swiper-wrapper程序会自动填充 -->               
	                        </div>
	                        <div class="swiper-pagination"></div>
	                    </div>
	              </div>      
	        </div>
	        <div id="g-footer" class="g-footer">
	              <div class="m-fast-order">
	                    <!--照片下单  -->
	                     <a href="prePhotoOrder">
	                        <img class="logo"  src="${ctx}/images/icons/icon_mai.png"  width="45px" height="45px" />
	                                                                        语音下单                                
	                     </a> 
	                     <!--语音下单  -->      
	                     <a href="prePhotoOrder">
	                        <img class="logo"  src="${ctx}/images/icons/icon_photo.png"  width="45px" height="45px" />
	                                                                        拍照下单                                
	                     </a>                           
	              </div>
	              
	              
	             
	        </div>
	         <!-- end -->
	    </div>
	    <!-- end g-page -->
	    
        <div id="g-page2" class="g-page g-page2">
		    <!-- 头部搜索等内容 -->
            <div id="g-header2" class="g-header g-header2 bg1 f-cb">
                    <div class="g-h-left">
                        <div class="g-h-left-c">
                             <div class="g-h-left-back">
                                 <button id="left-back" class="u-back"></button>
                             </div>
                             <div class="g-h-right-search">
                                <input  type="search" id="brand-name-search" name="brand-name-search" placeholder="品名..." class="u-ipt-search" />
                             </div>
                        </div> 
                    </div>
                    <div class="g-h-right">
                        <a href="${ctx}/preorder/shopcart/view" class="m-shop-car">
                            <span class="num">0</span>
                        </a>
                    </div>
             </div>
                    
		    <!-- 品名查询结点 -->
		    <div id="brand-names-search-panel" class="m-brand-names-search">
		        <ul id="brand-names-search-content" class="m-brand-names f-cb">
		                <!-- brand-names-search-content程序会自动填充 -->
		        </ul>
		        <div class="no-match-msg">没有匹配的记录</div>
		    </div>
		    <!-- end query-brand-names -->
        </div>
        <!-- end  -->
        
    </div>
    <!-- end g-pages -->
    
    
    <div id="product-detail" class="m-product-detail">
                <div class="title">
                    <span class="brand-name">焊管</span>
                    <span>请选择规格</span>
                    <span id="product-detail-close" class="close"></span>
                </div>
                <div class="detail">
                    <p class="title">
                                                         工艺要求/直径/材质
                    </p>
                    <div class="texture">
                         <!-- texture 程序会自动填充  -->
                    </div>
                    <p class="title">
                                                             壁厚/规格
                    </p>
                    <div class="specification">
                        <span class="specification-wrap">
                             <!-- specification-wrap 程序会自动填充  -->
                        </span><span class="other">
                            <button  class="item">其它</button>
                            <input type="text" id="specification-other-input" name="specification-other-input"  class="other-input" maxlength="20" />
                        </span>
                    </div>
                </div>
                <div class="buttons">
                    <div class="button add-shop-car-button">
	                     <div href="preorder/shopcart/view" class="m-shop-car shop-car2">
	                        <span class="num">0</span>
	                     </div>
	                     <span>加入购物车</span>            
                    </div>
                    <div class="button buy-button">立即下单</div>
                </div>
            </div>
        
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
	seajs.use("module/ec/terminalBuy/terminalBuy.js");
</script>

