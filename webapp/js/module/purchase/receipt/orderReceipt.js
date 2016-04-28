define(function(require, exports, module){
	//每页多少行
	var ROW_SIZE = 5;
	//引入时间组件
	require("../../common/Date");
	var $ = require("zepto");
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
	var pullDownAction = function(){loadData()};
	//上拉刷新回调
	var pullUpAction = function(){
		++pageno;
        if (pageno > pageCount) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多数据了...';
			return;
		}
		reLoadData();
	};
	
	
	//id
	var orderReceiptList = $("#orderReceiptList");
	//模板
	var orderReceiptListTpl = require("./orderReceipt.html");
	
	function loaded(){
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
	function loadData(){
		pageno=1;
		$.post("/purchase/orderReceipt/loadlistData?pageno="+pageno+"&rowsize="+ROW_SIZE,function(result){
    		pageCount = result.total;
    		data = result.list;
    		data.forEach(function(value){
    			value.arrivalDate=value.orderDetails[0].arrivalDate;
    			value.shippingAddress=value.orderDetails[0].shippingAddress
    		});
    		if(data.length>0){
    	    	var tempFn = doT.template(orderReceiptListTpl);
    	    	var resultText = tempFn(data);
    	    	$("#information-list").empty();
    	    	$("#information-list").append(resultText);
    	    	myScroll.refresh();
    	    }else{
    	    	$("#totalcontent").empty();
				$("#totalcontent").append("<div id='a'>没有相关信息 </div>");
    	    }
    	},'json');
	}
	function reLoadData(){
    	$.post("/purchase/orderReceipt/loadlistData?pageno="+pageno+"&rowsize="+ROW_SIZE,function(result){
    		pageCount = result.total;
    		data = result.list;
    		data.forEach(function(value){
    			value.arrivalDate=value.orderDetails[0].arrivalDate;
    			value.shippingAddress=value.orderDetails[0].shippingAddress
    		});
    	    var tempFn = doT.template(orderReceiptListTpl);
    	    var resultText = tempFn(data);
    	    $("#information-list").append(resultText);
    	    myScroll.refresh(); 
    	},'json');
    }  
	$(document).ready(function(){
		loadData(true);
		setTimeout(loaded, 200);
	});
	function getSelectedDataAttr(dataAttr){
		return biding.data(dataAttr);
	}
})


