/**
 * 交货设置模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	   //dot模板引擎
    var doT = require("dot");
  
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	var provincesTplFn = doT.template(require("./provinces.html"));
	var citysTplFn = doT.template(require("./citys.html"));
	//发货地设置内容区
	var deliveryAddressSetting = $("#delivery-address-setting");

	deliveryAddressSetting.on("click", "ul.tabs>li", function(e) {
		var self = $(this);
		var index = self.index();
		var provinceName = self.attr("data-province-name");
		//将单击Tab设置选择状态
		self.siblings(".active").removeClass("active");
		self.addClass("active");
		loadCitys(provinceName, index);
	});
	deliveryAddressSetting.on("click", ".weui_switch", function(e) {
		var self = $(this);
		var checkboxs = self.closest(".guide-tab-content").find("label input[type='checkbox']");
		checkboxs.prop("checked",self.prop("checked"));
		if(checkboxs.length>0){
			saveDeliveryAddressSettings(checkboxs);	
		}
	});
	deliveryAddressSetting.on("click", ".weui_check_label", function(e) {
		var self = $(this);
		var checkbox = self.find("label input[type='checkbox']");
		checkbox.prop("checked",!checkbox.prop("checked"));
		var tabContent = self.closest(".guide-tab-content"); 
		var checkboxs =tabContent.find("label input[type='checkbox']");
		var isSelectedAll = true;
		checkboxs.each(function(index){
			//如果有一个没有选中
			if(!$(this).prop("checked")){
				isSelectedAll = false;
				return false;
			}
		});
		
		if(isSelectedAll){
			tabContent.find(".weui_switch").prop("checked",true);
		}else{
			tabContent.find(".weui_switch").prop("checked",false);
		}
		saveDeliveryAddressSettings(checkbox);
	});
	/**
	 * @param $tabContent 选择区域
	 */
	function setSelectAll($tabContent){
		var checkboxs =$tabContent.find("label input[type='checkbox']");
		var isSelectedAll = true;
		checkboxs.each(function(index){
			//如果有一个没有选中
			if(!$(this).prop("checked")){
				isSelectedAll = false;
				return false;
			}
		});
		
		if(isSelectedAll){
			$tabContent.find(".weui_switch").prop("checked",true);
		}else{
			$tabContent.find(".weui_switch").prop("checked",false);
		}
	}
	/**
	 * 保存设置的参数
	 */
	function saveDeliveryAddressSettings($checkboxs){
		var params = getSaveParam($checkboxs);
		$.post('../../purchase/favorite/saveDeliveryPlaces', params,function(data) {
			/*  if(data.success){
				//保存成功
				toast.toast("保存成功",1000);
			  }else{
				toast.toast("保存失败",1000);
			  }*/
		},"json");
	}
	
	/**
	 * 获取要保存的参数
	 */
	function getSaveParam($checkboxs){
		var params = {};
		$checkboxs.each(function(index){
			var self = $(this);
			params['listSaleDeliveryPlace['+index+'].provinceName'] = self.attr("data-province-name");
		    params['listSaleDeliveryPlace['+index+'].areaName'] = self.attr("data-city-name"); 
		    params['listSaleDeliveryPlace['+index+'].useStatus'] =self.prop("checked")?1:0;
		});
		return params;
	}
	// 加载所有省数据
	function loadProvinces() {
		//已经加载过了就不进行加载了
		if(deliveryAddressSetting.find(".tabs").length > 0 ){
			return ;
		}
				
		$.getJSON('../../purchase/favorite/getProvinces', function(data) {
			if (!data) {
				return;
			}
			if(data.length === 0){
				deliveryAddressSetting.addClass("empty");
			}else{
				deliveryAddressSetting.removeClass("empty");
			}
 			var resultHtml = provincesTplFn(data);
 			deliveryAddressSetting.append(resultHtml);
 			var len  = deliveryAddressSetting.find(".tabs>li").length;
 			for(var i=0;i<len;i++){
 				deliveryAddressSetting.append('<div class="guide-tab-content"></div>');
 			}
 			deliveryAddressSetting.find(".tabs>li:nth-child(1)").trigger("click");
		});
	}
	/**
	 * 加载指定省交货地
	 * 
	 * provinceName {Number} 省名
	 * @tabIndex {Number} 加载第几个tab品名
	 */
	function loadCitys(provinceName, tabIndex) {
		//删除原来选择Tab内容
		deliveryAddressSetting.children("div.active").removeClass("active");
		var tabContent = deliveryAddressSetting.children(".guide-tab-content").eq(tabIndex);
		tabContent.addClass("active");
		
		// 已经加载过内容且有数据就不加载了
		var checkboxs =tabContent.find(".weui_cells.weui_cells_checkbox"); 
		if (checkboxs.length>0) {
			return;
		}
		loadingToast.show("数据加载中");
		$.post('getCitys', {
			"provinceName" : provinceName
		}, function(data) {
			loadingToast.hide();
			if (!data) {
				return;
			}
			var resultHtml = citysTplFn(data);
			tabContent.append(resultHtml);
			setSelectAll(tabContent);
		},"json");
	}

		
	module.exports ={
		'loadProvinces':loadProvinces		
		};
});