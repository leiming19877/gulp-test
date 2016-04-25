/**
 * 品名选择模块，此模块提供选择品名，对外依赖productDetail.js模块
 * @depend productDetail.js
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	// doc
	var doc = $(document);
	//产品详情模块
	var pd = require("./productDetail");
	
	//注册
	doc.on("tap","ul.m-brand-names>li",function(e){
		var self = $(this);
		var brandName = self.text();
		var brandId = self.attr("data-brandId");
		pd.hide();
		pd.loadByBrand(brandId,brandName);
	});
});