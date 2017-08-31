<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>订单详情</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/swiper/swiper.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/order/orderDetail.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<body>
	<div id="order-detail" class="weui-tab g-page">
         <div class="weui-navbar">
             <div class="weui-navbar__item detail_header"><span v-text='orderInfo.orderBusiId'></span>
             	<a href="javascript:;" v-bind:data-clipboard-text="orderInfo.orderBusiId" 
             	class="weui-btn weui-btn_mini weui-btn_default detail_copy"
             	 id="copy_order_no">复制</a>
				<span class="order_detail_sta" v-text='orderInfo.orderStatusDesc'></span>             	
             </div>
         </div>
         
         <div style="margin-top:40px;">
	         <div class="weui-cells page__category-content" style='font-size:14px;margin-right:0px;'>
	              <a class="weui-cell weui-cell_access js_item" data-id="button" href="javascript:;">
	                  <div class="weui-cell__bd border_bottom">
	                      <p style='float:left;'>货物明细</p>
	                  </div>
	              </a>
	             <div  class="weui-cell__bd border_bottom" v-for="e in orderInfo.iteams">
	                  <div class="weui-cell__bd">
	                      <div class="height_30">
	                      	<span v-text="e.brandNameDesc+' '+e.textureDesc+' '+e.specification+' '+e.placeSteelDesc"></span>
	                      	<span style='position:absolute;right:15px;color:red;' v-text="'¥'+e.buyPrice+'/吨'"></span>
	                      </div>
	                      <div class="height_30">
	                      	<span class="info" v-text="e.warehouseDesc"></span>
	                      	<span style="position:relative;left:15%;color:red;" v-text="e.buyQuantity+'件/'+e.buyWeight+'吨'"></span>
	                      	<span style="position:absolute;right:15px;color:red;" v-text="'运费：+¥'+e.freightExtra+'/吨'"></span>
	                      </div>
	                  </div>
	              </div>
                  <div   class="weui-cell__bd">
	                  <div class="height_30" style="margin:10px 0px;">
	                  	<div style='height:30px; margin-left:15px;color:#777;'>订单量合计：<span style='color:red;' v-text="orderInfo.totalBuyQuantity+'件/'+orderInfo.totalBuyWeight+'吨   	¥'+orderInfo.totalBuyMoney"></span></div>
	                  	<div style='height:30px; margin-left:15px;color:#777;'>开单量：<span style='color:red;' v-text="orderInfo.orderLadingQuanity+'件/'+orderInfo.orderLadingWeight+'吨'"></span></div>
	                  	<div style='height:30px; margin-left:15px;color:#777;'>实提量：<span style='color:red;' v-text="orderInfo.totalReallyQuantity+'件/'+orderInfo.totalReallyWeight+'吨'"></span></div>
	                  	<div v-cloak style="float: right;position: relative;top: -40px;right: 10px;">
	                  		<a href="javascript:;" v-if="orderInfo.preOrderContractId != 0 && orderInfo.preOrderContractId != ''" @click="toContractDetail(orderInfo.preOrderContractId)" class="weui-btn weui-btn_mini weui-btn_primary">查看合同</a>
	                   		<a href="javascript:;"  v-if="orderInfo.totalReallyWeight > 0" @click="toLadeList(orderInfo.orderId)" class="weui-btn weui-btn_mini weui-btn_primary">查看提单</a>
	                  	</div>
	                  </div>
                  </div>
	          </div>
	          <div class="page__category-content" style='font-size:14px;'>
	             <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class='lable_l'>提货单位</span>
                      	<span class='lable_r' v-text='orderInfo.agentName'></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.deliveryBeginDate != null">
                      <div class="height_30">
                      	<span class="lable_l">交货期</span>
                      	<span class='lable_r' v-if="orderInfo.deliveryBeginDate != null" v-text="new Date(orderInfo.deliveryBeginDate).formatDate('yyyy-MM-dd')+'至'+new Date(orderInfo.deliveryOverDate).formatDate('yyyy-MM-dd')"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30" v-if="orderInfo.deliveryType != null">
		                	<span class="lable_l">交货方式</span>
		                	<span class='lable_r' v-text="orderInfo.deliveryTypeDesc"></span>
                      </div>
                      <div class="height_30" v-if="orderInfo.deliveryType == 'bps'">
		                	<span class="lable_l">收货地址</span>
		                	<span class='lable_r' v-text="orderInfo.provinceName+orderInfo.areaName+orderInfo.districtName+orderInfo.address"></span>
		               </div>
		               <div class="height_30" v-if="orderInfo.deliveryType == 'bps'">
		                	<span class="lable_l" >收货单位</span>
		                	<span class='lable_r' v-text="orderInfo.consigneeCompany"></span>
		                </div>
		                <div class="height_30" v-if="orderInfo.deliveryType == 'bps'">
		                	<span class="lable_l">收货人1</span>
		                	<span class='lable_r' v-text="orderInfo.name1+','+orderInfo.phone1"></span>
		                </div>
	              </div>
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.transportFeeType != null">
                      <div class="height_30" style="height:30px;">
                      	<span class="lable_l">运费承担</span>
                      	<span class='lable_r' v-if="orderInfo.transportFeeType==1" v-text="'供方运输,一票结算'"></span>
                      	<span class='lable_r' v-if="orderInfo.transportFeeType==2" v-text="'供方代办,两票结算'"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.balanceType != null">
                      <div style="margin-left: 15px;line-height: 30px; height:30px;" >
                      <span class="lable_l">结算方式:</span>
                      <span class='lable_r'>
	                      	<ol class="jie-shuan">
	                      	    <li v-if="orderInfo.isCashDeposit === 1"  v-text="'需要支付保证金，保证金金额'+orderInfo.cashDeposit+'万元'"></li>
	                      		<li v-if="orderInfo.balanceType === 1" v-text="'先款后货'"></li>
	                      		<li v-if="orderInfo.balanceType === 2" v-text="'先货后款'"></li>
	                      	</ol>
                      </span>	
                      </div>
	              </div>
	               <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">卖家</span>
                      	<span class='lable_r' v-text='orderInfo.sellerName'></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.projectName != null && orderInfo.projectName != ''">
                      <div class="height_30">
                      	<span class="lable_l">项目</span>
                      	<span class='lable_r' v-text="orderInfo.projectName"></span>
                      </div>
	              </div>
	               <div class="weui-cell__bd border_bottom">
                      <div class="height_30" v-if='orderInfo.createdDatetime != null'>
                      	<span class="lable_l">下单时间</span>
                      	<span class='lable_r' v-text="new Date(orderInfo.createdDatetime).formatDate('yyyy-MM-dd HH:mm')"></span>
	                  </div>
	                  <div class="height_30">
                      	<span class="lable_l">下单人</span>
                      	<span class='lable_r' v-text="orderInfo.userDisplayName+','+orderInfo.userCellphone"></span>
                      </div>
                      <div class="height_30">
                      	<span class="lable_l">卖家业务员</span>
                      	<span class='lable_r' v-if="orderInfo.salesman != null && orderInfo.salesman != ''" v-text="orderInfo.salesman+','+orderInfo.salemanPhone"></span>
                      </div>
                      <div class="height_30" v-if="orderInfo.buyerComment != null && orderInfo.buyerComment != ''">
                      	<span class="lable_l">买家留言</span>
                      	<span class='lable_r' v-text='orderInfo.buyerComment'></span>
                      </div>
                      <div class="height_30">
                      	<span class="lable_l">订单类型</span>
                      	<span class='lable_r' v-text="orderInfo.orderTypeDesc"></span>
                      </div>
	              </div>
	          </div>
         
			<div v-if="orderInfo.imgList != null && orderInfo.imgList.length>0" style="height:30px;width:100%;line-height:30px;font-size:18px;text-align:center">订单照片</div>
			<div class="swiper-container" v-if="orderInfo.imgList != null && orderInfo.imgList.length>0">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="d in orderInfo.imgList">
			        	<div><img style='width:300px;width:100%;' v-bind:src="d.absolutePath"></div>
			        </div>
			    </div>
			    <!-- 如果需要分页器 -->
			    <div class="swiper-pagination"></div>
			    <!-- 如果需要导航按钮 -->
			    <div class="swiper-button-prev"></div>
			    <div class="swiper-button-next"></div> 
			</div>
		</div>
     </div>
	
	
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/order/order-detail.js");

</script>
</html>
