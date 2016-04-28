/**
 * 竞价分页查询模块
 */
define(function(require, exports, module) {
	//每页多少行
	var ROW_SIZE = 6;
	//订单收货
	var ORDER_RECEIPT="order_receipt";
	//当前选择是的那种类型
	var selectedType = ORDER_RECEIPT;
	//引入时间组件
	require("../../common/Date");
	var $ = require("zepto");
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
	var pullDownAction = function(){loadOrderShippingData(true)};
	//上拉刷新回调
	var pullUpAction = function(){loadOrderShippingData();};

	//订单列表内容
	var tabContent = $("#tab-content");
	
	//订单确认
	var order_receipt = $("#order_receipt");
	//订单确认模板
	var orderReceiptTpl = require("./orderReceipt.html");
	//订单发货模板
//	var orderShippingTpl = require("./orderShippingList.html");
	//订单列表行单击，导航到订单详情
	tabContent.on("tap","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		//如果是按钮触发
		if(target.hasClass("join-order-btn") || target.hasClass("history-quote-btn")){
			return ;
		}
//		var self = $(this);
//		var orderId = self.attr("data-order-id");
//		loadingToast.show("数据加载中");
//		//跳转到竞价详情
//		window.location.href = "detailInfo?orderId="+orderId;
	});
	tabContent.on("tap",".weui_btn",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		if(target.hasClass("end-receipt-btn")){
			var orderId = target.attr("data-order-id");
			endReceipt(orderId);
		}else{
			loadingToast.show("数据加载中");
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
	function endReceipt(orderId){
			$.ajax({
				url:"/purchase/orderReceipt/endReceipt",
				async:false,
				data:{
	            	'orderId' : orderId
	            },
	            dataType:"json",
	            success:function(data, status, xhz){
	            	if(data.success){
	            		$("#loading-toast").hide();
	            		window.alert("成功结束收货");
	            	}else{
	            		$("#loading-toast").hide();
	            		window.alert(data.msg);
	            	}
	            },
	            error:function(xhr, errorType, error){
					loadingToast.show("保存失败，请重新试试！");
				}
			})
	}
	/**
	 * 加载竞价中数据
	 * @param isFirstPage 是否加载第一页
	 * @param queryType 加载那一类型数据
	 */
	function  loadOrderShippingData(isFirstPage,queryType){
		if(!queryType){
			queryType = selectedType;
		}
		/*//当前页
		var pageNo = biding.data("pageNo")||1;
		//总页数
		var pageCount  = biding.data("pageCount")||0;*/
		var pageNo = getSelectedDataAttr(queryType,"pageNo")||1;
		var pageCount  = getSelectedDataAttr(queryType,"pageCount")||0;
		
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
		//分页大小
		var rowSize = getSelectedPageSize(queryType);
		
		$.ajax({
			dataType:'json',
			url:'../../purchase/orderReceipt/loadlistData',
			data:{
				'queryType':queryType,
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				successLoad(order_receipt,orderReceiptTpl,pageNo,data);
				loadingToast.hide();//先暂时放置到这里
			},
			error:function(xhr, errorType, error){
				
			}
		});
		
	}
	/**
	 * 回调成功后加载内容
	 */
	function successLoad(el,tpl,pageNo,data){
		//如果是第一页，则将内容清空
		 if(pageNo == 1){
			 el.find("ul.list").empty();
		 }
		 //如果没数据,显示没记录
		 if(data.page.totalrows == 0){
			 if (pullDownEl.className.match('loading')) {
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
		 //设置分页信息
		 el.data("pageCount",data.page.total);
		 el.data("pageNo",pageNo);
		 var tempFn = doT.template(tpl);
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
	
	$(document).ready(function(){
		setEmptyContentHeight();
		loadOrderShippingData(true,ORDER_RECEIPT);
		setTimeout(loaded, 200);
	});
	
	/**
	 * 获取当前选择中的tab 内容扩展属性
	 */
	function getSelectedDataAttr(queryType,dataAttr){
		switch(queryType){
		case ORDER_RECEIPT:
			return order_receipt.data(dataAttr);
			}
	}
	
	/**
	 * 获取当前选择中的tab 分页大小
	 */
	function getSelectedPageSize(queryType){
		switch(queryType){
		case ORDER_RECEIPT:
			return 6;
		default:
			return ROW_SIZE;
			}

	}
	/**
	 * 设置查询类型
	 */
	function setSelectedType(queryType){
		selectedType = queryType;
	}
	/**
	 * 显示对应模块
	 */
	function showQueryType(queryType){
		switch(queryType){
		case ORDER_RECEIPT:
			order_receipt.show();
			myScroll.refresh();
			break;
		}
	}
	
	module.exports ={
			'setSelectedType':setSelectedType,
			'showQueryType':showQueryType
	}
});