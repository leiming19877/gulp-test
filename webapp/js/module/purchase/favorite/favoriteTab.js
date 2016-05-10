/**
 * 竞价导航模块
 */
define(function(require, exports, module) {
	var $ = require("zepto");

	var Router = require("director");
	//品种设置tab 常量
	var VARIETY_SETTING_TAB = "variety-setting-tab";
	//钢厂设置tab 常量
	var STEEL_FACTORY_SETTING_TAB = "steel-factory-setting-tab";
	//发货地设置内tab 常量
	var DELIVERY_ADDRESS_SETTING_TAB = "delivery-address-setting-tab";
	
	//当前选择的tab
	var selectTab = VARIETY_SETTING_TAB;
	
	//收货导航
	var favoriteTab = $("#favorite-tab");
	
	//品种设置tab
	var varietySettingTab = $("#variety-setting-tab");
	//钢厂 设置tab
	var steelFactorySettingTab = $("#steel-factory-setting-tab");
	//发货地设置内tab
	var deliveryAddressSettingTab = $("#delivery-address-setting-tab");
	
	//品种设置内容区
	var varietySetting = $("#variety-setting");
	//钢厂 设置内容区
	var steelFactorySetting = $("#steel-factory-setting");
	//发货地设置内容区
	var deliveryAddressSetting = $("#delivery-address-setting");
	
	/**
	 * 显示指定tab,包括显示其内容区，切换到tab选择
	 * @param   tab {String} 指定的tab
	 */
	function showSelectTab(tab){
		selectTab = tab;
		//删除选中
		favoriteTab.find(".weui_bar_item_on").removeClass("weui_bar_item_on");
		//隐藏所有tab内容区
		favoriteTab.find(".tab-content").hide();
		switch(tab){
			case VARIETY_SETTING_TAB:
				varietySettingTab.addClass("weui_bar_item_on");
				varietySetting.show();
				break;
			case STEEL_FACTORY_SETTING_TAB:
				steelFactorySettingTab.addClass("weui_bar_item_on");
				steelFactorySetting.show();
				break;
			case DELIVERY_ADDRESS_SETTING_TAB:
				deliveryAddressSettingTab.addClass("weui_bar_item_on");
				deliveryAddressSetting.show();
				break;
			
		
		}
	}
	
	/**
	 * 品格设置路由
	 */
	function varietySettingRouter(){
		showSelectTab(VARIETY_SETTING_TAB);
	}
	/**
	 * 钢厂设置路由
	 */
	function steelFactorySettingRouter(){
		showSelectTab(STEEL_FACTORY_SETTING_TAB);
	}
	/**
	 * 发货地设置路由
	 */
	function deliveryAddressSettingRouter(){
		showSelectTab(DELIVERY_ADDRESS_SETTING_TAB);
	}
    var routes = {
        '/variety-setting': varietySettingRouter,
        '/steel-factory-setting': steelFactorySettingRouter,
        '/delivery-address-setting': deliveryAddressSettingRouter
    };
    var router = Router(routes).configure({
    	'html5history':false,
    	'notfound':function(){
    		router.setRoute("/variety-setting");
    	}
    });
    //初始化第一个Tab
    router.init("/variety-setting");
	module.exports ={
			
	}
});