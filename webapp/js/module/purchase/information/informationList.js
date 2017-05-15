define(function(require, exports, module) {
	//每页多少行
	var ROW_SIZE = 6;
	var $ = require("zepto");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	require("../../common/Date");
    //dot模板引擎
    var doT = require("dot");
    //滑动模块
	var iScroll = require("iscroll");
	var information = $("#information");
	//向下拉要显示元素
	//var pullDownEl = $("#pullDown");
	var pullDownEl = document.getElementById("pullDown");
	var pullDownOffset = pullDownEl.offsetHeight;
	//var pullUpEl = $('#pullUp'); 
	var pullUpEl = document.getElementById("pullUp");
	var pullUpOffset = pullUpEl.offsetHeight;
	
	var myScroll = null;
	//下拉刷新回调
	var pullDownAction = function(){loadInformationData(true);};
	//上拉刷新回调
	var pullUpAction = function(){loadInformationData();};

	//订单列表内容
	var tabContent = $("#tab-content");
	//资讯模板
	var informationTpl = require("./information.html");
	//资讯列表行单击，导航到资讯详情
	tabContent.on("click","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		var self = $(this);
		var informId = self.attr("data-information-id");
		loadingToast.show("数据加载中");
		//跳转到资讯详情
		window.location.href = "/purchase/information/informDetail?informId=" + informId+"&t="+new Date().getTime();
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
	
	function  loadInformationData(isFirstPage){
		/*//当前页
		var pageNo = biding.data("pageNo")||1;
		//总页数
		var pageCount  = biding.data("pageCount")||0;*/
		var pageNo = 1;
		var pageCount  = 0;
		
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
		var rowSize = 6;
		
		$.ajax({
			dataType:'json',
			url:'../../purchase/information/informListPage',
			data:{
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				
				successLoad(information,informationTpl,pageNo,data);
				loadingToast.hide();
//				var tempFn = doT.template(informationTpl);
//		 		var resultHtml = tempFn(data);
//		 		information.empty();
//		 		information.append(resultHtml);
			},
			error:function(xhr, errorType, error){
				loadingToast.show("网络异常，请重试！");
				
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
		 if(data.totalrows === 0){
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
		 el.data("pageCount",data.total);
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
		loadInformationData(true);
		setTimeout(loaded, 200);
	});
	
	module.exports ={
	};
});