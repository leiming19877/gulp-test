<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>下单</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />

<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<script type="text/javascript">
    //加载本模块样式
    seajs.use("${ctx}/css/module/ec/shopcart/shopcart.css");
</script>

<body>
	<div id="g-page" class="g-page">
		<div class="g-header">
			<a href="../quote/list" class="iconfont u-back-left"></a>
			<h3 class="u-title">下单</h3>
		</div>
		<div id="g-content" class="g-content">
			<div class="m-order">
			<div class="txt-blank"></div>
				<div class="txt-title">
					<label>期货资源：</label>
				</div>
				<div id="futures" v-cloak>
					<ul id="futures-list">
						<li v-for="(e,index) in quoteList" class="m-order-futures">
							<div class="info1">
								<span class="span1" v-text="e.steelWorkName+' '+e.brandName"></span>
								<span class="span2" v-text="e.deliveryDeadline"></span>
								<span id="quotePrice" class="span3" v-text="'￥'+e.quotePrice+'元/吨'"></span></div>
							<div class="info2">
								<a name="textures" v-for="(ee,d) in e.texNames" v-bind:data-texture="ee" v-text="ee" href="javascript:void(0);" @click="chooseTexture" v-bind:class="d===0?'weui-btn weui-btn_mini weui-btn_warn':'weui-btn weui-btn_mini weui-btn_default default'"></a>
							</div>
							<div class="info3">
								<input  readonly="readonly" unselectable="on" onfocus="this.blur()"  type="number" class="ipt1" name="width" @click="inputFutureWeight($event,'width')" v-bind:placeholder="e.width" v-bind:specificationId="e.specificationId"/>*
								<input  readonly="readonly" unselectable="on" onfocus="this.blur()" type="number" class="ipt1" name="thickness" @click="inputFutureWeight($event,'thickness')" v-bind:placeholder="e.thickness"  v-bind:specificationId="e.specificationId" v-bind:quoteId="e.id" v-bind:quotePrice="e.quotePrice2"/>
								<input  readonly="readonly" unselectable="on" onfocus="this.blur()"  type="number" name="futureWeight" @click="inputFutureWeight($event,'weight')" class="ipt2" value="" v-bind:availableQuantity="e.availableQuantity" v-bind:placeholder="'可售'+e.availableQuantity" />&nbsp;吨
								<a href="javascript:void(0);" class="weui-icon-cancel" @click="deleteRowResource($event,e.id,index)"></a>
								<a href="javascript:void(0);" class="copy" @click="copyRowResource($event,e.id,index)">复制</a>
							</div>
						</li>				
					</ul>
				</div>
				<div class="txt-blank"></div>
				<div class="txt-title">
					<label>现货资源：</label>
				</div>
				<div id="spotgoods" v-cloak>
					<ul>
						<li class="m-order-spotgoods" v-for="(e,index) in resListingList">
							<div v-bind:class="{'cancle':e.resStatus == 0,'normal':e.resStatus != 0}">
								<div class="info1">
									<span class="span1" v-text="e.placeSteelStr+' '+e.brandNameStr+' '+e.textureStr+' '+e.specification"></span>
									<span class="span2" v-text="e.listingPriceShow+'元/吨'"></span>
								</div>
								<div class="info2">
									<span class="span1" v-text="e.warehouseStr"></span>&emsp;
									<span class="span2" v-text="e.listingQuantityShow"></span>&emsp;
									<span v-if="e.isDeliver==0" v-text="'配送  '"></span><span v-if="e.isDeliver==1" v-text="'自提  '"></span><span v-text="e.province+e.city"></span>
								</div>
								<div class="info3">
									<input v-if="e.delistType == 1" @click="subNumber(e.unitWeight,$event)" class="sub" type="button" value="-"><input v-if="e.delistType == 1" readonly="readonly" v-bind:delist-type="e.delistType" name="futureWeight" class="number" type="text" value="1" v-bind:listingId="e.listingId" v-bind:availableQuantity="e.listingQuantity"><input v-if="e.delistType == 1" @click="addNumber(e.listingQuantity,e.unitWeight,$event)" class="add" type="button" value="+">
									<p v-if="e.delistType == 1"  v-text="e.unitWeight"></p>&nbsp;吨 
									
									<input v-if="e.delistType == 2" v-bind:delist-type="e.delistType" name="futureWeight" @click="inputFutureWeight($event,'weight')" v-bind:listingId="e.listingId" v-bind:availableQuantity="e.listingWeight" type="text" style="" value="" v-bind:placeholder="'限'+e.listingQuantityShow"/>
									<span v-if="e.resStatus==0" v-text="'已撤牌'"></span>
									<a href="javascript:void(0);" @click="deleteSpotgoods($event,e.listingId,index)" class="weui-icon-cancel"></a>
								</div>
							</div>
						</li>				
					</ul>
				</div>
				
				<div class="txt-blank"></div>
				
				<!-- <div class="txt-line" style="border-bottom: 1px solid lightgray;">
					<label class="lab ">交货期：</label>
					<span class="txt">
						<input id="startDate" class="u-ipt-min" name="startDate" style="width: 8em; text-align: center;" value="" />&nbsp;-&nbsp;
						<input id="endDate" class="u-ipt-min" name="endDate" style="width: 8em; text-align: center;" value="" /></span>
				</div> -->
				
				<div v-if="quoteList.length > 0" v-cloak>
				<div id="deliveryType" class="txt-line" style="border-bottom: 1px solid lightgray;">
					<label class="lab" style="vertical-align:text-bottom;">交货方式：</label>
					<a data-type="ckzt" href="javascript:void(0);" @click="chooseDeliveryType($event,'ckzt')" class="weui-btn weui-btn_mini weui-btn_primary">仓库自提</a>
					<a data-type="gczt" href="javascript:void(0);" @click="chooseDeliveryType($event,'gczt')" class="weui-btn weui-btn_mini weui-btn_default">工厂自提</a>
					<a data-type="bd" href="javascript:void(0);" @click="chooseDeliveryType($event,'bd')" class="weui-btn weui-btn_mini weui-btn_default">包到</a>
				</div>
				<div name="delivery" id="ckzt" class="txt-line show">
					<div>自提仓库</div>
					<div v-for="e in wavehouses" style="padding-left: 40px;" v-text="e"></div>
				</div>
				<div name="delivery" id="gczt" class="txt-line hide">
				</div>
				<div name="delivery" id="bd" v-bind:addrId="userConsignee.con_id" class="txt-line hide">
					<div style="width: 90%;">
						<label class="lab">指定地点：</label><br>
						<span class="txt" style="padding-left: 2em;" v-text="'收货地址：'+userConsignee.address"></span><br>
						<span class="txt" style="padding-left: 2em;" v-text="'收货单位：'+userConsignee.consignee_company"></span><br>
						<span class="txt" style="padding-left: 2em;" v-text="'收货人1：'+userConsignee.name1+' '+userConsignee.phone1"></span><br>
						<span class="txt" style="padding-left: 2em;" v-text="'收货人2：'+userConsignee.name2+' '+userConsignee.phone2"></span>
						<span class="txt-right" @click=showTransportFeeView>查看运费报价</span>
					</div>
					<div class="addr-right" @click="managerAddr">></div>
				</div>
				<div class="txt-line show" id="transFee">
					<label class="lab">运输费用承担：</label><br>
					<div><input type="radio" checked style="margin-left: 2em;" data-transfee="1" name="transportFee"><span @click="chooseTransportFeeType" class="txt">供方负责运输，含税运费，一票结算</span></div>
					<div><input type="radio" style="margin-left: 2em;" data-transfee="2" name="transportFee"><span @click="chooseTransportFeeType" class="txt">供方代办运输，两票结算</span></div>
				</div>
				<div class="txt-blank"></div>
				<div class="txt-line" style="padding-top:0px;">
					<label class="lab" style="padding-left: 0px;">买家留言：</label><br><textarea id="cureWord" class="message" placeholder="请留言"></textarea>
				</div>
				</div>
			</div>

		</div>
		<div id="g-footer" class="g-footer">
			<div class="m-order-footer">
				<span style="line-height: 28px; color: red;"
					class="total-btn weui-btn weui-btn_plain-primary">合计:&nbsp;<span
					id="totalCount">0</span>件/<span id="totalWeight">0</span>吨
				</span> <a href="javascript:;"
					class="order-btn weui-btn weui-btn_mini weui-btn_warn" @click="excuteOrder">下&emsp;单</a>
			</div>
		</div>
		<!-- 查看运费报价 -->
		<div id="transportFee" @click="closeTransportFeeView" class="m-quote-transportfee hide">
			<div class="m-quote-fee" @click="stopCloseTransportFeeView" >
			<div class="left" @click="closeTransportFeeView"><</div>
		       <ul>
		       	<li v-for="e in freightQuoteList">
					<div class="txt-line">
			        	<label class="lab" v-text="'品名：'"></label>
			        	<span class="txt" v-text="e.brandName"></span>
			       </div>
			       <table>
			       	<thead>
			       		<tr style="border-top: 1px solid darkgray;background: #DEDBDB;"><th>起始点</th><th>目的地</th><th>不含税报价</th><th>一票含税报价</th></tr>
			       	</thead>
			       	<tbody>
			       		<tr v-for="ee in e.freightQuoteList"><td v-text="ee.beginAddr"></td><td v-text="ee.endAddr"></td><td v-text="ee.unTaxFee"></td><td v-text="ee.TaxFee"></td></tr>
			       	</tbody>
			       </table>
		       	</li>
		       </ul>
			</div>
		</div>
		<!-- end -->
		
		<!-- 选择收货地址 -->
		<div id="managerAddr" @click="closeManagerAddrView" class="m-quote-addrManage hide">
			<div class="m-quote-addr" @click="stopCloseTransportFeeView" >
				<div class="title">
				<a href="javascript:void(0)" @click="closeManagerAddrView" class="iconfont u-back-left"></a>
				<sapn>选择收货地址</sapn>
				</div>
		       <ul>
		       	<li v-for="e in userConsigneeList">
		       		<div style="padding-left: 5px;" v-on:click="chooseAddr(JSON.stringify(e))">
						<div class="txt-line">
				        	<span class="txt" v-text="e.consignee_company"></span>
				    	</div>
						<div class="txt-line">
				        	<span class="txt" v-text="e.address"></span>
				    	</div>
						<div class="txt-line">
				        	<span class="txt"><span v-text="e.name1" v-model="e.name1"></span><span v-text="e.phone1" v-model="e.phone1"></span></span>
				    	</div>
						<div class="txt-line">
				        	<span class="txt"><span v-text="e.name2" v-model="e.name2"></span><span v-text="e.phone2" v-model="e.phone2"></span></span>
				    	</div>
						<div class="txt-blank">
				    	</div>
		       		</div>
		       		<div style="padding-top: 5px;padding-left: 5px;">
		       			<div name="defaultAddr" v-bind:class="['checkWrap',{'choosed':e.isdefault=='Y'}]" @click="setDefaultAddr(e.con_id,$event)"></div>
		       			<div class="normal" @click="setDefaultAddr(e.con_id,$event)">默认地址</div>
		       			<div class="edit" @click="editAddrView(JSON.stringify(e),$event)">编辑</div>
		       			<div class="delete" @click="deleteAddr(e.con_id,$event)">删除</div>
		       		</div>
		       	</li>
		       </ul>
			</div>
		</div>
		
		<!-- 编辑收货地址 -->
		<div id="editAddress" @click="closeEditAddrView" class="m-quote-addrManage hide">
			<div class="m-quote-addr" @click="stopCloseTransportFeeView" >
				<div class="title">
				<a href="javascript:void(0)" @click="closeEditAddrView" class="iconfont u-back-left"></a>
				<sapn>编辑收货地址</sapn>
				</div>
				
				<div class="edit-txt-line"><label>收货单位</label><input v-model="editAddr.consignee_company" placeholder="必填"/></div>
				<div class="edit-txt-line"><label>收货地区</label><input  readonly="readonly" unselectable="on" onfocus="this.blur()"  id="city" @click="chooseDistrict" v-model="editAddr.districtName" placeholder="必填"/></div>
				<div class="edit-txt-line"><label>详细地址</label><input v-model="editAddr.address" placeholder="必填"/></div>
				<div class="txt-line-default">第一收货人</div>
				<div class="edit-txt-line"><label>&emsp;姓名&emsp;</label><input v-model="editAddr.name1" placeholder="必填"/></div>
				<div class="edit-txt-line"><label>&emsp;手机&emsp;</label><input v-model="editAddr.phone1" placeholder="必填"/></div>
				<div class="txt-line-default">第二收货人</div>
				<div class="edit-txt-line"><label>&emsp;姓名&emsp;</label><input v-model="editAddr.name2" placeholder="非必填"/></div>
				<div class="edit-txt-line"><label>&emsp;手机&emsp;</label><input v-model="editAddr.phone2" placeholder="非必填"/></div>
	       		<div class="bottons">
	       		<a href="javascript:void(0)" @click="closeEditAddrView" class="cancle">取消</a>
	       		<a href="javascript:void(0)" @click="saveEditAddrView" class="save">保存</a>
	       		</div>
			</div>
		</div>
		<!-- end -->
	
		<div class="js_dialog" id="dialog1" v-bind:style="'display: none;'" v-cloak>
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title"><strong v-text="message_title"></strong></strong></div>
		        <div id="weight" class="weui-dialog__bd">
		        	<select style="-webkit-appearance:none;position: fixed;z-index: 1;font-size:1.8em;width: 60%; margin-left: -30%;" id="chooseThickness" onmousedown="if(this.options.length>2){this.size=3}" onblur="this.size=0" onchange="this.size=0" v-show="showThickness" @change="chooseThickness" style="width: 70%;height: 40px;font-size: 18px;">
		        		<option v-for="e in thicknessList" v-bind:label="e.thickness" v-text="e.thickness" v-bind:value="e.thickness"></option>
		        		<option label="" value="" v-text="" v-bind:selected="showThickness"></option>
		        	</select>
		        	<input v-show="!showThickness" class="u-dialog-money-ipt" style="margin-top: 1px;" min="0" max="10000" maxlength="6" type="number" placeholder="请输入"name="weight" />
		        </div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="cancleWeight($event)" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
		            <a href="javascript:;" @click="confirmWeight($event)" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>

		<div class="js_dialog" id="dialog2" style="display: none;" data-index="0">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title" style="font-size: 16px;">是否确认删除？</strong></div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="cancleDelete($event)" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
		            <a href="javascript:;" @click="confirmDelete($event)" class="weui-dialog__btn weui-dialog__btn_primary">删除</a>
		        </div>
		    </div>
		</div>

		<div class="js_dialog" id="deleteAddrDialog" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title" style="font-size: 16px;">是否确认删除？</strong></div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="cancleAddrDelete($event)" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
		            <a href="javascript:;" @click="confirmAddrDelete($event)" class="weui-dialog__btn weui-dialog__btn_primary">删除</a>
		        </div>
		    </div>
		</div>

		
	</div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/shopcart/shopcart");
</script>

</script>
</html>
