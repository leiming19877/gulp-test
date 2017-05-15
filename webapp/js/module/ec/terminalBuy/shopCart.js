/**
 * 购物车模块
 * 对外导出功能：
 * 1、重新加载购物车数量
 * 2、将对应产品加载到购物车
 * @depend productDetail.js
 */
define(function(require, exports, module) {
	var $ = require("zepto");
	//提示模块
	var toast = require("../../common/toast");
	//加载提示模块
	var loadingToast = require("../../common/loadingToast");
	//购物车数量所有模块
	var shopCart = $(".m-shop-car .num");
	
	//加载购物车数量
	function reloadShopCarNum(){
		$.getJSON("selectShopCartNum?_t="+new Date().getTime(),function(data){
			shopCart.text(data);
		});
	}
	/**
	 * @param brandId {Number} 品名id
	 * @param textureId {String} 材质id
	 * @param specification {String} 规格
	 */
	function addShopCar(brandId,textureId,specification){
		loadingToast.show("加入购物车中");
		$.post("shopcart/addShopCart",{
			"brandId": brandId,
			"texture": textureId,
			"specification": specification
			},function(data){
				loadingToast.hide();
				if(data.success){
					//显示添加成功
					toast.toast("加入成功",1000);
					reloadShopCarNum();	
				}else{
					//显示添加成功
					toast.toast("加入失败",1000);
				}
			},"json");
	}
	$(document).ready(function(){
		reloadShopCarNum();
	});
	
	//导出功能
	module.exports ={
			"reloadShopCarNum":reloadShopCarNum,
			"addShopCar":addShopCar
	}
	
});