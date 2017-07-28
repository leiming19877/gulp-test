<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
<title>照片下单</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.12.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/order/pre-photo-order2.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<style type="text/css">

</style>
</head>
<body >
  

	    <div id="app"  class="g-pages">
	    
	        <div id="gp-main" class="g-page gp-main">
	               <div class=" " v-bind:class="['g-content',{'g-photo-bg1':pictures.length === 0},{'g-photo-bg2':pictures.length > 0}]">
			             <!-- 照片清单 -->
		                  <div class="weui-cells weui-cells_form m-photoList">
				            <div class="weui-cell">
				                <div class="weui-cell__bd">
				                    <div class="weui-uploader">
				                       <!--  <div class="weui-uploader__hd">
				                            <p class="weui-uploader__title">图片上传</p>
				                            <div class="weui-uploader__info">0/2</div>
				                        </div> -->
				                        <div class="weui-uploader__bd">
				                           <!--  <div class="weui-uploader__input-box">
                                                <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" />
                                            </div> -->
				                            <ul class="weui-uploader__files" id="uploaderFiles">
				                                <li v-cloak v-for="(e,index) in pictures" class="weui-uploader__file"
				                                >
				                                    <img v-bind:src="e.localData" height="100%" width="100%" border="none" />
				                                    <i class="del" @click="pictures.splice(index, 1);"></i>
				                                 
				                                </li>
				                            </ul>
				                           
				                        </div>
				                    </div>
				                    
				                    <div v-cloak v-if="pictures.length > 0" style="clear: both;">
                                                <textarea v-model="buyerComment" placeholder="给卖家留言" style="width: 100%;height: 80px;"></textarea>
                                    </div>
				                </div>
				            </div>
				        </div>
	               </div>
	               <footer class="g-footer">
	                          <a class="weui-btn weui-btn_primary u-picker-seller-btn" @click="showGpSellers();" >
	                               <span>选择卖家：</span>
	                               <span v-text="sellerMemberName"></span>
	                               <i class="iconfont icon-more" style="float: right;" ></i>
	                          </a>
	                        <a class="weui-btn weui-btn_primary u-pic-btn" 
	                         @click="pickPictures();"
	                         href="javascript:void(0);">拍照或上传照片</a>
	                        <a 
	                           class="weui-btn weui-btn_primary u-submit-btn"
	                           @click="submitOrder();"
	                           href="javascript:void(0);">提交订单</a>
                  
	               </footer>
	        </div>
	        <div id="gp-seller" v-bind:class="['g-page','gp-seller',{'show':isShowGpSellers}]"  >
	               <div class="g-content">
	                       <div class="weui-cells__title">卖家列表</div>
	                       <div class="weui-cells weui-cells_radio">
				                     <label v-for="(e,index) in sellers"
				                     :key="e.sellerId"
				                      @click="chooseSeller(e.sellerId,e.sellerName)"
				                      class="weui-cell weui-check__label" v-bind:for="'seller'+index">
	                                    <div class="weui-cell__bd">
	                                        <p v-text="e.sellerName"></p>
	                                    </div>
	                                    <div class="weui-cell__ft">
	                                        <input type="radio" class="weui-check" name="radio1" v-bind:id="'seller'+index"
	                                        v-bind:checked="sellerMemberId === e.sellerId ? 'checked':''"  />
	                                              
	                                        <span class="weui-icon-checked"></span>
	                                    </div>
	                                </label>
			                    
					        </div>
	               </div>
	        </div>
	        <div id="gp-seller-mask" 
	         v-bind:class="['weui-mask','gp-seller-mask',{'show':isShowGpSellers}]" 
	         @click="hideGpSellers();"  ></div>
	    </div>

</body>

<script type="text/javascript">
    //加载主模块
    seajs.use("module/ec/order/pre-photo-order2");
</script>
</html>