/**
 * 最近购买模块
 */
define(function(require, exports, module) {
	
	//组件样式
    require("../../../swiper/swiper.min.css");
    var Swiper = require("../../../swiper/swiper.min");
    var $ = require("zepto");
    //dot模板引擎
    var doT = require("dot");
    //购物车模块
    var shopCart = require("./shopCart");
    //最近购买模板
    var recentBuyRecordListTpl = require("./recentBuyRecordList.html");
    //最近购买 元素
    var recentBuyRecordList = $("#recent-buy-record-list");
    var gFooter = $("#g-footer");

    var swiperContainer = recentBuyRecordList.find(".swiper-container");
    recentBuyRecordList.on("tap",".u-push",function(e){
    		$(this).toggleClass("push-down");
			gFooter.toggleClass("g-f2"); 
			recentBuyRecordList.find(".swiper-container").toggle();
    });
    //加入购物车
    recentBuyRecordList.on("tap",".u-shop-car",function(e){
		var self = $(this);
		var brandId = self.attr("data-brandId");
		var textureId = self.attr("data-textureId");
		var specification = self.attr("data-specification");
		shopCart.addShopCar(brandId,textureId,specification);
    });
   
    /**
     * 初始化滑动模块
     */
    function  initSwiper(){
    	 //初始化滑动组件
        var mySwiper = new Swiper(".swiper-container", {
    	    direction: 'horizontal', //水平滑动
    	    loop: false, //当前为最后panel时不可再往后滑动
    	    autoplay: 10000, //自动轮播时间（毫秒）
    	    autoplayDisableOnInteraction: false, //用户操作swiper之后，不禁止autoplay
    	    pagination: ".swiper-pagination" //分页器样式
    	});
    }
    //初始化加载放置document onload里执行
    function init(){
    	 $.getJSON("findRecentlyBuyRecord?_t="+new Date().getTime(),function(data){
    		 //只要有一页数据就显示
    		 if(data && data.length>0){
    			 gFooter.addClass("g-f1 g-f2"); 
    		 }else{
    			 return ;
    		 }
    		 var pages = [];
    		 //每页分三行
    		 var pageCount = 0;
    		 for(var i=0;i<data.length;i++){
    			 //最多取12条数据
    			 if(i>=12){
    				 break;
    			 }
    			 if(i%3 == 0){
    				 pages[pageCount++] =[];
    			 }
    			 pages[pageCount-1].push(data[i]);
    		 }
    		 // 1. Compile template function
    		 var tempFn = doT.template(recentBuyRecordListTpl);
    		 // 2. Use template function as many times as you like
    		 var resultHtml = tempFn(pages);
    		 recentBuyRecordList.find(".swiper-wrapper").empty().append(resultHtml);
    		 recentBuyRecordList.show();
    		 //initSwiper 必须放置到recentBuyRecordList.show(),不然初始滑动组件就会有问题
    		 initSwiper();
    		 return ;
    	 });
    }
    $(document).ready(function(){
    	init();
    });
   
});