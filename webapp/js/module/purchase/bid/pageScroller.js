/**
 * 竞价分页查询模块
 */
define(function(require, exports, module) {
	//每页多少行
	var ROW_SIZE = 4;
	//竞价中
	var BIDING_TYPE="biding";
	//待竞价
	var PREPARE_BID="prepareBid";
	//竞价结束
	var OVER_BID="overBid";
	//当前选择是的那种类型
	var selectedType = BIDING_TYPE;
	
	var $ = require("zepto");
	//引入时间组件
	require("../../common/Date");
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
	var pullDownAction = function(){loadBidData(true);};
	//上拉刷新回调
	var pullUpAction = function(){loadBidData();};

	//竞价列表内容
	var tabContent = $("#tab-content");
	
	//竞价中
	var biding = $("#biding");
	//待竞价
	var prepareBid = $("#prepare-bid");
	//竞价结束
	var overBid = $("#over-bid");
	
	//竞价中模板
	var bidingTpl = require("./bidingList.html");
	//待竞价模板
	var prepareBidTpl = require("./prepareBidList.html");
	//竞价结束模板
	var overBidTpl = require("./overBidList.html");
	//报价排名模板
	var rankMessageTpl = require("./rankMessage.html");
	//竞价列表行单击，导航到竞价详情
	tabContent.on("click","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		var self = $(this);
		var bidId = self.attr("data-bid-id");
		//如果是按钮触发
		if(target.hasClass("join-bid-btn") || target.hasClass("history-quote-btn")){
			return ;
		}
		if(target.hasClass("check-quote-btn") ){
			$.ajax({
				url:"viewQuoteRank",
				data:{bidId:bidId},
				success:function(data, status, xhz){
					loadingToast.hide();
					var tab = $("#bid-tab")[0].childNodes[1];
					$(tab).css("z-index",1);
					var tempFn = doT.template(rankMessageTpl);
		 			var resultHtml = tempFn(JSON.parse(data));
		 			$("#dialog-content").empty();
		 			$("#dialog-content").append(resultHtml);
					$('#dialog2').show();
				},
				error:function(xhr, errorType, error){
					loadingToast.show("数据加载失败");
			}
			});
			return;
		}
		loadingToast.show("数据加载中");
		//跳转到竞价详情
		window.location.href = "bidDetailPage?bidId="+bidId;
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
			url:'../../purchase/bidConsole/bidListData',
			data:{
				'queryType':selectedType,
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				switch(selectedType){
					case BIDING_TYPE:
						successLoad(biding,bidingTpl,pageNo,data);
						break;
					case PREPARE_BID:
						successLoad(prepareBid,prepareBidTpl,pageNo,data);
						break;
					case OVER_BID:
						successLoad(overBid,overBidTpl,pageNo,data);
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
			url:'../../purchase/bidConsole/bidListData',
			data:{
				'queryType':selectedType,
				'pageno':pageNo,
				'rowsize':rowSize,
				'_t':new Date().getTime()
			},
			success:function(data, status, xhz){
				switch(selectedType){
					case BIDING_TYPE:
						successLoad(biding,bidingTpl,pageNo,data);
						break;
					case PREPARE_BID:
						successLoad(prepareBid,prepareBidTpl,pageNo,data);
						break;
					case OVER_BID:
						successLoad(overBid,overBidTpl,pageNo,data);
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
		case BIDING_TYPE:
			return biding.data(dataAttr);
		case PREPARE_BID:
			return prepareBid.data(dataAttr);
		case OVER_BID:
			return overBid.data(dataAttr);
			}
	}
	
	/**
	 * 获取当前选择中的tab 分页大小
	 */
	function getSelectedPageSize(){
		switch(selectedType){
		case BIDING_TYPE:
			return 3;
		case PREPARE_BID:
			return 4;
		case OVER_BID:
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
			case BIDING_TYPE:
				prepareBid.hide();
				overBid.hide();
				biding.show();
				myScroll.refresh();
				break;
			case PREPARE_BID:
				biding.hide();
				overBid.hide();
				prepareBid.show();
				myScroll.refresh();
				break;
			case OVER_BID:
				biding.hide();
				prepareBid.hide();
				overBid.show();
				myScroll.refresh();
				break;
	    }
		fisrtLoadBidData();
	}
	
	module.exports ={
			'showQueryType':showQueryType
	}
});