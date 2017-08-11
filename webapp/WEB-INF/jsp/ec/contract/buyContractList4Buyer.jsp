<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>现货合同列表</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/contract/contractList.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<body>
	<div id='g-page' class="g-page">
	     <div id="tab" class="weui-tab">
            <div class="weui-navbar">
                    <div class="weui-navbar__item" @click="pendingClick();">待处理</div>
                    <div class="weui-navbar__item" @click="doneClick();">已处理</div>
                    <div  class="u-query-btn" @click="showSearchPanel();">
                        <i class="weui-icon-search" style="font-size:20px;" ></i>
                    </div>
            </div>
            <div class="weui-tab__panel">
                <div class="weui-tab__content">
                    <ul class="m-list">
                        <li v-for="e in pendingPage.list"  class="item" @click="toContractDetail(e.contractId,e.contractCode,e.contractStatus);">
                            <div v-for="r in e.detailList" class="res">
                                 <div class="rg">
                                    <div v-text="'¥'+r.buyPrice+'/吨'"></div>
                                    <div>
                                        <span v-text="r.buyQuantity+r.calculateTypeDesc"></span>
                                        /
                                        <span v-text="r.buyWeight+'吨'"></span>
                                    </div>
                                </div>
                                <div class="lf">
                                    <div>
	                                    <span v-text="r.brandName"></span>
	                                    <span v-text="'('+r.calculateTypeDesc+')'"></span>
	                                    <span v-text="r.placeSteelName"></span>
                                    </div>
                                   <div>
                                     <span v-text="r.textureName"></span>
                                     <span v-text="r.specification"></span>
                                   </div>
                                </div>
                            </div>
                            <div class="contrat-info">
	                            <div>
	                                <span>合计：</span>
	                                <b v-text="e.totalBuyQuantity"></b>
	                                <b>件/</b>
	                                <b v-text="e.totalBuyWeight"></b>
	                                <b>吨</b>
	                                <b v-text="'¥'+e.totalBuyMoney"></b>
	                            </div>
	                            <div>
	                                <span>合同号：</span>
	                                <b v-text="e.contractCode"></b>
	                            </div>
	                             <div>
	                                <span>签订日期：</span>
	                                <b v-text="e.createdDatetime ? new Date(e.createdDatetime).formatDate('yyyy-MM-dd'):''"></b>
	                            </div>
	                            <div>
                                    <span>卖家：</span>
                                    <b v-text="e.sellerName"></b>
                                </div>
	                            <div class="contract-status" v-text="e.contractStatusDesc"></div>
	                            <button v-cloak v-if="e.contractStatus === 1" class="weui-btn weui-btn_mini contract-sure-btn">确认合同</button>
                            </div>
                            <div class="blank"></div>
                        </li>
                        
                    </ul>
                   
			        <div v-cloak v-if="pendingPage.list.length === 0" class="weui-loadmore weui-loadmore_line">
			            <span class="weui-loadmore__tips">暂无数据</span>
			        </div>
			        <div v-cloak v-if="pendingPage.list.length === 0" class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
                        <span class="weui-loadmore__tips"></span>
                    </div>
                    
                    <div v-if="pendingPage.isReq" class="weui-loadmore">
                        <i class="weui-loading"></i>
                        <span class="weui-loadmore__tips">正在加载</span>
                    </div>
                     <div v-if="!pendingPage.isReq && pendingPage.pageNo<pendingPage.totalPage" class="weui-loadmore">
                        <a class="weui-loadmore__tips" @click="pendingNextPage();">加载更多</a>
                    </div>
                    
                </div>
                <div class="weui-tab__content">
                     <ul class="m-list">
                        <li v-for="e in donePage.list"  class="item" @click="toContractDetail(e.contractId,e.contractCode,e.contractStatus);">
                            <div v-for="r in e.detailList" class="res">
                                 <div class="rg">
                                    <div v-text="'¥'+r.buyPrice+'/吨'"></div>
                                    <div>
                                        <span v-text="r.buyQuantity+r.calculateTypeDesc"></span>
                                        /
                                        <span v-text="r.buyWeight+'吨'"></span>
                                    </div>
                                </div>
                                <div class="lf">
                                    <div>
                                        <span v-text="r.brandName"></span>
                                        <span v-text="'('+r.calculateTypeDesc+')'"></span>
                                        <span v-text="r.placeSteelName"></span>
                                    </div>
                                   <div>
                                     <span v-text="r.textureName"></span>
                                     <span v-text="r.specification"></span>
                                   </div>
                                </div>
                            </div>
                            <div class="contrat-info">
                                <div>
                                    <span>合计：</span>
                                    <b v-text="e.totalBuyQuantity"></b>
                                    <b>件/</b>
                                    <b v-text="e.totalBuyWeight"></b>
                                    <b>吨</b>
                                    <b v-text="'¥'+e.totalBuyMoney"></b>
                                </div>
                                <div>
                                    <span>合同号：</span>
                                    <b v-text="e.contractCode"></b>
                                </div>
                                 <div>
                                    <span>签订日期：</span>
                                    <b v-text="e.createdDatetime ? new Date(e.createdDatetime).formatDate('yyyy-MM-dd'):''"></b>
                                </div>
                                <div>
                                    <span>卖家：</span>
                                    <b v-text="e.sellerName"></b>
                                </div>
                                <div class="contract-status" v-text="e.contractStatusDesc"></div>
                            </div>
                            <div class="blank"></div>
                        </li>
                    </ul>
                   
                    <div v-cloak v-if="donePage.list.length === 0" class="weui-loadmore weui-loadmore_line">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                    <div v-cloak v-if="donePage.list.length === 0" class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
                        <span class="weui-loadmore__tips"></span>
                    </div>
                    
                    <div v-if="donePage.isReq" class="weui-loadmore">
                        <i class="weui-loading"></i>
                        <span class="weui-loadmore__tips">正在加载</span>
                    </div>
                     <div v-if="!donePage.isReq && donePage.pageNo<donePage.totalPage" class="weui-loadmore">
                        <a class="weui-loadmore__tips" @click="doneNextPage();">加载更多</a>
                    </div>
                </div>
            </div>
        </div> 
         
         <!-- 查询 -->
         <div id="search-panel" v-bind:class="['m-search-panel',{'show':isShowSearchPanel}]">
			<div class="hd f-cb">
			     <i class="iconfont u-back-left" @click="hideSearchPanel" ></i>
			     <h3 class="u-title">查询条件</h3>
			</div>
			<div class="bd weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">签订日期</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="st-ipt" @click="startDateChoice();" v-model="queryParam.startDate" readonly="readonly" />
                            -
                            <input class="ed-ipt" @click="endDateChoice();" v-model="queryParam.endDate" readonly="readonly"/>
                        </div>
                    </div>
                      <div class="weui-cell weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">合同类型</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" v-model="queryParam.contractType" >
                                <option 
                                    v-for="e in queryParam.contractTypeList"
                                    :key="e.type"
                                    v-text="e.desc"
                                    v-bind:value="e.type"
                                ></option>
                            
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">合同状态</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" v-model="queryParam.contractStatus" >
                                <option 
                                    v-for="e in contractStatus"
                                    :key="e.status"
                                    v-text="e.text"
                                    v-bind:value="e.status"
                                   
                                ></option>
                            
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">卖家</label>
                        </div>
                        <div class="weui-cell__bd">    
                               <input class="weui-input" type="text"  v-model="queryParam.sellerName" placeholder="请输入卖家会员名称" />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div style="width: 150px;text-align: center;"  class="weui-cell__hd">
                           <a @click="queryByBtn();" class="weui-btn weui-btn_mini weui-btn_primary" href="javascript:void(0);">查询</a>
                        </div>
                        <div class="weui-cell__bd">    
                             <a @click="clearByBtn();" class="weui-btn weui-btn_mini weui-btn_primary" href="javascript:void(0);">清除</a>
                        </div>
                       
                    </div>
                    
                </div>
		</div>
		<!-- 查询界面背景 -->
		<div class="weui-mask" style="z-index: 501;" @click="hideSearchPanel"
		  v-bind:class="[{'f-hide':!isShowSearchPanel}]" ></div>
		
     </div>
	
	
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/contract/buy-contract-list");
</script>

</script>
</html>
