define(function(require, module, exports) {
	var Vue = require("vue");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var quoteIds = getParams("quoteIds");// 期货报价单id串
	var memberId = getParams("memberId");// 卖家会员id
	var areaSetId = getParams("areaSetId");// 资源区域id
	var listingIds = getParams("listingIds");// 现货资源id串
	var type = getParams("type");// 选择的现货资源类型，zt或者bps
	var cityName = getParams("cityName");// 包到时包到的城市
	
	var dataVue = new Vue({
		el: "#g-page",
		data: {
			disTricts:[],
			memberName:"",// 业务单位名称
			steelPlace:"",//货物产地
			quoteList:[],
			specificationList:[],//当前报价单规格列表
			showThickness:true,
			specification:{
				specificationId:null,
				specificationName:null,
				baseThickness:0
			},//当前规格
			thicknessList:[],
			freightQuoteList:[],
			resListingList:[],
			wavehouses:[],
			userConsignee:{},//当前收货地址
			userConsigneeList:[],//收货地址
			editAddr:{},//正在编辑的地址
			currentCity:"",
			isShow:true,
			message_title:"请输入"
		},
		methods: {
			 inputFutureWeight:function(e,type){
			 	var self = this;
			 	var currentInput = e.target;
			 	if ('width'==type) {
				 	var d = $("#dialog1")[0]; 
					d["currentInput"] = currentInput;
					$("#width").find("input").val($(currentInput).val());
					$("#dialog1").attr("type",type);
					$("#dialog1").show();
			 	} else if ('thickness'==type) {
			 		
				 	var d = $("#dialog3")[0]; 
					d["currentInput"] = currentInput;
					var specificationId = $(e.target).attr("specificationId");
					if (this.specificationList) {
						this.specificationList.forEach(function(obj,index){
							if (obj.specificationId == specificationId) {
								
								self.specification.specificationId = obj.specificationId;
								self.specification.specificationName = obj.specificationName;
								self.specification.baseThickness = obj.baseThickness;
								self.thicknessList = [];
								self.thicknessList = JSON.parse(JSON.stringify(obj.listAddPrice));
								
							}
						});
					}
					$("#dialog3").attr("type",type);
					$("#dialog3").show();
			 	} else if ('weight'==type) {
				 	var d = $("#dialog4")[0]; 
					d["currentInput"] = currentInput;
					$("#weight").find("input").val($(currentInput).val());
					$("#dialog4").attr("type",type);
					$("#dialog4").show();
			 	}
			 },
			 changeTotalWeight:function(e){
			 	this.refreshTotalNum();
			 },
			 chooseThickness:function(e){
			 	var value = $(e.target).val();
			 	if ("其他" == value) {
			 		this.showThickness = false;
			 	} else {
			 		this.showThickness = true;
			 	}
			 },
			 cancleWeight:function(type){
				
			 	var selectValue = $("#chooseThickness").val();
			 	if (type == "thickness" && selectValue == "其他") {
			 		this.showThickness = true;
			 		$("#chooseThickness").get(0).selectedIndex = 0;
			 		//$("#chooseThickness option").eq(0).attr("selected","selected");
			 	}
			 	if ('width' == type) {
				 	$("#dialog1").hide();
					$("#width").find("input").focus();
					$("#width").find("input").select();
				} else if ('thickness' == type) {
				 	$("#dialog3").hide();
				 	$("#thickness").find("select").focus();
				 	$("#thickness").find("select").select();
				} else if ('weight' == type) {
				 	$("#dialog4").hide();
					$("#weight").find("input").focus();
					$("#weight").find("input").select();
				}
			 },
			 confirmWeight:function(type){
			 	var self = this;
			 	var reg = new RegExp("^[0-9]+(.[0-9]{1,3})?$");
				var value = "";
				var input = null;
			 	if ('width' == type) {
					value = $("#width").find("input").val();
					//要映射的输入框dom对象
					input =$($('#dialog1')[0].currentInput);
				} else if ('thickness' == type) {

					var value1 = $("#thickness").find("select").val();
					var value2 = $("#thickness").find("input").val();
					if (value1 == "其他") {
						value = value2;
					} else {
						value = value1;
					}
					//要映射的输入框dom对象
					input =$($('#dialog3')[0].currentInput);
				} else if ('weight' == type) {
					value = $("#weight").find("input").val();
					//要映射的输入框dom对象
					input =$($('#dialog4')[0].currentInput);
				}
				if(!reg.test(value)){
					window.alert("只能为非负数，且小数位数不超过3位");
					if ('width' == type) {
						$("#width").find("input").focus();
						$("#width").find("input").select();
					} else if ('thickness' == type) {
						$("#thickness").find("input").focus();
						$("#thickness").find("input").select();
					} else if ('weight' == type) {
						$("#weight").find("input").focus();
						$("#weight").find("input").select();
					}
					return;
				}
				input.val(Number(value));
				var val = input.val();
			 	if (type == "weight") {
					var totalWeight = 0;
					var availableQuantity = input.attr("availableQuantity");
					if (Number(val) > Number(availableQuantity)) {
						input.val("");
						window.alert("超出可购买量！");
					}
					self.refreshTotalNum();
			 	} else if (type == "thickness") {
			 		var specificationId = input.attr("specificationId");
			 		var quoteId = input.attr("quoteId");
			 		var quotePrice = input.attr("quotePrice");
			 		var flag = false;
			 		var d = input.closest("li").index();
			 		var quote = this.getQuote(quoteId,d);
			 		self.specificationList.forEach(function(obj,index){
			 			if (obj.specificationId == specificationId) {
			 				//当前厚度等于基准价格
			 			    if(val == obj.baseThickness ){
			 			    	flag = true;
			 			    	quote.quotePrice = Number(quotePrice);
			 			    }else{
			 			    	obj.listAddPrice.forEach(function(p,i){
				 					if (val == p.thickness) {
				 						flag = true;
				 						quote.quotePrice = Number(quotePrice) + Number(p.thicknessPrice);
				 					}
				 				});
			 			    }
			 				
			 			}
			 		});
			 		if (!flag) {
			 			weui.toast("当前厚度无加价，请联系供应商确认！",1500);
		 				self.quoteList.forEach(function(quote,index){
		 					if (d == index) {
		 						//quote.quotePrice = Number(quotePrice);
		 						quote.quotePrice = "待定";
		 					}
		 				});
			 			//input.closest("li").find("#quotePrice").html("待定");
			 		}
			 	} else if (type == "width") {// 验证宽度
			 		var avaliableWidth = input.attr("placeholder");
			 		if (avaliableWidth.indexOf("-")==-1) {
			 			if (val != avaliableWidth) {
			 				input.val(avaliableWidth);
			 				window.alert("宽度超出范围！");
			 			}
			 		} else {
			 			var widths = avaliableWidth.split("-");
			 			if (Number(widths[0]) <= Number(val) && Number(widths[1]) >= Number(val)) {
			 			} else {
			 				input.val('');
			 				window.alert("宽度超出范围！");
			 			}
			 		}
			 	}
			 	if ('width' == type) {
					$('#dialog1').hide();
				} else if ('thickness' == type) {
					$('#dialog3').hide();
				} else if ('weight' == type) {
					$('#dialog4').hide();
				}
			 },
			 checkNumber:function(e,type){
			 	var value = $(e.target).val();
			 	if ("width" == type) {
			 		var widths = $(e.target).attr("width");
			 		if (widths.indexOf("-") != -1) {
			 			var wd = widths.split("-");
			 			if (Number(wd[0]) > Number(value) || Number(value) > Number(wd[1])) {
			 				window.alert("宽度超出范围");
			 				$(e.target).val("")
			 			}
			 		} else {
			 			if (Number(value) != Number(widths)) {
			 				window.alert("宽度超出范围");
			 				$(e.target).val("")
			 			}
			 		}
			 	} else if ("weight" == type) {
			 		var availableQuantity = $(e.target).attr("availableQuantity");
			 		if (Number(value) > Number(availableQuantity)) {
		 				window.alert("超出可购买量");
		 				$(e.target).val("")
			 		}
			 	}
			 },
			 //获取报价单数据
			 getQuote:function(quoteId,index){
				 var  q = null;
				 for(var i=0;i<this.quoteList.length;i++){
					 if(this.quoteList[i].id == quoteId && i == index){
						 q = this.quoteList[i];
						 break;
					 }
				 }
				 return q;
			 },
			 deleteRowResource:function(e,id,index){//删除期货资源
				$("#dialog2").attr("data-index",index);
				$("#dialog2").attr("data-type","futures");
				$("#dialog2").attr("delist-type","2");//按重量
				$("#dialog2").attr("weight",$(e.target).parent().find("input[name='futureWeight']").val());//重量
				$('#dialog2').show();
			 },
			 deleteSpotgoods:function(e,id,index,type){//删除现货资源
				$("#dialog2").attr("data-index",index);
				$("#dialog2").attr("data-type","spotgoods");
				$("#dialog2").attr("delist-type",type);//按数量
				if (type == 1) {
					var count = $(e.target).parent().find("input[name='futureWeight']").val();
					var unitWeihgt = $(e.target).parent().find("input[name='futureWeight']").attr("unit-weight");
					var weight = Number(count==""?0:count)*Number(unitWeihgt);
					$("#dialog2").attr("count",count);//数量
					$("#dialog2").attr("weight",weight);//重量
				} else if (type == 2) {
					$("#dialog2").attr("weight",$(e.target).parent().find("input[name='futureWeight']").val());//重量
				}
				$('#dialog2').show();
			 },
			 copyRowResource:function(e,id,d){
			 	var self = this;
			 	var targetList = [];
			 	self.quoteList.forEach(function(obj,index){
			 		if (id == obj.id && d==index) {
			 			targetList.push(obj);
			 		}
			 	});
			 	var d = JSON.parse(JSON.stringify(targetList[0]));
			 	self.quoteList.push(d);
			 },
			 chooseDeliveryType:function(e,id){
			 	$(e.target).removeClass("weui-btn_default").addClass("weui-btn_primary");
			 	$(e.target).siblings().removeClass("weui-btn_primary").addClass("weui-btn_default");
			 	$("div[name='delivery']").removeClass("show").addClass("hide");
			 	$("#"+id).removeClass("hide").addClass("show");
			 	if ("gczt" == id) {//如果是工厂自提，则不显示；
				 	$("#transFee").removeClass("show").addClass("hide");
			 	} else if ("ckzt" == id) {//如果是仓库自提，当业务单位为“天津中拓”，且有货物的产地为“唐山东海”时，则显示
			 		if ("天津中拓" == this.memberName && this.steelPlace == "唐山东海") {
					 	$("#transFee").removeClass("hide").addClass("show");
			 		} else {
					 	$("#transFee").removeClass("show").addClass("hide");
			 		}
			 	} else if ("bd" == id) {//如果是包到则显示；
				 	$("#transFee").removeClass("hide").addClass("show");
			 	} else {
				 	$("#transFee").removeClass("show").addClass("hide");
			 	}
			 	
			 },
			 chooseTexture:function(e){
			 	$(e.target).removeClass("weui-btn_default").addClass("weui-btn_warn");
			 	$(e.target).siblings().removeClass("weui-btn_warn").addClass("weui-btn_default");
			 },
			 chooseTransportFeeType:function(e){
			 	$(e.target).prev().trigger("click");
			 },
			 confirmDelete:function(e){
			 	var countFutures = $("#futures").find("li").length;//用于判断是否最后一条资源数
				var countSpotgoods = $("#spotgoods").find("li").length;
				var type = $("#dialog2").attr("data-type");
				var index = $("#dialog2").attr("data-index");
				var delistType = $("#dialog2").attr("delist-type");//按重量2，按数量1
				var weight = $("#dialog2").attr("weight");//扣减数
				if (type == "spotgoods") {
					this.resListingList.splice(index,1);
					if (delistType == 1){
						var count = $("#dialog2").attr("count");
						this.refreshTotalNum(delistType,count,weight);
					}else if (delistType == 2) {
						this.refreshTotalNum(delistType,0,weight);
					}
					$('#dialog2').hide();
				} else if (type == "futures") {
					var index = $("#dialog2").attr("data-index");
					this.quoteList.splice(index,1);
					if (delistType == 1){
						var count = $("#dialog2").attr("count");
						this.refreshTotalNum(delistType,count,weight);
					}else if (delistType == 2) {
						this.refreshTotalNum(delistType,0,weight);
					}
					$('#dialog2').hide();
				}
			 },
			 cancleDelete:function(e){
			 	$("#dialog2").hide();
			 },
			 cancleAddrDelete:function(e){
			 	$("#deleteAddrDialog").hide();
			 },
			 confirmAddrDelete:function(e){
			 	var conId = $("#deleteAddrDialog").attr("con-id");
			 	var self = this;
			 	$("#deleteAddrDialog").hide();
			 	var loading = weui.loading('正在删除...', {className: 'custom-classname'});
			 	self.$http.post("deleteAddrById",{'conId':conId},{emulateJSON:true}).then(function(data){
			 		loading.hide();
			 		weui.toast("删除成功",1500);
			 		self.userConsigneeList.forEach(function(obj,index){
			 			if (conId == obj.con_id) {
			 				self.userConsigneeList.splice(index,1);
			 			}
			 		});
			 	});
			 },
			 showTransportFeeView: function(e) {
				$("#transportFee").removeClass("hide");
				setTimeout(function(){$("#transportFee").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
			 },
			 closeTransportFeeView: function(e) {
				$("#transportFee").children().removeClass("m-quote-transportfee-show").addClass("m-quote-transportfee-close");
				setTimeout(function(){$("#transportFee").addClass("hide")},200);
			 },
			 stopCloseTransportFeeView: function(e) {
				e.stopPropagation();
			 },
			 managerAddr:function(e){
			 	$("#managerAddr").removeClass("hide");
				setTimeout(function(){$("#managerAddr").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
			 	//window.location.href="../../preorder/address/manager"
			 },
			 chooseAddr:function(e){
			 	var addr = eval("("+e+")");
			 	this.userConsignee = addr;
			 	this.closeManagerAddrView();
			 	
			 },
			 setDefaultAddr:function(id,e){
			 	var self = this;
			 	var loading = weui.loading('请稍后...', {className: 'custom-classname'});
			 	self.$http.post("updateDefaultAddrById",{'conId':id},{emulateJSON:true}).then(function(data){
			 		//self.userConsignee = data.data.userConsignee;
			 		weui.toast("设置成功",1500);
				 	$("div[name='defaultAddr']").removeClass("choosed");
				 	loading.hide();
				 	var defaultD = $(e.target).parent().children().eq(0);
				 	if (defaultD.hasClass("choosed")) {
					 	defaultD.removeClass("choosed");
				 	} else {
					 	defaultD.addClass("choosed");
				 	}
			 	});
			 },
			 editAddrView:function(con,e){
			 	var addr = eval("("+con+")");
			 	this.editAddr = addr;
			 	$("#editAddress").removeClass("hide");
				setTimeout(function(){$("#editAddress").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
			 },
			 chooseDistrict:function(){
			 	var self = this;
				var data = self.disTricts;
				if (data[0].label =="全部") {
					data.splice(0,1);
				}
				var provinceName = self.editAddr.province_name?self.editAddr.province_name:"天津";
				var aId = self.editAddr.area_id==""?"10003":self.editAddr.area_id;
				var dId = self.editAddr.districtId==""?"1357044":self.editAddr.districtId;
				var defaultValue = [provinceName,aId,dId];
				weui.picker(data, {
				     className: 'custom-classname',
				     defaultValue: defaultValue,
				     onChange: function (result) {
				     },
				     onConfirm: function (result) {
			     		self.editAddr.districtId = result[2].value;
			     		self.editAddr.districtName = result[2].label;
			     		self.editAddr.area_id = result[1].value;
				     },
				     id: 'doubleLinePicker'
				 });
			 },
			 closeEditAddrView:function(e){
			 	$("#editAddress").children().removeClass("m-quote-transportfee-show").addClass("m-quote-transportfee-close");
				setTimeout(function(){$("#editAddress").addClass("hide")},200);
			 },
			 saveEditAddrView:function(){
			 	var self = this;
			 	var editAddr = this.editAddr;
			 	var loading = weui.loading('正在保存...', {className: 'custom-classname'});
			 	self.$http.post("saveEditAddr",{'editAddr':JSON.stringify(editAddr)},{emulateJSON:true}).then(function(data){
			 		//self.userConsignee = data.data.userConsignee;
				 	loading.hide();
			 		weui.toast("保存成功",1500);
				 	self.closeEditAddrView();
				 	self.userConsigneeList = data.data.consigneeList;
			 	});
			 },
			 deleteAddr:function(id,e){
			 	$("#deleteAddrDialog").attr("con-id",id);
			 	$("#deleteAddrDialog").show();
			 },
			 createNewAddr:function(){
				var addr = {};
				addr.districtId = "";
			    addr.districtName = "";
			    addr.area_id = "";
			 	this.editAddr = addr;
			 	$("#editAddress").removeClass("hide");
				setTimeout(function(){$("#editAddress").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
			 },
			 closeManagerAddrView:function(){
				$("#managerAddr").children().removeClass("m-quote-transportfee-show").addClass("m-quote-transportfee-close");
				setTimeout(function(){$("#managerAddr").addClass("hide")},200);
			 },
			 excuteOrder:function(){
			 	var self = this;
			 	var checkInfo = self.checkInfo();
			 	if (checkInfo) {
			 		//window.alert("请确保数据填写完整！");
			 		return;
			 	}
			 	var loading = weui.loading('请稍后...', {className: 'custom-classname'});
			 	var transportFeeType = "";
			 	var cureWord = $("#cureWord").val();
			 	$("#transFee input").each(function(index,obj){
						if ($(obj).prop("checked")) {
							transportFeeType = $(obj).attr("data-transfee");
						}
					});
			 	var params = self.getOrderData();
			 	this.$http.post("excuteOrder",{
			 		'sellerId':memberId,
			 		'addrId':params['addrId'],
			 		'deliveryType':params['deliveryType'],
			 		'futureQuoteList':JSON.stringify(params['futureQuoteList']),
			 		'spotgoodList':JSON.stringify(params['spotgoodList']),
			 		'shoppingCartList':JSON.stringify(params['shoppingCartList']),
			 		'transportFeeType':transportFeeType,
			 		'cureWord':cureWord,
			 		'areaSetId':areaSetId,
			 		'type':type,
			 		'cityName':cityName
			 		
			 	},{emulateJSON:true}).then(function(data){
			 		var orderIds = [];
			 		var orderBusiIds = [];
			 		loading.hide();
			 		if (data.data.success) {
			 			orderIds.push(data.data.orderId);
			 			orderBusiIds.push(data.data.orderBusiId);
			 		} else {
			 			if (data.data.success != undefined) {
							weui.toast('期货订单生成失败!', 3000);
			 			}
			 		}
			 		if (data.data.success1) {
			 			orderIds.push(data.data.orderId1)
			 			orderBusiIds.push(data.data.orderBusiId1)
			 		} else {
			 			if (data.data.success1 != undefined) {
							weui.toast('现货订单生成失败!', 3000);
			 			}
			 		}
			 		if (orderIds.length > 0) {
			 			window.location.href = "success?orderIds="+orderIds+"&type=quote&orderBusiIds="+orderBusiIds;
			 		}
				}).catch(function(rs){
					weui.toast('网络异常,刷新重试!', 3000);
				});
			 },
			 checkInfo:function(){
				var reg = /^[0-9]+(.[0-9]{1,3})?$/;
			 	var result = false;
				$("#futures input").each(function(index,obj){
					if ($(obj).val() == "" || !reg.test($(obj).val())) {
						result = true;
					}
				});
				if (result) {
					window.alert("请完成期货资源数据填写！");
					return true;
				}
				var isDeliver = 0;
				$("#spotgoods li").each(function(index,obj){
					isDeliver = $(obj).attr("is-deliver");//查询现货资源是配送还是自提，0自提1配送
				});
				var deliveryType = "ckzt"
				$("#deliveryType a").each(function(index,obj){
					if ($(obj).hasClass("weui-btn_primary")) {
			 			deliveryType = $(obj).attr("data-type");//交货方式选择为ckzt，gczt，bd
					}
				});
				if (isDeliver == 1 && deliveryType != 'bd') {
					window.alert("现货配送资源不能选择自提！");
					return true;
				}
				if (isDeliver == 0) {
					var addrId = "";
				 	$("#deliveryType a").each(function(index,obj){
				 		if ($(obj).hasClass("weui-btn_primary")) {
				 			var type = $(obj).attr("data-type");
				 			if ("bd" == type) {
				 				addrId = $("#bd").attr("addrId");
				 			}
				 		}
				 	});
				 	if (addrId == 0) {
				 		window.alert("自提资源选择配送时，收货地址不能为空！");
						return true;
				 	}
				} else {
					var addrId = "";
				 	$("#deliveryType a").each(function(index,obj){
				 		if ($(obj).hasClass("weui-btn_primary")) {
				 			var type = $(obj).attr("data-type");
				 			if ("bd" == type) {
				 				addrId = $("#bd").attr("addrId");
				 			}
				 		}
				 	});
				 	if (addrId == 0) {
				 		window.alert("选择配送资源时，收货地址不能为空！");
						return true;
				 	}
				}
				$("#spotgoods input").each(function(index,obj){
					if ($(obj).attr("name") == "futureWeight") {
						if ($(obj).val() == "" || !reg.test($(obj).val())) {
							result = true;
						}
					}
				});
				if (result) {
					window.alert("请完成现货资源数据填写！");
					return true;
				}
				if ($("#transFee").hasClass("show")) {
					var flag = false;
					$("#transFee input").each(function(index,obj){
						if ($(obj).prop("checked")) {
							flag = true;
						}
					});
					if (result) {
						window.alert("请选择运费承担方式！");
						return true;
					}
				}
			 },
			 getOrderData:function(){
			 	var data = {};
			 	var futureQuoteList = [];
			 	var spotgoodList = [];
			 	var deliveryType = "";
			 	var addrId = "";
			 	$("#deliveryType a").each(function(index,obj){
			 		if ($(obj).hasClass("weui-btn_primary")) {
			 			deliveryType = $(obj).attr("data-type");
			 			if ("bd" == deliveryType) {
			 				addrId = $("#bd").attr("addrId");
			 			}
			 		}
			 	});
			 	$("#futures li").each(function(index,obj){
			 		var width = $(obj).find("input[name='width']").val();
			 		var thickness = $(obj).find("input[name='thickness']").val();
			 		var weight = $(obj).find("input[name='futureWeight']").val();
			 		var quoteId = $(obj).find("input[name='thickness']").attr("quoteId");
			 		var texture = "";
			 		$(obj).find("a[name='textures']").each(function(index,obj){
			 			if ($(obj).hasClass("weui-btn_warn")) {
			 				
			 				texture = $(obj).attr("data-texture-id");
			 			}
			 		});
			 		var quote = {};
			 		quote['texture'] = texture;
			 		quote['width'] = width;
			 		quote['thickness'] = thickness;
			 		quote['weight'] = weight;
			 		quote['id'] = quoteId;
			 		futureQuoteList.push(quote);
				});
			 	$("#spotgoods li").each(function(index,obj){
			 		var type = $(obj).find("input[name='futureWeight']").attr("delist-type");
			 		var price = $(obj).attr("listing-price");
			 		var weight = 0,count = 0;
			 		if (type == 1) { // 按数量
				 		count = $(obj).find("input[name='futureWeight']").val();
			 		} else if (type == 2) {// 按重量
				 		weight = $(obj).find("input[name='futureWeight']").val();
			 		} else if (type == 3) { //按重量/数量
				 		count = $(obj).find("input[name='futureWeight']").val();
			 		}
			 		var listingId = $(obj).find("input[name='futureWeight']").attr("listingId");
			 		var quote = {};
			 		quote['buyQuantity'] = count;
			 		quote['buyWeight'] = weight;
			 		quote['listing_id'] = listingId;
			 		quote['price'] = price;
			 		quote['areaSetId'] = areaSetId;
			 		spotgoodList.push(quote);
				});
				data['futureQuoteList'] = futureQuoteList;
				data['shoppingCartList'] = [];//接入购物车时需要这个空字符串
				data['spotgoodList'] = spotgoodList;
				data['deliveryType'] = deliveryType;
				data['addrId'] = addrId;
			 	return data;
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
			addNumber:function(limit,unitWeight,e){
			    
				var number = $(e.target).parent().find("input[name='futureWeight']");
				var value = Number(number.val());
				value = value + 1;
				if (value > limit) {
					value = value - 1;
					number.val(value);
					window.alert("超出购买数量限制,购买限制为"+limit+"件！");
				} else {
					number.val(value);
				}
//				$(e.target).parent().find("p").html((value * unitWeight).toFixed(3));
				$(e.target).parent().find("input[name='futureWeight3']").val((value * unitWeight).toFixed(3));
				this.refreshTotalNum();
			},
			subNumber:function(unitWeight,e){
		
				var number = $(e.target).parent().find("input[name='futureWeight']");
				var value = number.val();
				//如果没有值，就什么都不做
				if(value === "" || value ==="0"){
					return ;
				}
				value = value - 1;
				if (value == 0) {
					value = value + 1;
					number.val(value);
					window.alert("购买数量不能为0！");
				} else {
					number.val(value);
				}
//				$(e.target).parent().find("p").html((value * unitWeight).toFixed(3));
				$(e.target).parent().find("input[name='futureWeight3']").val((value * unitWeight).toFixed(3));
				this.refreshTotalNum();
			},
			refreshTotalNum:function(type,number,weight){
				var totalCount = 0;
				var totalWeight = 0;
				$("input[name='futureWeight']").each(function(index,obj){
					if ($(obj).attr("delist-type") == 1) {
						totalCount += Number($(obj).val()==""?0:$(obj).val());
						totalWeight += Number($(obj).val())*Number($(obj).attr("unit-weight"));
					} else if ($(obj).attr("delist-type") == 2) {
						totalWeight += Number($(obj).val()==""?0:$(obj).val());
					} else if ($(obj).attr("delist-type") == 3) {
						totalCount += Number($(obj).val()==""?0:$(obj).val());
						totalWeight += Number($(obj).val())*Number($(obj).attr("unit-weight"));
					}
				});
				if (type == 1 && number && weight) {//按数量扣减
					totalCount -= number;
					totalWeight -= weight;
				} else if (type == 2) {
					totalWeight -= weight;
				}
				$("#totalCount").html(totalCount)
				$("#totalWeight").html(totalWeight.toFixed(3))
			},
			changeWeight:function(limitWeight,unitWeight,e){
				var value = $(e.target).val();
				if (Number(value) > Number(limitWeight)) {
					window.alert("超出可购买量！");
					$(e.target).val('');
					return;
				}
				var num = Math.round(Number(value)/Number(unitWeight));
				var number = $(e.target).parent().find("input[name='futureWeight']");
				number.val(num);
				//$(e.target).parent().find("p").html((num * unitWeight).toFixed(3));
				this.refreshTotalNum();
				$(e.target).parent().find("input[name='futureWeight3']").val(Number((num * unitWeight).toFixed(3)))
			}
		},
		created:function(){
			var self = this;
			var loading = weui.loading('正在加载...',{});

			this.$http.post("getShopcartData",{'quoteIds':quoteIds,'memberId':memberId,'listingIds':listingIds,'type':type,'cityName':cityName},{emulateJSON:true}).then(function(rs){
				var data = rs.data;
				self.quoteList = data.quoteList;//期货报价资源
				self.resListingList = data.resListingList;//现货报价资源
				self.wavehouses = data.wavehouses;
				data.quoteList.forEach(function(obj,index){
					var texture = obj.texNames;
					var widthAndThickness = obj.specificationName.split("*");
					self.quoteList[index].texNames = texture.split(",");
					self.quoteList[index].width = widthAndThickness[0];
					self.quoteList[index].thickness = widthAndThickness[1];
					self.quoteList[index].quotePrice2 = self.quoteList[index].quotePrice;
					if (obj.steelWorkName == "唐山东海") {
						self.steelPlace = "唐山东海";
					} else {
						self.steelPlace = "";
					}
				});
				self.specificationList = data.specificationList;
				self.freightQuoteList = data.freightQuoteList;
				if (data.userConsignee) {
					self.userConsignee = data.userConsignee;
				} else {
					self.userConsignee = {};
				}
				self.userConsigneeList = data.userConsigneeList;
				self.memberName = data.memberName;
				var id = "ckzt";
				$("#deliveryType a").each(function(obj,index){
					if ($(obj).hasClass("weui-btn_primary")) {
						id = $(obj).attr("data-type");
					}
				});
				if ("gczt" == id) {//如果是工厂自提，则不显示；
					self.isShow = false;
				 	//$("#transFee").removeClass("show").addClass("hide");
			 	} else if ("ckzt" == id) {//如果是仓库自提，当业务单位为“天津中拓”，且有货物的产地为“唐山东海”时，则显示
			 		if ("天津中拓" == self.memberName && self.steelPlace == "唐山东海") {
						self.isShow = true;
					 	//$("#transFee").removeClass("hide").addClass("show");
			 		} else {
						self.isShow = false;
					 	//$("#transFee").removeClass("show").addClass("hide");
			 		}
			 	} else if ("bd" == id) {//如果是包到则显示；
					self.isShow = true;
				 	//$("#transFee").removeClass("hide").addClass("show");
			 	} else {
					self.isShow = false;
				 	//$("#transFee").removeClass("show").addClass("hide");
			 	}
				
	        	loading.hide();
			}).catch(function(rs){
				weui.toast('网络异常!', 3000);
			});
			self.getAreaList();
		}
	});
	function getParams(type){
		var url = window.location.href;
		var params = [];
		var m = url.substring(url.indexOf("=")+1);
		var quoteIds = m.substring(0,m.indexOf("&"));
		
		var q = m.substring(m.indexOf("=")+1);
		var memberId = q.substring(0,q.indexOf("&"));
		
		var l = q.substring(q.indexOf("=")+1);
		var listingIds = l.substring(0,l.indexOf("&"));
		
		var a = l.substring(l.indexOf("=")+1);
		var areaSetId = a.substring(0,a.indexOf("&"))
		
		var c = a.substring(a.indexOf("=")+1);
		var cityName = decodeURIComponent(c.substring(0,c.indexOf("&")));
		
		var typeClass = c.substring(c.indexOf("=")+1);
		
		if (type == "quoteIds") {
			return quoteIds
		} else if (type == "memberId") {
			return memberId;
		} else if (type == "listingIds") {
			return listingIds;
		} else if (type == "areaSetId") {
			return areaSetId;
		} else if (type == "cityName") {
			return cityName;
		} else if (type == "type") {
			return typeClass;
		}
	}
});