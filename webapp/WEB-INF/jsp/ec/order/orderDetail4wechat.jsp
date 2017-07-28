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
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>

<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/order/orderDetail.css");
</script>
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
	         <div class="weui-cells page__category-content" style='font-size:14px;margin-right:10px;'>
	              <a class="weui-cell weui-cell_access js_item" data-id="button" href="javascript:;">
	                  <div class="weui-cell__bd border_bottom">
	                      <p style='float:left;'>货物明细</p>
	                  </div>
	              </a>
	             <div class="weui-cell__bd border_bottom" v-for="e in orderInfo.iteams">
	                  <div class="weui-cell__bd">
	                      <div class="height_30">
	                      	<span v-text="e.brandNameDesc+' '+e.textureDesc+' '+e.specification+' '+e.placeSteelDesc"></span>
	                      	<span style='position:absolute;right:0px;color:red;' v-text="'¥'+e.buyPrice+'/吨'"></span>
	                      </div>
	                      <div class="height_30">
	                      	<span class="info" v-text="e.warehouseDesc"></span>
	                      	<span style="position:relative;left:15%;color:red;" v-text="e.buyQuantity+'件/'+e.buyWeight+'吨'"></span>
	                      	<span style="position:absolute;right:0px;color:red;" v-text="'运费：+¥'+e.freightExtra+'/吨'"></span>
	                      </div>
	                  </div>
	              </div>
                  <div class="weui-cell__bd">
	                  <div class="height_30" style="margin-top:10px;">
	                  	<div style='height:30px;'>订单量合计：<span style='color:red;' v-text="orderInfo.totalBuyQuantity+'件/'+orderInfo.totalBuyWeight+'吨   	¥'+orderInfo.totalBuyMoney"></span></div>
	                  	<div style='height:30px;'>开单量：<span style='color:red;' v-text="orderInfo.orderLadingQuanity+'件/'+orderInfo.orderLadingWeight+'吨'"></span></div>
	                  	<div style='height:30px;'>实提量：<span style='color:red;' v-text="orderInfo.totalReallyQuantity+'件/'+orderInfo.totalReallyWeight+'吨'"></span></div>
	                  	<div v-cloak style="float: right;position: relative;top: -50px;right: 10px;">
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
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.agentName != 14">
                      <div class="height_30">
                      	<span class="lable_l">交货期</span>
                      	<span class='lable_r' v-if="orderInfo.requiredBeginDatetime != null" v-text="new Date(orderInfo.requiredBeginDatetime).formatDate('yyyy-MM-dd')+'至'+new Date(orderInfo.requiredEndDatetime).formatDate('yyyy-MM-dd')"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30" v-if="orderInfo.agentName != 15">
		                	<span class="lable_l">交货方式</span>
		                	<span class='lable_r' v-if="orderInfo.deliveryTypeDesc != null" v-text="orderInfo.deliveryTypeDesc"></span>
                      </div>
                      <div class="height_30">
		                	<span class="lable_l">收货地址</span>
		                	<span class='lable_r' v-text="orderInfo.provinceName==null?'':orderInfo.provinceName+orderInfo.areaName+orderInfo.districtName+orderInfo.address"></span>
		               </div>
		               <div class="height_30">
		                	<span class="lable_l">收货单位</span>
		                	<span class='lable_r' v-text="orderInfo.consigneeCompany"></span>
		                </div>
		                <div class="height_30">
		                	<span class="lable_l">收货人1</span>
		                	<span class='lable_r' v-if="orderInfo.name!=null" v-text="orderInfo.name1+','+orderInfo.phone1"></span>
		                </div>
	              </div>
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.agentName != 15">
                      <div class="height_30" style="height:30px;">
                      	<span class="lable_l">运费承担</span>
                      	<span class='lable_r' v-text="orderInfo.transportFeeType=='1'?'供方运输,一票':'供方代办,两票'"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom" v-if="orderInfo.agentName != 15">
                      <div class="height_30" style="height:50px;">
                      	结算方式:<br/>
                      	<ol>
                      		<li v-text="orderInfo.balanceType=='1'?'先款后货':'先货后款'"></li>
                      	</ol>
                      </div>
	              </div>
	               <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">卖家</span>
                      	<span class='lable_r' v-text='orderInfo.sellerName'></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">项目</span>
                      	<span class='lable_r' v-text="orderInfo.projectName"></span>
                      </div>
	              </div>
	               <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
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
                      <div class="height_30">
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
    seajs.use("module/ec/order/order-detail");
    
  /*   window.onload = function(){
    	var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    // 如果需要前进后退按钮
		     nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev'
		  }) 
    } */
</script>
</html>
