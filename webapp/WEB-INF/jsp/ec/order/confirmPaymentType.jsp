<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@page contentType="text/html; charset=utf-8"%>
<link href="${ctx}/css/global/global-1.0.1.min.css" rel="stylesheet" type="text/css" />
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<script src="${ctx}/js/Date.js" type="text/javascript"></script>
<title>确认付款方式</title>
</head>

<style type="text/css">

body {
    background: #F2F2F2;
    padding: 3px 0;
}

.active {
    background: #ebebeb;
}

.unit {
    position: relative;
    margin-bottom: 1px;
    background: #FFF;
}

.unit:active {
    background: #F7F7F7;
}

.gray {
    background: #EFEFF1;
}


.white {
    background: #FFF;
}

.orange {
    /* background: #FFFFCD; */
    color: orange;
}

.header {
    position:relative;
    padding: 10px 0 10px 5px;
    border-bottom: 1px solid #ebebeb;   
}

.content{ 
    position: relative;top:35px;    
    /* height: 150px;  */
    /* margin-bottom: 1px; */
    background: #FFF;
    padding: 0px 0px 10px 0px; 
    overflow-y:hidden
    overflow:auto;   
}

.ui-btn {
    font-weight: normal !important;
    background: #FFF !important;
}

.submitNav{
	z-index:8;
	position:fixed;
	background:#eee;
	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	bottom:0;
	left:0;
	width:100%;
	height:43px;
	padding:8px 0;
}

.submit{
	border-radius:4px;
	position:fixed;
	background:#436CB4;
	color:#FFF;
	text-align:center;
	font-size:15px;
	text-shadow:none;
	margin-left:10%;
	width:80%;
	height:43px;
	line-height:43px;
	text-shadow:none;
}

.submit:active{
	background:#436CB4;
}

.top {
    width: 100%;
    height:20px;
	position: fixed;
    background-color: #fff;
    z-index: 8;
    font-size: 15px;
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
</style>

<body>
	<div data-role="page" class="unit" id="bidListPage" >
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>选择付款方式</h1>
			</div> 
		</div>
		
		<div data-role="content" class="content">
             <form id="comfirmPayment" action="" method="post" name="comfirmPayment">
				<fieldset data-role="controlgroup" id="selectPayType">
 					<c:forEach items="${payMentList}" var="pL" varStatus="status">
 					    <div id="${pL.paymentModeId}">
					        <label for="${pL.paymentModeId}"+"_" > 					        
					            <c:if test="${pL.paymentModeType!=5}">					           
					                ${pL.paymentModeName}：${pL.paymentModeComment}					            
					            </c:if>
					        
					            <c:if test="${pL.paymentModeType==5}">					            
					                ${pL.paymentModeComment}					                 
					            </c:if>
					        </label> 
					        
 					       <input type="radio"  name="paymentRadio" id="${pL.paymentModeId}"+"_" value="${pL.paymentModeId}">
 					         <%-- <input type="hidden" name="orderId"  value="${pL.orderId}">
 					        <input type="hidden" name="paymentModeName"  value="${pL.paymentModeName}">
                            <input type="hidden" name="paymentModeComment"  value="${pL.paymentModeComment}"> --%>
                        </div>
					</c:forEach>
				</fieldset>
							
		        <!--提交按钮-->
		        <div class="submitNav" >
		        	<div id="submit" class="submit" >提交</div>
		        </div>
			</form>
		</div>
	</div>

</body>

<script type="text/javascript">
var paymentModeId ="";
var orderId = "${orderId}";
var paymentModeName ="";
var paymentModeComment ="";

   $("#submit").on("click", function(){    //提交事件
	    $.mobile.loading("show"); 
        paymentModeId = $('#selectPayType input[name="paymentRadio"]:checked').val();

        if (typeof(paymentModeId) == "undefined"){
        	alert("请选择付款方式");	
        	return false;
        }

  	    $.post("${ctx}/preorder/savePayType?rm=" + Math.random(), 
 			    {"paymentModeId":paymentModeId,"orderId":orderId}, 
 				function(result) {
 			    	var result =JSON.parse(result);
 			        if(result.success==true){
 				       /* alert( "提交成功"); */ 				      
 				       window.location.href="${ctx}/preorder/placeOrderRes?orderId="+ orderId+"&rm=" + Math.random(); 
 			        }else{
 			           $.mobile.loading("hide");
 				       alert(result.msg);
 				       window.location.href="${ctx}/preorder/getList?rm=" + Math.random();  
 			        }
 		        }); 

    });
   
   $(".imageWrap").on("click", function(){    //返回事件
	   $.mobile.loading("hide");
	   window.location.href="${ctx}/preorder/getList?rm=" + Math.random();  
   });
</script>
</html>