/**
 * 竞价分页查询模块
 */
define(function(require, exports, module) {
	//每页多少行
	var ROW_SIZE = 6;
	//签收中
	var SIGNING_SHIPPING="signingShipping";	
	//已签收
	var CHECKED_SHIPPING="checkedShipping";
	//已确认
	var CONFIRMED_SHIPPING="confirmedShipping";

	//当前选择是的那种类型
	var selectedType = SIGNING_SHIPPING;
	//引入时间组件
	require("date");
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
	var pullDownAction = function(){loadShippingListData(true);};
	//上拉刷新回调
	var pullUpAction = function(){loadShippingListData();};

	//订单列表内容
	var tabContent = $("#tab-content");
	
	//签收中
	var signingShipping = $("#signing-shipping");
	//已签收
	var checkedShipping = $("#checked-shipping");
	//已确认
	var confirmedShipping = $("#confirmed-shipping");
	
	//收货列表模板
	var shippingListTpl = require("./shippingList.html");

	var params = getQueryParams();
	var orderId = params['orderId'];
	
	//订单列表行单击，导航到订单详情
	tabContent.on("click","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		//如果是按钮触发
//		if(target.hasClass("join-order-btn") || target.hasClass("history-quote-btn")){
//			return ;
//		}
		var self = $(this);
		var shippingId = self.attr("data-shipping-id");
		loadingToast.show("数据加载中");
		//跳转到发货详情
		window.location.href = "toShippingDetail?shippingId="+shippingId;
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
	 * 加载发货单数据
	 * @param isFirstPage 是否加载第一页
	 */
	function  loadShippingListData(isFirstPage){
	
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
		$.ajax({
			dataType:'json',
			url:'../../purchase/shipping/getShippingListData',
			data:{
				'orderId':orderId,
				'queryType':selectedType,
				'pageno':pageNo,
				'rowsize':ROW_SIZE,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				
				switch(selectedType){
				case SIGNING_SHIPPING:
					successLoad(signingShipping,shippingListTpl,pageNo,data);
					break;
				case CHECKED_SHIPPING:
					successLoad(checkedShipping,shippingListTpl,pageNo,data);
					break;
				case CONFIRMED_SHIPPING:
					successLoad(confirmedShipping,shippingListTpl,pageNo,data);
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
	function  fisrtLoadShippingListData(){
		//如果进行过第一次加载，就不初始化加载了
		if(isFirstLoaded()){
			return ;
		}
		//当前页
		var pageNo = 1;
		loadingToast.show("数据加载中");
		$.ajax({
			dataType:'json',
			url:'../../purchase/shipping/getShippingListData',
			data:{
				'orderId':orderId,
				'queryType':selectedType,
				'pageno':pageNo,
				'rowsize':ROW_SIZE,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				switch(selectedType){
					case SIGNING_SHIPPING:
						successLoad(signingShipping,shippingListTpl,pageNo,data);
						break;
					case CHECKED_SHIPPING:
						successLoad(checkedShipping,shippingListTpl,pageNo,data);
						break;
					case CONFIRMED_SHIPPING:
						successLoad(confirmedShipping,shippingListTpl,pageNo,data);
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
		fisrtLoadShippingListData();
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
			case SIGNING_SHIPPING:
				return signingShipping.data(dataAttr);
			case CHECKED_SHIPPING:
				return checkedShipping.data(dataAttr);
			case CONFIRMED_SHIPPING:
				return confirmedShipping.data(dataAttr);
		}
	}
	
	
	/**
	 * 获取当前选择中的tab对应的类型
	 */
	function getSelectedType(){
		return selectedType;
	}
	
	/**
	 * 显示对应模块
	 */
	function showQueryType(queryType){
		//设置显示对应模块
		selectedType = queryType;
		switch(queryType){
			case SIGNING_SHIPPING:
				checkedShipping.hide();
				confirmedShipping.hide();
				signingShipping.show();
				myScroll.refresh();
				break;
			case CHECKED_SHIPPING:
				signingShipping.hide();
				confirmedShipping.hide();
				checkedShipping.show();
				myScroll.refresh();
				break;
			case CONFIRMED_SHIPPING:
				signingShipping.hide();				
				checkedShipping.hide();
				confirmedShipping.show();
				myScroll.refresh();
				break;
			}
		fisrtLoadShippingListData();
	}
	/*
	*@param 获取查询参数，查询参数值是去掉空格的
	*/
	function getQueryParams(){
		var obj = {};//解析后的参数
		var url = window.location.href;
		var start = url.indexOf("?");
		if(start == -1){
			return obj;
		}
		var queryStr = url.substring(start+1);
		//以下正则表达式会把=及左右空格匹配
		var reg = /([^&=]+)=*\s*([^&=]*)\s*&*/g;//匹配查询参数
		var result = null;
		while(result = reg.exec(queryStr)){
		        var key = result[1];
		        var value = result[2];
		        obj[key] = value;
	     } 
		return  obj;	
	}
	
	module.exports ={
			'showQueryType':showQueryType
	};
});