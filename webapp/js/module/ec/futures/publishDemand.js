define(function(require, exports, module) {
	//组件样式
    require("../../../swiper/swiper.min.css");
    var Swiper = require("../../../swiper/swiper.min");
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
			brand:null,//当前选择的品名
			steelWork:null,//当前选择的钢厂
			otherSteelWork:null,//当选择其它钢厂时输入的钢厂名
			specification:null,//当前选择的规格
			otherSpecification:null,//当选择其他规格
			texture:null,//当前选择的材质
			otherTexture:null,//当选择其他材质
			width:null,//宽度
			thickness:null,//厚度
			buyWeight:null,//购买重量
			listSellers:[],//卖家会员列表
			listBigBrands:[],//品名复合列表对象
			sellerPlaceSteelList:[],//卖家所有金钢厂
			sellerSpecificationList:[],//卖家所有规格
			sellerTextureList:[],//卖家所有材质
			thicknessBrand:null,//查看厚度加价时选择的品名
			thicknessSteelWork:null,//查看厚度加价时选择的钢厂
			thicknessSpecification:null,//查看厚度加价时选择的规格
			isShowAddPrice:false,//是否显示厚度加价
			recentlyBuyRecordList:[],//最近购物记录
			isFullHideRecentlyBuyRecord:false,//是否完全隐藏最近购买记录，当没有最近购物记录时隐藏
			isShowRecentlyBuyRecord:false//是否显示最近购买记录
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
						 list.push({
							 'id':null,
							 'steelWorkId':null,
							 'steelWorkName':'其他'
						 });
					}
					return list;
			},
			listOtherSteelWorks:function(){
				var list = [];
				list.push({
					'id':null,
					'steelWorkId':null,
					'steelWorkName':'请选择'
				});
				this.sellerPlaceSteelList.forEach(function(e,index){
					list.push({
						'id':index,
						'steelWorkId':e.placeSteelId,
						'steelWorkName':e.placeSteelName
					});
				});
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
								  'specificationName':e.specificationName  
							 });
						 });
						list.push({
							  'specificationId':null,
							  'specificationName':'其他'  
						 });
					}
					return list;	
			},
			//卖家其他规格列表
			listOtherSpecifications:function(){
					var list = [];
					var self = this;
					if(this.brand){
						list.push({
							  'specificationId':null,
							  'specificationName':'请选择' 
						 });
						this.sellerSpecificationList.forEach(function(e){
							if(self.brand.brandId.valueOf() === Number(e.brandId).valueOf() ){
								list.push({
									  'specificationId':e.specificationId,
									  'specificationName':e.specificationName  
								 });
							}
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
								  'specificationName':e.specificationName  
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
						list.push({
							  'id':null,
							  'textureId':null,
							  'textureName':'其他',
							  'specificationId':null
						 });
					}
					return list;
			},
			//材质
			listOtherTextures:function(){
					var list = [];
					var self = this;
					if(this.brand){
						list.push({
							  'id':null,
							  'textureId':null,
							  'textureName':'请选择',
							  'specificationId':null
						 });
						this.sellerTextureList.forEach(function(e,index){
							 if(self.brand.brandId.valueOf() == Number(e.barndCode).valueOf() ){
								 list.push({
									  'id':index,
									  'textureId':e.textureId,
									  'textureName':e.textureName,
									  'specificationId':null
								 });
							 }
						 });
						
					}
					return list;
			},
			//材质
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
				this.getRecentlyBuyRecordList(newSellerMemberId);
			},
			brand:function(newBrand){
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
			steelWork:function(newSteelWork){
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
			specification:function(newSpecification){
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
			thicknessSteelWork:function(newSteelWork){
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

					 self.shopingCartCount = data.shopingCartCount;
					 self.listBigBrands = data.brandList;
					 self.sellerPlaceSteelList = data.sellerPlaceSteelList;
					 self.sellerSpecificationList = data.sellerSpecificationList;
					 self.sellerTextureList = data.sellerTextureList;
					 self.setDefaultBrand();
					  
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
			setOtherSteelWork:function(event){
				var target = event.target;
				var steelWork  = JSON.parse(target.value);
				this.otherSteelWork = steelWork;
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
			setOtherSpecification:function(event){
				 var t = event.target;
				 var specification = JSON.parse(t.value);
				 this.otherSpecification = specification;
			},
			setThicknessSpecification:function(event){
				var specification = JSON.parse(event.target.value);
				this.thicknessSpecification = specification;
			},
			setTexture:function(texture){
				this.texture = texture;
			},
			setOhterTexture:function(event){
				 var t = event.target;
				 var texture = JSON.parse(t.value);
				 this.ohterTexture = texture;
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
				if(this.specification && this.specification.specificationName !== '其他' ){
					sp = this.specification;
				}else {
					sp = this.otherSpecification;
				}
				return sp;
			},
			//获取规格名称
			getSpecificationName:function(){
				var sp = this.getSepecification();
				if(!sp || sp.specificationName=== '请选择'){
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
				}else if(this.steelWork && this.steelWork.steelWorkName === '其他' 
					&& (!this.otherSteelWork 
							|| this.otherSteelWork.steelWorkName === '请选择'
							|| this.otherSteelWork.steelWorkName === '')){
					weui.alert("请选择其他钢厂！");
					return ;
				}
				if(this.steelWork && this.steelWork.steelWorkName !== '其他' ){
					params['steelWorkId'] = this.steelWork.steelWorkId;
					params['steelWorkName'] = this.steelWork.steelWorkName;
	
				}else {
					params['steelWorkId'] = this.otherSteelWork.steelWorkId;;
					params['steelWorkName'] = this.otherSteelWork.steelWorkName;
				}
				
				if(!this.specification){
					weui.alert("请选择规格！");
					return ;
				}else if(this.specification && this.specification.specificationName === '其他' 
					&& (!this.otherSpecification ||this.otherSpecification.specificationName === ''
						|| this.otherSpecification.specificationName === '请选择')){
					weui.alert("请选择其他规格！");
					return ;
				}
				
				if(this.specification && this.specification.specificationName !== '其他' ){
					params['specificationId'] = this.specification.specificationId;
					params['specificationName'] = this.specification.specificationName;
				}else {
					params['specificationId'] = this.otherSpecification.specificationId;
					params['specificationName'] = this.otherSpecification.specificationName;
				}
				
				if(!this.texture){
					weui.alert("请选择材质或者输入材质！");
					return ;
				}else if(this.texture && this.texture.textureName === '其他' 
					&& (!this.otherTexture 
						|| this.otherTexture.textureName === ''
						||this.otherTexture.textureName === '请选择')){
					weui.alert("请选择其他材质！");
					return ;
				}
				
				if(this.texture && this.texture.textureName !== '其他' ){
					params['textureId'] = this.texture.textureId;
					params['textureName'] = this.texture.textureName;
				}else {
					params['textureId'] = this.otherTexture.textureId;
					params['textureName'] = this.otherTexture.textureName;
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
			//校验宽度
			checkWidthVal:function(){
				var spn = this.getSpecificationName();
				if(!spn){
					weui.toast('请选择具体规格',3000);
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
				//如果宽度是非数字
				if(isNaN(cVal)){
					if(cVal.indexOf("以上") > 0){
						var  cwVal = cVal.split("以上")[0];
						if(width < cwVal){
							this['width'] = null;
							weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
							return ;
						}
					}
					
					if(cVal.indexOf("以下") > 0){
						var  cwVal = cVal.split("以下")[0];
						if(width > cwVal){
							this['width'] = null;
							weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
							return ;
						}
					}
				}else if(width != cVal){
					this['width'] = null;
					weui.toast('宽度必须按选择的规格输入，规格要求'+cVal, 3000);
					return ;
				}
				
				return ;
			},
			//校验宽度
			checkThicknessVal:function(){
				var spn = this.getSpecificationName();
				if(!spn){
					weui.toast('请选择具体规格',3000);
				}
				var thickness =this['thickness'];
				if(thickness === null){
					return ;
				}
				var  str = thickness.toString();
				var t = str.split("\.");
				if(t.length >1 && t[1].length > 2){
					this['thickness'] = this['thickness'].toFixed(2);
				}else if(str === ''){
					this['thickness'] = null;
					weui.toast('请输入合法数字!', 3000);
					return ;
				}
				
				var sp = spn.split("\*");
				if(sp.length !== 2){
					return ;
				}
				var cVal = sp[1];
				//如果宽度是非数字
				if(isNaN(cVal)){
					var  cwVal = cVal.split("-");
					//如果规格格式不是12-14这样的格式，就不校验
					if(cwVal.length !== 2 || isNaN(cwVal[0]) ||  isNaN(cwVal[1])){
						return ;
					}
					
					if(thickness < cwVal[0] || thickness > cwVal[1]){
						this['thickness'] = null;
						weui.toast('厚度必须按选择的规格输入，规格要求'+cVal, 3000);
						return ;
					}
				}else if(thickness != cVal){
					this['thickness'] = null;
					weui.toast('厚度必须按选择的规格输入，规格要求'+cVal, 3000);
					return ;
				}
				
				return ;
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
			recentAddShopCart:function(brandId,brandName,steelWorkId,steelWorkName,
					specificationName,textureId,textureName,
					buyWeight){
			
				var params = {};
				if(!this.sellerMemberId){
					weui.alert("请选择卖家！");
					return ;
				}
				params['sellerId'] = this.sellerMemberId;
				
				params['brandId'] = brandId;
				params['brandName'] = brandName;
			
				params['steelWorkId'] = steelWorkId;
				params['steelWorkName'] = steelWorkName;
			
				params['specificationName'] = specificationName;
				
			    var  sp = specificationName.split('\*');
			    if(sp.length == 2){
			    	params['width'] = sp[0];
			    	params['thickness'] = sp[1];
			    }
		
				params['textureId'] = textureId;
				params['textureName'] = textureName;
				
				//params['buyWeight'] = buyWeight;
				
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