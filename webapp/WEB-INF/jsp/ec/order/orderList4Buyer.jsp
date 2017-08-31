<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>订单列表</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/order/orderList.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<body>
	<div id='g-page' class="weui-tab g-page">
         <div class="weui-navbar">
             <div id='type_all' @click="changeTab('type_all','-1')" class="weui-navbar__item weui-bar__item_on">全部</div>
             <div id='type_dsx' @click="changeTab('type_dsx','1,31,32')" class="weui-navbar__item">待生效</div>
             <div id='type_zxz' @click="changeTab('type_zxz','4')" class="weui-navbar__item">执行中</div>
             <div id='type_ywc' @click="changeTab('type_ywc','5,42')" class="weui-navbar__item">已完成</div>
             <div class="weui-navbar__item">
                 <i class="weui-icon-search" style="font-size:20px;" @click="showSearchPanel()"></i>
             </div>
         </div>
         <div v-cloak name='type_all' class="m-order-content show">
         	<ul id="orderList">
         	    
         		<li v-for="e in dataList" @click="toOrderDetail(e.orderId)">
         		
         			<div class="m-order" v-for="(d,index) in e.iteams" v-if="index<2">
         			<div class="blank"></div>
         				<div class="m-order-info1">
         					<span class="info" v-text="d.brandNameDesc+' '+d.textureDesc+' '+d.specification+' '+d.placeSteelDesc"></span>
	         				<span class="right" v-text="'¥'+d.buyPrice+'/吨'"></span>
	         			</div>
         				<div class="m-order-info1">
         					<span class="info"  v-text="d.warehouseDesc"></span>
         					<span class="right" v-text="d.buyQuantity+'件/'+d.buyWeight+'吨'"></span>
         				</div>
         			</div>
        			<div v-cloak style="text-align: center;" v-if="e.iteams.length > 2">
        				更多<span>></span>
         			</div>
        			<div class="blank"></div>
         			<div class="m-order">
         				<div class="m-order-info1">
         					<span class="info" v-text="'订单合计：'+e.totalBuyQuantity+'件/'+e.totalBuyWeight+'吨   ¥'+e.totalBuyMoney"></span>
	         				<span class="right blue" v-text="e.orderStatusDesc"></span>
	         			</div>
         				<div class="m-order-info1">
         					<span class="info"  style="color:#ccc;" v-text="e.orderBusiId"></span>
         					<span class="right" style="color:#ccc;" v-text="new Date(e.createdDatetime).formatDate('yyyy-MM-dd HH:mm')"></span>
         				</div>
         			</div>
         			<div class="blank"></div>
         			<div v-cloak class="m-order">
         				<div class="m-order-info1" style="height: auto;">
         					<div class="info" v-text="'开单量：'+e.orderLadingQuanity+'件/'+e.orderLadingWeight+'吨'"></div>
         					<div class="info" v-text="'实提量：'+e.totalReallyQuantity+'件/'+e.totalReallyWeight+'吨'"></div>
         				</div>
         				<div class="right-button">
         					<a href="javascript:;" v-if="e.preOrderContractId != 0 && e.preOrderContractId != '' " @click.stop="toContractDetail(e.preOrderContractId)" class="weui-btn weui-btn_mini weui-btn_primary">查看合同</a>
		                   	<a href="javascript:;" v-if="e.totalReallyWeight > 0" @click.stop="toLadeList(e.orderId)" class="weui-btn weui-btn_mini weui-btn_primary">查看提单</a>
		                   	<a href="javascript:;" v-if="e.orderStatus == 25" @click.stop="confirmOrder(e.orderId)" class="weui-btn weui-btn_mini weui-btn_primary">确认订单</a>
		                   	<a href="javascript:;" v-if="e.orderStatus == 1" @click.stop="cancelOrder(e.orderBusiId)" class="weui-btn weui-btn_mini weui-btn_primary">作废订单</a>
         				</div>
         			</div>
         			<div class="line-blank"></div>
         		</li>
         		
         		<li v-cloak v-if="dataList == null || dataList.length==0">
         			<div class='no-order'>您还没有相关订单</div>
         		</li>
         	</ul>
         	<div class="hide" id="loadMore">
	         	<a class="weui-cell weui-cell_access js_item" href="javascript:;" @click="loadMore()"  style="display:block; margin:0px auto;">
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
				<div style="margin-top: 0;" class="weui-cells">
				    
	                 <div class="weui-cell weui-cell_access js_item" data-id="button" >
	                     <div class="weui-cell__bd">
	                         <p>下单日期</p>
	                     </div>
	                     <input id="startDate" readonly="readonly"  @click="pickStartDate($event)" class="u-ipt-min" name="startDate" style="width: 6em; text-align: center;" value="" />&nbsp;-&nbsp;
						 <input id="endDate"   readonly="readonly" @click="pickEndDate($event)" class="u-ipt-min" name="endDate" style="width:6em; text-align: center;" value="" />
	                 </div>
	                 <div class="weui-cell" >
	                     <div class="weui-cell__hd">
                            <label for="" class="weui-label">订单号</label>
                        </div>
                        <div class="weui-cell__bd">    
                               <input id="orderBusiId" class="weui-input"  type="text"  placeholder="请输入关键字" />
                        </div>
	                     
	                 </div>
	                 <div class="weui-cell"  >
	                     <div class="weui-cell__hd">
                            <label for="" class="weui-label">卖家</label>
                        </div>
                        <div class="weui-cell__bd">    
                               <input id="sellerName" class="weui-input"  type="text"  placeholder="请输入关键字" />
                        </div>
	                     
	                 </div>
	                 <div class="weui-cell weui-cell_access js_item" data-id="list" >
	                     <div class="weui-cell__bd">
	                         <p>交货方式</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_jhfs"></div>
	                     <input type="hidden" value="-1" id="deliveryType"/>
	                 </div>
	                 <div class="weui-cell weui-cell_access js_item"  >
	                     <div class="weui-cell__bd">
	                         <p>提货单位</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_thdw"></div>
	                     <input type="hidden" value="-1" id="agentName"/>
	                 </div>
	                 <div class="weui-cell"  >
	                     
	                    <div class="weui-cell__hd">
                            <label for="" class="weui-label">项目名称</label>
                        </div>
                        <div class="weui-cell__bd">    
                              <input id="projectName" class="weui-input"   type="text" placeholder="请输入关键字">
                        </div>
	                    
	                 </div>
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
		
		<!-- 作废 -->
		<div class="weui-mask" id="iosMask" style="display: none"></div>
		<div class="weui-actionsheet" id="iosActionsheet">
            <div class="weui-actionsheet__title">
                <p class="weui-actionsheet__title-text">请选择订单作废原因</p>
            </div>
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" @click="doCancelOrder('1')">价格原因</div>
                <div class="weui-actionsheet__cell" @click="doCancelOrder('2')">资源不能满足需求</div>
                <div class="weui-actionsheet__cell" @click="doCancelOrder('3')">计划变更</div>
                <div class="weui-actionsheet__cell" @click="doCancelOrder('4')">运输问题</div>
                <div class="weui-actionsheet__cell" @click="doCancelOrder('5')">操作失误</div>
                <div class="weui-actionsheet__cell" @click="doCancelOrder('6')">仓库问题</div>
                <div class="weui-actionsheet__cell" @click="doCancelOrder('7')">其他</div>
            </div>
            <div class="weui-actionsheet__action">
                <div class="weui-actionsheet__cell" id="iosActionsheetCancel">取消</div>
            </div>
        </div>
        
        <div v-cloak class="js_dialog" id="androidDialog1" style="opacity: 1;display:none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog weui-skin_android">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">确认订单</strong></div>
                <div class="weui-dialog__bd">
                    确认订此单
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" @click="closeConfirmWindow" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                    <a href="javascript:;" @click="doComfirOrder" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
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
    seajs.use("module/ec/order/order-list.js");
</script>

</script>
</html>
