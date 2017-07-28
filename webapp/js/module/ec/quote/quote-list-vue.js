define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	var queryData = {};
	var jq = require("jquery");
	var wx = require("jweixin");
	var loading = weui.loading('正在加载...', {className: 'custom-classname'});
	
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			disTricts:[],
			futuresList:[],
			queryForm:null,
			areaList:[],
			currentCity:null,
			sellerMemberId:null,//卖家会员号
			sellerMemberName:null,//卖家会员号
			brandId:0,//初始化时品名id
			saerchBrandId:null,//查询时用的品名id
			brandName:null,//当前选择的品名
			brandList:[],
			bigSteelWorkList:[],
			steelWorkList:[],
			bigSpecificationList:[],
			specificationList:[],
			freightQuoteList:[],//运费报价
			steelWorkId:null,//当前选择的钢厂
			steelWork:null,//当前选择的钢厂
			provinceName:null,
			city:null,
			areaName:null,
			priceType:0,
			addPirce:[],
			bigAddPriceList:[],//厚度加价规则
			addPriceList:[],//厚度加价
			listSellers:[],//卖家会员列表
			listBigBrands:[],//品名复合列表对象
			
			thicknessBrand:null,//查看厚度加价时选择的品名
			thicknessSteelWork:null,//查看厚度加价时选择的钢厂
			thicknessSpecification:null,//查看厚度加价时选择的规格
			isShowAddPrice:false,//是否显示厚度加价
			page: {
				totalPage: 1,
				pageSize: 10,
				pageNo: 1,
				list: []
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
						 list.push({
							 'id':null,
							 'steelWorkId':null,
							 'steelWorkName':'其他'
						 });
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
		methods: {
			showPublishDemand:function(){
				window.location.href="../futures/publishDemand";
			},
			closeAddPriceView: function(e) {
				$("#addprice").children().removeClass("m-quote-addprice-show").addClass("m-quote-addprice-close");
				setTimeout(function(){$("#addprice").addClass("hide")},200);
			},
			stopCloseAddPriceView: function(e) {
				e.stopPropagation();
			},
			showTransportFeeView: function(sellerId) {
				queryVue.addPrice.forEach(function(obj,index){
					if (sellerId == obj.memberId) {
						queryVue.freightQuoteList = obj.freightQuoteList;
					}
				});
				if (queryVue.freightQuoteList.length > 0) {
					$("#transportFee").removeClass("hide");
					setTimeout(function(){$("#transportFee").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
				} else {
					alert("所选卖家没有设置运费加价！");
				}
			},
			closeTransportFeeView: function(e) {
				$("#transportFee").children().removeClass("m-quote-transportfee-show").addClass("m-quote-transportfee-close");
				setTimeout(function(){$("#transportFee").addClass("hide")},200);
			},
			stopCloseTransportFeeView: function(e) {
				e.stopPropagation();
			},
			searchQuoteList:function(e){
				$("#searchQuoteList").removeClass("hide");
				setTimeout(function(){$("#searchQuoteList").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
			},
			closeSaerchView:function(e){
				$("#searchQuoteList").children().addClass("m-quote-transportfee-close").removeClass("m-quote-transportfee-show");
				setTimeout(function(){$("#searchQuoteList").addClass("hide")},200);
			},
			stopCloseSaerchView:function(e){
				e.stopPropagation();
			},
			chooseSeller:function(e){
	            $('#sellerActionsheet').animate({opacity: 1,display:''}, 200,'');
			},
			chooseBrandName:function(e){
	            $('#brandNameActionsheet').animate({opacity: 1,display:''}, 200,'');
			},
			brandNamePick:function(e){
				//$("#brandName").html($(e.target).html())
				this.brandName = $(e.target).html();
				$("#brandName").attr("data-brand-id",$(e.target).attr("data-brand-id"));
				$('#brandNameActionsheet').animate({opacity: 0,display:'none'}, 200,'');
			},
			closeBrandName:function(e){
				$('#brandNameActionsheet').animate({opacity: 0,display:'none'}, 200,'');
			},
			chooseQuoteType:function(e){
	            $('#quoteTypeActionsheet').animate({opacity: 1,display:''}, 200,'');
			},
			sellerPick:function(e){
				this.sellerMemberName = $(e.target).html();
				this.sellerMemberId = $(e.target).attr("data-sell-id");
				$('#sellerActionsheet').animate({opacity: 0,display:'none'}, 200,'');
			},
			closeSellerPick:function(e){
				$('#sellerActionsheet').animate({opacity: 0,display:'none'}, 200,'');
			},
			showAddPrice:function(sellerId){
				queryVue.addPrice.forEach(function(obj,index){
					if (sellerId == obj.memberId) {
						queryVue.brandList = obj.brandList;
						queryVue.bigSteelWorkList = obj.steelList;
						queryVue.steelWorkList = obj.steelList[0];
						queryVue.bigSpecificationList = obj.specificationList;
						queryVue.specificationList = obj.specificationList[0];
						queryVue.bigAddPriceList = obj.addPriceList;
						queryVue.addPriceList = obj.addPriceList[0];
					}
				});
				if (queryVue.brandList.length == 0 && queryVue.steelWorkList && queryVue.addPriceList) {
					alert("所选卖家没有设置厚度加价！");
				} else {
					$("#addprice").removeClass("hide");
					setTimeout(function(){$("#addprice").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
				}
			},
			hideAddPrice:function(e){
				this.isShowAddPrice = false;
			},
			setThicknessSpecification:function(event){
				var specification = JSON.parse(event.target.value);
				this.thicknessSpecification = specification;
			},
			setThicknessSteelWork:function(event){
				 var t = event.target;
				 var self = this;
				 self.addPriceList = [];
				 self.specificationList = [];
				 var steelWork = JSON.parse(t.value);
				 self.thicknessSteelWork = steelWork;
				 self.bigSpecificationList.forEach(function(obj,index){
						if (obj.length > 0 && steelWork.id == obj[0].steelWorkId) {
							self.specificationList = obj;
						}
				 });
				 self.bigAddPriceList.forEach(function(obj,index){
						if (obj.length > 0 && self.specificationList.length > 0 && self.specificationList[0].specificationId == obj[0].specificationId) {
							self.addPriceList = obj;
						}
					});
			},
			setThicknessSpecification:function(event){
				var self = this;
				self.addPriceList = [];
				var specification = JSON.parse(event.target.value);
				self.thicknessSpecification = specification;
				self.bigAddPriceList.forEach(function(obj,index){
					if (obj.length > 0 && specification.specificationId == obj[0].specificationId) {
						self.addPriceList = obj;
					}
				});
			},
			//获取卖家列表
			getListSellers:function(){
			   var self = this;
			   this.$http.post("../../ec/futures/getSellerMemberList").then(function(rs){
					  var data = rs.data;
					  if(data.length>0){
						  //选择第一个作为显示
						  self.sellerMemberId = 0;
						  self.sellerMemberName = "不限";
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
			getAreaList:function(){
			   var self = this;
			   this.$http.post("../../preorder/address/getAreaData").then(function(rs){
					  var data = rs.data.data;
					  self.disTricts = data;
					  return ;
				  }).catch(function(rs){
					  weui.toast('网络异常!', 3000);
				  });
			},
			getBrandList:function(){
			   var self = this;
			   this.$http.post("../../ec/quote/getBrandData").then(function(rs){
					  var data = rs.data;
					  self.brandList = data.brandList;
					  self.brandName = '不限';
//					  self.brandName = data.brandList[0].brandName;
					  self.brandId = 0;
					  return ;
				  }).catch(function(rs){
					  weui.toast('网络异常!', 3000);
				  });
			},
			searchQuoteListData:function(){
				var self = this;
				var sellerId = $("#seller").attr("sellerMemberId");
				var brandId = $("#brandName").attr("data-brand-id");
				var brandName = $("#brandName").html();
				var priceType = $("#quoteType").attr("priceType");
				var loading = weui.loading('正在加载...', {className: 'custom-classname'});
				var provinceName = $("#city").attr("province");
				var cityName = $("#city").attr("city");
				var areaName = $("#city").attr("areaName");
				var address = "";
				if (provinceName == cityName) {//
		        	address = provinceName + areaName;
		        } else {
		        	address = provinceName + cityName + areaName;
		        }
				this.$http.post("getQuoteListData",{'memberId':sellerId,'priceType':priceType,'provinceName':provinceName,'cityName':cityName,'areaName':areaName,'brandId':brandId,'brandName':brandName},{emulateJSON:true}).then(function(data){
					queryVue.futuresList = data.data.futuresList;
		        	queryVue.queryForm = data.data.queryForm;
		        	queryVue.brandNme = queryVue.queryForm.brandName;
		        	queryVue.addPrice = data.data.addPrice;
		        	queryVue.currentCity = address;
		        	loading.hide();
		       // 	self.closeSaerchView();
			  }).catch(function(rs){
				  weui.toast('网络异常!', 3000);
			  });
			},
			setThicknessBrand:function(e){
				var self = this;
				var t = e.target;
				self.steelWorkList = [];
				self.specificationList = [];
				self.addPriceList = [];
				var brand = JSON.parse(t.value);
				self.thicknessBrand = brand;
				self.bigSteelWorkList.forEach(function(obj,index){
					if (obj.length > 0 && brand.id == obj[0].brandId) {
						self.steelWorkList = obj;
					}
				});
				self.bigSpecificationList.forEach(function(obj,index){
					if (obj.length > 0 && brand.id == obj[0].brandId) {
						self.specificationList = obj;
					}
				});
				self.bigAddPriceList.forEach(function(obj,index){
					if (obj.length > 0 && brand.id == obj[0].brandId) {
						self.addPriceList = obj;
					}
				});
			},
			toPreOrder:function(){
				var quoteIds = [];
				var listingIds = [];
				var memberIds = [];
				var priceTypes = [];
				var memberId = null;
				var flag = true;
				$("#g-content tbody tr").each(function(index,obj){
					if ($(obj).find("input").prop("checked")) {
						memberIds.push($(obj).find("input").attr("memberId"));
						if ("qh" == $(obj).find("input").attr("data-type")) {
							quoteIds.push($(obj).find("input").val());
						} else if ("xh" == $(obj).find("input").attr("data-type")) {
							listingIds.push($(obj).find("input").val());
							priceTypes.push($(obj).find("input").attr("price-type"));
						}
					}
				});
				var priceType = null;
				priceTypes.forEach(function(obj,index){
					if (index == 0){
						priceType = obj;
					}
					if (priceType != obj) {
						flag = false;
					}
				});
				memberIds.forEach(function(obj,index){
					if (index == 0){
						memberId = obj;
					}
					if (memberId != obj) {
						flag = false;
					}
				});
				if (flag && (quoteIds.length > 0 || listingIds.length > 0)) {
					window.location.href="../shopcart/toOrderPage?quoteIds=" + quoteIds + "&memberId=" + memberId +"&listingIds="+listingIds;
				} else {
					alert("请选择同一卖家的资源下单！现货资源报价类型须相同！")
				}
			},
			chooseDistrict:function(){
				var self = this;
				var data = self.disTricts;
				var defaultValue = [];
				var provinceName = self.provinceName;
				var city = self.city;
				var areaName = self.areaName;
				self.disTricts.forEach(function(obj,index){
					if(obj.label == provinceName) {
						defaultValue.push(obj.value);
						obj.children.forEach(function(child,index1){
							if (child.label == city) {
								defaultValue.push(child.value);
								child.children.forEach(function(cc,index2){
									if (cc.label == areaName) {
										defaultValue.push(cc.value);
									}
								});
							}
						});
					}
				});
				weui.picker(data, {
				     className: 'custom-classname',
				     defaultValue: defaultValue,
				     onChange: function (result) {
				     },
				     onConfirm: function (result) {
				     	if (result.length == 3) {
				     		self.currentCity = result[0].label+result[1].label+result[2].label;
				     		self.provinceName = result[0].label;
				     		self.city = result[1].label;
				     		self.areaName = result[2].label;
				     		var address = "";
				     		if (self.provinceName == self.city) {
				     			address = self.provinceName + self.areaName;
				     		} else {
				     			address = self.provinceName + self.city + self.areaName;
				     		}
				     		self.currentCity = address;
				     	} else {
				     		$("#city").html(result[0].label+result[1].label);
				     	}
				     },
				     id: 'doubleLinePicker'
				 });
			}
		},
		created:function(){
			this.getListSellers();
			this.getAreaList();
			this.getBrandList();
		},
		watched:{
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
			},
			
		}
	});
	
	
	$('#quoteTypeActionsheet').find('.weui-mask').on("click",function(e){
		$('#quoteTypeActionsheet').animate({opacity: 0,display:'none'}, 200,'');
	});
	$('#quoteTypeActionsheet').find('.weui-actionsheet__cell').on("click",function(e){
	    $("#quoteType").html($(e.target).html())
	    $("#quoteType").attr("priceType",$(e.target).attr("data-price-type"));
		$('#quoteTypeActionsheet').animate({opacity: 0,display:'none'}, 200,'');
	});
	var geocoder = new qq.maps.Geocoder({
        complete : function(result){
	        var obj = result.detail.addressComponents;
	        var brandId = 0;
	        var priceType = 0;
	        var province = "";
	        if (obj.province.indexOf("省") > 0) {
	         province = obj.province.substring(0,obj.province.indexOf("省"));
	        } else if (obj.province.indexOf("市") > 0) {
	         province = obj.province.substring(0,obj.province.indexOf("市"));
	        } else {
	        	if (obj.province.indexOf("内蒙古") > 0) {
		         province = obj.province.substring(0,3);
	        	} else {
		         province = obj.province.substring(0,2);
	        	}
	        }
	        var city = obj.city.substring(0,obj.city.indexOf("市"));
	        var district = obj.district;
	        queryData.priceType = priceType;
	        queryData.provinceName = province;
	        queryVue.provinceName = province;
	        queryVue.city = city;
	        queryVue.areaName = district;
	        queryData.cityName = city;
	        queryData.areaName = district;
	        queryData.brandId = brandId;
	        var address = "";
	        if (province == city) {//
	        	address = province + district;
	        } else {
	        	address = province + city + district;
	        }
	        var loading = weui.loading('正在加载...', {className: 'custom-classname'});
	        /* 首次根据自动获取地区查询报价单*/
	        queryVue.$http.post("getQuoteListData",{'memberId':0,'priceType':queryData.priceType,'provinceName':queryData.provinceName,'cityName':queryData.cityName,'areaName':queryData.areaName,'brandId':queryData.brandId},{emulateJSON:true}).then(function(data){
	        	queryVue.futuresList = data.data.futuresList;
	        	queryVue.queryForm = data.data.queryForm;
	        	queryVue.addPrice = data.data.addPrice;
	        	queryVue.currentCity = address;
	        	loading.hide();
			}).catch(function(rs){
				weui.toast('网络异常!', 3000);
			});
        }
    });
	var url = window.location.href;
	jq.getJSON("../../../getSignUrl",{"url":url},function(data, status, xhr){
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appId, // 必填，公众号的唯一标识
		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: ['getLocation','hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
		});
		wx.ready(function(){
			wx.getLocation({
			    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			    success: function (res) {
			        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			        var speed = res.speed; // 速度，以米/每秒计
			        var accuracy = res.accuracy; // 位置精度
	             	var lat = parseFloat(latitude);
			    	var lng = parseFloat(longitude);
			    	//var latLng = new qq.maps.LatLng(lat, lng);
			    	//var latLng = new qq.maps.LatLng(39.0851, 117.19937);//天津河西区
			    	var latLng = new qq.maps.LatLng(39.1282700000,117.2522800000);//天津河东区
			    	//var latLng = new qq.maps.LatLng(38.4711700000,106.2586700000);//宁夏回族自治区
			   	 	geocoder.getAddress(latLng);
			    }
			});
		});
	});
});
