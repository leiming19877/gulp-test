<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>我的提单</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/lading/ladingList.css");
</script>
<body>
	<div id='g-page' class="weui-tab g-page">
         <div class="weui-navbar">
             <div id='type_all' @click="changeTab('type_all','-1')" class="weui-navbar__item weui-bar__item_on">全部</div>
             <!-- <div id='type_dsx' @click="changeTab('type_dsx','1,2,3,9')" class="weui-navbar__item">待提货设置</div> -->
             <div class="weui-navbar__item">
                 <i class="weui-icon-search" style="font-size:20px;" @click="showSearchPanel()"></i>
             </div>
         </div>
         <div class="m-order-content show">
         	<ul id="orderList">
         		<li v-for="e in dataList" @click="toLadingDetail(e.ladingId)">
         			<div class="m-order">
         				<div class="m-order-info1">
         					<span class="info" v-text="e.warehouseDesc"></span>
	         				<span class="right blue" v-text="e.ladingStatusDesc"></span>
	         			</div>
         				<div class="m-order-info1">
         					<span class="info" v-text="((e.ladingCode == null || e.ladingCode == '')?e.ecLadingCode:e.ladingCode)+'		'+e.deliveryTypeDsec"></span>
         					<span class="right" v-text="new Date(e.createdDatetime).formatDate('yyyy-MM-dd HH:mm')"></span>
         				</div>
         			</div>
         			<div class="m-order" v-for="(d,index) in e.ladingDetailList" v-if="index<2">
         				<div class="blank"></div>
         				<div class="m-order-info1">
         					<span class="info" v-text="d.brandNameDesc+d.calculateTypeDesc+'	'+d.placeSteelDesc+' '+d.textureDesc+' '+d.specification"></span>
	         				<span class="right" v-text="'¥'+d.buyPrice+'/吨'"></span>
	         			</div>
         				<div class="m-order-info1">
         					<!-- <span class="info" v-text="d.warehouseDesc"></span> -->
         					<span class="right" v-text="d.buyQuantity+'件/'+d.buyWeight+'吨'"></span>
         				</div>
	         			
         			</div>
        			<div v-cloak style="text-align: center;" v-if="e.ladingDetailList.length > 2">
        				查看其余<span v-text='e.ladingDetailList.length - 2'></span>>条资源
         			</div>
         			<div class="blank"></div>
         			<div class="m-order">
         				<div class="m-order-info1" style="height: auto;">
         					<div class="info" v-text="'开单量：'+e.totalQuantity+'件/'+e.totalWeight+'吨'+'  ¥'+e.totalMoney"></div>
         					<div class="info" v-text="'实提量：'+e.totalRealQuantity+'件/'+e.totalRealWeight+'吨'+'  ¥'+e.totalRealMoney"></div>
         				</div>
         				<!-- <div class="right-button">
         					<a @click.stop="ladingSetting(e.ladingId)" href="javascript:;" v-if="e.ladingStatus==1 || e.ladingStatus==2 || e.ladingStatus==3 || e.ladingStatus==9" class="weui-btn weui-btn_mini weui-btn_primary">提货设置</a>
         				</div> -->
         			</div>
         			<div class="line-blank"></div>
         		</li>
         		<li v-cloak v-if="dataList == null || dataList.length==0">
         			<div class='no-order'>您还没有相关提单</div>
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
	                         <p>开单日期</p>
	                     </div>
	                     <input id="startDate" @click="pickStartDate($event)" readonly="readonly" class="u-ipt-min" name="startDate" style="width: 6em; text-align: center;" value="" />&nbsp;-&nbsp;
						 <input id="endDate" @click="pickEndDate($event)"  readonly="readonly"  class="u-ipt-min" name="endDate" style="width:6em; text-align: center;" value="" />
	                 </a>
					<a class="weui-cell weui-cell_access js_item" data-id="uploader" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>提单号
	                         	<input id="ecLadingCode" class="search-input" style="margin-left:15px;" type="text" placeholder="请输入关键字">
	                         </p>
	                     </div>
	                 </a>	                 
	                 <a class="weui-cell weui-cell_access js_item" data-id="list" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>提货仓库</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_warehouse"></div>
	                     <input type="hidden" value="-1" id="warehouseId"/>
	                 </a>
	                 <a class="weui-cell weui-cell_access js_item" data-id="slider" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>提单状态</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_ladingSta"></div>
	                     <input type="hidden" value="-1" id="ladingStatus"/>
	                 </a>
	                 <a class="weui-cell weui-cell_access js_item" data-id="list" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>交货方式</p>
	                     </div>
	                     <div class="weui-cell__ft" id="showPicker_jhfs"></div>
	                     <input type="hidden" value="-1" id="deliveryType"/>
	                 </a>
	                 <a class="weui-cell weui-cell_access js_item" data-id="input" href="javascript:;">
	                     <div class="weui-cell__bd">
	                         <p>卖家
		                 		<input id="sellerName" class="search-input" type="text" placeholder="请输入关键字">
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
    seajs.use("module/ec/lading/lading-list.js");
</script>

</script>
</html>
