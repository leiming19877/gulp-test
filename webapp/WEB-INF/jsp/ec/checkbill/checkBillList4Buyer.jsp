<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<!-- <title>我的对账单</title> -->
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/checkbill/checkBillList.css");
</script>
<body>
	<div id='g-page' class="weui-tab g-page">
         <div class="weui-navbar">
             <div class="weui-navbar__item">
             	我的对账单
                 <i class="weui-icon-search" style="font-size:20px; margin-right:10px;float:right;" @click="showSearchPanel()"></i>
             </div>
         </div>
         <div class="m-order-content show">
         	<ul id="orderList">
         		<li v-for="e in dataList" @click="toCHKBillDetail(e.id)" class='border-bottom'>
         			<div class="m-order">
         				<div class="m-order-info1">
         					<span class="info" v-text="e.deliveryUnitName"></span>
	         				<span class="right" v-text="e.warehouseDesc"></span>
	         			</div>
         				<div class="m-order-info1">
         					<span class="info" v-text="e.chkBillCode"></span>
         					<span class="right" v-text="new Date(e.createdDatetime).formatDate('yyyy-MM-dd HH:mm')"></span>
         				</div>
	         			<div class="blank"></div>
         			</div>
         			<div class="m-order">
         				<div class="m-order-info1">
         					<span class="info" v-text="'结算重量:'+e.totalQuantity+'件/'+e.totalWeight.toFixed(3)+'吨'"></span>
	         			</div>
	         			<div class="m-order-info1">
	         				<span class=info v-text="'结算金额:'+e.totalMoney.toFixed(2)+'元'"></span>
	         			</div>
         			</div>
         			<div class="blank"></div>
         		</li>
         		<li v-cloak v-if="dataList == null || dataList.length==0">
         			<div class='no-order'>您还没有相关对账单</div>
         		</li>
         	</ul>
         	<div v-cloak class="hide" id="loadMore">
	         	<a class="weui-cell weui-cell_access js_item" href="javascript:;" @click="loadMore()">
	                <div class="weui-cell__bd" style="text-align:center;">
	                    <p>加载更多</p>
	                </div>
	            </a>
            </div>
         </div>
         
         
         <!-- 查询 -->
         <div v-cloak id="searchPanel" @click="closeSearch" class="m-quote-addprice hide">
			<div class="m-quote-price" @click="stopCloseSearchPanel">
			    <div class="hd f-cb">
                         <i class="iconfont u-back-left" @click="closeSearch" ></i>
                         <h3 class="u-title">查询条件</h3>
                </div>
				<div style="margin-top: 0;" class="weui-cells page__category-content">
	                 <a class="weui-cell weui-cell_access js_item" data-id="button" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>对账日期</p>
	                     </div>
	                     <input id="startDate" @click="pickStartDate($event)" readonly="readonly" class="u-ipt-min" name="startDate" style="width: 6em; text-align: center;" value="" />&nbsp;-&nbsp;
						 <input id="endDate" @click="pickEndDate($event)" readonly="readonly" class="u-ipt-min" name="endDate" style="width:6em; text-align: center;" value="" />
	                 </a>
	                 <a class="weui-cell weui-cell_access js_item" data-id="input" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>对账单号
		                 		<input id="chkBillCode" class="search-input" type="text" placeholder="请输入关键字">
		                	</p>
	                     </div>
	                 </a>
	                 <a class="weui-cell weui-cell_access js_item" data-id="input" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>提货单位
		                 		<input id="deliveryUnitName" class="search-input" type="text" placeholder="请输入关键字">
		                	</p>
	                     </div>
	                 </a>
	                 <a class="weui-cell weui-cell_access js_item" data-id="list" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>对账单类型</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_billType"></div>
	                     <input type="hidden" value="-1" id="billType"/>
	                 </a>
	                 <!-- <a class="weui-cell weui-cell_access js_item" data-id="slider" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>对账单状态</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_billStatus"></div>
	                     <input type="hidden" value="-1" id="billStatus"/>
	                 </a> -->
	                 <a class="weui-cell weui-cell_access js_item" data-id="uploader" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>卖家
	                         	<input id="sellerName" class="search-input" style="margin-left:15px;" type="text" placeholder="请输入关键字">
	                         </p>
	                     </div>
	                 </a>
	                 
	                 <div class="weui-cell btn-area">
                         <div style="width: 150px;text-align: center;" class="weui-cell__hd">
                             <button @click="doQuery" class="weui-btn weui-btn_mini weui-btn_primary qryBtn" >查询</button>
                        </div>
                        <div class="weui-cell__bd">    
                            <button @click="clearBtn" class="weui-btn weui-btn_mini weui-btn_primary clearBtn" >清空</button> 
                        </div>       
                     </div>
	             </div>
	            
			</div>
		</div>
		<div class="js_dialog" id="iosDialog2" style="opacity: 1;display:none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__bd">请先输入交货起始日期，起始日期须大于结束日期！</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="doneClose($event)" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
		        </div>
		    </div>
		</div>
     </div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/checkbill/checkbill-list.js");
</script>

</script>
</html>
