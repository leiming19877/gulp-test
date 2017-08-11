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
			<a href="../futures/publishDemand" class="iconfont u-back-left"></a>
			<h3 class="u-title">下单</h3>
		</div>
		<div id="g-content" class="g-content">
			<div v-bind:class="['m-order',{'show':show},{'hide':hide}]" v-cloak>
				<table class="m-order-detail">
					<tbody>
						<tr v-for="e in shoppingCartList">
							<td class="td1">
								<span v-if="e.thickness=='0' && e.width!='0'" v-text="e.steelWorkName+' '+e.brandName+e.textureName+' '+e.width"></span>
								<span v-if="e.thickness=='0' && e.width=='0'" v-text="e.steelWorkName+' '+e.brandName+e.textureName+' '+e.specificationName"></span>
								<span v-if="e.thickness!='0' && e.width!='0'" v-text="e.steelWorkName+' '+e.brandName+e.textureName+' '+e.width+'*'+e.thickness"></span>
							</td>
							<td class="td2">
								<input @tap="inputFutureWeight" class="u-ipt-min u-ipt-mmin" name="futureWeight" v-bind:value="e.buyWeight" v-bind:data-id="e.id"/>吨
							</td>
							<td class="td3">
								<a href="javascript:;" class="weui-icon-cancel" @tap="deleteRowResource($event,e.id)"></a>
							</td>
						</tr>
					</tbody>
				</table>

				<div class="txt-line" style="height: 40px;">
					<label class="lab ">交货期：</label>
					<span class="txt">
						<input readonly="readonly" unselectable="on" onfocus="this.blur()" id="startDate" @click="pickStartDate($event)" class="u-ipt-min" name="startDate" style="width: 8em; text-align: center;" value="" /><span style="color: red;">*</span>&nbsp;-&nbsp;
						<input readonly="readonly" unselectable="on" onfocus="this.blur()" id="endDate" @click="pickEndDate($event)" class="u-ipt-min" name="endDate" style="width: 8em; text-align: center;" value="" /><span style="color: red;">*</span>
						</span>
				</div>
				<div class="txt-blank"></div>
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
					<div><input type="radio" checked="true" style="margin-left: 2em;" data-transfee="1" name="transportFee"><span @click="chooseTransportFeeType" class="txt">供方负责运输，一票结算</span></div>
					<div><input type="radio" style="margin-left: 2em;" data-transfee="2" name="transportFee"><span @click="chooseTransportFeeType" class="txt">供方代办运输，两票结算</span></div>
				</div>
				<div class="txt-blank"></div>
				<div class="txt-line" style="padding-top:0px;">
					<label class="lab" style="padding-left: 0px;">买家留言：</label><br><textarea id="cureWord" class="message" placeholder="请留言"></textarea>
				</div>
			</div>

		</div>
		<div id="g-footer" class="g-footer">
			<div class="m-order-footer">
				<span style="line-height: 28px; color: red;"class="total-btn weui-btn weui-btn_plain-primary">
					合计:&nbsp;
					<span id="totalCount">-</span>
					件/
					<span id="totalWeight" v-text="totalWeight"></span>
					吨
				</span>
				<a @click="excuteOrder" href="javascript:;" class="order-btn weui-btn weui-btn_mini weui-btn_warn">下&emsp;单</a>
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
			       		<tr style="border-top: 1px solid darkgray;background: #DEDBDB;"><th>起始点</th><th>目的地</th><th>不含税报价</th><th>含税报价</th></tr>
			       	</thead>
			       	<tbody>
			       		<tr v-for="ee in e.freightQuoteList"><td v-text="ee.beginAddr"></td><td v-text="ee.endAddr"></td><td v-text="ee.unTaxFee"></td><td v-text="ee.taxFee"></td></tr>
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
		       <div class="bottons">
	       		<a href="javascript:void(0)" @click="createNewAddr" class="insert">新增收货地址</a>
	       	   </div>
			</div>
		</div>
		
		<!-- 编辑收货地址 -->
		<div id="editAddr" @click="closeEditAddrView" class="m-quote-addrManage hide">
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
		
		<div class="js_dialog" id="dialog1" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title"><strong>请输入</strong></strong></div>
		        <div id="weight" class="weui-dialog__bd">
		        	<input class="u-dialog-money-ipt" style="margin-top: 1px;" min="0" max="10000" maxlength="6" type="number" placeholder="请输入"name="weight" />
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
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title" style="font-size: 16px;"><strong>是否确认删除？</strong></div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="cancleDelete($event)" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
		            <a href="javascript:;" @click="confirmDelete($event)" class="weui-dialog__btn weui-dialog__btn_primary">删除</a>
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
    seajs.use("module/ec/shopcart/shopcart2");
</script>

</script>
</html>
