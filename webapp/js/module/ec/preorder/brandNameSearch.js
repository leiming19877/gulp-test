/**
 * 品名搜索模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	// 搜索输入框
	var brandNameSearch = $("#brand-name-search");
	//搜索区域
	var brandNamesSearchPanel = $("#brand-names-search-panel");
	//搜索区内容(ul)
	var brandNamesSearchContent = $("#brand-names-search-content");
	
	/**
	 * 隐藏所有不匹配的品名
	 * 
	 * @param queryBrandName
	 *            {String} 搜索的品名
	 */
	function hiddenNotMatchBrandNames(queryBrandName){
			// 所有品名 li元素
			brandNamesSearchPanel.find("li").each(function(index){
			   var self = $(this);
			   var brandName = self.text();
			   // 进行品名匹配
			   if(brandName.indexOf(queryBrandName) != -1){
				   self.removeClass("f-dn");
			   }else{
				   self.addClass("f-dn");
			   }
		   });
	}
	/**
	 * 判断queryBrandName是否有匹配的品名
	 * 
	 * @param queryBrandName
	 *            {String} 搜索的品名
	 */
	function isMatchBrand(queryBrandName){

		// 是否有匹配，默认不匹配
		var isMatch = false;
		// 所有品名 li元素
		brandNamesSearchPanel.find("li").each(function(index){
			   var self = $(this);
			   var brandName = self.text();
			   // 进行品名匹配
			   if(brandName.indexOf(queryBrandName) != -1){
				   isMatch  = true;
				   // 终止匹配
				   return false;
			   } 
		   });
		return isMatch;
	}
	

	//匹配输入品名
	brandNameSearch.on("input",function(e){
		   var self = $(this);
		   var val = self.val();
		 
		   if(isMatchBrand(val)){
			   		brandNamesSearchPanel.removeClass("no-match");
					hiddenNotMatchBrandNames(val);
			}else{
					brandNamesSearchPanel.addClass("no-match");
			}
	  });
	
	 /**
	 * 加载所有的品名
	 */
	function loadAllBrands(){
		$.post('getBrandsByVarietyId', {
		}, function(data) {
			if (!data) {
				return;
			}
			//先清空内容
			brandNamesSearchContent.empty();
			var ul = brandNamesSearchContent;
			for (var i = 0; i < data.length; i++) {
				var brandId = data[i].brandId;
				var brandName = data[i].brandName;
				// 导航区
				var li = $('<li ></li>');
				li.attr({
					"data-brandId" : brandId
				});
				var a = $('<a href="#">' + brandName + '</a>')
				li.append(a);
				li.appendTo(ul);
			}

		},"json");
	}
	$(document).ready(function(){
		loadAllBrands();
	});
});