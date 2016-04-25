/**
 * @dependce toast.js
 * @dependce loadingToast.js
 * @dependce shopCart.js
 * 产品详情的主要功能有：
 * 1、显示产品界面（对外提供）
 * 2、隐藏产品界面（对外提供）
 * 3、加载指定品名对应的材质，规格基础数据（对外提供）
 * 4、材质选择切换（内部）
 * 5、规格选择切换（内部）
 */
define(function(require, exports, module) {
	
	var $ = require("zepto");
	var toast = require("./toast");
	var loadingToast  = require("./loadingToast");
	//购物车模块
	var shopCart = require("./shopCart");
	var productDetail = $("#product-detail");
	var brandName = productDetail.find(".brand-name");
	var productDetailClose = $("#product-detail-close");
	
	//材质界面
	var texture = productDetail.find(".texture");
	
	//规格界面
	var specificationWrap = productDetail.find(".specification-wrap");
	
	//规格其它输入框
	var specificationOtherInput = $("#specification-other-input");
	//关闭产品详情界面
	productDetailClose.on("tap",function(e){
		//似乎微信不支持css transition transform 样式，无法做动画
		//productDetail.addClass("show");
		productDetail.hide();
	});
	//材质单击
	productDetail.on("tap",".texture .item",function(e){
		var self = $(this);
		self.siblings(".selected").removeClass("selected");
		self.addClass("selected");
	});
	//规格单击
	productDetail.on("tap",".specification .item",function(e){
		var self = $(this);
		var text = self.text();
		var pSpecification = self.parent().parent();
		pSpecification.find(".selected").removeClass("selected");
		self.addClass("selected");
		if("其它" === text ){
			specificationOtherInput.show();
			specificationOtherInput.focus();
		}else{
			specificationOtherInput.hide();
		}
	});
	//添加到购物车单击
	productDetail.on("tap",".add-shop-car-button",function(e){
		addShopCar();
	});
	//立即下单
	productDetail.on("tap",".buy-button",function(e){
		goBuy();
	});
	/**
	 * 加入购物车
	 */
	function addShopCar(){
		if(!checkSelected()){
			return;
		}
		var t = getSelected();
		//添加到购物车
		shopCart.addShopCar(t.brandId,t.textureId,t.specification);
	}
	/**
	 * 立即下单
	 */
	function goBuy(){
		if(!checkSelected()){
			return;
		}
		var t = getSelected();
		var orderForm  = $("#orderForm");
		orderForm.find("input[name*='brandName']").val(t.brandId);
		orderForm.find("input[name*='brandNameDesc']").val(t.brandName);
		orderForm.find("input[name*='texture']").val(t.textureId);
		orderForm.find("input[name*='textureDesc']").val(t.texture);
		orderForm.find("input[name*='specification']").val(t.specification);
		//跳转到下单界面
		orderForm.submit();
	}
	/**
	 * 获取选择的品名、材质、规格
	 * @return {
	 * 			"brandId":"1231",
	 * 			"brandName":"品名1"
	 * 			"textureId":"123123",
	 * 			"texture":"材质1",
	 * 			"specification":"12*12",
	 * }
	 */
	function getSelected(){
		var brandId = brandName.attr("data-brandId");//品名id
		var texture  = productDetail.find(".texture>.selected");
		var specification  = productDetail.find(".specification .selected").text();
		if(specification === "其它"){
			specification = specificationOtherInput.val();
		}
		return {
			"brandId":brandId,
			"brandName":brandName.text(),
			"textureId":texture.attr("data-textureId"),
			"texture":texture.text(),
			"specification":specification,
		}
	}
	/**
	 * 检验选择的产品
	 * @return {Boolean}
	 */
	function  checkSelected(){
		var t = getSelected();
		if(!t.textureId){
			toast.toast("请选择材质！",3000);
			return false;
		}
		if(!t.specification){
			toast.toast("请选或输入规格！",3000);
			return false;
		}
		return true;
	}
	
	/**
	 * 加载指定品名的材质
	 */
	function loadTextureByBrandId(data){
		//清空
		texture.empty();
		for (var i = 0; i < data.length; i++) {
			var textureId = data[i].textureId;//材质id
			var textureName = data[i].textureName;//材质名称
			var bt = $('<button  class="item">'+textureName+'</button>');
			bt.attr({"data-textureId":textureId});
			//添加到材质区域
			texture.append(bt);
		}
		
	}
	/**
	 * 加载指定品名的材质
	 */
	function loadSpecificationByBrandId(data){
		//清空
		specificationWrap.empty();
		
		for (var i = 0; i < data.length; i++) {
			var specification= data[i].name;//规格名称
			//如果为空则跳过
			if(specification === null || specification === ""){
				 continue;
			}
			var bt = $('<button  class="item">'+specification+'</button>');
			//添加到材质区域
			specificationWrap.append(bt);
		}
	}
	/**
	 * 通过指定品名id加载对应的材质、规格
	 */
	function loadByBrand(brandId,_brandName){
		//更新选择的品名
		brandName.text(_brandName);
		brandName.attr("data-brandId",brandId);
		loadingToast.show("加载数据中");
		$.post("findTextureAndSpecificationByBrandId",{"brandId":brandId},function(data){
			
			loadingToast.hide();
			//显示商品详情界面
			productDetail.show();
			//加载材质
			loadTextureByBrandId(data.textureList);
			//加载规格
			loadSpecificationByBrandId(data.specificationList);
		},"json");
		
	}
	
	module.exports = {
		//显示产品详情界面
		show: function(){
			productDetail.show();
		},
		//隐藏产品详情界面
		hide: function(){
			productDetail.hide();
		},
		loadByBrand:loadByBrand,
	};
	
});