define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	require("date");
	var $ = require("zepto");
	var orderId = getOrderId();
	var pageno = 1;
	//作废订单 弹框用
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			queryParam: {
				
			},
			dataList:[],
			warehouseList:[],
			ladingStatusList:[]
		},
		created:function(){
			this.setDefaultValue();
			this.loadWarehouseList();
			this.loadLadingStatusList();
			this.loadData('-1');
		},
		methods: {
			changeTab:function(sltId,type){                          
				$('.weui-bar__item_on').removeClass('weui-bar__item_on');
				$("#"+sltId).addClass("weui-bar__item_on");
				this.loadData(type);
			},
			showSearchPanel:function(){
				$("#searchPanel").removeClass("hide");
				setTimeout(function(){$("#searchPanel").addClass("m-quote-addprice-show").removeClass("m-quote-addprice-close");},100);
			},
			closeSearch:function(){
				$("#searchPanel").removeClass("m-quote-addprice-show").addClass("m-quote-addprice-close");
				setTimeout(function(){$("#searchPanel").addClass("hide")},100);
			},
			stopCloseSearchPanel:function(e){
				e.stopPropagation();
			},
			clearBtn:function(){
				 $('#startDate').val("");
				 $('#endDate').val("");
				 $('#ecLadingCode').val("");
				 $('#sellerName').val("");
				 $('#deliveryType').val("-1");
				 $('#showPicker_jhfs').text('不限');
				 $('#warehouseId').val("-1");
				 $('#showPicker_warehouse').text('不限');
				 $('#ladingStatus').val("-1");
				 $('#showPicker_ladingSta').text('不限');
			},
			doQuery:function(){
				$("#searchPanel").removeClass("m-quote-addprice-show").addClass("m-quote-addprice-close");
				setTimeout(function(){$("#searchPanel").addClass("hide")},100);
				//条件查询全部跳转到全部tab页面 产品说的
				$('#type_all').addClass('weui-bar__item_on');
				$("#type_dsx").removeClass("weui-bar__item_on");
				pageno = 1;//第一页
				var loading = weui.loading('加载中...', {});
				//参数
				var startDate = $('#startDate').val();
				var endDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var ecLadingCode = $('#ecLadingCode').val();
				var warehouseId = $('#warehouseId').val();
				var deliveryType = $('#deliveryType').val();
				var ladingStatus = $('#ladingStatus').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						orderId:orderId,//从订单列表链接过来的带有orderid
						startDate:startDate,
						endDate:endDate,
						sellerName:sellerName,
						deliveryType:deliveryType,
						ecLadingCode:ecLadingCode,
						warehouseId:warehouseId,
						ladingStatus:ladingStatus
				};
				$.ajax({
			        type: 'POST',
			        url: "../../lading/list4wechat",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	if(resp != null && resp.length>0){
			        		pageno ++;//初始为1
				        	queryVue.dataList = resp;
		        			if(resp.length==5){
		        				$("#loadMore").removeClass("hide");
		        			}else{
				        		$("#loadMore").addClass("hide");
				        	}
		        		}else{
		        			queryVue.dataList = resp;
		        			$("#loadMore").addClass("hide");
		        		}
			        	loading.hide(); 
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 2000);
			        }
		      });
			},
			loadMore:function(){
				setTimeout(function(){$("#searchPanel").addClass("hide")},100);
				var loading = weui.loading('加载中...', {});
				//参数
				var startDate = $('#startDate').val();
				var endDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var ecLadingCode = $('#ecLadingCode').val();
				var warehouseId = $('#warehouseId').val();
				var deliveryType = $('#deliveryType').val();
				var ladingStatus = $('#ladingStatus').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						orderId:orderId,//从订单列表链接过来的带有orderid
						startDate:startDate,
						endDate:endDate,
						sellerName:sellerName,
						deliveryType:deliveryType,
						ecLadingCode:ecLadingCode,
						warehouseId:warehouseId
				};
				var type = $('.weui-bar__item_on').attr('id').split('_')[1];
				if(type == 'dsx'){
					params.ladingStatus = '1,2,3,9';
				}else{
					params.ladingStatus = ladingStatus;
				}
				$.ajax({
			        type: 'POST',
			        url: "../../lading/list4wechat",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	if(resp != null && resp.length>0){
			        		pageno++;
				        	queryVue.dataList = queryVue.dataList.concat(resp);
			        		if(resp.length==5){
				        		$("#loadMore").removeClass("hide");
				        	}else{
				        		$("#loadMore").addClass("hide");
				        	}
			        	}else{
			        		$("#loadMore").addClass("hide");
			        	}
			        	loading.hide(); 
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 2000);
			        }
		      });
			},
			setDefaultValue:function(){
				$('#showPicker_jhfs').text('不限');
				$('#showPicker_ladingSta').text('不限');
				$('#showPicker_warehouse').text('不限');
			},
			loadData:function(sta){
				pageno = 1;//第一页
				var loading = weui.loading('加载中...', {});
				//参数
				var startDate = $('#startDate').val();
				var endDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var ecLadingCode = $('#ecLadingCode').val();
				var warehouseId = $('#warehouseId').val();
				var deliveryType = $('#deliveryType').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						orderId:orderId,//从订单列表链接过来的带有orderid
						startDate:startDate,
						endDate:endDate,
						sellerName:sellerName,
						deliveryType:deliveryType,
						ecLadingCode:ecLadingCode,
						warehouseId:warehouseId,
						ladingStatus:sta
				};
				$.ajax({
			        type: 'POST',
			        url: "../../lading/list4wechat",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	if(resp != null && resp.length>0){
			        		pageno ++;
			        		queryVue.dataList = resp;
			        		if(resp.length==5){
				        		$("#loadMore").removeClass("hide");
				        	}else{
				        		$("#loadMore").addClass("hide");
				        	}
			        	}else{
			        		queryVue.dataList = [];
			        		$("#loadMore").addClass("hide");
			        	}
			        	loading.hide(); 
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 2000);  
			        }
		      });
			},
			loadLadingStatusList:function(){
				$.ajax({
			        type: 'POST',
			        url: "../../lading/ladingSta/list",
			        data: null,
			        dataType:'json',
			        success: function(resp){
			        	queryVue.ladingStatusList = resp;
			        },
			        error: function(data,xhr, type){
			        	weui.toast('获取提单状态列表失败!', 2000);
			        }
		      });
			},
			loadWarehouseList:function(){
				$.ajax({
			        type: 'POST',
			        url: "../../lading/warehouse/list",
			        data: null,
			        dataType:'json',
			        success: function(resp){
			        	queryVue.warehouseList = resp;
			        },
			        error: function(data,xhr, type){
			        	weui.toast('获取仓库列表失败!', 2000);
			        }
		      });
			},
			toLadingDetail:function(ladingId){
				window.location.href = "../../lading/toDetail?ladingId="+ladingId;
			},
			ladingSetting:function(ladingId){
				var id = ladingId+"";
				window.location.href = "../../lading/ladingSetting?ladingId="+id;
			},
			pickStartDate:function(e){
				var defaultValue = [];
			 	if ($(e.target).val() == "") {
				 	var date = new Date();
				 	defaultValue.push(date.getFullYear());
					defaultValue.push(date.getMonth()+1);
					defaultValue.push(date.getDate());
			 	} else {
			 		var sta = $(e.target).val().split("-");
					defaultValue.push(sta[0]);
					defaultValue.push(sta[1]);
					defaultValue.push(sta[2]);
			 	}
			 	var endDate = $("#endDate").val();
				weui.datePicker({
		            start: 2000,
		            end: 2050,
		            defaultValue: defaultValue,
		            onChange: function (result) {
		            	//var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
		                //$(e.target).val(value);
		            },
		            onConfirm: function (result) {
		            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
		                var dateStart = new Date();
		                dateStart.setFullYear(result[0].value);
		                dateStart.setMonth(result[1].value-1);
		                dateStart.setDate(result[2].value);
		                if (endDate != "") {
		                	var dateEnd = new Date();
			            	var st = endDate.split("-");
			            	dateEnd.setFullYear(st[0]);
			            	dateEnd.setMonth(st[1]-1);
			            	dateEnd.setDate(st[2]);
			            	if (dateStart <= dateEnd) {
				                $(e.target).val(value);
			            	} else {
				                $(e.target).val(defaultValue[0]+"-"+defaultValue[1]+"-"+defaultValue[2]);
								$("#iosDialog2").show();
			            	}
		                } else {
		                	$(e.target).val(value);
		                }
		            }
		        });
			 },
			 pickEndDate:function(e){
			 	var date = new Date();
				var defaultValue = [];
				defaultValue.push(date.getFullYear());
				defaultValue.push(date.getMonth()+1);
				defaultValue.push(date.getDate());
			 	var startDateStr = $("#startDate").val();
				if (startDateStr == "") {
					$("#iosDialog2").show();
					return;
				} else {
					weui.datePicker({
			            start: 2000,
			            end: 2050,
			            defaultValue: defaultValue,
			            onChange: function (result) {
			            },
			            onConfirm: function (result) {
			            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
			            	var dateStart = new Date();
			            	var st = startDateStr.split("-");
			            	dateStart.setFullYear(st[0]);
			            	dateStart.setMonth(st[1]-1);
			            	dateStart.setDate(st[2]);
			            	
			            	var dateEnd = new Date();
			            	dateEnd.setFullYear(result[0].value);
			            	dateEnd.setMonth(result[1].value-1);
			            	dateEnd.setDate(result[2].value);
			            
			            	if (dateStart <= dateEnd) {
				                $(e.target).val(value);
			            	} else {
								$("#iosDialog2").show();
			            	}
			            }
			        });
				}
			 },
			 doneClose:function(e){
			 	$("#iosDialog2").hide();
			 }
		}
	});
	
	//提单状态
	$('#showPicker_ladingSta').on('click', function () {
        weui.picker(queryVue.ladingStatusList, {
        	defaultValue:[-1],
            onChange: function (result) {
            	$('#ladingStatus').val(result[0].value);
            },
            onConfirm: function (result) {
            	$('#showPicker_ladingSta').text(result[0].label);
            }
        });
    });
	
	//交货方式
    $('#showPicker_jhfs').on('click', function () {
        weui.picker([{
            label: '不限',
            value: '-1'
        }, {
            label: '仓库自提',
            value: 'zt'
        }, {
            label: '工厂自提',
            value: 'gczt'
        }, {
            label: '包到',
            value: 'bps'
        }], {
        	defaultValue:[-1],
            onChange: function (result) {
            	$('#deliveryType').val(result[0].value);
            },
            onConfirm: function (result) {
            	$('#showPicker_jhfs').text(result[0].label);
            }
        });
    });
    
    //提货仓库下拉框
    $('#showPicker_warehouse').on('click', function () {
        weui.picker(queryVue.warehouseList, {
        	defaultValue:[-1],
            onChange: function (result) {
            	$('#warehouseId').val(result[0].value);
            },
            onConfirm: function (result) {
            	$('#showPicker_warehouse').text(result[0].label);
            }
        });
    });
	 /**
	 * 获取url中的orderId
	 */
	function getOrderId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?orderId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return "";
	}
});


