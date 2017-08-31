<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8" />
    <title>提货券号列表</title>
    <meta name="description" content="微信中拓钢铁网，提货券号，主营：螺纹钢，盘螺，高速线材，板材等。" />
    <meta name="keywords" content="中拓钢铁提货券号，提货券号详情" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<%@page contentType="text/html; charset=utf-8"%>
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui.css" />
<link href="${ctx}/css/module/ec/lading/weixin1.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<body>
	<div id="content" class="">
        <div class="nav">
	        <ul>
	            <li><a id="all" class="on"   data-phone="${phone}"  data-type=-1 >全部</a></li>
	            <li><a id="unDelivery" class="" data-phone="${phone}"   data-type=0 >未提货</a></li>
	            <li><a id="deliverying" class="" data-phone="${phone}"  data-type=1 >提货中</a></li>
	        </ul>
       	</div>
        <div class="connet">
        	<c:forEach items="${ladingWeixinDataList}" var="lading">
        	
        	<div class="List Set_up_yz">
            	<ul>
               		<li class="State">
               			<span class="toladingDetail" data-phone="${phone}" data-evLadingId="${lading.evLadingId}" data-ladingId="${lading.ladingId}"
               				  data-ladingType="${lading.ladingType }" data-ladingPasswordShow="${lading.ladingPasswordShow }" >
							<c:if test="${lading.hasVerify == 0}">
								<img src="${ctx}/images/ec/lading/icon_stare_empty_sz.png" /><font>未提货</font>
							</c:if>
							<c:if test="${lading.hasVerify == 1}">
								<img src="${ctx}/images/ec/lading/icon_stare_full.png" /><font style="color:#3366cc;" class="bule_ing">提货中</font>
							</c:if>								
               			</span>
               		</li>
               		<li class="Ticket toladingDetail" data-phone="${phone}" data-evLadingId="${lading.evLadingId}" data-ladingId="${lading.ladingId}"
               				  data-ladingType="${lading.ladingType }" data-ladingPasswordShow="${lading.ladingPasswordShow }">

               			<input type="hidden" value="${lading.ladingId}" />
               			<dl><dt>提货券号</dt><dd>${lading.ladingPasswordShow}</dd> </dl>
               			<c:if test="${not empty lading.orderBusiId}">
               				<dl><dt>订单号</dt><dd>${lading.orderBusiId}</dd> </dl>
               			</c:if>
               			<dl><dt>提单号</dt><dd>${lading.ladingCode}</dd> </dl>
               			<dl><dt>提货仓库</dt><dd>${lading.warehouseName}</dd> </dl>
               			<c:if test="${empty lading.orderBusiId}">
               				<dl><dt></dt><dd></dd> </dl>
               			</c:if>
               		</li>
               		<c:choose>
               			<c:when test="${lading.transportSetting == 1 &&  1 == isLogin}">
               				<c:if test="${lading.isSetPick == 0}">
               					<li class="Operation"><a class="btn"  data-phone="${phone}" data-evLadingId="${lading.evLadingId}" data-ladingId="${lading.ladingId}"
               				  data-ladingType="${lading.ladingType }" data-ladingPasswordShow="${lading.ladingPasswordShow }" >提货设置</a></li>
               				</c:if>
               				<c:if test="${lading.isSetPick == 1}">
               					<li class="Operation"><a class="btn"   data-phone="${phone}" data-evLadingId="${lading.evLadingId}" data-ladingId="${lading.ladingId}"
               				  data-ladingType="${lading.ladingType }" data-ladingPasswordShow="${lading.ladingPasswordShow }">修改设置</a></li>
               				</c:if>
               			</c:when>
               			<c:otherwise>
               			
               				<li class="Operation"><a class="btn" data-phone="${phone}" data-evLadingId="${lading.evLadingId}" data-ladingId="${lading.ladingId}"
               				  data-ladingType="${lading.ladingType }" data-ladingPasswordShow="${lading.ladingPasswordShow }">查看详情</a></li>
               			</c:otherwise>
               		</c:choose>
               		
               </ul>
          </div>
          </c:forEach>
		</div>
	</div>	
	
</body>
</html>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/lading/ladingWeixin.js");
</script>
