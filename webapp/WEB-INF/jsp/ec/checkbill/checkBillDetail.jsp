<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>对账单详情</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/clipboard/clipboard.js"></script>

<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/checkbill/checkBillDetail.css");
</script>
<body>
	<div id="checkBill-detail" class="weui-tab g-page">
         <div class="weui-navbar">
              <div class="weui-cell__bd weui-navbar__item detail_header" style="padding-left:10px;">
                  <div class="height_30" style="margin-left:5px;height:20px;">
                  		<span v-text="'提货单位'+checkbill.deliveryUnitName"></span>
                  </div>
                  <div class="height_30" style="margin-left:5px; height:20px;">
						<span v-text="'合计                   		'+checkbill.totalQuantity+'件/'+Number(checkbill.totalWeight).toFixed(3)+'吨'"></span>
						<span style="float:right;margin-right:15px;" v-text="'￥'+Number(checkbill.totalMoney).toFixed(2)+'元'"></span>
                  </div>
              </div>
         </div>
         
         <div style="margin-top:70px;">
	         <div class="weui-cells page__category-content" style='font-size:14px;'>
	              <a class="weui-cell weui-cell_access js_item" data-id="button" href="javascript:;">
	                  <div class="weui-cell__bd border_bottom">
	                      <p style='float:left;color:#777;'>货物明细</p>
	                  </div>
	              </a>
                  <div class="weui-cell__bd" style='margin:10px; margin-left:10px;' v-if="checkbill.priceType==0 && checkbill.hasOtherExpenses == 1 && checkbill.chargingModel==1">
	                  <div class="ml10" v-for="d in checkbill.iteams">
	                  	<span style='font-weight:bold;' v-text="d.resDesc"></span>
	                  	<table style='width:100%;'>
	                  		<tr>
	                  			<td style="color:#777;">合同号</td>
	                  			<td v-text="d.contractCode"></td>
	                  			<td style="color:#777;">货物单价</td>
	                  			<td v-text="'￥'+Number(d.goodsPrice).toFixed(2)+'/吨'"></td>
	                  		</tr>
	                  		<tr>
	                  			<td style="color:#777;">提单号</td>
	                  			<td v-text="d.ladingCode"></td>
	                  			<td style="color:#777;">其他费用</td>
	                  			<td v-text="'￥'+Number(d.otherExpenses).toFixed(2)+'/吨'"></td>
	                  		</tr>
	                  		<tr>
	                  			<td style="color:#777;">结算重量</td>
	                  			<td v-text="Number(d.settlementWeight).toFixed(3)+'吨'"></td>
	                  			<td style="color:#777;">结算单价</td>
	                  			<td v-text="'￥'+Number(d.settlementPrice).toFixed(2)+'/吨'"></td>
	                  		</tr>
	                  	</table>
	                  </div>
                  	<span style="float:right;margin-right:15px;" v-text="'合计：'+Number(checkbill.totalWeight).toFixed(3)+'吨/'+Number(checkbill.totalMoney).toFixed(2)+'元'"></span>
                  </div>
                  <div class="weui-cell__bd" style='margin-left:20px;' v-if="checkbill.priceType==1 || (checkbill.priceType==0 && checkbill.hasOtherExpenses == 0)">
	                  <div class="ml10"  v-for="d in checkbill.iteams">
	                  	<span style='font-weight:bold;' v-text="d.resDesc"></span>
	                  	<table style='width:100%;'>
	                  		<tr>
	                  			<td style="color:#777;">合同号</td>
	                  			<td v-text="d.contractCode"></td>
	                  			<td style="color:#777;">结算重量</td>
	                  			<td v-text="Number(d.settlementWeight).toFixed(3)+'吨'"></td>
	                  			
	                  		</tr>
	                  		<tr>
	                  			<td style="color:#777;">提单号</td>
	                  			<td v-text="d.ladingCode"></td>
	                  			<td style="color:#777;">结算单价</td>
	                  			<td v-text="'￥'+Number(d.settlementPrice).toFixed(2)+'/吨'"></td>
	                  		</tr>
	                  	</table>
	                  </div>
                  	<span style="float:right;padding-bottom:10px;" v-text="'合计：'+Number(checkbill.totalWeight).toFixed(3)+'吨/'+Number(checkbill.totalMoney).toFixed(2)+'元'"></span>
                  </div>
                  <div class="weui-cell__bd" style='margin-left:20px;' v-if="checkbill.priceType==0 && checkbill.hasOtherExpenses == 1 && checkbill.chargingModel==2 ">
	                  <div v-for="d in checkbill.iteams">
	                  	<span style='font-weight:bold;' v-text="d.resDesc"></span>
	                  	<table style='width:100%;'>
	                  		<tr>
	                  			<td style="color:#777;">合同号</td>
	                  			<td v-text="d.contractCode"></td>
	                  			<td style="color:#777;">结算重量</td>
	                  			<td v-text="Number(d.settlementWeight).toFixed(3)+'吨'"></td>
	                  			
	                  		</tr>
	                  		<tr>
	                  			<td style="color:#777;">提单号</td>
	                  			<td v-text="d.ladingCode"></td>
	                  			<td style="color:#777;">货物单价</td>
	                  			<td v-text="'￥'+Number(d.goodsPrice).toFixed(2)+'/吨'"></td>
	                  		</tr>
	                  	</table>
	                  </div>
                  	<span style="float:right;" v-text="'其他费用：'+Number(checkbill.totalOtherExpenses).toFixed(2)+'元'"></span><br/>
                  	<span style="float:right;" v-text="'合计：'+Number(checkbill.totalWeight).toFixed(3)+'吨/'+Number(checkbill.totalMoney).toFixed(2)+'元'"></span>
                  </div>
	          </div>
	          <div class="page__category-content" style='font-size:14px;padding-bottom:18px;'>
	             <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class='lable_l'>对账单号</span>
                      	<span class='lable_r' v-text='checkbill.chkBillCode'></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class="lable_l">卖方</span>
                      	<span class='lable_r' v-text="checkbill.sellerName"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd border_bottom">
                      <div class="height_30">
                      	<span class='lable_l'>创建时间</span>
                      	<span class='lable_r' v-text="new Date(checkbill.createdDatetime).formatDate('yyyy-MM-dd HH:mm')"></span>
                      </div>
	              </div>
	              <div class="weui-cell__bd">
                      <div class="height_30">
                      	<span class="lable_l">备注</span>
                      	<span class='lable_r' v-text="checkbill.comment" style="padding:5px 5% 5% 0; width:65%; line-height:20px;"></span>
                      </div>
	              </div>
	          </div>
         </div>
     </div>
	
	
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/checkbill/checkbill-detail.js");
</script>
</html>
