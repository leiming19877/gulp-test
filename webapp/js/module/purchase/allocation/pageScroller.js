/**
 * 竞价分页查询模块
 */
define(function(require, exports, module) {
	require("../../common/String");
	//每页多少行
	var ROW_SIZE = 4;
	//待实提
	var TO_BE_REAL_LADING  ="prepareAllocation"; 
	//已实提
	var REAL_LADED  ="overAllocation";
	//已作废
	var CANCELLED="cancelled";
	//当前选择是的那种类型
	var selectedType = TO_BE_REAL_LADING;


	
	var $ = require("zepto");
	//引入时间组件
	require("../../common/Date");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
    //dot模板引擎
    var doT = require("dot");
    //滑动模块
	var iScroll = require("iscroll");
	var orderId = $('#orderId').val();
	//向下拉要显示元素
	//var pullDownEl = $("#pullDown");
	var pullDownEl = document.getElementById("pullDown");
	var pullDownOffset = pullDownEl.offsetHeight;
	//var pullUpEl = $('#pullUp'); 
	var pullUpEl = document.getElementById("pullUp");
	var pullUpOffset = pullUpEl.offsetHeight;
	
	var myScroll = null;
	//下拉刷新回调
	var pullDownAction = function(){loadBidData(true);};
	//上拉刷新回调
	var pullUpAction = function(){loadBidData();};

	//竞价列表内容
	var tabContent = $("#tab-content");
	
	//竞价中
	var prepareAllocation = $("#prepare-allocation");
	//待竞价
	var overAllocation = $("#over-allocation");
	//竞价结束
	var cancelled = $("#cancelled");
	
	//调拨单模板
	var prepareAllocationTpl = require("./allocationList.html");

	//调拨单详情
	tabContent.on("click","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		var self = $(this);
		var allocationId = self.attr("data-allocation-id");
		loadingToast.show("数据加载中");
		//跳转到调拨详情
		window.location.href = "toAllocationDetailPage?allocationId="+allocationId;
	});
	$('#dialog2').on('click', '.primary', function () {
		$('#dialog2').hide();
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
	 */
	function  loadBidData(isFirstPage){
		var pageNo = getSelectedDataAttr("pageNo")||1;
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
		//分页大小
		var rowSize = getSelectedPageSize();
		$.ajax({
			dataType:'json',
			url:'../../purchase/allocation/getAllocationsPageListData?orderId='+orderId,
			data:{
				'queryType':selectedType,
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				  switch(selectedType){
						case TO_BE_REAL_LADING:
							successLoad(prepareAllocation,prepareAllocationTpl,pageNo,data);
							break;
						case REAL_LADED:
							successLoad(overAllocation,prepareAllocationTpl,pageNo,data);
							break;
						case CANCELLED:
							successLoad(cancelled,prepareAllocationTpl,pageNo,data);
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
	function  fisrtLoadBidData(){
		//如果进行过第一次加载，就不初始化加载了
		if(isFirstLoaded()){
			return ;
		}
		//当前页
		var pageNo = 1;
		//分页大小
		var rowSize = getSelectedPageSize();
		loadingToast.show("数据加载中");
		$.ajax({
			dataType:'json',
			url:'../../purchase/allocation/getAllocationsPageListData?orderId='+orderId,
			data:{
				'queryType':selectedType,
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
			  switch(selectedType){
					case TO_BE_REAL_LADING:
						successLoad(prepareAllocation,prepareAllocationTpl,pageNo,data);
						break;
					case REAL_LADED:
						successLoad(overAllocation,prepareAllocationTpl,pageNo,data);
						break;
					case CANCELLED:
						successLoad(cancelled,prepareAllocationTpl,pageNo,data);
						break;
				}
				loadingToast.hide();//先暂时放置到这里
			},
			error:function(xhr, errorType, error){
				loadingToast.show("数据加载异常，请重新试试");
			}
		});
		
	}
	
	/**
	 * 回调成功后加载内容
	 */
	function successLoad(el,tpl,pageNo,data){
		 //设置分页信息
		 el.data("pageCount",data.page.total);
		 el.data("pageNo",pageNo);
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
	
	$(document).ready(function(){
		setEmptyContentHeight();
		fisrtLoadBidData();
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
		case TO_BE_REAL_LADING:
			return prepareAllocation.data(dataAttr);
		case REAL_LADED:
			return overAllocation.data(dataAttr);
		case CANCELLED:
			return cancelled.data(dataAttr);
			}
	}
	
	/**
	 * 获取当前选择中的tab 分页大小
	 */
	function getSelectedPageSize(){
		switch(selectedType){
		case TO_BE_REAL_LADING:
			return 3;
		case REAL_LADED:
			return 4;
		case CANCELLED:
			return 7;
		default:
			return ROW_SIZE;
			}

	}

	/**
	 * 显示对应模块
	 */
	function showQueryType(queryType){
		selectedType = queryType;
		switch(queryType){
			case TO_BE_REAL_LADING:
				overAllocation.hide();
				cancelled.hide();
				prepareAllocation.show();
				myScroll.refresh();
				break;
			case REAL_LADED:
				prepareAllocation.hide();
				cancelled.hide();
				overAllocation.show();
				myScroll.refresh();
				break;
			case CANCELLED:
				prepareAllocation.hide();
				overAllocation.hide();
				cancelled.show();
				myScroll.refresh();
				break;
	    }
		fisrtLoadBidData();
	}
	
	module.exports ={
			'showQueryType':showQueryType
	}
});