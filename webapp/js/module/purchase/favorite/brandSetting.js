/**
 * 品种设置模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	   //dot模板引擎
    var doT = require("dot");
  
	
	//数据加载提示
	var loadingToast = require("../../common/loadingToast");
	var varietysTplFn = doT.template(require("./varietys.html"));
	var brandsTplFn = doT.template(require("./brands.html"));
	var brandSetting = $("#brand-setting");

	brandSetting.on("click", "ul.tabs>li", function(e) {
		var self = $(this);
		var index = self.index();
		var commVarietyId = self.attr("data-comm-variety-id");
		//将单击Tab设置选择状态
		self.siblings(".active").removeClass("active");
		self.addClass("active");
		loadBrands(commVarietyId, index);
	});
	brandSetting.on("click", ".weui_switch", function(e) {
		var self = $(this);
		var checkboxs = self.closest(".guide-tab-content").find("label input[type='checkbox']");
		checkboxs.prop("checked",self.prop("checked"));
		if(checkboxs.length>0){
			saveBrandSettings(checkboxs);	
		}
	});
	brandSetting.on("click", ".weui_check_label", function(e) {
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
		saveBrandSettings(checkbox);
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
	function saveBrandSettings($checkboxs){
		var params = getSaveParam($checkboxs);
		$.post('../../purchase/favorite/saveBrands', params,function(data) {
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
			params['listBrands['+index+'].commBrandId'] = self.attr("data-comm-brand-id");
		    params['listBrands['+index+'].brandId'] = self.attr("data-brand-id");
		    params['listBrands['+index+'].brandName'] = self.attr("data-brand-name");
		    params['listBrands['+index+'].commVarietyId'] = self.attr("data-comm-variety-id");
		    params['listBrands['+index+'].abbreviation'] = self.attr("data-abbreviation"); 
		    params['listBrands['+index+'].useStatus'] =self.prop("checked")?1:0;
		});
		return params;
	}
	// 加载所有品种
	function loadVarietys() {
		//已经加载过了就不进行加载了
		if(brandSetting.find(".tabs").length > 0 ){
			return ;
		}
				
		$.getJSON('../../purchase/favorite/getVarietys', function(data) {
			if (!data) {
				return;
			}
			if(data.length === 0){
				brandSetting.addClass("empty");
			}else{
				brandSetting.removeClass("empty");
			}
 			var resultHtml = varietysTplFn(data);
 			brandSetting.append(resultHtml);
 			var len  = brandSetting.find(".tabs>li").length;
 			for(var i=0;i<len;i++){
 				brandSetting.append('<div class="guide-tab-content"></div>');
 			}
 			brandSetting.find(".tabs>li:nth-child(1)").trigger("click");
		});
	}
	/**
	 * 加载指定品种的所有品类
	 * 
	 * @varietyId {Number} 品种id
	 * @tabIndex {Number} 加载第几个tab品名
	 */
	function loadBrands(commVarietyId, tabIndex) {
		//删除原来选择Tab内容
		brandSetting.children("div.active").removeClass("active");
		var tabContent = brandSetting.children(".guide-tab-content").eq(tabIndex);
		tabContent.addClass("active");
		
		// 已经加载过内容且有数据就不加载了
		var checkboxs =tabContent.find(".weui_cells.weui_cells_checkbox"); 
		if (checkboxs.length>0) {
			return;
		}
		loadingToast.show("数据加载中");
		$.post('getBrandsByVarietyId', {
			"commVarietyId" : commVarietyId
		}, function(data) {
			loadingToast.hide();
			if (!data) {
				return;
			}
			var resultHtml = brandsTplFn(data);
			tabContent.append(resultHtml);
			setSelectAll(tabContent);
		},"json");
	}

	
	module.exports ={
		'loadVarietys':loadVarietys		
		};
});