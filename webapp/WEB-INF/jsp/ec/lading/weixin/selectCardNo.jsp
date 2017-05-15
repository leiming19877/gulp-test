
<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<div class="poo_lb">
	<div class="list_tiao">
		<h3>请选择提货人信息</h3>
		<c:forEach items="${cardNoList}" var="cardNo" varStatus="status">
                <dl class="doCheck" data-doCheck="${status.index}">
                    <dd>${cardNo.driverName}</dd>
                    <dd>${cardNo.idCard}</dd>
                    <dd class="switch">
                        <div>
                        	<input id="cardNo_${status.index}" name="cardNo" class="btn_checkbox" type="button" value="" 
                        		driverName="${cardNo.driverName}" idCard="${cardNo.idCard}" class="btn_off" deliveryId="${cardNo.driverInfoId}"/>	
                        </div>
                    </dd>
                </dl>
		</c:forEach>
	</div>
	<div class="btn_are">
      	<input type="button" class="btn_b btn_no"  value="关闭" >
      	<input type="button" class="btn_b btn_ok" style=" float:right;" value="确定" ">
   	</div>
</div>
<script type="text/javascript">
	  $(".doCheck").click(function(){
		  var self = $(this);
	  	  var checkVal =  self.attr("data-doCheck");
	      doCheck(checkVal);
	  });
	  $(".btn_no").click(function(){
		  doClose();
	  });
	  $(".btn_ok").click(function(){
		  getCardNo();
	  });

	function doCheck(index){
		if($("#cardNo_"+index).attr("checked") == "checked"){
			$("#cardNo_"+index).removeAttr("checked");
			$("#cardNo_"+index).removeClass("on");
			$("#cardNo_"+index).val("");
		}else{
			$("#cardNo_"+index).attr("checked","checked");
			$("#cardNo_"+index).addClass("on");
			$("#cardNo_"+index).val("√");
		}
	}
	function getCardNo(){
		$('input[name=cardNo]').each(function(){
			if($(this).attr('checked') == 'checked'){
				var driverName = $(this).attr('driverName');
				var idCard = $(this).attr('idCard');
				var deliveryId = $(this).attr('deliveryId');
				if(isAddCardNo(idCard)){
					//增加一行提货设置人,填充提货人
					addCardNo(driverName,idCard,deliveryId);
				}

			}
		});
		doClose();
	}
	function isAddCardNo(selectidCard){
		var addFlag = true;
		//未验证查找重复身份证
		$('input[name=deliveryCards]').each(function(){
			var idCard = $(this).val();
			if(idCard == selectidCard){
				addFlag= false;
				return addFlag;
			}
		});
		if(addFlag){
			//已验证查找重复身份证
			$('input[name=verifyDeliveryCards]').each(function(){
				var idCard = $(this).val();
				if(idCard == selectidCard){
					addFlag= false;
					return addFlag;
				}
			});
		}
		return addFlag;
	}

	//关闭
	function doClose(){
		$('input[name=cardNo]').each(function(){
			if($(this).attr('checked') == 'checked'){
				$(this).removeAttr("checked");
				$(this).removeClass("on");
				$(this).val("");
			}
		});
		$(".poo_lb").slideToggle("slow");
		$("#hiddenContent").css("display",'');
	}

	//新增一行提货人
	function addCardNo(driverName,idCard,deliveryId){
	    var flagLine=$("#flag");
	    var str='<dl name="cardNo" id="cardNo_'+deliveryId+'"><dd>';
	    str+=driverName;
	    str+='</dd>';
	    str+='<dd class="cphm">';
	    str+=idCard;
	    str+='</dd>';
	    str+='<dd class="switch"> <input type="button" class="btn_off" value="×" onclick="deleteCardNo('+deliveryId+')"></dd>';
	    str+='<input type="hidden" name="deliveryCards" value="'+idCard+'"/>';
	    str+='<input type="hidden" name="deliveryNames" value="'+driverName+'"/>';
	    str+='<input type="hidden" name="deliveryIds" value="'+deliveryId+'"/>';
	    str+='</dl>';
	    flagLine.before(str);
	}
</script>
