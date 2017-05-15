define(function(require, exports, module) {
	require("../../common/String");
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//引入时间组件
	require("../../common/Date");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	//查询参数
	var params = require("../../common/Params");
	//界面主内容区
	var gPage = $("#g-page");

	//调拔单上传详情模板
	var alloctionDetailTplFn = doT.template(require("./allocation-picture-upload.html"));
	
	//调拔单id
	var allocationId = params.getParam("allocationId");
	
	//附件区域
	var attachments  = null;
	//文件上传
	var atFile = null;
	
	//图片附件url列表
	var attachmentUrls = new Array();
	var wx = require("jweixin");

	var url = window.location.href;
	
	$.post("../../../../getSignUrl",{"url":url},function(data){
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: ['closeWindow','hideOptionMenu','previewImage'] // 必填，需要使用的JS接口列表
		});
		wx.ready(function(){
			wx.hideOptionMenu();
		});
	},"json");
	
	loadingToast.show("数据加载中...");
	$.ajax({
		dataType:'json',
		url:'../../purchase/allocation/getAllocationsAndDetailsData',
		data:{
			'allocationId':allocationId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 var resultHtml = alloctionDetailTplFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
			 if(data.allocationAttachments){
				 for(var i=0;i<data.allocationAttachments.length;i++){
					 attachmentUrls.push(data.allocationAttachments[i].mobileUrl); 
				 }
			 }
			 
			 proccessAtFile();
		
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	/**
	 * 给文件绑定事件
	 */
	function proccessAtFile(){
		atFile = $("#at-file");
		atFile.on("change",function(){
			if(atFile.val()){
				uploadAtFile();
			}
		});
		attachments = $("#attachments");
		attachments.on("click",".icon-delete",function(){
			 var self  = $(this);
			 var prev = self.prev();
			 var href = prev.attr("href");
			 var attachmentId = self.attr("data-attachment-id");
			$.post('../../purchase/allocation/deleteAllocationAttachment',
					{'attachmentId':attachmentId}, 
					function(data){
						self.remove();
						prev.remove();
						for(var i=0;i<attachmentUrls.length;i++){
							if(attachmentUrls[i] === href){
								attachmentUrls.splice(i,1);
								break;
							}
						}
					},'json')
			 
		});
		attachments.on("click","a",function(e){
			e.preventDefault();
			var href = this.href;
			wx.previewImage({
			    current: href, // 当前显示图片的http链接
			    urls: attachmentUrls // 需要预览的图片http链接列表
			});
		});
	}
	/**
	 * 文件上传处理
	 */
	function uploadAtFile(){
		 loadingToast.show("上传中...");
		var req = new XMLHttpRequest();
		var formData = new FormData();
		formData.append("allocationId",allocationId);
		var files = atFile.get(0).files;
		for(var i=0;i<files.length;i++){
			formData.append("atFile",files[i]);
		}
		req.open("POST", "../../purchase/allocation/saveAllocationAttachments",true);
		req.send(formData);
		req.onload = function(e){
			loadingToast.hide();
			atFile.val("");
			//请求成功
			if(this.status  === 200){
				var data = JSON.parse(this.responseText);
				if(data.success){
					addAt(data);
				}else{
					window.alert("照片上传失败，请重新试试。");
				}
			}else{//请求失败
				window.alert("照片上传失败，请重新试试。");
			}
		}
	/*	var upload = req.upload;
		upload.onprogress  = function updateProgress(event) {
			if (event.lengthComputable) {
			  var percentComplete = event.loaded / event.total;
			    percentComplete = parseInt(percentComplete*100);
			}
		}*/
	}
	
	/**
	 * 添加一个附件信息
	 */
	function addAt(data){
		//添加到附件图片数组中
		attachmentUrls.push(data.url); 
		
		var nodeStr = "";
		nodeStr+='<a class="at" ';
		nodeStr+='href="'+data.url+'">';
		nodeStr+=data.fileName+'</a>';
		nodeStr+='<i ';
		nodeStr+='data-attachment-id="'+data.attachmentId+'" ';  
		nodeStr+='class="iconfont icon-delete weui_btn weui_btn_mini weui_btn_primary"></i>';
		attachments.append(nodeStr);    
	}
	

	gPage.on('click','.submit',function (e){
			var orderId=$("#orderId").val();
			var deliveryGoodsCode = $("#deliveryGoodsCode").val();
	      	$.ajax({
				url:"../../purchase/allocation/saveDeliveryGoodsCode",
				data:{
					'allocationId':allocationId,
					'deliveryGoodsCode':deliveryGoodsCode,
					'_t':new Date().getTime()
				},
				dataType:"json",
				success:function(data, status, xhz){
					loadingToast.hide();
					if(status=="success"&&data!=""){
						window.location.href="../../purchase/allocation/toAllocationListPage?orderId="+orderId;
					}else{
						alert(data);
					}
				},
				error:function(data, status, xhz){
					loadingToast.show("网络异常，请刷新重试...");
				}
		});	
			
		}
	)
	
	
	
});