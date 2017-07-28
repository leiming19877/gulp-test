define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	require("date");
	var $ = require("zepto");
	var pageno = 1;
	//作废订单 弹框用
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			queryParam: {
			},
			dataList:[]
		},
		created:function(){
			this.loadData();
			this.setDefaultValue();
		},
		methods: {
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
				 $('#chkBillCode').val("");
				 $('#deliveryUnitName').val("");
				 $('#showPicker_billType').text('不限');
				 $('#billType').val("-1");
			},
			doQuery:function(){
				$("#searchPanel").removeClass("m-quote-addprice-show").addClass("m-quote-addprice-close");
				setTimeout(function(){$("#searchPanel").addClass("hide")},100);
				pageno = 1;//第一页
				var loading = weui.loading('加载中...', {});
				var orderBeginDate = $('#startDate').val();
				var orderEndDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var chkBillCode = $('#chkBillCode').val();
				var billType = $('#billType').val();
				var deliveryUnitName = $('#deliveryUnitName').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						chkBillCode:chkBillCode,
						deliveryUnitName:deliveryUnitName,
						beginDate:orderBeginDate,
						endDate:orderEndDate,
						billType:billType,
						billStatus:'2',
						sellerName:sellerName
				};
				$.ajax({
			        type: 'POST',
			        url: "../../checkbill/list",
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
				var sta = "2";//已审核
				var orderBeginDate = $('#startDate').val();
				var orderEndDate = $('#endDate').val();
				var sellerName = $('#sellerName').val();
				var chkBillCode = $('#chkBillCode').val();
				var billType = $('#billType').val();
				var deliveryUnitName = $('#deliveryUnitName').val();
				var params = {
						pageno:pageno,
						rowsize:5,
						chkBillCode:chkBillCode,
						deliveryUnitName:deliveryUnitName,
						beginDate:orderBeginDate,
						endDate:orderEndDate,
						billType:billType,
						billStatus:'2',
						sellerName:sellerName
				};
				$.ajax({
			        type: 'POST',
			        url: "../../checkbill/list",
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
				$('#showPicker_billType').text('不限');
			},
			loadData:function(){
				pageno = 1;//第一页
				var loading = weui.loading('加载中...', {});
				var params = {
						pageno:pageno,
						rowsize:5,
						billStatus:'2',
						billType:'-1'
				};
				$.ajax({
			        type: 'POST',
			        url: "../../checkbill/list",
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
			toCHKBillDetail:function(checkBillId){
				window.location.href = "../../checkbill/toDetail?checkBillId="+checkBillId;
			}
		}
	});
	
	$('#iosActionsheetCancel').on('click',function(){
		$('#iosActionsheet').removeClass('weui-actionsheet_toggle');
	});
	
    $('#showPicker_billType').on('click', function () {
        weui.picker([{
            label: '不限',
            value: '-1'
        }, {
            label: '买方对账',
            value: '1'
        }, {
            label: '第三方对账',
            value: '2'
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


