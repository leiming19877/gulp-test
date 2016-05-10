/**
 * 买家收货分页查询模块
 */
define(function(require, exports, module) {
	//引入时间组件
	require("../../common/Date");
	//每页多少行
	var $ = require("zepto");
	var ROW_SIZE = 4;
	//待签收
	var PREPARE_RECEIPT="prepareReceipt";	
	//已签收
	var CHECKED_RECEIPT="checkedReceipt";

	//当前选择是的那种类型
	var selectedType = PREPARE_RECEIPT;
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
    //dot模板引擎
    var doT = require("dot");
    //滑动模块
	var iScroll = require("iscroll");
	
	//向下拉要显示元素
	//var pullDownEl = $("#pullDown");
	var pullDownEl = document.getElementById("pullDown");
	var pullDownOffset = pullDownEl.offsetHeight;
	//var pullUpEl = $('#pullUp'); 
	var pullUpEl = document.getElementById("pullUp");
	var pullUpOffset = pullUpEl.offsetHeight;
	
	var myScroll = null;
	//下拉刷新回调
	var pullDownAction = function(){loadReceiptData(true);};
	//上拉刷新回调
	var pullUpAction = function(){loadReceiptData();};

	//竞价列表内容
	var tabContent = $("#tab-content");

	//待签收
	var prepareReceipt = $("#prepare-receipt");
	//已签收
	var checkedReceipt = $("#checked-receipt");
	
	//签收模板
	var receiptListTpl = require("./receiptList.html");
	//当前要查询的orderId
	var orderId = getOrderId();
	
	//竞价列表行单击，导航到竞价详情
	tabContent.on("click","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		//如果是按钮触发
		if(target.hasClass("receipt-btn")){
			return ;
		}
		var self = $(this);	
		loadingToast.show("数据加载中");
		var shippingId = self.attr("data-shipping-id");
		//跳转到收货详情
		window.location.href = "toReceiptDetail?shippingId="+shippingId;
	});

	//跳转url
	tabContent.on("click",".receipt-btn",function(e){
		loadingToast.show("数据加载中");
		var self = $(this);
		window.location.href = self.attr("data-href");
	});
	
	$('#g-page').on('click', '#showActionSheet', function () {
        var mask = $('#mask');
        var weui_navbar = $("#weui_navbar");
        var weuiActionsheet = $('#weui_actionsheet');
        weuiActionsheet.addClass('weui_actionsheet_toggle');
        mask.show().addClass('weui_fade_toggle').one('click', function () {
        hideActionSheet(weuiActionsheet, mask);
        });
        $('#actionsheet_cancel').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });
        $('#actionsheet_scan').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
            receiptOrder('scan');
        });
        $('#actionsheet_input').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
            receiptOrder('input');
        });
		weui_navbar[0].style.zIndex=0;
        weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');
        function hideActionSheet(weuiActionsheet, mask) {
            weuiActionsheet.removeClass('weui_actionsheet_toggle');
            mask.removeClass('weui_fade_toggle');
            weuiActionsheet.on('transitionend', function () {
                mask.hide();
            }).on('webkitTransitionEnd', function () {
                mask.hide();
            });
        }
        function receiptOrder(action){
           if('scan' == action){
                wx.scanQRCode({
      				needResult: 1,
      				desc: '扫码收货',
      				success: function (res) {
      					if(res.resultStr.indexOf(",")>-1){
	      					var params = res.resultStr.split(",");
      						scanCode = params[1];
      					}else{
      						scanCode = res.resultStr;
      					}
      					$.ajax({
      						url:"queryShippingOrderByShippingCode",
      						data:{code:scanCode},
      						dataType:"json",
      						async:false,
      						success:function(response){
      							if(response.result == 'ok'){
      								if(response.sign == "true"){
      									alert("您查询的收货单【"+code+"】已签收！");
      								}else{
	      								window.location.href="toReceipt?shippingId="+response.shippingId;
      								}
      							}else{
      								alert("您查询的单号【"+scanCode+"】不存在！");
      							}
      						},
      						error:function(response){
      							alert("网络异常，请稍后重试！");
      						}
      					});
      				}
    			});
           }else{
           		 $('#dialog1').show().on('click', '.default', function () {
                    $('#dialog1').off('click').hide();
                });
           		 $('#dialog1').show().on('click', '.primary', function () {
           		 	var code = $("#code").val();
           		 	if(code===""){
           		 		alert("输入的收货单不能为空！");
           		 		return;
           		 	}
           		 	$.ajax({
      						url:"queryShippingOrderByShippingCode",
      						data:{code:code},
      						dataType:"json",
      						async:false,
      						success:function(response){
      							if(response.result == 'ok'){
      								if(response.sign == "true"){
      									alert("您查询的收货单【"+code+"】已签收！");
      								}else{
		      							window.location.href="toReceipt?shippingId="+response.shippingId;
      								}
      							}else{
      								alert("您查询的单号【"+code+"】不存在！");
      							}
			                    $('#dialog1').off('click').hide();
			                    $("#code").val('');
      						},
      						error:function(response){
      							alert("网络异常，请稍后重试！");
      						}
      					});
                });
            }
         }
    });
	function loaded() {

	    myScroll = new iScroll('wrapper', {
	        useTransition: true,
	        topOffset: pullDownOffset,
	        onRefresh: function () {
	            if (pullDownEl.className.match('loading')) {
	                pullDownEl.className = '';
	                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
	            } else if (pullUpEl.className.match('loading')) {
	                pullUpEl.className = '';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
	            }
	        },
	        onScrollMove: function () {
	        	//console.debug("y:"+this.y+"   maxScrollY:"+this.maxScrollY);
	        	//备注一下this.y 即scroll.top样式，即默认为-51px
	        	//如果向下滑动了51(pullDownEl的高)+5
	            if (this.y > 5 && !pullDownEl.className.match('flip')) {
	                pullDownEl.className = 'flip';
	                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
	                this.minScrollY = 0;
	             //如果向下滑动少于50（pullDownEl的高）+5,则进行提示
	            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
	                pullDownEl.className = '';
	                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
	                this.minScrollY = -pullDownOffset;
	            //如果向上滑动了50(pullDownEl的高)    
	            } else if (this.y<(-(pullUpOffset+55)) && this.y < (this.maxScrollY - 55) && !pullUpEl.className.match('flip')) {
	                pullUpEl.className = 'flip';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
	                this.maxScrollY = this.maxScrollY;
	             //如果向下滑动少于50(pullDownEl的高)    
	            } else if (this.y<(-(pullUpOffset+55)) && this.y > (this.maxScrollY + 55) && pullUpEl.className.match('flip')) {
	                pullUpEl.className = '';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
	                this.maxScrollY = pullUpOffset;
	            }
	        },
	        onScrollEnd: function () {
	            if (pullDownEl.className.match('flip')) {
	                pullDownEl.className = 'loading';
	                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';                
	                pullDownAction();   
	            } else if (pullUpEl.className.match('flip')) {
	                pullUpEl.className = 'loading';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
	                pullUpAction(); 
	            }
	        }
	    });

	}
	
	/**
	 * 加载竞价中数据
	 * @param isFirstPage 是否加载第一页
	 * @param queryType 加载那一类型数据
	 */
	function  loadReceiptData(isFirstPage){
	
		//当前页
		var pageNo = getSelectedDataAttr("pageNo")||1;
		//总页数
		var pageCount  = getSelectedDataAttr("pageCount")||0;
		
		 if(!isFirstPage && pageNo >= pageCount){
			 pullUpEl.className = '';
		     pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多记录...';
		     return ;
		}
		 
		//如果加载第一页
		if(!!isFirstPage){
			pageNo = 1;
		//没有新页数据	
		}else{
			pageNo++;
		}
		//签收状态
		var signStatus = getSelectedSignStatus();
		$.ajax({
			dataType:'json',
			url:'../../purchase/orderReceipt/getReceiptPageData',
			data:{
				'orderId':orderId,
				'signStatus':signStatus,
				'pageno':pageNo,
				'rowsize':ROW_SIZE,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				switch(selectedType){
				  case PREPARE_RECEIPT:
					successLoad(prepareReceipt,receiptListTpl,pageNo,data);
					break;
				  case CHECKED_RECEIPT:
					successLoad(checkedReceipt,receiptListTpl,pageNo,data);
					break;
				}
				
			},
			error:function(xhr, errorType, error){
				 pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载失败...';
			}
		});
		
	}
	
	/**
	 * 用于初始化加载第一次数据
	 */
	function  fisrtLoadReceiptData(){
		//如果进行过第一次加载，就不初始化加载了
		if(isFirstLoaded()){
			return ;
		}
		//当前页
		var pageNo = 1;
		//签收状态
		var signStatus = getSelectedSignStatus();
		loadingToast.show("数据加载中");
		$.ajax({
			dataType:'json',
			url:'../../purchase/orderReceipt/getReceiptPageData',
			data:{
				'orderId':orderId,
				'signStatus':signStatus,
				'pageno':pageNo,
				'rowsize':ROW_SIZE,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				switch(selectedType){
					case PREPARE_RECEIPT:
						successLoad(prepareReceipt,receiptListTpl,pageNo,data);
						break;
					case CHECKED_RECEIPT:
						successLoad(checkedReceipt,receiptListTpl,pageNo,data);
						break;
					
				}
				loadingToast.hide();
				
			},
			error:function(xhr, errorType, error){
				loadingToast.show("数据加载失败，请重新试试");
			}
		});
		
	}
	/**
	 * 回调成功后加载内容
	 */
	function successLoad(el,tpl,pageNo,data){
		 //设置分页信息
		 el.data("pageCount",data.total);
		 el.data("pageNo",pageNo);
		 //如果是第一页，则将内容清空
		 if(pageNo == 1){
			 el.find("ul.list").empty();
		 }
		 //如果没数据,显示没记录
		 if(data.totalrows === 0){
			 if(pullDownEl.className.match('loading')) {
	                pullDownEl.className = '';
	                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
	         }
			 el.addClass("empty");
			 //第一次myScroll可能还没有加载完
			 if(myScroll){
				 myScroll.refresh(); 
			 }
			 return ;
		 }else{
			 el.removeClass("empty");
		 }
		 // 1. Compile template function
		 var tempFn = doT.template(tpl);
		 // 2. Use template function as many times as you like
		 var resultHtml = tempFn(data);
		 el.find("ul.list").append(resultHtml);

		 //第一次myScroll可能还没有加载完
		 if(myScroll){
			 myScroll.refresh(); 
		 }
	}
	/**
	 * 设置空内容高度,默认填充为wrapper内容高度
	 */
	function setEmptyContentHeight(){
		var wrapperHeight = $("#wrapper").height();
		$(".no-recording").height(wrapperHeight).css("line-height",wrapperHeight+"px");
	}
	//dom 加载完成后加载
	$(document).ready(function(){
		setEmptyContentHeight();
		fisrtLoadReceiptData();
		setTimeout(loaded, 200);
	});
	
	/**
	 * 判断是否加载过第一次数据
	 */
	function isFirstLoaded(){
		var pageNo = getSelectedDataAttr("pageNo");
		//有加载过数据
		if(typeof pageNo === "undefined"){
			return false;
		}
		return true;
	}
	
	/**
	 * 获取当前选择中的tab 内容扩展属性
	 */
	function getSelectedDataAttr(dataAttr){
		switch(selectedType){
			case PREPARE_RECEIPT:
				return prepareReceipt.data(dataAttr);
			case CHECKED_RECEIPT:
				return checkedReceipt.data(dataAttr);
		}
	}
	
	
	/**
	 * 获取当前选择中的tab对应的签收值
	 */
	function getSelectedSignStatus(){
		switch(selectedType){
			case CHECKED_RECEIPT:
				return 1;
			case PREPARE_RECEIPT:
				return 0;
		}
	}
	
	/**
	 * 显示对应模块
	 */
	function showQueryType(queryType){
		//设置显示对应模块
		selectedType = queryType;
		switch(queryType){
			case PREPARE_RECEIPT:
				checkedReceipt.hide();
				prepareReceipt.show();
				myScroll.refresh();
				break;
			case CHECKED_RECEIPT:
				prepareReceipt.hide();
				checkedReceipt.show();
				myScroll.refresh();
				break;
			}
		fisrtLoadReceiptData();
	}
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
		return 0;
	}
	module.exports ={
			'showQueryType':showQueryType
	};
	$ = require("jquery");
	var wx = require("jweixin");
	var url = window.location.href;
	$.getJSON("../../../getSignUrl",{"url":url},function(data){
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: ['scanQRCode','chooseImage','uploadImage','hideOptionMenu','hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
		});
	});
});