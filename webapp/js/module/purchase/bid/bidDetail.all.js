define("app" , ["module_purchase/bid/bidTab.js","module_purchase/bid/pageScroller.js"], function(require , exports , module){

require("module_purchase/bid/bidTab.js");
	//iscroll
   require("module_purchase/bid/pageScroller.js");
    
    
});
define("module_purchase/bid/bidTab.js" , ["zepto.js","module_purchase/bid/pageScroller.js"], function(require , exports , module){
/**
 * 竞价导航模块
 */

	var $ = require("zepto");
	//数据加载提示
	//var loadingToast = require("./loadingToast");
	var pageScroller =require("module_purchase/bid/pageScroller.js");
	//竞价导航
	var bidTab = $("#bid-tab");

	bidTab.on("tap",".weui_navbar_item",function(e){
		var self = $(this);
		self.siblings(".weui_bar_item_on").removeClass("weui_bar_item_on");
		self.addClass("weui_bar_item_on");
		var queryType = self.data("queryType");
		pageScroller.showQueryType(queryType);
	});
	
	
	
	module.exports ={
			
	}
});
define("module_purchase/bid/pageScroller.js" , ["zepto.js","module_common/Date.js","module_common/loadingToast.js","dot.js","iscroll.js","module_purchase/bid/bidingList.html","module_purchase/bid/prepareBidList.html","module_purchase/bid/overBidList.html"], function(require , exports , module){
/**
 * 竞价分页查询模块
 */

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
require("module_common/Date.js");
	//数据加载提示
	var loadingToast =require("module_common/loadingToast.js");
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
	var pullDownAction = function(){loadBidData(true)};
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
	var bidingTpl =require("module_purchase/bid/bidingList.html");
	//待竞价模板
	var prepareBidTpl =require("module_purchase/bid/prepareBidList.html");
	//竞价结束模板
	var overBidTpl =require("module_purchase/bid/overBidList.html");
	//竞价列表行单击，导航到竞价详情
	tabContent.on("tap","li.line",function(e){
		var target = e.target||e.srcElement;
		target = $(target);
		//如果是按钮触发
		if(target.hasClass("join-bid-btn") || target.hasClass("history-quote-btn")){
			return ;
		}
		var self = $(this);
		var bidId = self.attr("data-bid-id");
		loadingToast.show("数据加载中");
		//跳转到竞价详情
		window.location.href = "bidDetailPage?bidId="+bidId;
	});
	tabContent.on("tap",".weui_btn",function(e){
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
			url:'../../central/bidConsole/bidListData',
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
			url:'../../central/bidConsole/bidListData',
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
				loadingToast.show("数据加载中错，请重新试试");
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
define("module_common/Date.js" , [], function(require , exports , module){
/**
 * 采用正则表达式替换形式进行格式化，函数求对日期格式支持类型进行检验
 * 对Date的格式，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 使用例子
 * var date = new Date(2001, 8, 11, 8, 26, 8);
 * date.formatDate("yyyy");       返回值： "2001"
 * date.formatDate("yyyy-MM-dd");     返回值： "2001-09-11"
 * date.formatDate("yyyy-MM-dd HH");      返回值： "2001-09-11 08"
 * date.formatDate("yyyy-MM-dd HH:mm:ss");    返回值： "2001-09-11 08:26:08"
 **/
Date.prototype.formatDate = function(fmt) {
	//构造一个存日期字段对象
	var o = {
		"y+" : this.getFullYear(), //年份 
		"M+" : this.getMonth() + 1, //月份 
		"d+" : this.getDate(), //日 
		"H+" : this.getHours(), //小时 
		"m+" : this.getMinutes(), //分 
		"s+" : this.getSeconds(), //秒 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
		"S" : this.getMilliseconds()
	//毫秒 
	};
	var fmtValue = fmt;//格式化后值
	for ( var k in o) {
		fmtValue = fmtValue.replace(new RegExp("(" + k + ")"), function(v) {
			//如果是年份字段
			if (/y+/.test(v)) {
				//如果yyyyyy大于4时就按4个进行处理
				var len = (v.length > 4 ? 4 : v.length);
				return ("" + o[k]).substr(4 - len)
			}
			//如果是其它字段
			if (v.length == 1) {
				return o[k];
			} else {//返回二位字符
				return (("00" + o[k]).substr(("" + o[k]).length));
			}
		});
	}
	return fmtValue;
}
	
	
});
define("module_common/loadingToast.js" , ["zepto.js"], function(require , exports , module){
/**
 * 加载模块，对外提供以下功能
 * 1、显示加载模块
 * 2、隐藏加载模块
 */

	var $ = require("zepto");

	//加载提示元素
	var loadingToast = $("#loading-toast");
	//显示内容
	var loadingToastContent = loadingToast.find(".weui_toast_content");
	
	/**
	 * 显示加载模块
	 * @param content {String} 显示内容
	 */
	function  show(content){
		loadingToastContent.text(content);
		loadingToast.show();
	}
	/**
	 * 隐藏加载模块
	 */
	function hide(){
		loadingToast.hide();
	}
	
	module.exports ={
			"show":show,
			"hide":hide
	}
});
define("module_purchase/bid/bidingList.html" , [], function(require , exports , module){
module.exports = '{{~it.page.list :bid}}\r\n    <li class=\"line\" data-bid-id=\"{{=bid.bidId}}\">\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">竞价单号：</label>\r\n         <span class=\"txt\" >{{=bid.bidCode}}</span>      \r\n       </div>\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">竞价时间：</label>\r\n       \t <span  class=\"txt\" >{{=new Date(bid.bidBeginTime).formatDate(\"yyyy-MM-dd HH:mm\")}}<br/>至<br/>{{=new Date(bid.bidEndTime).formatDate(\"yyyy-MM-dd HH:mm\")}}</span>\r\n       </div>\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">可报次数：</label>\r\n         <span class=\"txt\" >{{=(bid.bidTime == 0 ?\'不限\':bid.bidTime) }}次</span>\r\n       </div>\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">已报次数：</label>\r\n         <span class=\"txt\" >{{=it.quoteSns[bid.bidId]}}次</span>                   \r\n         <span class=\"ranking\">上轮报价排名：{{=it.ranks[bid.bidId]}}</span>\r\n       </div>\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">重量合计：</label>\r\n         <span class=\"txt\" >计划量共<em class=\"f-red\">{{=bid.bidTotalWeight }}</em>吨  </span>\r\n       </div>\r\n       {{?it.canQuotes[bid.bidId]}}\r\n       <a href=\"../quote/toQuote?bidId={{=bid.bidId}}\" class=\"join-bid-btn weui_btn weui_btn_mini weui_btn_primary\" >参与报价</a>\r\n       {{?}}\r\n       {{?it.quoteSns[bid.bidId]>0}}\r\n       <a href=\"../quote/toQuoteDetail?bidId={{=bid.bidId}}&quoteSn={{=it.quoteSns[bid.bidId]}}\" class=\"history-quote-btn weui_btn weui_btn_mini weui_btn_primary\" >查看报价单</a>\r\n       {{?}}\r\n    </li>\n{{~}}    ';
});
define("module_purchase/bid/prepareBidList.html" , [], function(require , exports , module){
module.exports = '{{~it.page.list :bid}}\r\n    <li class=\"line\" data-bid-id=\"{{=bid.bidId}}\">\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">竞价单号：</label>\r\n         <span class=\"txt\" >{{=bid.bidCode}}</span>    \r\n        </div>\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">竞价时间：</label>\r\n         <span  class=\"txt\" >{{=new Date(bid.bidBeginTime).formatDate(\"yyyy-MM-dd HH:mm\")}}<br/>至<br/>{{=new Date(bid.bidEndTime).formatDate(\"yyyy-MM-dd HH:mm\")}}</span>\r\n      </div>\r\n\t  <div class=\"txt-line\">\r\n         <label class=\"lab\">可报次数：</label>\r\n         <span class=\"txt\">{{=(bid.bidTime == 0 ?\'不限\':bid.bidTime) }}次</span>\r\n       </div>\r\n       <div class=\"txt-line\">\r\n         <label class=\"lab\">重量合计：</label>\r\n         <span class=\"txt\" >计划量共<em class=\"f-red\">{{=bid.bidTotalWeight }}</em>吨  </span>\r\n       </div>\r\n    </li>\n{{~}}       ';
});
define("module_purchase/bid/overBidList.html" , [], function(require , exports , module){
module.exports = '{{~it.page.list :bid}}\r\n    <li class=\"line\" data-bid-id=\"{{=bid.bidId}}\">\r\n       <div class=\"txt-line\">\r\n            <span style=\"margin-left: 0px;line-height: 40px;\">竞价单号：[{{=bid.bidCode}}]已结束</span>\r\n       </div>\r\n       <div class=\"txt-line\">\r\n         <span class=\"ranking\" style=\"margin-left: 0px;line-height: 40px;\">\r\n                                  您的报价最终排名：{{=it.ranks[bid.bidId]}}\r\n          </span>\r\n       </div>\r\n       {{?it.quoteSns[bid.bidId]>0}}\r\n       <a href=\"../quote/toQuoteDetail?bidId={{=bid.bidId}}&quoteSn={{=it.quoteSns[bid.bidId]}}\" class=\"history-quote-btn history-quote-btn2 weui_btn weui_btn_mini weui_btn_primary\" >查看报价单</a>\r\n       {{?}}\r\n    </li>\n{{~}}        ';
});
define("app" , ["zepto.js","dot.js","module_common/Date.js","module_common/loadingToast.js","module_purchase/bid/bidDetail.html"], function(require , exports , module){

	
	var $ = require("zepto");
	 //dot模板引擎
	var doT = require("dot");
	//引入时间组件
require("module_common/Date.js");
	//数据加载提示
	var loadingToast =require("module_common/loadingToast.js");
	//界面主内容区
	var gPage = $("#g-page")

	//竞价详情模板
	var bidDetailTpl =require("module_purchase/bid/bidDetail.html");

	var bidId = getBidId();
	$.ajax({
		dataType:'json',
		url:'../../central/bidConsole/bidDetailData',
		data:{
			'bidId':bidId,
			'_t':new Date().getTime()
		},
		success:function(data, status, xhz){
			 loadingToast.hide();
			 // 1. Compile template function
			 var tempFn = doT.template(bidDetailTpl);
			 // 2. Use template function as many times as you like
			 var resultHtml = tempFn(data);
			 //先清空
			 gPage.empty();
			 gPage.append(resultHtml);
		
		},
		error:function(xhr, errorType, error){
			loadingToast.show("数据加载失败，请重新试试！");
		}
	});
	
	/**
	 * 获取url中的bidId
	 */
	function getBidId(){
		var reg = /https?:\/\/[^\/]+\/[^\?]*?\?bidId=(\d*)/g;
		var url = window.location.href;
		var m = reg.exec(url);
		if(m && m.length == 2){
			return m[1];
		}
		return 0;
	}
});
define("module_purchase/bid/bidDetail.html" , [], function(require , exports , module){
module.exports = '            <div class=\"g-header\">\r\n                    <a href=\"bidListPage\" class=\"u-back-left\" ></a>\r\n                    <h3 class=\"u-title\">竞价单[{{=it.bid.bidCode}}]</h3>\r\n            </div> \r\n            <div id=\"g-content\" class=\"g-content\">\r\n\t\t\t\t\t                \r\n\t\t\t\t\t<div class=\"m-bid\" >\r\n\t\t\t\t\t       <div class=\"txt-line\">\r\n\t\t\t\t\t         <label class=\"lab bid-time\">竞价时间：</label>\r\n\t\t\t\t\t         <div class=\"txt\">\r\n\t\t\t\t\t            <span >{{=new Date(it.bid.bidBeginTime).formatDate(\"yyyy-MM-dd HH:mm\")}}<br/>至<br/>{{=new Date(it.bid.bidEndTime).formatDate(\"yyyy-MM-dd HH:mm\")}}</span>\r\n\t\t\t\t\t         </div>\r\n\t\t\t\t\t       </div>\r\n\t\t\t\t\t       <div class=\"txt-line\">\r\n\t\t\t\t\t         <label class=\"lab\">可报次数：</label>\r\n\t\t\t\t\t         <div class=\"txt\">\r\n\t\t\t\t\t            <span>{{=(it.bid.bidTime == 0 ?\'不限\':it.bid.bidTime) }}次</span>\r\n\t\t\t\t\t         </div>\r\n\t\t\t\t\t       </div>\r\n\t\t\t\t\t       <div class=\"txt-line\">\r\n\t\t\t\t\t         <label class=\"lab\">已报次数：</label>\r\n\t\t\t\t\t         <div class=\"txt\">\r\n\t\t\t\t\t            <span> {{=it.quoteSn}}次</span>                \r\n\t\t\t\t\t            <span class=\"ranking\">上轮报价排名：\r\n\t\t\t\t\t               {{=it.rankStr}}\r\n\t\t\t\t\t            </span>\r\n\t\t\t\t\t         </div>\r\n\t\t\t\t\t       </div>\r\n\t\t\t\t\t       <table class=\"m-bid-detail\">\r\n\t\t\t\t\t            <thead>\r\n\t\t\t\t\t                <tr>\r\n\t\t\t\t\t                    <th>商品信息</th>\r\n\t\t\t\t\t                    <th>验货方式</th>\r\n\t\t\t\t\t                    <th>重量信息</th>\r\n\t\t\t\t\t                </tr>\r\n\t\t\t\t\t            </thead>\r\n\t\t\t\t\t            <tbody>\r\n\t\t\t\t\t              {{~it.bid.listCentralBuyBidDetailVO : bd}}\r\n\t\t\t\t\t                <tr>\r\n\t\t\t\t\t                    <td>\r\n\t\t\t\t\t                                                        品名：{{=bd.brandName}}<br/>\r\n\t\t\t\t\t                                                        材质：{{=bd.textureName}}<br/>\r\n\t\t\t\t\t                                                        规格：{{=bd.specification}}\r\n\t\t\t\t\t                    </td>\r\n\t\t\t\t\t                    <td>\r\n\t\t\t\t\t                        {{=bd.meteringTypeName}}     \r\n\t\t\t\t\t                    </td>\r\n\t\t\t\t\t                    <td>计划量：{{=bd.planBuyWeight}}吨</td>\r\n\t\t\t\t\t                </tr>\r\n\t\t\t\t\t               {{~}} \r\n\t\t\t\t\t            </tbody>\r\n\t\t\t\t\t       </table>\r\n\t\t\t\t\t       \r\n\t\t\t\t\t       <div class=\"txt-line\" style=\"margin-top: 10px;\">\r\n\t\t\t\t\t         <label class=\"lab\" style=\"text-align: right;\">总计：</label>\r\n\t\t\t\t\t         <div class=\"txt\">\r\n\t\t\t\t\t            <span >计划量共{{=it.bid.bidTotalWeight }}吨</span>\r\n\t\t\t\t\t         </div>\r\n\t\t\t\t\t       </div>\r\n\t\t\t\t\t</div>\r\n            </div>\r\n            <div id=\"g-footer\" class=\"g-footer\" >\r\n\t\t\t\t <div class=\"m-bid-footer\" >\r\n\t\t\t\t      {{?it.quoteSn>0}}\r\n\t\t\t\t      <a href=\"../quote/toQuoteDetail?bidId={{=it.bid.bidId}}&quoteSn={{=it.quoteSn}}\" class=\"weui_btn weui_btn_mini weui_btn_primary\" >查看报价</a>\r\n\t\t\t\t      {{?}}\r\n\t\t\t\t      <a  href=\"bidDetailExtraPage?bidId={{=it.bid.bidId}}\" class=\"weui_btn weui_btn_mini weui_btn_primary\" >买方条款</a>\r\n\t\t\t\t      {{?it.canQuote}}\r\n\t\t\t\t      <a href=\"../quote/toQuote?bidId={{=it.bid.bidId}}\" class=\"weui_btn weui_btn_mini weui_btn_primary\" >参与报价</a>\r\n\t\t\t\t      {{?}}\r\n\t\t\t\t</div>\r\n            </div>\r\n';
});
