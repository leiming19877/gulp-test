<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8" />
<title>提货券设置</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/ec/lading/ladingTag.jsp"%>
<input type="hidden"value="${hasVerify}" id="hasVerify">
<style>
	.nav{ width:100%; height:72px; margin-bottom:15px; background:#FFF; border-bottom:1px solid #e1e1e1; font-size:110%; }
	.nav ul li{ width:48%; float:left; height:68px; line-height:68px; text-align: center; }
	.nav ul li a{ line-height:68px; height:68px; display:block; border-bottom:4px solid #fff; color:#666;max-width:50%; margin:0px auto;}
	.nav ul li a:hover,.nav ul li .on{border-bottom:4px solid #3366cc; font-weight:bold;  color:#3366cc; }
</style>
<body>
	<div id="content" class="">
		<%@include file="/WEB-INF/jsp/ec/lading/selectLicenseNo.jsp"%>
		<div id="hiddenContent">
			<div class="title">
				<c:if test="${isSetPick == 0}">
					<h1>提货设置</h1>
				</c:if>
				<c:if test="${isSetPick == 1}">
					<h1>修改提货设置</h1>
				</c:if>			
			</div>
			<div class="nav sub_nav">
	        	<ul>
	        		<c:if test="${hasVerify <= 0 }">
		            	<li style="border-right:1px solid #ebebeb;">
		            		<a class="" href="javascript:switchVerifyType(1)">身份证</a>
		            	</li>
		            </c:if>
		            <li>
		                <a class="on" href="javascript:switchVerifyType(3)">车牌号</a>
		            </li>
	            </ul>
	        </div>
	        <form:form name="LadingWeixinForm" modelAttribute="LadingWeixinForm" id="LadingWeixinForm">
	        <input type="hidden"value="${evLadingId}" id="evLadingId" name="evLadingId">
	       	<input type="hidden"value="${ladingId}" id="ladingId" name="ladingId">
			<input type="hidden"value="${ladingType}" id="ladingType" name="ladingType">
			<input type="hidden"value="3" id="verifyType" name="verifyType">
				<div class="connet">
					<div class="list_tiao ">
						<c:if test="${!empty verifyDeliveryList}"><span>已验证</span></c:if>
						<c:forEach items="${verifyDeliveryList}" var="delivery" varStatus="status">
							<c:if test="${delivery.deliveryType ==3 }">
				                <dl>
				                    <dd>${delivery.deliveryLicenseNo}</dd>
				                    <dd class="switch">
				                        <div >
				                        	<input id="switchValidate" class="form-control" type="checkbox" checked repeatValidate="${delivery.repeatValidate}" value="${status.index}">
					                        <input type="hidden" name="ladingDeliveryIds" value="${delivery.id}"/>
					                        <input type="hidden" id="repeatValidate_${status.index}" name="repeatValidates" value="${delivery.repeatValidate}"/>
				                        </div>
				                    </dd>
				                    <input type="hidden" name="verifyLicenseNos" value="${delivery.deliveryLicenseNo}"/>
				                </dl>
				            </c:if>
						</c:forEach>
					</div>
					<div class="list_tiao ">
						<span>未验证</span>
						<c:forEach items="${unVerifyDeliveryList}" var="unDelivery">
							<c:if test="${unDelivery.deliveryType ==3 }">
				                <dl name="licenseNo" id="licenseNo_${unDelivery.deliveryId}">
				                    <dd>${unDelivery.deliveryLicenseNo}</dd>
									<dd class="switch"> <input type="button" class="btn_off" value="×" onclick="deleteLicenseNo(${unDelivery.deliveryId})"></dd>
				                	<input type="hidden" name="licenseNos" value="${unDelivery.deliveryLicenseNo}"/>
				                </dl>
				             </c:if>
						</c:forEach>
						<input type="hidden" id="flag">
					</div>
					<div class="list_tiao list_tiao_del">
						<a class="btn_k" href="javascript:selectLicenseNo()"> 
							<input type="button" class="btn_add" value="＋">添加提货车
						</a>
					</div>
					<input type="button" class="btn_b" style="width:90%; margin:30px auto;z-index:100; display:block;" value="提交设置" onclick="doSaveLicenseNo()">
				</div>
			</form:form>
		</div>
	</div>
</body>
</html>

<script type="text/javascript">
    $(function(argument) {
        $('[type="checkbox"]').bootstrapSwitch();
      })
	
	function switchVerifyType(verifyType){
		var evLadingId = $('#evLadingId').val();
		var ladingId = $('#ladingId').val();
		var ladingType = $('#ladingType').val();
		var url = "${ctx}/lading/toSetLadingPick.pfv?ladingId="+ladingId +"&verifyType="+verifyType+"&ladingType="+ladingType+"&evLadingId="+evLadingId;
		$.post(url,function(response){
			$("#content").html(response);
		});
	}
	
	//选择提货人信息
	function selectLicenseNo(){
		$(".poo_lb").slideToggle("slow");
		$("#hiddenContent").css("display","none");
	}
	
	//删除提货车牌信息
	function deleteLicenseNo(id) {
		var str="licenseNo_"+id;
		var rowSize = $('dl[name=licenseNo]').length;
		var deleteRow = $("dl[id="+str+"]");
		if(rowSize > 0){
			var hasVerify = $('#hasVerify').val();
			if(rowSize == 1 && hasVerify <= 0 ){
				jAlert("请设置一条提货车信息！","提示");
				return;
			}
			var deleteRow = $("dl[id="+str+"]")[0];
			$(deleteRow).remove();
		}
	}
	
	//保存提货设置
	function doSaveLicenseNo(){
		var url = "${ctx}/lading/saveLadingDelivery.pfv?";
		var form = $("#LadingWeixinForm").serialize();
		jQuery.ajax({
	        'type': 'POST',
	        'url': url, 
	        'data': form,
	        'dataType': 'json',
	        'success': function(data) {
				if(data.resultCode == 0) {
					new jConfirm("提货信息已保存，是否跳转到列表页面", "提示", function(y){
						if(y) {
							var phone = data.phone;
							var url = "${ctx}/lading/queryLadingWeixinInfo.pfv?phone="+phone+"&verifyStatus=-1&range=1-10&rm="+Math.random();
							window.location.href = url;
						}
					});
				}else{
					jAlert("操作失败,请联系管理员");
				} 
	        }
	    });
	}
</script>
