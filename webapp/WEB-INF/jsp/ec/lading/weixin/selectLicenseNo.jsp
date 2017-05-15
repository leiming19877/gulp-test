<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<div class="poo_lb">
	<div class="list_tiao">
		<h3>请选择提货车信息</h3>
		<c:forEach items="${licenseNoList}" var="licenseNo" varStatus="status">
                <dl class="doCheck" data-doCheck="${status.index}" >
                    <dd class="cphm">${licenseNo.carCode}</dd>
                    <dd class="switch">
                        <div>
                        	<input id="licenseNo_${status.index}" name="licenseNo" class="btn_checkbox" type="button" class="btn_off" value="" licenseNo="${licenseNo.carCode}"
                       		deliveryId="${licenseNo.carInfoId}" />	
                        </div>
                    </dd>
                </dl>
		</c:forEach>
	</div>
	<div class="btn_are">
    	<input type="button" class="btn_b btn_no"  value="关闭" >
    	<input type="button" class="btn_b btn_ok" style=" float:right;" value="确定">
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
		  getLicenseNo();
	});
	
	function doCheck(index){
		if($("#licenseNo_"+index).attr("checked") == "checked"){			
			$("#licenseNo_"+index).removeAttr("checked");
			$("#licenseNo_"+index).removeClass("on");
			$("#licenseNo_"+index).val("");
		}else{
			$("#licenseNo_"+index).attr("checked","checked");
			$("#licenseNo_"+index).addClass("on");
			$("#licenseNo_"+index).val("√");
		}
	}
	
	function getLicenseNo(){
		$('input[name=licenseNo]').each(function(){
			if($(this).attr('checked') == 'checked'){
				var licenseNo = $(this).attr('licenseNo');
				var deliveryId = $(this).attr('deliveryId');
				if(isAddLicenseNo(licenseNo)){
					//增加一行提货车牌,填充车牌号
					addLicenseNo(licenseNo,deliveryId);
				}
			}
		});
		doClose();
	}
	
	function isAddLicenseNo(selectLicenseNo){
		var addFlag = true;
		$('input[name=licenseNos]').each(function(){
			var licenseNo = $(this).val();
			if(licenseNo == selectLicenseNo){
				addFlag= false;
				return addFlag;
			}
		});
		if(addFlag){
			//已验证查找重复身份证
			$('input[name=verifyLicenseNos]').each(function(){
				var licenseNo = $(this).val();
				if(licenseNo == selectLicenseNo){
					addFlag= false;
					return addFlag;
				}
			});
		}
		return addFlag;
	}
	
	//关闭
	function doClose(){
		$('input[name=licenseNo]').each(function(){
			if($(this).attr('checked') == 'checked'){
				$(this).removeAttr("checked");
				$(this).removeClass("on");
				$(this).val("");
			}
		});
		$(".poo_lb").slideToggle("slow");
		$("#hiddenContent").css("display",'');
	}
	//新增一行车牌号
	function addLicenseNo(licenseNo,deliveryId){
	var flagLine=$("#flag");
	var str='<dl name="licenseNo" id="licenseNo_'+deliveryId+'"><dd>';
	str+=licenseNo;
	str+='</dd>';
	str+='<dd class="switch"> <input type="button" class="btn_off" value="×" onclick="deleteLicenseNo('+deliveryId+')"></dd>';
	str+='<input type="hidden" name="licenseNos" value="'+licenseNo+'"/>';
	str+='</dl>';
	flagLine.before(str);
	}
</script>
