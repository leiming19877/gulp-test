define(function(require, exports, module) {
	//组件样式
    //require("../../../swiper/swiper.min.css");
    var Swiper = require("swiper");
    //引用zepto模块
	var $ = require("zepto");
	var Vue = require("vue");
	//var VueRouter = require("vue-router");
	//Vue.use(VueRouter);
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	
	Vue.http.options.emulateJSON = true;//设置表单提交
	var weui = require("weui");
	
	var appVue = new Vue({
		el:'#app',
		data:{
			sellerMemberId:null,//卖家会员号
			shopingCartCount:0,//购物车数量
			shopingCartList:[],//购物车数据
			brand:null,//当前选择的品名
			steelWork:null,//当前选择的钢厂
			
			specification:null,//当前选择的规格
			
			texture:null,//当前选择的材质
			
			width:null,//宽度
			thickness:null,//厚度
			buyWeight:null,//购买重量
			listSellers:[],//卖家会员列表
			listBigBrands:[],//品名复合列表对象
			
			thicknessBrand:null,//查看厚度加价时选择的品名
			thicknessSteelWork:null,//查看厚度加价时选择的钢厂
			thicknessSpecification:null,//查看厚度加价时选择的规格
			isShowAddPrice:false,//是否显示厚度加价
			recentlyBuyRecordList:[],//最近购物记录
			isFullHideRecentlyBuyRecord:false,//是否完全隐藏最近购买记录，当没有最近购物记录时隐藏
			isShowRecentlyBuyRecord:false,//是否显示最近购买记录
		
			//厚度输入对话框填充值
		    thicknessInputDialog:{
		    	isShowThicknessInputDialog:false,//是否显示厚度输入对话框
		    	selectedVal:'',//选择的值
		    	inputVal:''//输入的值
		    }
		},
		computed:{
			//品名列表
			listBrands:function(){
					var list = [];
					this.listBigBrands.forEach(function(e){
						  list.push({
							  'id':e.id,
							  'brandId':e.brandId,
							  'brandName':e.brandName
						  });
					  });
					 return list;
			},
			//钢厂
			listSteelWorks:function(){
					var list = [];
					if(this.brand){
						var steelList = this.getListSteelWorksByBrandId(this.brand.id);
						 steelList.forEach(function(e){
							 list.push({
								 'id':e.id,
								 'steelWorkId':e.steelWorkId,
								 'steelWorkName':e.steelWorkName
							 });
						 });
						/* list.push({
							 'id':null,
							 'steelWorkId':null,
							 'steelWorkName':'其他'
						 });*/
					}
					return list;
			},
			
			//硬度加价钢厂
			listThicknessSteelWorks:function(){
					var list = [];
					if(this.thicknessBrand){
						var steelList = this.getListSteelWorksByBrandId(this.thicknessBrand.id);
						 steelList.forEach(function(e){
							 list.push({
								 'id':e.id,
								 'steelWorkId':e.steelWorkId,
								 'steelWorkName':e.steelWorkName
							 });
						 });
					}
					return list;
			},
			//规格列表
			listSpecifications:function(){
					var list = [];
					if(this.brand && this.steelWork){
						var steelList = this.getListSteelWorksByBrandId(this.brand.id);
						var specificationList = this.getListSpecificationsBySteelWorkId(this.steelWork.id,steelList);
						specificationList.forEach(function(e){
							list.push({
								  'specificationId':e.specificationId,
								  'specificationName':e.specificationName,
								  'baseThickness':e.baseThickness
							 });
						 });
					
					}
					return list;	
			},
			
			//规格列表
			listThicknessSpecifications:function(){
					var list = [];
					if(this.thicknessBrand && this.thicknessSteelWork){
						var steelList = this.getListSteelWorksByBrandId(this.thicknessBrand.id);
						var specificationList = this.getListSpecificationsBySteelWorkId(this.thicknessSteelWork.id,steelList);
						specificationList.forEach(function(e){
							list.push({
								  'specificationId':e.specificationId,
								  'specificationName':e.specificationName,
								  'baseThickness':e.baseThickness
							 });
						 });
					}
					return list;	
			},
			//材质
			listTextures:function(){
					var list = [];
					if(this.brand && this.steelWork && this.specification){
						var steelList = this.getListSteelWorksByBrandId(this.brand.id);
						var specificationList = this.getListSpecificationsBySteelWorkId(this.steelWork.id,steelList);
						var textureList = this.getListTexturesBySpecificationId(this.specification.specificationId,specificationList);
						textureList.forEach(function(e){
							 list.push({
								  'id':e.id,
								  'textureId':e.textureId,
								  'textureName':e.textureName,
								  'specificationId':e.specificationId
							 });
						 });
						
					}
					return list;
			},
			
			//当前厚度加价
			currentListThicknessAddPrices:function(){
					var list = [];
					if(this.brand && this.steelWork && this.specification){
						var steelList = this.getListSteelWorksByBrandId(this.brand.id);
						var specificationList = this.getListSpecificationsBySteelWorkId(this.steelWork.id,steelList);
						var addPriceList = this.getListAddPriceBySpecificationId(this.specification.specificationId,specificationList);
						addPriceList.forEach(function(e){
							 list.push({
								  'id':e.id,
								  'thickness':e.thickness,
								  'thicknessPrice':e.thicknessPrice
							 });
						 });
						
					}
					return list;
			},
			//厚度加价
			listThicknessAddPrices:function(){
					var list = [];
					if(this.thicknessBrand && this.thicknessSteelWork && this.thicknessSpecification){
						var steelList = this.getListSteelWorksByBrandId(this.thicknessBrand.id);
						var specificationList = this.getListSpecificationsBySteelWorkId(this.thicknessSteelWork.id,steelList);
						var addPriceList = this.getListAddPriceBySpecificationId(this.thicknessSpecification.specificationId,specificationList);
						addPriceList.forEach(function(e){
							 list.push({
								  'id':e.id,
								  'thickness':e.thickness,
								  'thicknessPrice':e.thicknessPrice
							 });
						 });
						
					}
					return list;
			}
		},
		watch:{
			sellerMemberId:function(newSellerMemberId){
				this.getSellerBrandListAndShopingCart(newSellerMemberId);
				//this.getRecentlyBuyRecordList(newSellerMemberId);
			},
			brand:function(/*newBrand*/){
				this.steelWork = null;
				this.specification = null;
				this.texture = null;
				var list = this.listSteelWorks;
				if(list.length >0){
					this.steelWork = list[0];
				}
				list = this.listSpecifications;
				if(list.length > 0){
					this.specification = list[0];
				}
				list = this.listTextures;
				if(list.length > 0){
					this.texture = list[0];
				}
				//厚度加价
				this.thicknessSteelWork = null;
				this.thicknessSpecification = null;
				list = this.listThicknessSteelWorks;
				if(list.length > 0){
					this.thicknessSteelWork = list[0];
				}
				list = this.listThicknessSpecifications;
				if(list.length > 0){
					this.thicknessSpecification = list[0];
				}
				
			},
			steelWork:function(/*newSteelWork*/){
				this.specification = null;
				this.texture = null;
				var list = this.listSpecifications;
				if(list.length > 0){
					this.specification = list[0];
				}
				list = this.listTextures;
				if(list.length > 0){
					this.texture = list[0];
				}
				
				this.thicknessSpecification = null;
				list = this.listThicknessSpecifications;
				if(list.length > 0){
					this.thicknessSpecification = list[0];
				}
			},
			specification:function(/*newSpecification*/){
				this.texture = null;
				var list = this.listTextures;
				if(list.length > 0){
					this.texture = list[0];
				}
			},
			thicknessBrand:function(){
				//厚度加价
				this.thicknessSteelWork = null;
				this.thicknessSpecification = null;
				var list = this.listThicknessSteelWorks;
				if(list.length > 0){
					this.thicknessSteelWork = list[0];
				}
				list = this.listThicknessSpecifications;
				if(list.length > 0){
					this.thicknessSpecification = list[0];
				}
			},
			thicknessSteelWork:function(/*newSteelWork*/){
				this.thicknessSpecification = null;
				var list = this.listThicknessSpecifications;
				if(list.length > 0){
					this.thicknessSpecification = list[0];
				}
			}
		},
		created:function(){
			this.getListSellers();
			
		},
		updated:function(){

		},
		methods:{
			viewQuote:function(e){
				window.location.href="../quote/list"
			},
			toOrder:function(e){
				var sellerId = this.sellerMemberId;
				window.location.href="../shopcart/view?sellerId="+sellerId
			},
			/**
			 * 是否购买过指定资源
			 * @param {o} 订单资源
			 * @parma {s} 购物车资源
			 */
			isBuyed:function(o,s){
				
				if(!o || !s ){
					return false;
				}
				//d.brandName,d.brandNameDesc,d.placeSteel,d.placeSteelDesc,d.specification,d.texture,d.textureDesc
				if(o.brandName == s.brandId
						&& o.texture == s.textureId
						&& o.specification == s.specificationName
						&& o.placeSteel == s.steelWorkId
					){
					return true;
				}
				return false;
			},
			//获取卖家列表
			getListSellers:function(){
			   var self = this;
			   this.$http.post("../../ec/futures/getSellerMemberList").then(function(rs){
					  var data = rs.data;
					  if(data.length>0){
						  //选择第一个作为显示
						  self.sellerMemberId = data[0].sellerId;
					  }
					  data.forEach(function(t){
						  self.listSellers.push({
							  'sellerId':t.sellerId,
							  'sellerName':t.sellerName
						  });
					  });
					  return ;
				  }).catch(function(rs){
					  weui.toast('网络异常!', 3000);
				  });
			},
			getSellerBrandListAndShopingCart:function(sellerId){
				var loading = weui.loading('加载中...', {
				   
				});
				 var self = this;
				 this.$http.post("../../ec/futures/getSellerBrandListAndShopingCart",{'sellerId':sellerId}).then(function(rs){
					 loading.hide(); 
					 var data = rs.data;
					 data.recentlyBuyRecordList.forEach(function(listItem){
						 listItem.forEach(function(e){
							 var isBuyed = false;
							 for(var i=0;i<data.shopingCartList.length;i++){
								 if(self.isBuyed(e,data.shopingCartList[i])){
									 isBuyed = true;
									 break;
								 }
							 }
							 e.isBuyed = isBuyed;
						 });
					 });
					 self.shopingCartCount = data.shopingCartCount;
					 self.shopingCartList= data.shopingCartList;
					 self.listBigBrands = data.brandList;
					 self.recentlyBuyRecordList = data.recentlyBuyRecordList;
					 
					
					 //self.sellerPlaceSteelList = data.sellerPlaceSteelList;
					 //self.sellerSpecificationList = data.sellerSpecificationList;
					 //self.sellerTextureList = data.sellerTextureList;
					 self.setDefaultBrand();
					  
					 //没有最近购买数据就隐藏
					 if(data.recentlyBuyRecordList.length == 0){
						 self.isFullHideRecentlyBuyRecord = true;
						 return ;
					 }else{
						 self.isFullHideRecentlyBuyRecord = false;
					 }
				
					//DOM 还没有更新
					 Vue.nextTick(function(){
						 // DOM 更新了
						 self.initSwiper();
					 });
					 
					  return ;
				  }).catch(function(rs){
					  loading.hide();
					  weui.toast('出错啦，请重新试试!', 3000);
				  });
			},
			setDefaultBrand:function(){
				var list = this.listBrands;
				if(list.length>0){
					this.brand = list[0];
					this.thicknessBrand = list[0];
				}else{
					this.brand = null;
				}
			},
			setBrand:function(brand){//设置品名
				 this.brand = brand;
				 this.thicknessBrand = brand;
			},
			setThicknessBrand:function(event){
				 var t = event.target;
				 var brand = JSON.parse(t.value);
				 this.thicknessBrand = brand;
			},
			setSteelWork:function(steelWork){
				this.steelWork = steelWork;
				this.thicknessSteelWork = steelWork;
			},
		
			setThicknessSteelWork:function(event){
				 var t = event.target;
				 var steelWork = JSON.parse(t.value);
				 this.thicknessSteelWork = steelWork;
			},
			setSpecification:function(specification){
				this.specification = specification;
				this.thicknessSpecification = specification;
			},
			
			setThicknessSpecification:function(event){
				var specification = JSON.parse(event.target.value);
				this.thicknessSpecification = specification;
			},
			setTexture:function(texture){
				this.texture = texture;
			},
			
			//通过品名id获取钢厂列表
			getListSteelWorksByBrandId:function(brandId){
				for(var i=0;i<this.listBigBrands.length;i++){
					 var b = this.listBigBrands[i];
					 if(brandId === b.id && b.steelList.length > 0){
						return 	b.steelList;				 
					}
				 }
				 return [];
			},
			//通过钢厂id获取规格列表
			getListSpecificationsBySteelWorkId:function(steelWorkId,steelList){
				for(var i=0;i<steelList.length;i++){
					 var s = steelList[i];
					 if(steelWorkId === s.id){
						return 	s.specificationList;				 
					}
				 }
				 return [];
			},
			//通过规格id获取材质列表
			getListTexturesBySpecificationId:function(specificationId,specificationList){
				for(var i=0;i<specificationList.length;i++){
					 var t = specificationList[i];
					 if(specificationId === t.specificationId){
						return 	t.textureList;				 
					}
				 }
				 return [];
			},
			//通过规格id获取材质列表
			getListAddPriceBySpecificationId:function(specificationId,specificationList){
				for(var i=0;i<specificationList.length;i++){
					 var t = specificationList[i];
					 if(specificationId === t.specificationId){
						return 	t.listAddPrice;				 
					}
				 }
				 return [];
			},
			//获取选择的规格
			getSepecification:function(){
				var sp = null;
				if(this.specification ){
					sp = this.specification;
				}
				return sp;
			},
			//获取规格名称
			getSpecificationName:function(){
				var sp = this.getSepecification();
				if(!sp){
					return '';
				}
				return sp.specificationName;
			},
			addShopingCart:function(){
				var params = {};
				if(!this.sellerMemberId){
					weui.alert("请选择卖家！");
					return ;
				}
				params['sellerId'] = this.sellerMemberId;
				if(!this.brand){
					weui.alert("请选择品名！");
					return ;
				}
				params['brandId'] = this.brand.brandId;
				params['brandName'] = this.brand.brandName;
				if(!this.steelWork){
					weui.alert("请选择钢厂！");
					return ;
				}
				if(this.steelWork){
					params['steelWorkId'] = this.steelWork.steelWorkId;
					params['steelWorkName'] = this.steelWork.steelWorkName;
				}
				
				if(!this.specification){
					weui.alert("请选择规格！");
					return ;
				}
				
				if(this.specification ){
					params['specificationId'] = this.specification.specificationId;
					params['specificationName'] = this.specification.specificationName;
				}
				
				if(!this.texture){
					weui.alert("请选择材质或者输入材质！");
					return ;
				}
				
				if(this.texture  ){
					params['textureId'] = this.texture.textureId;
					params['textureName'] = this.texture.textureName;
				}
				
				if(this.width === null || this.width <= 0){
					weui.alert("请输入宽度,宽度必须大于0！");
					return ;
				}
				params['width'] = this.width;
				if(this.thickness  === null || this.thickness <= 0){
					weui.alert("请输入厚度，厚度必须大于0！");
					return ;
				}
				params['thickness'] = this.thickness;
				if(this.buyWeight === null || this.buyWeight <= 0){
					weui.alert("请输入重量,重量必须大于0！");
					return ;
				}
				params['buyWeight'] = this.buyWeight;
				
				var loading = weui.loading('保存中...', {
					   
				});
				var self = this;
				this.$http.post("../../ec/futures/addShopingCart",params).then(function(rs){
					 loading.hide(); 
					 var data = rs.data;
					 self.shopingCartCount = data.shopingCartCount;
					 weui.alert(data.msg);
					 return ;
				  }).catch(function(rs){
					  loading.hide();
					  weui.toast('网络异常，加入购物车失败!', 3000);
				  });
			},
			showAddPrice:function(){
				//$("#thickness-price").addClass("show");
				this.isShowAddPrice = true;
			},
			hideAddPrice:function(){
				this.isShowAddPrice = false;
			},
			//隐藏厚度加价输入对话框
			hideThicknessInputDialog:function(){
				this.thicknessInputDialog.isShowThicknessInputDialog = false;
			},
			//显示厚度加价输入对话框
			showThicknessInputDialog:function(){
				this.thicknessInputDialog.isShowThicknessInputDialog = true;
				this.thicknessInputDialog.selectedVal = '';
				this.thicknessInputDialog.inputVal = this.thickness;
			},
			//显示厚度加价输入对话框确定
			thicknessInputDialogOkBtn:function(){
				var check = this.checkThicknessVal();
				if(!check){
					return ;
				}
				
				this.thicknessInputDialog.isShowThicknessInputDialog = false;
				
				if(this.thicknessInputDialog.selectedVal && this.thicknessInputDialog.selectedVal != -1){
					this.thickness = this.thicknessInputDialog.selectedVal;
				}else{
					this.thickness = this.thicknessInputDialog.inputVal;
				}
				return ;
			},
			//校验宽度
			checkWidthVal:function(){
				var spn = this.getSpecificationName();
				if(!spn){
					weui.toast('请选择具体规格',3000);
					return ;
				}
				var width =this['width'];
				if(width === null){
					return ;
				}
				var  str = width.toString();
				var t = str.split("\.");
				if(t.length >1 && t[1].length > 0){
					this['width'] = this['width'].toFixed(0);
				}else if(str === ''){
					this['width'] = null;
					weui.toast('请输入合法数字!', 3000);
					return ;
				}
				
				var sp = spn.split("\*");
				if(sp.length !== 2){
					return ;
				}
				var cVal = sp[0];
				var  cwVal = null;
				//如果宽度是非数字
				if(isNaN(cVal)){
					if(cVal.indexOf("以上") > 0){
						cwVal = cVal.split("以上")[0];
						if(width < cwVal){
							this['width'] = null;
							weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
							return ;
						}
					}
					
					if(cVal.indexOf("以下") > 0){
						cwVal = cVal.split("以下")[0];
						if(width > cwVal){
							this['width'] = null;
							weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
							return ;
						}
					}
					  
					cwVal = cVal.split("-");
					//如果规格格式不是12-14这样的格式，就不校验
					if(cwVal.length !== 2 || isNaN(cwVal[0]) ||  isNaN(cwVal[1])){
						return ;
					}
					
					if(width < cwVal[0] || width > cwVal[1]){
						this['width'] = null;
						weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
						return ;
					}
				}else if(width != cVal){
					this['width'] = null;
					weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
					return ;
				}
				
				return ;
			},
			//校验厚度
			checkThicknessVal:function(){
				var spn = this.getSpecificationName();
				if(!spn){
					weui.toast('请选择具体规格',3000);
					return false;
				}
				var thickness =this.thicknessInputDialog.inputVal;
				if(thickness === null){
					return true;
				}
				var  str = thickness.toString();
				var t = str.split("\.");
				if(t.length >1 && t[1].length > 2){
					this.thicknessInputDialog.inputVal = this.thicknessInputDialog.inputVal.toFixed(2);
				}else if(str === ''){
					this.thicknessInputDialog.inputVal = null;
					weui.toast('请输入合法数字!', 3000);
					return false;
				}
				
				var sp = spn.split("\*");
				if(sp.length !== 2){
					return true;
				}
				var cVal = sp[1];
				//如果宽度是非数字
				if(isNaN(cVal)){
					var  cwVal = cVal.split("-");
					//如果规格格式不是12-14这样的格式，就不校验
					if(cwVal.length !== 2 || isNaN(cwVal[0]) ||  isNaN(cwVal[1])){
						return true;
					}
					
					if(thickness < cwVal[0] || thickness > cwVal[1]){
						this.thicknessInputDialog.inputVal = null;
						weui.toast('厚度必须按选择的规格输入，规格要求'+cVal, 3000);
						return false;
					}
				}else if(thickness != cVal){
					this.thicknessInputDialog.inputVal = null;
					weui.toast('厚度必须按选择的规格输入，规格要求'+cVal, 3000);
					return false;
				}
				
				return true;
			},
			checkNumberVal:function(prop,decimal){
				if(this[prop] === null ){
					return ;
				}
				var pv = this[prop];
				//没有输入值
				if(pv === null){
					return ;
				}
				var  str = this[prop].toString();
				var t = str.split(".");
				if(decimal >= 0 && t.length >1 && t[1].length > decimal){
					this[prop] = this[prop].toFixed(decimal);
				}else if(str === ''){
					this[prop] = null;
					weui.toast('请输入合法数字!', 3000);
				}
				return ;
			},
			toggelRecentlyBuyRecord:function(){
				this.isShowRecentlyBuyRecord = !this.isShowRecentlyBuyRecord;
				//DOM 还没有更新
				 Vue.nextTick(function(){
					 // DOM 更新了
					 window.scrollTo(0,document.body.scrollHeight);
				 });
			},
			//获取最近购物记录数据
			getRecentlyBuyRecordList:function(sellerId){
				var self = this;
				var param ={"sellerId":sellerId};
				this.$http.post("../../ec/futures/getRecentlyBuyRecord",param).then(function(rs){
					 var data = rs.data;
					 //没有最近购买数据就隐藏
					 if(data.length == 0){
						 self.isFullHideRecentlyBuyRecord = true;
						 return ;
					 }else{
						 self.isFullHideRecentlyBuyRecord = false;
					 }
					 self.recentlyBuyRecordList = data;
					//DOM 还没有更新
					 Vue.nextTick(function(){
						 // DOM 更新了
						 self.initSwiper();
					 });
					 return ;
				  }).catch(function(rs){
					  weui.toast('网络异常，获取最近购物记录失败!', 3000);
				  });
			},
			//最近买记录加到购物车
			recentAddShopCart:function(/*brandId,brandName,steelWorkId,steelWorkName,
					specificationName,textureId,textureName*/
					item){
				
				var params = {};
				if(!this.sellerMemberId){
					weui.alert("请选择卖家！");
					return ;
				}
				//d.brandName,d.brandNameDesc,d.placeSteel,d.placeSteelDesc,d.specification,d.texture,d.textureDesc
				params['sellerId'] = this.sellerMemberId;
				
				params['brandId'] = item.brandName;
				params['brandName'] = item.brandNameDesc;
			
				params['steelWorkId'] = item.placeSteel;
				params['steelWorkName'] = item.placeSteelDesc;
				
				params['specificationName'] = item.specification;
				
			   /* var  sp = specificationName.split('\*');
			    if(sp.length === 2  && !isNaN(sp[0]) && !isNaN(sp[1])){
			    	params['width'] = sp[0];
			    	params['thickness'] = sp[1];
			    }else if(sp.length === 1 && !isNaN(sp[0]) ){
			    	params['width'] = sp[0];
			    }*/
		
				params['textureId'] = item.texture;
				params['textureName'] = item.textureDesc;
				
				//params['buyWeight'] = buyWeight;
				
				var loading = weui.loading('保存中...', {
					   
				});
				var self = this;
				this.$http.post("../../ec/futures/addShopingCart",params).then(function(rs){
					 loading.hide(); 
					 item.isBuyed = true;
					 var data = rs.data;
					 self.shopingCartCount = data.shopingCartCount;
					 weui.alert(data.msg);
					 return ;
				  }).catch(function(rs){
					  loading.hide();
					  weui.toast('网络异常，加入购物车失败!', 3000);
				  });
			},
			  /**
		     * 初始化滑动模块
		     */
			initSwiper:function(){
		    	 //初始化滑动组件
		        var mySwiper = new Swiper(".swiper-container", {
		    	    direction: 'horizontal', //水平滑动
		    	    loop: false, //当前为最后panel时不可再往后滑动
		    	    autoplay: 30000, //自动轮播时间（毫秒）
		    	    autoplayDisableOnInteraction: false, //用户操作swiper之后，不禁止autoplay
		    	    pagination: ".swiper-pagination" //分页器样式
		    	});
		    },
		    hideSwiperContainer:function(event){
		    	
		    }
			
		}
	});


});