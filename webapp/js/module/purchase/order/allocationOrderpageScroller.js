/**
 * 竞价分页查询模块
 */
define(function(require, exports, module) {
	require("string");
	//每页多少行
	var ROW_SIZE = 6;
	//竞价中
	var ORDER_CONFIRM="order_confirm";
	//待竞价
	var ORDER_SHIPPING="order_shipping";
	//当前选择是的那种类型
	var selectedType = ORDER_SHIPPING;
	
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
	var pullDownAction = function(){loadOrderData(true);};
	//上拉刷新回调
	var pullUpAction = function(){loadOrderData();};

	//订单列表内容
	var tabContent = $("#tab-content");
	
	//订单确认
	var order_confirm = $("#order_confirm");
	//订单发货
	var order_shipping = $("#order_shipping");
	
	//订单确认模板
	var orderConfirmTpl = require("./allocationOrderConfirmList.html");
	//订单发货模板
	var orderShippingTpl = require("./allocationOrderShippingList.html");
	//订单列表行单击，导航到订单详情
	tabContent.on("click","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		//如果是按钮触发
		var self = $(this);
		var orderId = self.attr("data-order-id");
		var bidId = self.attr("data-bid-id");
		var orderStatus = self.attr("data-order-status");
		if(target.hasClass("join-order-btn") || target.hasClass("history-quote-btn")){
			return ;
		}else if(target.hasClass("detail-shipping-btn")){
			loadingToast.show("数据加载中");
			window.location.href="../allocation/toAllocationListPage?orderId="+orderId+"&_t="+new Date().getTime();
		}else{
			loadingToast.show("数据加载中");
			//跳转到订单详情
			window.location.href = "toAllocationOrderDetaiPage?orderId="+orderId+"&bidId="+bidId+"&orderStatus="+orderStatus+"&action=seller&_t="+new Date().getTime();
		}
	});
	tabContent.on("click",".weui_btn",function(e){
		loadingToast.show("数据加载中");
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
	function  loadOrderData(isFirstPage,queryType){
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
			url:'../../purchase/order/loadlistData',
			data:{
				'queryType':queryType,
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				switch(queryType){
					case ORDER_CONFIRM:
						successLoad(order_confirm,orderConfirmTpl,pageNo,data);
						loadingToast.hide();//先暂时放置到这里
						break;
					case ORDER_SHIPPING:
						successLoad(order_shipping,orderShippingTpl,pageNo,data);
						break;
				}
				
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
		 if(data.page.totalrows === 0){
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
		loadOrderData(true,ORDER_CONFIRM);
		loadOrderData(true,ORDER_SHIPPING);
		setTimeout(loaded, 200);
	});
	
	/**
	 * 获取当前选择中的tab 内容扩展属性
	 */
	function getSelectedDataAttr(queryType,dataAttr){
		switch(queryType){
		case ORDER_CONFIRM:
			return order_confirm.data(dataAttr);
		case ORDER_SHIPPING:
			return order_shipping.data(dataAttr);
			}
	}
	
	/**
	 * 获取当前选择中的tab 分页大小
	 */
	function getSelectedPageSize(queryType){
		switch(queryType){
		case ORDER_CONFIRM:
			return 6;
		case ORDER_SHIPPING:
			return 6;
		default:
			return ROW_SIZE;
			}

	}
	/**
	 * 设置查询类型
	 */
	function setSelectedType(queryType){
		selectedType = "order_shipping";
	}
	/**
	 * 显示对应模块
	 */
	function showQueryType(queryType){
		queryType = "order_shipping";
		switch(queryType){
		case ORDER_CONFIRM:
			order_shipping.hide();
			order_confirm.show();
			myScroll.refresh();
			break;
		case ORDER_SHIPPING:
			order_confirm.hide();
			order_shipping.show();
			myScroll.refresh();
			break;
	}
	}
	
	module.exports ={
			'setSelectedType':setSelectedType,
			'showQueryType':showQueryType
	};
});