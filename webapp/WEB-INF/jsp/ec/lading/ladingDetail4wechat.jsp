<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>提单详情</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/lading/ladingDetail.css");
</script>
<body>
	<div id="lading-detail" class="weui-tab g-page">
         <div class="weui-navbar">
              <div class="weui-cell__bd weui-navbar__item detail_header">
                  <div class="height_30">
                  		<span v-text="ladingInfo.warehouseDesc"></span>
						<span class="order_detail_sta" v-text='ladingInfo.ladingStatusDesc'></span>
                  </div>
                  <div v-cloak class="height_30">
						<span v-text='ladingInfo.ecLadingCode'></span>
		             	<a href="javascript:;" v-bind:data-clipboard-text="ladingInfo.ecLadingCode" class="weui-btn weui-btn_mini weui-btn_default detail_copy" id="copy_lading_code">复制</a>
                  </div>
              </div>
         </div>
         
         <div style="margin-top:70px;">
	         <div class="weui-cells page__category-content" style='font-size:14px;margin-right:10px;'>
	              <a class="weui-cell weui-cell_access js_item" data-id="button" href="javascript:;">
	                  <div class="weui-cell__bd border_bottom">
	                      <p style='float:left;'>货物明细</p>
	                  </div>
	              </a>
	              <div class="m-order" v-for="(d,index) in ladingInfo.ladingDetailList">
       				<div class="height_30 lading-deatail-list">
						<span v-text="d.brandNameDesc+''+d.calculateTypeDesc+'	'+d.placeSteelDesc+' '+d.textureDesc+' '+d.specification+'		￥'+d.buyPrice+'/吨'"></span><br/>
        				<span class="right" v-text="'开单量/金额：	'+d.buyQuantity+'件/'+d.buyWeight+'吨/￥'+d.staticBuyMoney"></span><br/>
        				<span class="right" v-text="'实提量/金额：	'+d.reallyQuantity+'件/'+d.reallyWeight+'吨/￥'+d.staticReallyMoney"></span>
                  	</div>
	       		  </div>
                  <div class="weui-cell__bd">
	                  <div class="height_30" style="margin-top:10px;height:70px;">
	                  	<div style='height:30px;'>开单量合计：<span v-text="ladingInfo.totalQuantity+'件/'+ladingInfo.totalWeight+'吨		￥'+ladingInfo.totalMoney"></span></div>
	                  	<div style='height:30px;'>实提量：<span v-text="ladingInfo.totalRealQuantity+'件/'+ladingInfo.totalRealWeight+'吨		￥'+ladingInfo.totalRealMoney"></span></div>
	                  </div>
                  </div>
	          </div>
	          <div class="page__category-content" style='font-size:14px;'>
	             <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class='lable_l'>提单备注</span>
                      	<span class='lable_r' v-text='ladingInfo.ladingComment'></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">运输费</span>
                      	<span class='lable_r' v-text="ladingInfo.isTrafficExpense==1?'含':'不含'"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class='lable_l'>出库费</span>
                      	<span class='lable_r' v-text="(ladingInfo.isOutWarehouseExpense==1?'含':'不含')+'	'+(ladingInfo.isVendorPay==1?'卖家支付':'买家支付')"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">出库方式</span>
                      	<span class='lable_r' v-text="ladingInfo.warehouseOutWay==1?'出库':'货权转让'"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">交货方式</span>
                      	<span class='lable_r' v-text="ladingInfo.deliveryTypeDsec"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">结算方式</span>
                      	<span class='lable_r' v-text="ladingInfo.settleTypeDesc"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">提货信息</span>
                      	<span class='lable_r' v-text="ladingInfo.projectText"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">开单时间</span>
                      	<span class='lable_r' v-if="ladingInfo.createdDatetime != null" v-text="new Date(ladingInfo.createdDatetime).formatDate('yyyy-MM-dd')"></span>
                      </div>
	              </div>
	               <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">业务员</span>
                      	<span class='lable_r' v-text='ladingInfo.salesman'></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">卖家</span>
                      	<span class='lable_r' v-text="ladingInfo.sellerName"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">提货单位</span>
                      	<span class='lable_r' v-text="ladingInfo.agentName"></span>
                      </div>
	              </div>
	          </div>
         </div>
         <!-- <div>
	         	<a class="weui-cell weui-cell_access js_item" href="javascript:;">
	                <div class="weui-cell__bd" style="text-align:center;">
	                    <button class="weui-btn weui-btn_primary qryBtn" style="width:30%;float:right;">提货设置</button>
	                </div>
	            </a>
            </div> -->
     </div>
	
	
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/lading-detail");
</script>
</html>
