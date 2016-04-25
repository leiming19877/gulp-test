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
<title>确认物流方式</title>
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
    padding-left: 0;
    height: 20px;
    border-bottom: 1px solid #ebebeb;   
}

.content{ 
    position: relative;
    /* height: 150px;  */
    top: 25px;
    margin-bottom: 1px;
    background: #FFF;
    overflow-y:hidden
    overflow:auto;   
}

.line {
    height: 210px; 
    width: 100%;
    position: relative;
    border-bottom: 1px solid #ebebeb; 
}

.line_header {
    position: absolute;top:15px;
    height: 30px; 
    line-height: 50%;
    width: 100%;
    float: left;
    color: #999999;
    padding-left: 10px;    
}

.line_content{
    position: absolute; top:30px;
    height: 170px; 
    line-height: 30px;
    width: 100%;
    float: left;
    color: #999999;
    padding-left: 10px;
}

.line_l {
    float: left;
    color: #999999;
    font-size: 16px;
    font-weight:bold;
    width: 90px;
    height: 15px;
    line-height: 10px;
    padding-left: -100px;
    text-align:center
}

.line_r {
    float: left;
    color: #606060;
    font-size: 16px;
    padding-left: 5px;
    height: 15px;
    line-height: 10px;
}

.tags_y {
    font-size: 16px;  
    border-radius: 3px;
    width: 100px;
    height: 15px;
    text-align: center;
    line-height: 20px;
    position: absolute;top:120px;right:10px;
    float: right;
    background: #FFFFFF;
    text-shadow:none;
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
	padding:3px 0;
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

.submit:active{	background:#436CB4;}

/* .cancel{
	border-radius:4px;
	background:#F9F9F9;
	color:#606060;
	text-align:center;
	font-size:15px;
	width:49%;
	height:43px;
	position: fixed;left:1px;
	line-height:50px;
} */

.foot{
	height:80px;
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
	<div data-role="page" class="unit" id="bidListPage">      
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>确认物流方式</h1>
			</div> 
		</div>
        
		<div data-role="content" >
			<div id="selectType" class="header white">
			    <section > 
			         <div class="line_l">交货方式：</div>
			         <div class="line_r "> 包配送 </div>
			    </section>
			</div>
				    
			<div>
			    <div id="setDelivery" class="content white" data-role="listview">	
                       <c:forEach items="${orderConsigneeVOList}" var="oL" varStatus="status">
                           <div id="${oL.con_id}" >
                               <section class="line">
                                   <div class="line_header">
                                       <strong>地址：${status.index + 1}</strong>
                                   </div>
                                   <div class="line_content"> 
                                        <label> 详细地址：${oL.province_name}${oL.area_name}${oL.districtName}${oL.address}
                                           <br>收货单位名称：${oL.consignee_company}
                                           <br>联系人：${oL.name1}
                                           <br>联系电话：${oL.phone1}
                                           <br>身份证号：${oL.id_card1}
                                        </label> 
                                  </div>
                                  
							       <div class='tags_y'> 
							           <p>运费 </p>
							           <p><font color="red"> ${oL.deliveryPrice} 元/吨</font></p> 
							       </div>
                               </section>
						    </div>                                           
                        </c:forEach>
                        
                     </div> 	
				 </div>  
				 <div class="foot">
                 </div>	                      
			 </div>				

		     <!--提交按钮-->
		     <div class="submitNav">
                 <!-- <div id="cancle" class="cancel">返回列表</div> -->
	             <div id="submit" class="submit">确认</div>
		     </div>
	</div>

</body>

<script type="text/javascript">
    
   $(".submit").on("click", function(){    //提交事件
	    $.mobile.loading("show");
	    var orderId = ${orderId};
		
 	   $.post("${ctx}/preorder/saveConfirmLogisticsType?rm=" + Math.random(), 
 			    {"orderId":orderId}, 
				function(result) {
 			    	var result =JSON.parse(result);
			        if(result.success==true){
				      /*  alert( "提交成功!"); */
				      
				       window.location.href="${ctx}/preorder/getList?rm=" + Math.random(); 
			        }else{
			           $.mobile.loading("hide"); 
				       alert(result.msg);
				       window.location.href="${ctx}/preorder/getList?rm=" + Math.random();  
			        }
		        }); 
		
   });
   
/*    $("#cancle").on("click", function(){    //取消事件
	   window.location.href="${ctx}/preorder/list?"; 
   }); */
   
   $(".imageWrap").on("click", function(){    //返回事件
	   $.mobile.loading("show"); 
	   window.location.href="${ctx}/preorder/getList?rm=" + Math.random(); 
   });
</script>
</html>