<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>报价单</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/quote/quoteList.css" />
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/quote/quoteList.css");
</script>
<body>
		<div id="g-page" class="g-page" v-cloak>
			<div class="g-header">
				<div class="weui-navbar" style="z-index: 0;">
                <div class="weui-navbar__item weui-bar__item_on">
                                         报价单
                    <a href="javascript:void(0)" @click="searchQuoteList" class="weui-icon-search m-quote-search-icon"></a>
                </div>
                <div @click="showPublishDemand" class="weui-navbar__item" >
                                      发布需求
                    <a href="javascript:void(0)"@click="showPublishDemand" class="m-shop-car"  >
                            <span class="num">0</span>
                    </a>
                </div>
            </div>
			</div>
			<div id="g-content" class="g-content">
				<div class="m-quote">
					
					<ul v-for="(futures,index) in futuresList" v-cloak>
						<li>
							<div class="mt10" style="clear: both;">
								<a v-if="addPrice[index].addPriceList.length >0" class="txt-a" @click=showAddPrice(futures[0].memberId) href="javascript:void(0);">查看厚度加价</a>
								<a v-if="addPrice[index].freightQuoteList.length >0" class="txt-a" @click=showTransportFeeView(futures[0].memberId) href="javascript:void(0);">查看运费加价</a>
							</div>
							<div class="info" style="clear: both;">
								<span v-if="futures[0].cueWord" style="color:red;padding-left: 18px; display:block; margin:10px; padding:5px; border: 1px solid #ebebeb;" v-text="'提示：'+futures[0].cueWord"></span>
							</div>
							
							<ul>
								<li v-for="e in futures">
									<div >
										<div class="txt-head">
											<div class="left">
												<label class="lab ">
													<span v-if="e.quoteLists.length > 0" v-text="'期货：'+e.brandName"></span>
													<span v-if="e.spotgoods.length > 0" v-text="'现货：'+e.brandName"></span>
												</label>
												<span class="lab"><span v-text="e.cityName"></span><sapn v-if="e.areaName != '不限'" v-text="e.areaName"></sapn>&emsp;<span v-if="e.priceType==1" v-text="'自提价'"></span><span v-if="e.priceType==2" v-text="'配送价'"></span><span v-if="e.priceType==3" v-text="'出厂价'"></span></span>
												<br><span class="lab"><span v-text="'钢厂：'+e.steelWorkName"></span></span>
											</div>
											<div class="right" v-text="e.sellerName"></div>
										</div>
										<table class="m-quote-list">
											<thead>
												<tr v-if="e.quoteLists.length > 0" ><th style="width: 10em;">规格</th><th>报价</th><th>重量(吨)</th><th>交货期</th><th style="width: 3em;">选购</th></tr>
												<tr v-if="e.spotgoods.length > 0" ><th>材质</th><th>规格</th><th>报价</th><th>重量(吨)</th><th style="width: 3em;">选购</th></tr>
											</thead>
											<tbody>
											<tr v-if="e.quoteLists.length > 0" v-for="ee in e.quoteLists">
												<td v-text="ee.specificationName"></td>
												<td v-text="ee.quotePrice"></td>
												<td v-text="ee.availableQuantity"></td>
												<td v-text="ee.deliveryDeadline"></td>
												<td>
													<label class="weui-cells_checkbox"> 
							               				<input v-if="ee.quoteStatus == 2" v-bind:value="ee.id" v-bind:price-type="e.priceType" v-bind:data-type="'qh'" v-bind:memberId="ee.memberId" type="checkbox" class="weui-check" />
							               				<i v-if="ee.quoteStatus == 2" class="weui-icon-checked"></i>
							               				<span v-if="ee.quoteStatus == 1" v-text="'暂停交易'"></span>
							               			</label>
						               			</td>
											</tr>
											<tr v-if="e.spotgoods.length > 0" v-for="ee in e.spotgoods">
												<td v-text="ee.texture"></td>
												<td v-text="ee.specification"></td>
												<td v-text="ee.price"></td>
												<td v-text="ee.weight"></td>
												<td>
													<label class="weui-cells_checkbox"> 
							               				<input v-bind:value="ee.listingIds" v-bind:price-type="e.priceType" v-bind:areaSetId="ee.areaSetId" v-bind:cityName="ee.cityName" v-bind:data-type="'xh'" type="checkbox" v-bind:memberId="ee.sellerId" class="weui-check"/>
							               				<i class="weui-icon-checked"></i>
							               			</label>
												</td>
											</tr>
											</tbody>
										</table>
									</div>
								</li>
							</ul>
						</li>
					</ul>
					
				</div>

			</div>
			<div id="g-footer" class="g-footer">
				<div class="m-quote-footer">
					<a @click="toPreOrder" href="javascript:;"class="weui-btn weui-btn_primary">立&emsp;即&emsp;下&emsp;单</a>
				</div>
			</div>
			
			<!-- 查看加价厚度 -->
			
			<div id="addprice" @click="closeAddPriceView" class="m-quote-addprice hide">
				<div class="m-quote-price" @click="stopCloseAddPriceView" >
				     <div class="f-cb">
                        <i class="iconfont u-back-left" @click="closeAddPriceView" ></i>
                        <h3 class="u-title">厚度加价</h3>
                       </div>
					<div class="weui-cell weui-cell_select weui-cell_select-after">
					    <div class="weui-cell__hd">
							<label for="" class="weui-label">品名</label>
						</div>
						<div class="weui-cell__bd">
							<select class="weui-select" @change="setThicknessBrand($event)" >
								<option 
								    v-for="e in brandList"
				                    :key="e.id"
				                    v-text="e.brandName"
				                    v-bind:value="JSON.stringify(e)"
				                    v-bind:brandId="e.brandId"
				                    v-bind:selected="(thicknessBrand && thicknessBrand.id  === e.id) ? 'selected':''"
								></option>
							
							</select>
						</div>
					</div>
					<div class="weui-cell weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">钢厂</label>
                        </div>
                        <div class="weui-cell__bd">    
                            <select class="weui-select" @change="setThicknessSteelWork($event)"  >
                                <option 
                                    v-for="e in steelWorkList"
                                    :key="e.id"
                                    v-text="e.steelWorkName"
                                    v-bind:value="JSON.stringify(e)"
                                    v-bind:selected="(thicknessSteelWork && thicknessSteelWork.id  === e.id) ? 'selected':''"
                                ></option>
                            
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">规格</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" @change="setThicknessSpecification($event)" >
                                <option 
                                    v-for="e in specificationList"
                                    :key="e.specificationId"
                                    v-text="e.specificationName"
                                    v-bind:value="JSON.stringify(e)"
                                    v-bind:selected="(thicknessSpecification && thicknessSpecification.specificationId  === e.specificationId) ? 'selected':''"
                                ></option>
                            
                            </select>
                        </div>
                    </div>
			       <table>
			       	<thead>
			       		<tr style="border-top: 1px solid darkgray;"><th>厚度</th><th>价格</th></tr>
			       	</thead>
			       	<tbody>
			       		<tr v-for="e in addPriceList"><td v-text="e.thickness"></td><td v-text="e.thicknessPrice"></td></tr>
			       	</tbody>
			       </table>
				</div>
			</div>
			
			<!-- end -->
			<!-- 查看运费报价 -->
			<div id="transportFee" @click="closeTransportFeeView" class="m-quote-transportfee hide">
				<div class="m-quote-fee" @click="stopCloseTransportFeeView" >
				    <div class="f-cb">
		                    <i class="iconfont u-back-left" @click="closeTransportFeeView" ></i>
		                    <h3 class="u-title">运费报价</h3>
		            </div>
			       <ul>
			       		<li v-for="e in freightQuoteList">
							<div class="txt-line">
					        	<label class="lab" v-text="'品名：'"></label>
					        	<span class="txt" v-text="e.brandName"></span>
					       </div>
					       <table>
					       	<thead>
					       		<tr style="border-top: 1px solid darkgray;background: #DEDBDB;"><th>起始点</th><th>目的地</th><th>不含税报价</th><th>含税报价</th></tr>
					       	</thead>
					       	<tbody>
					       		<tr v-for="ee in e.freightQuoteList"><td v-text="ee.beginAddr"></td><td v-if="!ee.memo" v-text="ee.endAddr"></td><td v-if="ee.memo" v-text="ee.endAddr+'('+ee.memo+')'"></td><td v-text="ee.unTaxFee"></td><td v-text="ee.taxFee"></td></tr>
					       	</tbody>
					       </table>
				       	</li>
			       </ul>
				</div>
			</div>
			<!-- end -->
			
			<!-- 查询报价单 -->
			<div id="searchQuoteList" @click="closeSaerchView" class="m-quote-transportfee hide">
				<div class="m-quote-search" @click="stopCloseSaerchView" >
				 <div class="f-cb">
                    <i class="iconfont u-back-left" @click="closeSaerchView" ></i>
                    <h3 class="u-title">报价单查询</h3>
                </div>
				
			      <ul>
			       	
			       	<li><div class="lab"><label>地区</label></div><div @click="chooseDistrict" id="chooseCity" class="txt"><span id="city" v-bind:province="queryData.provinceName" v-bind:city="queryData.city" v-text="currentCity" v-model="currentCity"></span><a class="u-right"></a></div>
			       	</li>
			       	<li><div class="lab"><label>卖家</label></div><div @click="chooseSeller" class="txt"><span id="seller" v-bind:sellerMemberId="queryData.memberId" v-text="queryData.sellerName"></span><a class="u-right"></a></div>
			       	</li>
			       	<li><div class="lab"><label>品名</label></div><div @click="chooseBrandName" class="txt"><span id="brandName" v-bind:data-brand-id="queryData.brandId" v-text="queryData.brandName"></span><a class="u-right"></a></div>
			       	</li>
			       	<li><div class="lab"><label>报价方式</label></div><div @click="chooseQuoteType" class="txt"><span id="quoteType" v-bind:priceType="queryData.priceType" v-text="queryData.priceTypeStr"></span><a class="u-right"></a></div>
			       	</li>
			       	<li style="border-bottom: 0px;"><input id="defaultCheck" style="margin-left: 5px;" type="checkbox" checked>设为默认条件
			       	</li>
			       </ul>
			       	<a href="javascript:void(0)" class="search-btn weui-btn weui-btn_mini weui-btn_primary" @click="searchQuoteListData()">查&emsp;询</a>
				</div>
			</div>
			<!-- end -->
	

<div class="weui-skin_android" id="cityActionsheet" style="display: none">
        <div class="weui-mask"></div>
        <div class="weui-actionsheet">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell">示例菜单</div>
                <div class="weui-actionsheet__cell">示例菜单</div>
                <div class="weui-actionsheet__cell">示例菜单</div>
            </div>
        </div>
</div>
<div class="weui-skin_android" id="sellerActionsheet" style="display: none">
        <div class="weui-mask" @click="closeSellerPick"></div>
        <div class="weui-actionsheet">
            <div class="weui-actionsheet__menu">
                <div v-bind:data-sell-id="'0'"class="weui-actionsheet__cell" v-text="'不限'" @click="sellerPick"></div>
                <div v-for="e in listSellers" v-bind:data-sell-id="e.sellerId" v-text="e.sellerName" class="weui-actionsheet__cell" @click="sellerPick"></div>
            </div>
        </div>
</div>
<div class="weui-skin_android" id="brandNameActionsheet" style="display: none">
        <div class="weui-mask" @click="closeBrandName"></div>
        <div class="weui-actionsheet">
            <div class="weui-actionsheet__menu">
                <div v-bind:data-id="'0'" v-bind:data-brand-id="'0'" class="weui-actionsheet__cell" v-text="'不限'" @click="brandNamePick"></div>
                <div v-for="e in brandList" v-bind:data-id="e.id" v-bind:data-brand-id="e.brandId" class="weui-actionsheet__cell" v-text="e.brandName" @click="brandNamePick"></div>
            </div>
        </div>
</div>
<div class="weui-skin_android" id="quoteTypeActionsheet" style="display: none">
        <div class="weui-mask" @click="closeQuoteTypeActionsheet"></div>
        <div class="weui-actionsheet">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" @click="chooseQuoteTypeActionsheet" data-price-type="0">不限</div>
                <div class="weui-actionsheet__cell" @click="chooseQuoteTypeActionsheet" data-price-type="1">自提价</div>
                <div class="weui-actionsheet__cell" @click="chooseQuoteTypeActionsheet" data-price-type="2">配送价</div>
                <div class="weui-actionsheet__cell" @click="chooseQuoteTypeActionsheet" data-price-type="3">出厂价</div>
            </div>
        </div>
</div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/quote/quote-list.js");
</script>

</script>
</html>
