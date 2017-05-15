<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@page contentType="text/html; charset=utf-8"%>
<link href="${ctx}/css/global/global-1.0.1.all.min.css" rel="stylesheet" type="text/css" />
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

<script src="${ctx}/js/common/Date.js" type="text/javascript"></script>
<title>选择物流方式</title>
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
    margin-bottom: 10px;
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
    padding: 35px 0 10px 5px;
    border-bottom: 1px solid #ebebeb;   
}

.ztHeader {
    position:relative;
    padding: 10px 0 10px 5px;
    border-bottom: 1px solid #ebebeb;
}

.bpsHeader {
    position:relative;
    padding:15px 0;
    border-bottom: 1px solid #ebebeb; 
    padding: 10px 0 10px 5px;    
}

.content{ 
    position: relative;top:0px;    
    margin-bottom: 1px;
    background: #FFF;
    padding: 10px 0 0 5px; 
    overflow-y:hidden
    overflow:auto;   
}

.content_zt{ 
    position: relative;top:0px;    
    margin-bottom: 1px;
    background: #FFF;
    padding: 15px 0 0 5px; 
    overflow-y:hidden
    overflow:auto;   
}

.content_bps{ 
    position: relative;top:0px;    
    margin-bottom: 1px;
    background: #FFF;
    padding-left: 5px; 
    overflow-y:hidden
    overflow:auto;   
}

.ui-btn {
    font-weight: normal !important;
}

.line {
    height: 20px; 
    line-height: 20px;
    width: 100%;
}

.line_content{ 
    height: 50px; 
    line-height: 30px;
    width: 100%;
    padding-left:-15px;
}

.line_l {
    float: left;
    color: #999999;
    font-size: 14px;
    font-weight: bold;
    width: 75px;
    height: 10px;
    line-height: 10px;
    padding:10px 0 5px -15px; 
    text-align:center;
}

.line_l_ztsz {
    float: left;
    color: #999999;
    font-size: 14px;
    font-weight: bold;
    width: 75px;
    height: 20px;
    line-height: 20px;
    padding:10px 0 5px 0px; 
    text-align:center;
}

.line_l_label {
    color: #999999;
    font-size: 14px;
    font-weight:bold;
    width: 100%;
    height: 10px;
    line-height: 10px;
    padding: 10px 0 2px 8px;
    margin-bottom:0px
}

.line_r {
    float: left;
    color: #606060;
    font-size: 14px;
    padding-left: 5px;
    height: 20px;
    line-height: 20px;
}

.deliveryAddress{
   margin-top:0px;  
}

.line_Address{
    position:relative;
    height: 65px; 
    width: 100%;
    padding: 32px 0 32px 15px;
}

.lableSelect{
    font-size:10;
    font-weight: 300;
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
	padding:8px 0;
}

.submit{
	border-radius:4px;
	position:fixed;
	background:#436CB4;
	color:#FFF;
	text-align:center;
	font-size:15px;
	margin-left:10%;
	width:80%;
	height:43px;
	line-height:43px;
	text-shadow:none;
}

.submit:active{
	background:#436CB4;
}

.addAddressDiv {
    width: 100%;
    padding: 40px 10px;
}

.addAddressSection {
    font-size: 14px;  
    width: 160px;
    text-align: center;
    float: right;
    text-shadow:none;
    display:inline-block;
}

.foot{
	height:20px;
	width:100%;
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
	<div data-role="page"  class="unit" id="bidListPage">
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>选择物流方式</h1>
			</div> 
		</div>

		<div data-role="content" >
			    <div id="selectType" class="header white">
			        <section > 
			            <div class="line_l_label ">选择交货方式：</div>                        
                        <div>
							<fieldset data-role="controlgroup" id="chooseType" data-type="horizontal">
								<label for="zt">自提</label> 
					  		  	  <input type="radio"  name="deliveryType" id="zt" value="zt" onclick="showTab('ztDiv')"> 
								<label for="bps">包配送</label> 
						 	  	  <input type="radio"  name="deliveryType" id="bps" value="bps" checked="checked"  onclick="showTab('bpsDiv')">
				   	    	</fieldset>
                        </div>
				    </section>
				</div>
				    
			    <div id="ztDiv" >
			         <div class="ztHeader white" data-role="content">   
					 	 <section class="line">
							<div class="line_l ">提货单位：</div>
							<div class="line_r "> ${memberName}</div>
						 </section>			                               
						 <section class="line">
							<div class="line_l ">提货日期：</div>
							<div class="line_r ">
							    <fmt:formatDate value="${deliveryBeginDatetime}" 
							       pattern="yyyy-MM-dd" />
							</div>
							<div class="line_r "> ~ </div>
							<div class="line_r ">
							    <fmt:formatDate value="${deliveryEndDatetime}" 
							       pattern="yyyy-MM-dd" />
                            </div>
						 </section>
                     </div>
                     
                     <div>
			                <div class="line_l_label ">提货设置</div>			
			         </div>
			         <div id="setDelivery" class="content_zt white" data-role="content" >	
						 <section class="line_content">
							<div class="line_l_ztsz">车牌号码：</div>
							<div class="line_r "> 
							     <input type="text" name="carNo" id="carNo" onblur="truckCodeChanged(this)" 
							            placeholder="多个车牌号码用逗号分隔" maxlength=239>  
							</div>
						 </section>
						 <section class="line_content">
							<div class="line_l_ztsz">联系电话：</div>
							<div class="line_r "> 
							     <input type="text" name="phone" id="phone" onblur="isMobileNumber(this)" 
							            placeholder="多个手机号用逗号分隔" maxlength=110>  </div>
						 </section>						
				     </div>                        
			    </div>				
                    
			    <div id="bpsDiv" >
			         <div  class="bpsHeader white" data-role="content">                         
						 <section class="line">
							<div class="line_l ">交货日期：</div>
							<div class="line_r ">
							    <fmt:formatDate value="${deliveryBeginDatetime}" 
							       pattern="yyyy-MM-dd" />
							</div>
							<div class="line_r "> ~ </div>
							<div class="line_r ">
							    <fmt:formatDate value="${deliveryEndDatetime}" 
							       pattern="yyyy-MM-dd" />
                            </div>
						 </section>
                     </div>
                     
			         <div class="line_l_label ">收货地址</div>
			         
			         <div id="chooseAddress"  class="content_bps white" data-role="fieldcontain" >			             
				     	 <fieldset data-role="controlgroup" id="selectAddress">
                              <c:forEach items="${userConsigneeVOList}" var="cL" varStatus="status">
                                   <section class="deliveryAddress">
                                       <div id="${cL.con_id}" class="line_Address" data-role="listview"> 
                                           <label for="${cL.con_id}"+"_" class="lableSelect"> 详细地址：${cL.address} 
                                              <br>联系人: ${cL.name1}"
                                              <br>联系电话:${cL.phone1}
                                              <br>身份证号:${cL.id_card1}
                                           </label>                                        
 					                       <input type="checkbox"  name="addressCheckbox" id="${cL.con_id}"+"_" 
 					                            value="${cL.con_id}" > 	 
                                       </div>
                                   </section>
                                                                     
                                </c:forEach>
					      </fieldset>
				      </div>
				         
				     <div data-role="content" class='addAddressDiv'>
				          <section onclick="addAddress('${orderId}')" class='addAddressSection'>
				              <button >添加收货地址</button>
                          </section>
				     </div>
				     
				     <div class="foot">
                     </div>	
			    </div>	

		        <!--提交按钮-->
		        <div class="submitNav" >
		        	<div class="submit">提交</div>
		        </div>

		</div>
	</div>

</body>

<script type="text/javascript">
   var logisticsType = "bps";
   var onShowTab = "bpsDiv";
   var orderId;
    
   $(function(){
	   logisticsType =${logisticsType};
	   orderId = "${orderId}";
	   
	   if (logisticsType.length>0)
	      onShowTab = "${logisticsType}" + "Div";
	   showTab(onShowTab);
   });
   
    /**车牌号输入后调用的校验方法*/
	function truckCodeChanged(obj){    	
		var truckCode = trimLicense($(obj).val());
		
		if (truckCode.length==0){
			return true;
		}
		
		$(obj).val(truckCode);
      	if(truckCode.length>239){
      		alert("您输入的车牌号个数超过最大限度30个!");
      		return false;
      	}
      	
		if (!checkCarLicensees(truckCode)){
			alert("您输入的车牌号格式不正确，如有多个车牌号，请以逗号隔开!");
			return false;
		}
	}
	/**格式化字串，去掉空格并将中文逗号转换成英文逗号*/
   function trimLicense(licenseesNum){
       licenseesNum = licenseesNum.replace(/\s+/g,"");
       return licenseesNum.replace(/，/g,",");
   }
   /**校验车牌号字串的字符是否是由英文数字中文汉字及逗号组成*/
   function checkCarLicensees(licenseesNum){
       var licenseesRule = /^[\u4e00-\u9fa5\-a-zA-Z0-9]+(\,[\u4e00-\u9fa5\-a-zA-Z0-9]+)*\b$/;
       return licenseesRule.test(licenseesNum);
   }

   //判断是否为手机号码，多个号码用逗号分隔
   function isMobileNumber(obj){  
	    var data = trimLicense($(obj).val());
	    
	    if(data.length==0){
	    	return true;
	    }
		var reg=/(1d{9},)*1\d{9}/g
		if (!reg.test(data)){			
			alert("请输入手机号，如有多个联系手机号，请用逗号分隔！");
			return false;
		}
	}
   
   //提交事件
   $(".submit").on("click", function(){
	   $.mobile.loading("show"); 
	   var orderType = "${orderType}";
       var selectedLogisticsType = $('#chooseType input[name="deliveryType"]:checked').val();

       if (selectedLogisticsType=="zt"){   //自提
    	   truckCodeChanged($("input[name='carNo']"));  //验证车牌号码  
    	   isMobileNumber($("input[name='phone']"));  //验证手机号码
    	   
           var carNo = $("input[name='carNo']").val();
           var phone = $("input[name='phone']").val(); 

           $.post("${ctx}/preorder/saveLogisticsType?rm=" + Math.random(), 
   			    {"orderId":orderId,"orderType":orderType,"delivery_type":selectedLogisticsType,"deliveryCarno":carNo,"deliveryPhoneNumber":phone}, 
   				function(result) {
   			    	var result =JSON.parse(result);
 			        if(result.success==true){
  				       /* alert( "提交成功"); */  				       
  				       window.location.href="${ctx}/preorder/placeOrderRes?orderId="+ orderId;
  			        }else{
  			           $.mobile.loading("hide");
  				       alert(result.msg);
  				       window.location.href="${ctx}/preorder/getList?rm=" + Math.random();  
  			        }
   		        });
       }else if (selectedLogisticsType=="bps") {    //包配送	  
           /* var conIds = new Array(); */
           var strConIds = "";
       	   $('#selectAddress input[name="addressCheckbox"]:checked').each(function(){
       		   /*  conIds.push($(this).val()); */
       		   strConIds +=  $(this).val() + ",";
           });
       	   if (strConIds.length==0){
       		   alert("请至少选择一个收货地址！");
       		   return false;
       	   }
     	   
    	   $.post("${ctx}/preorder/saveLogisticsType?rm=" + Math.random(), 
      			    {"orderId":orderId,"orderType":orderType,"delivery_type":selectedLogisticsType,"strConIds":strConIds}, 
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
       }
		
   });
   
   //切换div
   function showTab(divName){
	   if (divName=="ztDiv"){
		   $("div#ztDiv").show();
		   $("div#bpsDiv").hide();
	   }else{
		   $("div#bpsDiv").show();
		   $("div#ztDiv").hide();  
	   }	     
   }
   
   //添加收货地址
   function addAddress(orderId) {
	   $.mobile.loading("show");
	   window.location.href = "${ctx}/preorder/address/add?orderId="+ orderId +"&_t"+Math.random();
   }
   
   //返回事件
   $(".imageWrap").on("click", function(){
	   $.mobile.loading("hide");
	   window.location.href="${ctx}/preorder/getList?rm=" + Math.random(); 
   });
</script>
</html>