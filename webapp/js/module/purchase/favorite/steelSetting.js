/**
 * 钢厂设置模块
 */
 define(function(require, exports, module) {
	var $ = require("zepto");
	   //dot模板引擎
    var doT = require("dot");
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	var provincesTplFn = doT.template(require("./steelProvinces.html"));
	var citysTplFn = doT.template(require("./cities.html"));
	var steelsTplFn = doT.template(require("./steels.html"));
	var steelSetting = $("#steel-factory-setting");
	var provinceName;
	var cityName;
	var steels;
	steelSetting.on("click", "div>ul.m-steel-tabs>li", function(e) {
		var self = $(this);
		var index = self.index();
		cityName = self.attr("data-city-name");
		//将单击Tab设置选择状态
		self.siblings(".active").removeClass("active");
		self.addClass("active");
		loadSteelFactories(provinceName,cityName, index);
	});
	steelSetting.on("click", ".m-steel-tab>li", function(e) {
		citiesSetting = $("div[name='city']");
		if(!$(e.target).hasClass("city")){
			var self = $(this);
			var index = self.index();
			provinceName = self.attr("data-province-name");
			//将单击Tab设置选择状态
			self.siblings(".active").removeClass("active");
			self.addClass("active");
			loadCitys(provinceName, index);
		}
	});
	steelSetting.on("click", ".weui_cells_form", function(e) {
		var self = $(this);
		var checkboxs = self.closest(".guide-tab-content").find("label input[type='checkbox']");
		var isSelectedAll = self.find(".weui_switch").prop("checked");
		checkboxs.each(function(index){
			$(this).prop("checked",isSelectedAll);
		});
		if(checkboxs.length>0){
			saveSteelSetting(checkboxs);
		}
	});
	steelSetting.on("change", ".weui_check_label", function(e) {
		var self = $(this);
		var checkbox= self.find("label input[type='checkbox']");
		var $steelSelect =self.closest(".m-steel-select"); 
		var checkboxs = $steelSelect.find("label input[type='checkbox']");
		var isSelectedAll = true;
		checkboxs.each(function(index){
			//如果有一个没有选中
			if(!$(this).prop("checked")){
				isSelectedAll = false;
				return false;
			}
		});
		
		if(isSelectedAll){
			$steelSelect.find(".weui_switch").prop("checked",true);
		}else{
			$steelSelect.find(".weui_switch").prop("checked",false);
		}
		saveSteelSetting(checkbox);
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
	
	// 加载所有省份
	function loadProvinces() {
		//已经加载过了就不进行加载了
		if(steelSetting.find(".tabs").length > 0 ){
			return ;
		}
				
		$.getJSON('../../purchase/favorite/getSteelProvinces', function(data) {
			if (!data) {
				return;
			}
 			var resultHtml = provincesTplFn(data);
 			steelSetting.append(resultHtml);
 			var len  = steelSetting.find(".tabs>li").length;
 			for(var i=0;i<len;i++){
 				steelSetting.append('<div name="city" class="guide-tab-content"></div>');
 			}
 			steelSetting.find(".tabs>li:nth-child(1)").trigger("click");
		});
	}
	/**
	 * 加载指定省份的全部城市
	 * 
	 * @provinceName {String} 省份名
	 * @tabIndex {Number} 加载第几个tab省份
	 */
	function loadCitys(provinceName, tabIndex) {
		//删除原来选择Tab内容
		steelSetting.children("div.active").removeClass("active");
		var tabContent = steelSetting.children("div").eq(tabIndex);
		tabContent.addClass("active");
		loadingToast.show("数据加载中");
		$.post('getSteelCitys', {
			"provinceName" : provinceName
		}, function(data) {
			loadingToast.hide();
			if (!data) {
				return;
			}
			tabContent.empty();
			var resultHtml = citysTplFn(data);
			tabContent.append(resultHtml);
			steels = tabContent.children("div");
// 			tabContent.find(".guide-tab-content>ul>li:nth-child(1)").trigger("click");
		},"json");
	}
	/**
	 * 加载指定城市的全部钢厂
	 * 
	 * @provinceId {Number} 城市id
	 * @tabIndex {Number} 加载第几个tab
	 */
	function loadSteelFactories(provinceName, cityName, tabIndex) {
		// 已经加载过内容且有数据就不加载了
		var tabContent = steels.eq(tabIndex);
		var checkboxs =tabContent.find(".weui_cells.weui_cells_checkbox"); 
		if (checkboxs.length>0) {
			steels.removeClass("active");
			tabContent.addClass("active");
			return;
		}
		loadingToast.show("数据加载中");
		$.ajax({
			url:'getPlaceSteelData',
			dataType:"json",
			data:{
				"provinceName" : provinceName,
				"cityName":cityName
			}, 
			success:function(data) {
				loadingToast.hide();
				if (!data) {
					return;
				}
				var resultHtml = steelsTplFn(data);
				tabContent.empty();
				steels.eq(tabIndex).append(resultHtml);
				steels.removeClass("active");
				steels.eq(tabIndex).addClass("active");
				tabContent.addClass("active");
				setSelectAll(tabContent);
			},
			error:function(data){
				window.alert("网络异常，稍后重试。");
			}
		});
	}
	function saveSteelSetting($checkboxs){
		var params = getSaveParam($checkboxs);
		$.post('../../purchase/favorite/updateSteels', params,function(data) {
		},"json");
	}
	function getSaveParam($checkboxs){
		var params = {};
		$checkboxs.each(function(index){
			var self = $(this);
			params['listSteels['+index+'].provinceName'] = self.attr("data-province-name");
		    params['listSteels['+index+'].areaName'] = self.attr("data-area-name");
		    params['listSteels['+index+'].placeSteelName'] = self.attr("data-place-steel-name");
		    params['listSteels['+index+'].useStatus'] =self.prop("checked")?1:0;
		    params['listSteels['+index+'].placeSteelId'] =self.attr("data-place-steel-id");
		});
		return params;
	}
	

	$(document).ready(function() {
		// 清空导航内所有html结构
		steelSetting.empty();
	});
	
	module.exports ={
		'loadProvinces':loadProvinces		
		};
});