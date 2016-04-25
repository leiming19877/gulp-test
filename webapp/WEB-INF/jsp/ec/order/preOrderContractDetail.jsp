 <%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
 <html xmlns="http://www.w3.org/1999/xhtml"> 
<%@page contentType="text/html; charset=utf-8"%>
<link href="${ctx}/css/global/global-1.0.1.min.css" rel="stylesheet" type="text/css" />
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>合同详情</title>


<style>
body {
	background: none repeat scroll 0 0 #FFFFFF;
	color: #333333;
	font: 12px/150% "宋体", Arial;
	overflow-x: hidden;
}

li {
	list-style: none outside none;
	line-height: 30px;
}

html,body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,em,strong,sub,sup,pre,form,label,input,select,textarea,p,th,td
	{
	margin: 0;
	padding: 0;
}

.htgllb,.htbj,.htgllb ul li,.htgllb ul,.htgllb ul,.htgllbs ul {
	width: 100%;
	clear: both;
}

.htgllb ul li p,.htgllbs ul li p {
	width: auto;
	height:24px;
	line-height:24px;
}

.htgllbs ul li {
	line-height: 24px;
}

.rightCon h1,.rightCon_02 h1 {
	font-size: 14px;
	line-height: 30px;
	text-align: center;
}

.htgllbs .htgllb,.htgllbs {
	padding: 5px;
}

.htqr ul {
	padding: 10px 0px;
}

.htgllb ul,.htgllbs ul {
	display: block;
	margin-right: 10px;
}

.htqr ul li {
	line-height: 24px;
}

.ht_title {
	font-weight: bold;
	text-align: left;
}

.htgllb ul li span {
	display: block;
	float: left;
	height: 24px;
	line-height: 30px;
	text-align: right;
	width: 80px;
}

.htgllbs ul li span {
	display: block;
	float: left;
	height: 24px;
	line-height: 30px;
	text-align: left;
	width: 100px;
}

.htgllbs ul li {
	height: 24px;
	line-height: 24px;
}

.mar_t_10 {
	margin-top: 5px;
    margin-bottom: 5px;
    background-color:#fff
}

.pagediv {
    margin-bottom: 50px;
    background-color:#fff
}

.htgllb ul li p,.htgllbs ul li p {
	display: block;
	float: left;
	line-height: 30px;
	text-align: left;
	height:auto; 
	width:70%;
}

.htbj {
	background: none repeat scroll 0 0 #F9F9F9;
	border: 1px solid #CCCCCC;
}

.text_center {
	text-align: center;
}

.rightCon {
	border: 1px solid #AFD7EE;
	clear: both;
	height: auto !important;
	min-height: 380px;
	padding: 10px 0px;
	position: relative;
	width: 100%;
}

.tb_03 tr td,.tb_03 tr th {
	height: 30px;
	line-height: 30px;
	font-size: 12px;
	padding:5px;
}
.tb_09 tr th{background:#eee;}
.rightCon{border:0px;}

/*从css拷贝样式*/
.clearfix:after{clear:both; content:' '; display:block; font-size:0; line-height:0; visibility: hidden; width:0; height:0;}
.clearfix{display: inline-block;}
* html .clearfix{height: 1%;}
.clearfix{display: block;}

.textArea_01{border:1px solid #c8c8c8;}
.clearfix:after{clear:both; content:' '; display:block; font-size:0; line-height:0; visibility: hidden; width:0; height:0;}
.clearfix{display: inline-block;}
* html .clearfix{height: 1%;}
.clearfix{display: block;}

.linetxt{background-color: rgba(0, 0, 0, 0);border-color: -moz-use-text-color -moz-use-text-color #005AA7;border-style: none none solid;border-width: 0 0 1px;color: #005AA7;}

td.bgCgray{background:#eee;}
.cred{color:#ff0000;}
.gray {color:#a6a6a6;}
.cbule{color:#028ad5;}
.cwhite{color:#fff}
.fl{float:left;}
.fb{ font-weight:bold;}
.bold{font-weight:bold}
.text_center{text-align:center;}

.tb_03 td .tb_03.tb_02,.tb_02{border-collapse:collapse; background:#fff; margin:5px;border:1px dotted #ddd;}
.tb_03 td .tb_02 th,.tb_02 th{border:0px;border-top:1px solid #ddd; color:#333; background:#f2f2f2;}
.tb_03 td .tb_02 td{border:0px;border-top:1px solid #ddd; text-align:center;}
.tb_03 td .tb_02 tr.bgCblue td{background:#dde7ee;}
.tb_03 td .tb_02 tr.bgOrange td{background-color:#fbeab1;}

.tb_03{border-collapse:collapse; background:#fff;}
.tb_03 th{border:1px solid #ddd; color:#333; background:#edf6fd; height:30px; line-height:30px;}
.tb_03 td{border:1px solid #ddd; background:#fff;}
.tb_03 tr.bgCgray td{background:#eee;}
.tb_03 tr.bgCblue td{background:#edf7ff;}
.tb_03 td.bgCgray{background:#eee;}
.tb_03 td.bgCblue{background:#edf7ff;}
.tb_03 tr.bgOrange td{background-color:#fbeab1;}
.tb_03 td.haveChild{padding:0; border:none;}
/* .tb_03 table.tbInside_01{border:1px solid #ff9966; border-collapse:collapse; background:#fff9ee;}
.tb_03 table.tbInside_01 th{border:1px solid #ff9966; background:#ffc990;}
.tb_03 table.tbInside_01 td{border:1px solid #ff9966; background:#fff9ee;}
.tb_03 table.tbInside_02{border:1px solid #ff9090; border-collapse:collapse; background:#fff9ee;}
.tb_03 table.tbInside_02 th{border:1px solid #ff9090; background:#ffc1c1;}
.tb_03 table.tbInside_02 td{border:1px solid #ff9090; background:#fff9ee;}
.tb_03 table.tbInside_03{border:1px solid #c0e482; border-collapse:collapse; background:#faffe8;}
.tb_03 table.tbInside_03 th{border:1px solid #c0e482; background:#d6edaf;}
.tb_03 table.tbInside_03 td{border:1px solid #c0e482; background:#faffe8;}
.tb_03 table.tbInside_04{border:0px solid #c0e482; border-collapse:collapse; }
.tb_03 table.tbInside_04 th{border:1px solid #cbe4ef; background:#daf2fd;}
.tb_03 table.tbInside_04 td{ border:none; border-bottom:1px dotted #ccc; line-height:28px; background:#fff;}
 */
.top {
    width: 100%;
    height:42px;
	position: fixed;
    background-color: #E9E9E9;
    border-color:#ddd;
    color: #333;
    z-index: 8; 
}

.header{
    font-size: 14px;   
    text-shadow: 0 1px 0 #eee;
    text-align: center;
    line-height:42px;
    position: relative;
}

.imageWrap{
    float:left;
    width:20px;
    height:20px;
    margin-top: 10px;
    margin-left: 6px;
}

.image_left{
	width: 20px;
	height: 20px;
}

.submitNav{
	z-index:8;
	position:fixed;
	background:#eee;
	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	bottom:0;
	left:0;
	width:100%;
	height:40px;
	padding:8px 0;
}

.return{
	border-radius:4px;
	position:fixed;
	background:#436CB4;
	color:#FFF;
	text-align:center;
	font-size:14px;
	margin-left:10%;
	width:80%;
	height:40px;
	line-height:40px;
	text-shadow:none;
}

.submit:active{
	background:#436CB4;
}


</style>

<body>
	<div class="clearfix pagediv" data-role="page">
 	    <div class="top header">  			
				<div class="imageWrap" id="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>中拓钢铁网电子购销合同</h1>			
		</div> 
		
		<div class="rightCon clearfix mar_b_10">
            <table width="99.5%" border="0" cellspacing="0" cellpadding="0" class="tb_03" style="font-size: 36px;margin-top: 25px">
						<tr>
							<th align="left">合同编号：${preOrderContractVO.orderContractCode}</th>
							<td class="cred fb">${orderInfo.orderStatusDesc}</td>
						</tr>
			</table>
			<div class="htgllbs">
				<ul>
					<li><span class="ht_title">签订时间：</span> <fmt:formatDate
							value="${preOrderContractVO.createdDatetime }" pattern="yyyy-MM-dd" /></li>
							
					<li><span class="ht_title">签订地点：</span>${preOrderContractVO.awardAddr}</li>
					<li><span class="ht_title">供方：</span>${preOrderContractVO.sellerName}</li>
					<li><span class="ht_title">需方：</span>${preOrderContractVO.buyerName}</li>

				</ul>
			</div>
			<div class="clear"></div>
			<div class="htqr"  style="width:96%;margin:0 auto;">
				<ul>
					<li class="ht_title">一、合同标的物信息：</li>
					<li><b>

							<table width="100%" border="0" cellspacing="0" cellpadding="0"
								class="tb_03 tb_09 " style="font-size: 36px;">
								<c:forEach items="${orderDetailList}" var="detail" varStatus="status">
									<tr>
									    <th align="center" width="5%">No.</th>
										<th align="center" width="19%">品名</th>
										<th align="center" width="19%">产地</th>
										<th align="center" width="19%">规格</th>
										<th align="center" width="19%">材质</th>
										<th align="center" width="19%">计量方式</th>
									</tr>
									<tr>
										<td align="center">${status.index+1}</td>
										<td align="center">${detail.brandNameDesc }</td>
										<td align="center">${detail.placeSteelDesc }</td>
										<td align="center">${detail.specification }</td>
										<td align="center">${detail.textureDesc }</td>
										<td align="center">${detail.calculateTypeDesc }</td>				
									</tr>
									<tr>
										<td align="center"colspan="2">件数</td>
										<td align="center" colspan="2">											
											<c:if test="${detail.delistType==2}">--</c:if>
											<c:if test="${detail.delistType!=2}">
												<fmt:formatNumber value="${detail.buyQuantity }" pattern="#0" />
											</c:if>
										</td>
										<td align="center">重量(吨)</td>
										<td align="center">
										   <fmt:formatNumber value="${detail.buyWeight }" pattern="#0.000" />
										</td>
									</tr>
									<tr>
										<td align="center" colspan="2">含税单价</td>
										<td align="center" colspan="2">
										    <fmt:formatNumber value="${detail.buyPrice }" pattern="#0.00" /> 元/吨
										    </td>
										<td align="center">金额(元)</td>
										<td align="center">
										        <fmt:formatNumber value="${detail.buyWeight*detail.buyPrice }" pattern="#0.00" />
												</td>
									</tr>
									<tr>
										<td align="center" colspan="2">备注</td>
										<td colspan="4">${detail.contractResComment }</td>
									</tr>
								</c:forEach>
								<tr class="bgCgray">
									<td colspan="3"><span class="bold">合计件数</span></td>
									<td colspan="3">${preOrderContractVO.totalBuyQuantity }</td>
								</tr>
								<tr class="bgCgray">
									<td colspan="3"><span class="bold">合计重量</span></td>
									<td colspan="3">${preOrderContractVO.totalBuyWeight }</td>
								</tr>
								<tr class="bgCgray">
									<td colspan="3"><span class="bold">合计人民币(大写)</span></td>
									<td colspan="3">人民币${moneyChineseStr}</td>
								</tr>
							</table>
				
				<c:if test="${!empty preOrderContractVO.contractComment}">备注：	
					${preOrderContractVO.contractComment}
				</c:if>			
							
					</b></li>
				</ul>
				<ul>
					<li class="ht_title">二、产品质量技术标准：</li>
						<c:choose>
							<c:when test="${preOrderContractVO.qualityType eq 1}">执行国标或者生成厂家生产标准。</c:when>
							<c:when test="${preOrderContractVO.qualityType eq 2}">
								产品符合执行标准GB/T3091-2008，不允许有漏镀、漏喷、沙眼、裂缝、分层搭焊、划伤、螺纹形邓缺陷存在，表面无油污无氧化等现象，光管身，毛刺等低，注意外径尺寸等符合国家标准。
							</c:when>
							<c:otherwise>
								其他：<span name="qualityNoteEdit" id="qualityNoteEdit" readonly="readonly" 
								style="width:100%;overflow:auto">${preOrderContractVO.qualityNote }</span>
							</c:otherwise>
						</c:choose>
				</ul>
				
				<ul>
					<li class="ht_title">三、交货时间、地点：</li>			
		   <c:if test="${empty orderConsigneeVOList}">无</c:if>
		   <c:forEach items="${orderConsigneeVOList}" var="orderConsigneeVO" varStatus="s">
			   <li>
			   		1、交货时间：<span id="deliveryTimeSpan" class="linetxt">&nbsp;&nbsp;<fmt:formatDate value="${orderInfo.deliveryBeginDatetime }" 
			   		pattern="yyyy年MM月dd日" />&nbsp;&nbsp;-<fmt:formatDate value="${orderInfo.deliveryEndDatetime }" pattern="yyyy年MM月dd日" />&nbsp;&nbsp;
			   		</span>
			   		<c:if test="${orderInfo.deliveryType eq 'zt' }">提清</c:if>
			   </li>
			   <li>
			   		2、交货地点及指定签收人：
			   		<c:if test="${orderInfo.deliveryType eq 'zt' }">
			   			<span id="deliveryAddrSpan" class="linetxt">&nbsp;&nbsp;${warehouseStr }&nbsp;&nbsp;</span>
		   				，无；
			   		</c:if>
			   		<c:if test="${orderInfo.deliveryType eq 'bps' }">
				   		<span id="deliveryAddrSpan" class="linetxt">&nbsp;&nbsp;${orderConsigneeVO.address }&nbsp;&nbsp;</span>
				   		<span class="linetxt">&nbsp;<span id="deliveryUserInfoSpan" >
				   			<c:if test="${orderConsigneeVO.name1.length()>0 }">${orderConsigneeVO.name1 },${orderConsigneeVO.phone1 },${orderConsigneeVO.id_card1 };</c:if>
				   			<c:if test="${orderConsigneeVO.name2.length()>0 }">${orderConsigneeVO.name2 },${orderConsigneeVO.phone2 },${orderConsigneeVO.id_card2 }</c:if>

			   		</c:if>
			   	</li>
		   </c:forEach>

				</ul>
				<ul>
					<li class="ht_title">四、交货方式以及费用承担：</li>				

			<div id="_deliveryOther">
				
				<c:if test="${preOrderContractVO.deliveryType==1 }">
					<li>需方自提并承担运输费用，供方承担出库费用。</li>
				</c:if>
				<c:if test="${preOrderContractVO.deliveryType==2 }">
					<li>供方将货物运送至合同约定的交货地点,列表单价中包含
						<c:if test="${preOrderContractVO.deliveryTypePricePerT.length()==0}">
						<span style="color: red;">待卖家确认</span>
						</c:if>
						<c:if test="${preOrderContractVO.deliveryTypePricePerT.length()>0}">
						${preOrderContractVO.deliveryTypePricePerT }
						</c:if>
						元/吨运杂费由需方承担,需方承担货到工地后的卸货义务及相关卸货费用。
					</li>
				</c:if>
				<c:if test="${preOrderContractVO.deliveryType==3 }">
					<li>供方将货物代办运输至合同约定的交货地点,列表中含税单价包含
						<c:if test="${preOrderContractVO.deliveryTypePricePerT.length()==0}">			
						  <span style="color: red;">待卖家确认</span>
						</c:if>
						<c:if test="${preOrderContractVO.deliveryTypePricePerT.length()>0}">						
						   ${preOrderContractVO.deliveryTypePricePerT }
						</c:if>
						元/吨运杂费由需方承担。供方代收代付，运杂费原始票据转交给需方，需方承担货到工地后的卸货义务及相关卸货费用,
						${preOrderContractVO.deliveryTypeCls}
						票结算。
					</li>
				</c:if>
				<c:if test="${preOrderContractVO.deliveryType==4 }">
					<li>
						${preOrderContractVO.deliveryType==4?preOrderContractVO.deliveryTypeNote:''}
					</li>
				</c:if>
			</div>
				</ul>
				<ul>
					<li class="ht_title">五、包装标准：</li>
			        <li>生产工厂标准出厂包装。</li>
				</ul>
				<ul>
					<li class="ht_title">六、合理损耗计算方法：</li>
				                    				
				<c:choose>
					<c:when test="${preOrderContractVO.spoilageType eq 1}">
						理计商品按钢厂挂牌理论结算；磅计商品过磅结算，磅差不超过±3‰ ，磅差在3‰以内按供方出库重量结算，超出磅差部分双方协商解决。
					</c:when>
					<c:otherwise>
						其他方式：<span name="qualityNoteEdit" id="qualityNoteEdit" readonly="readonly" 
						style="width:100%;overflow:auto">${preOrderContractVO.spoilageNote }</span>
					</c:otherwise>
				</c:choose>
			                 
				</ul>
				<ul>
					<li class="ht_title">七、验收标准、方法及提出异议期限：</li>			
					
					<c:choose>
						<c:when test="${preOrderContractVO.acceptanceType eq 1}">
							<li>1、验收标准按照本合同第二条执行。</li>
							<li>2、若有数量异议，需方应在提货或交货时要求供方现场点验，货物离开货场或交货完成，供方不受理数量异议。</li>
							<li>3、若有质量异议，需方应在货物离开货场
							${preOrderContractVO.acceptanceDay}
							个工作日内以书面形式通知供方，并保证货物包装完整。由此产生的质量问题由供方负责通知钢厂协同处理，最终以钢厂处理结果为准。此批钢材须检验合格后方可使用。需方未经检验使用或检验不合格而使用所产生的损失供方不予负责。</li>
							<li>4、逾期未在上述时间内办理异议，视为需方放弃主张权。</li>
						</c:when>
						<c:otherwise>
							其他：<span name="qualityNoteEdit" id="qualityNoteEdit" readonly="readonly" 
							style="width:100%;overflow:auto">${preOrderContractVO.acceptanceNote }</span>
						</c:otherwise>
					</c:choose>
				</ul>
				<ul>
					<li class="ht_title">八、结算方法及期限：</li>		
			
	   		<li>
				订货保证金：<c:if test="${orderInfo.isCashDeposit eq 0}">不需要支付保证金</c:if>
				<c:if test="${orderInfo.isCashDeposit eq 1}">
					需要支付保证金，订单总金额的${empty orderInfo.cashDepositRatio?'':orderInfo.cashDepositRatio}%。
				</c:if>
			</li>
			<li>
				付款方式：${orderInfo.payConditionDesc}
			</li>
			
				</ul>
				<ul>
					<li class="ht_title">九、违约责任：</li>			
					<div id="_breakContract">
						
				<c:if test="${preOrderContractVO.breakContractType==1 }">
					<li>需方逾期付款，须向供方按合同金额
						${preOrderContractVO.breakContractMoneyRatio }
						%支付违约金；且供方有权单方面解除本合同并自行处置货物；给供方造成损失的，由需方承担赔偿责任。
					</li>
				</c:if>
				<c:if test="${preOrderContractVO.breakContractType==2 }">
					<li><div id="radio2">按照《合同法》相关条款执行。</div></li>
				</c:if>
				
					</div>	
				</ul>
				<ul>
					<li class="ht_title">十、解决合同纠纷的方式：</li>
					<li>如发生争议或纠纷，双方应当友好协商解决，协商解决不成，向合同签订所在地人民法院提起诉讼。</li>
				</ul>
				<ul>
					<li class="ht_title">十一、其他约定事项：</li>
		
			<li>1、货物风险自供方开具提货单后转由需方承担。需方必须在合同约定的交货时间内提完货物，否则因该批货物产生的所有费用及损失均由需方承担；</li>
			<li>2、仓库出货时，凭供方提货单出货，供方不办理货场内转户手续；</li>
			<li>3、未经双方协商一致，本合同债权、债务不得转让；</li>
			<li>4、在需方未付清全部货款金额之前，供方对本合同项下的货物保留所有权。</li>
			<li>5、本合同执行期间，供、需双方均不得变更或解除合同，若有变更需经双方共同认可签字盖章确认后方可执行。</li>
			<li>6、本合同自供方收到需方全额货款之日起生效，至合同执行完毕止。</li>
					
				</ul>
				<ul>
					<li class="ht_title">十二、双方同意点击确认之行为与签字并加盖公章之行为具备同等法律效力，且本合同与传统纸质合同具有同等法律效力。</li>
					<li>
						<div class="htgllb">
							<ul class="fL htbj">
						<li class="text_center bold ">供方</li>
																
						<li class="mar_t_10"><span>单位名称：</span>
							<p>${sellerMemberBankVO.accUserName }</p></li>
						<li><span>单位地址：</span>
							<p>${sellerMemberVO.companyAddress }</p></li>
						<li><span>委托代理人：</span>
							<p>&nbsp;</p></li>
						<li><span>开户银行：</span>
							<p>${preOrderContractVO.bankName }</p></li>
						<li><span>帐 号：</span>
							<p>${preOrderContractVO.bankAccountNumber }</p></li>
						<li><span>电 话：</span>
							<p>
								${preOrderContractVO.companyTelephone}<input type="hidden"
									value="${preOrderContractVO.companyTelephone}"
									id="demanderTel">
							</p></li>
						<li><span>传 真：</span>
							<p>
								${preOrderContractVO.companyFax}
							</p></li>
							<c:if test="${preOrderContractVO.contractStatus eq 1 || preOrderContractVO.contractStatus eq 2}">
								<c:if test="${!empty stampUri}">
									<img src="${stampUri}"/>
								</c:if>
							</c:if>	
							
				        </ul>
				        <ul class="fL htbj mar_t_10">
						<li class="text_center bold ">需方</li>
																
						<li class="mar_t_10"><span>单位名称：</span>
							<p>
								${sapClientVOForDemander.sapName }
							</p></li>
						<li><span>单位地址：</span>
							<p>
								${sapClientVOForDemander.companyAddress }
							</p></li>
						<li><span>委托代理人：</span>
							<p>&nbsp;</p></li>
						<li><span>开户银行：</span>
							<p>
								${sapClientVOForDemander.bankName }
							</p></li>
						<li><span>帐 号：</span>
							<p>
								${sapClientVOForDemander.bankAccount }
							</p></li>
						<li><span>电 话：</span>
							<p>
								${sapClientVOForDemander.companyTelephone}
							</p></li>
						<li><span>传 真：</span>
							<p>
								${sapClientVOForDemander.companyFax}
							</p></li>	
						</ul>
						</div>
					</li>
				</ul>
			</div>
<%-- 			<div style="margin-top: 10px;float: left;width: 100%">
				<c:forEach items="${datalist}" var="extContractlist" varStatus="status">
					<table width="99.5%" border="0" cellspacing="0" cellpadding="0" class="tb_03" style="font-size: 36px;margin-top: 10px">
						<tr>
							<th align="left">补充合同号：${extContractlist.contractCode}</th>
							<td class="cred fb">
	                           	<c:choose>
	                           		<c:when test="${extContractlist.contractStatus ==18}">已确认</c:when>
	                           		<c:otherwise>待确认</c:otherwise>
	                           	</c:choose>
							</td>
						</tr>
						<tr>
							<td colspan="2">签订日期：
	                           	<c:choose>
	                           		<c:when test="${extContractlist.contractStatus ==18}">
	                           			<fmt:formatDate value="${extContractlist.confirmTime }" pattern="yyyy-MM-dd HH:mm" />
	                           		</c:when>
	                           		<c:otherwise>
	                           			<fmt:formatDate value="${extContractlist.createdDatetime }" pattern="yyyy-MM-dd HH:mm" />
	                           		</c:otherwise>
	                           	</c:choose>
							</td>
						</tr>
						<tr>
							<td colspan="2">补充类容：${extContractlist.additionalComment }</td>
						</tr>
					</table>					
				</c:forEach>				
			</div> --%>
			
		</div>
		
		     <!--返回按钮-->
		     <div class="submitNav">
                 <div id="return" class="return">返回列表</div>
		     </div>
	</div>
</body>
</html>

<script>
   $("#return,#imageWrap").on("click", function(){    //返回事件
	   $.mobile.loading("show");
	   window.location.href="${ctx}/preorder/getList?rm=" + Math.random(); 
   });
</script>
