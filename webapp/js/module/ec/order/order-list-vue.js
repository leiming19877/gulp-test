define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	require("date");
	var $ = require("zepto");
	var order_busi_id = '';//作废订单用
	var order_id = '';//确认订单
	var pageno = 1;
	//作废订单 弹框用
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			queryParam: {
				totalBuyQuantity:'0',
				totalBuyWeight:'0.00',
				totalBuyMoney:'0.00',
				orderStatus:'',
				orderBusiId:'',
				createdDatetime:'',
				totalReallyQuantity:'0',
				totalReallyWeight:'0.00',
				orderLadingQuanity:'0',
				orderLadingWeight:'0.00'
			},
			dataList:[],
			agentNameList:[]
		},
		created:function(){
			this.loadData('-1');
			this.loadAgentNameList();
			this.setDefaultValue();
		},
		methods: {
			cancelOrder:function(orderBusiId){
				var params = {
					orderBusiId:orderBusiId
				};
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/info",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	if(resp.orderStatus == '1'){
			        		$('#iosActionsheet').addClass('weui-actionsheet_toggle');
			        		order_busi_id = orderBusiId;
			        	}else{
			        		weui.toast('订单已变更，请刷新页面！', 2000);
			        	}
			        },
			        error: function(data,xhr, type){
			        	weui.toast('系统错误！', 2000);
			        }
				});
			},
			doCancelOrder:function(cancel_type){
				var self = this;
				var loading = weui.loading('操作中...', {});
				var params = {};
				params.order_busi_id = order_busi_id;
				params.cancel_type = cancel_type;
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/cancel",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	loading.hide();
			        	weui.toast('已完成', 1000);
			        	$('#iosActionsheet').removeClass('weui-actionsheet_toggle');
			        	self.doQuery();
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 2000);
			        	$('#iosActionsheet').removeClass('weui-actionsheet_toggle');
			        }
		      });
			},
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
				 $('#sellerName').val("");
				 $('#deliveryType').val("-1");
				 $('#agentName').val("-1");
				 $('#projectName').val("");
				 $('#showPicker_jhfs').text('不限');
				 $('#showPicker_thdw').text('不限');
			},
			doQuery:function(){
				$("#searchPanel").removeClass("m-quote-addprice-show").addClass("m-quote-addprice-close");
				setTimeout(function(){$("#searchPanel").addClass("hide")},100);
				pageno = 1;//第一页
				var loading = weui.loading('加载中...', {});
				var sta = "";
				var type = $('.weui-bar__item_on').attr('id').split('_')[1];
				switch(type){
				case 'all':
				  sta = "-1";
				  break;
				case "dsx":
					sta = "31,32";
					break;
				case "zxz":
					sta = "4";
					break;
				case "ywc":
					sta = "42";
					break;
				default:
				  sta = "-1";
				}
				var orderBeginDate = $('#startDate').val();
				var orderEndDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var projectName = $('#projectName').val();
				var agentName = $('#agentName').val();
				var deliveryType = $('#deliveryType').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						deliveryType:deliveryType,
						sta:sta,
						orderBeginDate:orderBeginDate,
						orderEndDate:orderEndDate,
						sellerName:sellerName,
						projectName:projectName,
						agentName:agentName,
				};
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/list4wechat",
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
		        			$("#loadMore").addClass("hide");
		        		}
			        	loading.hide(); 
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 3000);
			        }
		      });
			},
			loadMore:function(){
				setTimeout(function(){$("#searchPanel").addClass("hide")},100);
				
				var loading = weui.loading('加载中...', {});
				var sta = "";
				var type = $('.weui-bar__item_on').attr('id').split('_')[1];
				switch(type){
					case 'all':
					  sta = "-1";
					  break;
					case "dsx":
						sta = "31,32";
						break;
					case "zxz":
						sta = "4";
						break;
					case "ywc":
						sta = "42";
						break;
					default:
					  sta = "-1";
				}
				var orderBeginDate = $('#startDate').val();
				var orderEndDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var projectName = $('#projectName').val();
				var agentName = $('#agentName').val();
				var deliveryType = $('#deliveryType').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						deliveryType:deliveryType,
						sta:sta,
						orderBeginDate:orderBeginDate,
						orderEndDate:orderEndDate,
						sellerName:sellerName,
						projectName:projectName,
						agentName:agentName,
				};
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/list4wechat",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	if(resp != null && resp.length>0){
		        			pageno ++;
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
			        	weui.toast('网络异常!', 3000);
			        }
		      });
			},
			setDefaultValue:function(){
				$('#showPicker_jhfs').text('不限');
				$('#showPicker_thdw').text('不限');
			},
			loadData:function(sta){
				pageno = 1;//第一页
				var loading = weui.loading('加载中...', {});
				var params = {
						pageno:pageno,
						rowsize:5,
						deliveryType:'-1',
						sta:sta
				};
				
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/list4wechat",
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
			        	weui.toast('网络异常!', 3000);
			        }
		      });
			},
			loadAgentNameList:function(){
				$.ajax({
			        type: 'POST',
			        url: "../../ec/order/agentName/list",
			        data: null,
			        dataType:'json',
			        success: function(resp){
			        	queryVue.agentNameList = resp;
			        },
			        error: function(data,xhr, type){
			        	weui.toast('获取提货单位失败!', 3000);
			        }
		      });
			},
			toOrderDetail:function(orderId){
				window.location.href = "../../ec/order/toDetail?orderId="+orderId;
			},
			toLadeList:function(orderId){
				window.location.href = "../../lading/toList4wechat?orderId="+orderId;
			},
			toContractDetail:function(preOrderContractId){
				window.location.href = "../contract/toBuyContractDetail?contractId="+preOrderContractId;
				return ;
			},
			confirmOrder:function(orderId){
	            $('#androidDialog1').css('display','block');
	            order_id = orderId;
			},
			closeConfirmWindow:function(){
				order_id = '';
				$('#androidDialog1').css('display','none');
			},
			doComfirOrder:function(){
				var self = this;
				var loading = weui.loading('操作中...', {});
				var params = {};
				params.orderId = order_id;
				$.ajax({
			        type: 'GET',
			        url: "../../ec/order/confirm",
			        data: params,
			        dataType:'json',
			        success: function(resp){
			        	loading.hide();
			        	weui.toast('已完成', 1000);
			        	$('#androidDialog1').css('display','none');
			        	self.doQuery();
			        },
			        error: function(data,xhr, type){
			        	loading.hide();
			        	weui.toast('网络异常!', 2000);
			        	$('#androidDialog1').css('display','block');
			        }
		      });
			}
		}
	});
	
	$('#iosActionsheetCancel').on('click',function(){
		$('#iosActionsheet').removeClass('weui-actionsheet_toggle');
	});
	
    $('#showPicker_jhfs').on('click', function () {
        weui.picker([{
            label: '不限',
            value: '-1'
        }, {
            label: '仓库自提',
            value: 'ckzt'
        }, {
            label: '工厂自提',
            value: 'gczt'
        }, {
            label: '包到',
            value: 'bd'
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
    
    $('#showPicker_thdw').on('click', function () {
        weui.picker(queryVue.agentNameList, {
        	defaultValue:[-1],
            onChange: function (result) {
            	$('#agentName').val(result[0].value);
            },
            onConfirm: function (result) {
            	$('#showPicker_thdw').text(result[0].label);
            }
        });
    });
    
	$('#startDate').on('click', function () {
        weui.datePicker({
            start: 1990,
            end: new Date().getFullYear(),
            onChange: function (result) {
            },
            onConfirm: function (result) {
            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
                $('#startDate').val(value);
            }
        });
    });
	 $('#endDate').on('click', function () {
        weui.datePicker({
            start: 1990,
            end: new Date().getFullYear(),
            onChange: function (result) {
            },
            onConfirm: function (result) {
            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
                $('#endDate').val(value);
            }
        });
    });
	 
});


