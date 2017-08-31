define(function(require, module, exports) {
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	var wx = require("jweixin");
	var sellerId = getParam();//获取卖家id，判断是否通过微信推送链接进入
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			queryData:{
				memberId:0,
				brandId:0,
				brandName:"不限",
				priceType:0,
				priceTypeStr:'不限',
				provinceName:"",
				cityName:"",
				memberId:0,//卖家会员号
				sellerName:'不限'//卖家会员号
			},
			internetAddress:null,
			disTricts:[],
			futuresList:[],
			areaList:[],
			currentCity:null,
			brandList:[],
			bigSteelWorkList:[],
			steelWorkList:[],
			bigSpecificationList:[],
			specificationList:[],
			freightQuoteList:[],//运费报价
			steelWorkId:null,//当前选择的钢厂
			steelWork:null,//当前选择的钢厂
			chooseAreaSetId:"",//选择地区时保存的地区id
			areaSetId:"",//查询资源时的地区id，用于查询资源用的
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
				var storage = window.localStorage;
				if(storage.getItem('_default_check_query_storage') != null && storage.getItem('_default_check_query_storage') != 'null'){ 
					this.queryData = JSON.parse(storage.getItem('_default_check_query_storage')); 
				}
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
				this.queryData.brandName = $(e.target).html();
				this.queryData.brandId = $(e.target).attr("data-brand-id");
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
				this.queryData.memberId = $(e.target).attr("data-sell-id");
				this.queryData.sellerName = $(e.target).html();
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
						  if (self.queryData.memberId == 0) {
							  self.queryData.memberId = 0;
							  self.queryData.sellerName = "不限";
						  }
					  }
					  self.listSellers = [];
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
			   this.$http.post("../../preorder/address/getCityData").then(function(rs){
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
					  return ;
				  }).catch(function(rs){
					  weui.toast('网络异常!', 3000);
				  });
			},
			searchQuoteListData:function(type){
				var self = this;
				var storage = window.localStorage;
				var storageStr = JSON.stringify(self.queryData);
				if ($("#defaultCheck").prop("checked")) {
			         storage.setItem('_default_check_query_storage', storageStr);   
				} else {
					storage.setItem('_default_check_query_storage',null);
				}
				var data = self.queryData;
				//var loading = weui.loading('正在加载...', {className: 'custom-classname'});
				self.closeSaerchView();
				self.query(data);
			},
			query:function(data){
				var self = this;
				data.spotgoods = [];
				data.quoteLists = [];
				self.getListSellers();
				self.getAreaList();
				self.getBrandList();
				var loading = weui.loading('正在加载...', {className: 'custom-classname'});
				self.$http.post("getQuoteListData",data,{emulateJSON:true}).then(function(data){
					self.futuresList = data.data.futuresList;
		        	self.queryData = data.data.queryForm;
		        	if (self.queryData.priceType == 0) {
		        		self.queryData.priceTypeStr = '不限';
		        	} else if (self.queryData.priceType == 1) {
		        		self.queryData.priceTypeStr = '自提价';
		        	}else if (self.queryData.priceType == 2) {
		        		self.queryData.priceTypeStr = '配送价';
		        	}else if (self.queryData.priceType == 3) {
		        		self.queryData.priceTypeStr = '出厂价';
		        	}
		        	self.addPrice = data.data.addPrice;
		        	loading.hide();
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
				var cityNames = [];
				var areaSetIds = [];
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
							cityNames.push($(obj).find("input").attr("cityName"));
							areaSetIds.push($(obj).find("input").attr("areaSetId"));
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
				var areaSetId = null;
				areaSetIds.forEach(function(obj,index){
					if (index == 0){
						areaSetId = obj;
					}
					if (areaSetId != obj) {
						flag = false;
					}
				});
				if (flag && (quoteIds.length > 0 || listingIds.length > 0)) {
					var loading = weui.loading('请稍后...');
					var params = {
							'quoteIds':quoteIds,
							'listingIds':listingIds
					};
					
					this.$http.post("checkRes",params,{emulateJSON:true}).then(function(rs){
						var data = rs.data;
						if(data.success){
							var type = priceTypes[0] == "2"?"bps":"zt";
							window.location.href="../shopcart/toOrderPage?quoteIds=" + quoteIds + "&memberId=" + memberId +"&listingIds="+listingIds+"&areaSetId="+areaSetId+"&cityName="+cityNames[0]+"&type="+type;
						}else{
							weui.alert(data.msg);
						}
						return ;
					},function(error){
					  weui.toast('网络异常!', 3000);
				  }).catch(function(rs){
				  }).finally(function(){
					loading.hide();
				  });
				} else {
					alert("请选择同一卖家的资源下单！现货资源报价类型、配送地须相同！")
				}
			},
			chooseDistrict:function(){
				var self = this;
				var data = self.disTricts;
				var defaultValue = [];
				var provinceName = self.queryData.provinceName;
				var city = self.queryData.cityName;
				//var areaName = self.areaName;
				self.disTricts.forEach(function(obj,index){
					if(obj.label == provinceName) {
						defaultValue.push(obj.value);
						obj.children.forEach(function(child,index1){
							if (child.label == city) {
								defaultValue.push(child.value);
//								child.children.forEach(function(cc,index2){
//									if (cc.label == areaName) {
//										defaultValue.push(cc.value);
//									}
//								});
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
				     	if (result.length == 2) {
				     		self.queryData.provinceName = result[0].label;
				     		self.queryData.cityName = result[1].label;
				     		if (result[0].label == result[1].label) {
				     			self.currentCity = result[0].label;
				     		} else {
				     			self.currentCity = result[0].label + result[1].label;
				     		}
				     	}
				     },
				     id: 'doubleLinePicker'
				 });
			},
			closeQuoteTypeActionsheet:function(e){
				$('#quoteTypeActionsheet').animate({opacity: 0,display:'none'}, 200,'');
			},
			chooseQuoteTypeActionsheet:function(e){
				//$("#quoteType").html($(e.target).html())
				this.queryData.priceType = $(e.target).attr("data-price-type");
				this.queryData.priceTypeStr = $(e.target).html();
				$('#quoteTypeActionsheet').animate({opacity: 0,display:'none'}, 200,'');
			}
		},
		created:function(){
			this.queryData.memberId = sellerId;
			var self = this;
				var geocoder = new qq.maps.Geocoder({
			        complete : function(result){
				        var obj = result.detail.addressComponents;
//				        var brandId = 0;
//				        var priceType = 0;
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
				        //self.queryData.priceType = priceType;
				        //self.queryData.priceTypeStr = '不限';
				        self.queryData.provinceName = province;
				        self.queryData.cityName = city;
				        //self.queryData.brandId = brandId;
				        //self.queryData.brandName = '不限';
				        if (province == city) {
				        	self.currentCity = province;
				        } else {
				        	self.currentCity = province + city;
				        }
				        if (self.queryData.memberId == 0) {
				        	var storage = window.localStorage;
							if (storage.getItem('_default_check_query_storage') != null && storage.getItem('_default_check_query_storage') != "null") {
						        var data = JSON.parse(storage.getItem('_default_check_query_storage'));   
						        self.queryData = data;
						        if (self.queryData.provinceName == self.queryData.cityName) {
						        	self.currentCity = self.queryData.provinceName;
						        } else {
						        	self.currentCity = self.queryData.provinceName + self.queryData.cityName;
						        }
						        self.query(data);
							} else {
								var data = self.queryData;
								self.query(data);
							}
				        } else {
					        self.queryData.provinceName = province;
					        self.queryData.cityName = city;
					       // self.currentCity = '全部';
					        var data = self.queryData;
							self.query(data);
						}
			        }
			    });
				var url = window.location.href;
				$.ajax({url:"../../../getSignUrl",
						  data:{"url":url},
						  success:function(data, status, xhr){
							var data = JSON.parse(data);
							self.internetAddress = JSON.parse(data.internetAddress);
							wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId: data.appId, // 必填，公众号的唯一标识
							    timestamp: data.timestamp , // 必填，生成签名的时间戳
							    nonceStr: data.nonceStr, // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名
							    jsApiList: ['getLocation','hideAllNonBaseMenuItem','openLocation'] // 必填，需要使用的JS接口列表
							});
							wx.checkJsApi({
							    jsApiList: ['getLocation','openLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
							    success: function(res) {
							        // 以键值对的形式返回，可用的api值true，不可用为false
							        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
							    	if (res.checkResult.getLocation =="no") {//pc版微信不支持获取地理位置接口，暂定不查询报价信息，改查询基础数据，后续有时间研究根据ip获取用户所在城市
							    		var province = self.internetAddress.data.region;
								        if (province.indexOf("省") > 0) {
								           province = province.substring(0,province.indexOf("省"));
								        } else if (province.indexOf("市") > 0) {
								           province = province.substring(0,province.indexOf("市"));
								        } else {
								        	if (province.indexOf("内蒙古") > 0) {
									         province = province.substring(0,3);
								        	} else {
									         province = province.substring(0,2);
								        	}
								        }
								        var city = self.internetAddress.data.city;
								        city = city.substring(0,city.indexOf("市"));
							    		self.queryData.provinceName = province;
								        self.queryData.cityName = city;
								        if (province == city) {
								        	self.currentCity = province;
								        } else {
								        	self.currentCity = province + city;
								        }
							    		self.query(self.queryData);
//							    		self.getListSellers();
//										self.getAreaList();
//										self.getBrandList();
							    	}
							    }
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
								    	var latLng = new qq.maps.LatLng(lat, lng);
								   	 	geocoder.getAddress(latLng);
								    },
								    cancel: function (res) {  
								        alert('用户拒绝授权获取地理位置');
								    }
								});
		//						loading.hide();
								wx.error(function (res) {  
									  alert("调用微信jsapi返回的状态:"+res.errMsg);  
								}); 
							});
						}
				});
		},
		watched:{
//			brand:function(newBrand){
//				this.steelWork = null;
//				this.specification = null;
//				this.texture = null;
//				var list = this.listSteelWorks;
//				if(list.length >0){
//					this.steelWork = list[0];
//				}
//				list = this.listSpecifications;
//				if(list.length > 0){
//					this.specification = list[0];
//				}
//				list = this.listTextures;
//				if(list.length > 0){
//					this.texture = list[0];
//				}
//				//厚度加价
//				this.thicknessSteelWork = null;
//				this.thicknessSpecification = null;
//				list = this.listThicknessSteelWorks;
//				if(list.length > 0){
//					this.thicknessSteelWork = list[0];
//				}
//				list = this.listThicknessSpecifications;
//				if(list.length > 0){
//					this.thicknessSpecification = list[0];
//				}
//				
//			},
//			thicknessBrand:function(){
//				//厚度加价
//				this.thicknessSteelWork = null;
//				this.thicknessSpecification = null;
//				var list = this.listThicknessSteelWorks;
//				if(list.length > 0){
//					this.thicknessSteelWork = list[0];
//				}
//				list = this.listThicknessSpecifications;
//				if(list.length > 0){
//					this.thicknessSpecification = list[0];
//				}
//			},
//			thicknessSteelWork:function(newSteelWork){
//				this.thicknessSpecification = null;
//				var list = this.listThicknessSpecifications;
//				if(list.length > 0){
//					this.thicknessSpecification = list[0];
//				}
//			},
			
		}
	});
	function getParam() {
		var url = window.location.href;
		if (url.indexOf("=") == -1) {
			return 0;
		} else {
			return url.substring(url.indexOf("=")+1);
		}
	}
});
