define(function(require, exports, module) {
	  $(".submit").click(function(){
		  doSaveLicenseNo();
	  });
	  
	  $(".btn_off").on('click',function(){
		  var self = $(this);
	  	  var id =  self.attr("data-deleteLicenseNo");
		  deleteLicenseNo(id);
	  });
	  
	  
	  $(".switchVerifyType").click(function(){
		  var self = $(this);
	  	  var verifyType =  self.attr("data-verifyType");
	  	  switchVerifyType(verifyType);
	  });
	
	  $(".btn_k").click(function(){
		  selectLicenseNo();
	  });
	  
	  $(function(argument) {
	        $('[type="checkbox"]').bootstrapSwitch();
	      })
	  
		function switchVerifyType(verifyType){
			var evLadingId = $('#evLadingId').val();
			var ladingId = $('#ladingId').val();
			var ladingType = $('#ladingType').val();
			var url = "/lading/toSetLadingPick.pfv?ladingId="+ladingId +"&verifyType="+verifyType+"&ladingType="+ladingType+"&evLadingId="+evLadingId;
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
			var url = "/lading/saveLadingDelivery.pfv?";
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
								var url = "/lading/queryLadingWeixinInfo.pfv?phone="+phone+"&verifyStatus=-1&range=1-10&rm="+Math.random();
								window.location.href = url;
							}
						});
					}else{
						jAlert("操作失败,请联系管理员");
					} 
		        }
		    });
		}

});


