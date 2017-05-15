<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="UTF-8" />
    <title>券号详情</title>
    <meta name="description" content="微信中拓钢铁网，提货券号，主营：螺纹钢，盘螺，高速线材，板材等。" />
    <meta name="keywords" content="中拓钢铁提货券号，提货券号详情" />
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
</head>
<%@include file="/WEB-INF/jsp/ec/lading/ladingTag.jsp"%>
<%@page contentType="text/html; charset=utf-8"%>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/dialog.js"></script>
<script type="text/javascript" src="${ctx}/js/module/ec/lading/drag.js"></script>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>

<body style="min-width: 320px;">
<div style="height:100%;overflow-y:auto;"> 
	<input type="hidden"value="${appid}"id="appid">
	<input type="hidden"value="${timestamp}"id="timestamp">
	<input type="hidden"value="${nonceStr}"id="nonceStr">
	<input type="hidden"value="${signature}"id="signature">
	<input type="hidden"value="${ladingDetail.evLadingId}"id="evLadingId">
	<input type="hidden"value="${ladingDetail.ladingId}"id="ladingId">
	<input type="hidden"value="${ladingDetail.ladingType}"id="ladingType">
	<input type="hidden"value="${action}"id="action">
	<input type="hidden"value="${userName}"id="userName">
	<input id="param" type="hidden" value="<%=request.getAttribute("param") %>">
	<div id="show" class="">
	     <div class="connet">
	     	<div class="List lading_xq List_rewidth">
		       	<ul>
		           	<li>
		               <dl style="margin-left:30px; margin-right:10px;">
		                    <dd>${ladingDetail.memberName}您好!</dd>
		                    <dd style=" width:100%;">请提货人携带
		                    	<c:if test="${ladingDetail.verifyType == 1}">
									<font class="font_b fb font_remind">身份证</font>和
								</c:if>
								<c:if test="${ladingDetail.verifyType == 3}">
									<font class="font_b fb font_remind">行驶证</font>和
								</c:if>
		                    	<font class="font_b fb font_remind">此提货券号</font>前往<font class="font_b fb font_remind">${ladingDetail.warehouseName}</font>提货。
		                    	<font class="font_s font_remind">(提单有效期:<fmt:formatDate value="${ladingDetail.pickEffectiveDate}" pattern="yyyy-MM-dd" />)</font>
		                    </dd>
		                    <c:if test="${not empty ladingDetail.warehouseTel}">
		                    	<dd>联系电话: ${ladingDetail.warehouseTel}</dd>	
		                    </c:if>
		                    <dd><font>请妥善保管</font>！</dd>
		                </dl>
		            </li>
	               	<li>
						<dl>
							<dt>提货券号</dt>
							<dd>
								<font id="ladingPasswordShow" class="font_remind">${ladingDetail.ladingPasswordShow}</font>
							</dd>
						</dl>
					    <c:if test="${not empty ladingDetail.orderBusiId}">
				            <dl>
				            	<dt>订单号  </dt>
				            	<dd id="orderBusiId">${ladingDetail.orderBusiId}</dd>
				            </dl>
			            </c:if>
					    <dl>
					    	<dt>提单号  </dt>
					    	<dd id="ladingCode">${ladingDetail.ladingCode}</dd>
					    </dl>
					    <c:if test="${ladingDetail.verifyType == 1}">
							<dl>
								<dt>身份证号</dt>
								<dd>${ladingDetail.deliveryCard}</dd>
							</dl>
						</c:if>
						<c:if test="${ladingDetail.verifyType == 3}">
							<dl>
								<dt>提货车号</dt>
								<dd>${ladingDetail.deliveryLicenseNo}</dd>
							</dl>
						</c:if>
	               	</li>
	               	<li>
	                	<dl>
		                	<dt>物料共计</dt>
		                    <dd>
		                    	<fmt:formatNumber value="${ladingDetail.totalQuantity}" pattern="###,###,##0" />件/
		                       	<fmt:formatNumber value="${ladingDetail.totalWeight}" pattern="###,###,##0.000" />吨
		                    </dd>
		                 </dl>
	                     <dl>
	                     	<dt>物料明细</dt>
	                     	<dd>
	                     		<c:forEach items="${ladingDetail.resList}" var="res">
	                     			${res.brandName}${res.specification}&nbsp;
	                     			<fmt:formatNumber value="${res.buyQuantity}" pattern="###,###,##0" />件/
	                     			<fmt:formatNumber value="${res.buyWeight}" pattern="###,###,##0.000" />吨,
	                     			</br>
	                     		</c:forEach>
	                     	</dd>
	                   </dl>	                 
	               	</li>
	               	<c:if test="${ladingDetail.deliveryType == 'bps'}">
	               		<li>
	               			<dl>
	               				<dt>收货地址</dt>
	               				<dd>${orderConsigneeVO.province_name}省${orderConsigneeVO.area_name}市${orderConsigneeVO.districtName} ${orderConsigneeVO.address}</dd>
	               			</dl>
	               		</li>
	               	</c:if> 
	
                    <c:choose>
	           			<c:when test="${ladingDetail.transportSetting == 1 &&  1 == isLogin}">
	           				<c:if test="${ladingDetail.isSetPick == 0}">
			                    <li style="border:0px;">
			                   		<input type="button" class="btn_b"  value="提货设置" >
			                    </li>           					
	           				</c:if>
	           				<c:if test="${ladingDetail.isSetPick == 1}">
	           					<li style="border:0px;">
		                   			<input type="button" class="btn_b"  value="修改提货设置" >
		                    	</li>
	           				</c:if>
	           			</c:when>
	           		</c:choose>
		    	</ul>
	        </div>
	        <div class="erwm">
		        <img style="height:100px;width:100px" id="img" src="${ctx}/lading/createCode.pfv?ladingPasswordShow=${ladingDetail.ladingPasswordShow}" >
		        <div class="font_b fb font_remind">扫一扫,仓库免输入哦！</div>
	     	</div>
	     </div>
	</div>	
</div>
</body>
</html>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/ladingWeixinDetail");
</script>
