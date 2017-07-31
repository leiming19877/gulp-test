define(function(require, module, exports) {
	var Vue = require("vue");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var quoteIds = getParams("quoteIds");// 期货报价单id串
	var memberId = getParams("memberId");// 卖家会员id
	var listingIds = getParams("listingIds");// 现货资源id串
	var loading = weui.loading('正在加载...', {className: 'custom-classname'});
	var dataVue = new Vue({
		el: "#g-page",
		data: {
			disTricts:[],
			memberName:"",// 业务单位名称
			steelPlace:"",//货物产地
			quoteList:[],
			addPriceList:[],
			showThickness:false,
			thicknessList:[],
			freightQuoteList:[],
			resListingList:[],
			wavehouses:[],
			userConsignee:{},//当前收货地址
			userConsigneeList:[],//收货地址
			editAddr:{},//正在编辑的地址
			currentCity:"",
			which_to_show: "first",
			message_title:"请输入"
		},
		methods: {
			 inputFutureWeight:function(e,type){
			 	var self = this;
			 	var currentInput = e.target;
			 	var d = $("#dialog1")[0]; 
				d["currentInput"] = currentInput;
				$("#weight").find("input").val($(currentInput).val());
				var specificationId = $(e.target).attr("specificationId");
				if (type == "thickness") {
					self.showThickness = true;
				} else {
					self.showThickness = false;
				}
				if (self.addPriceList) {
					self.addPriceList.forEach(function(obj,index){
						if (obj.specificationId == specificationId) {
							self.thicknessList = [];
							self.thicknessList = JSON.parse(JSON.stringify(obj.addPriceList));
							var other = {};
							other['thickness'] = '其他';
							other['thicknessPrice'] = 'other';
							self.thicknessList.push(other);
						}
					});
				}
				$("#dialog1").attr("type",type);
				$("#dialog1").show();
//				if (type == "thickness") {
//					$("#weight").find("input").blur();
//					$("#weight").find("select").focus();
//				} else {
//					$("#weight").find("select").blur();
//					$("#weight").find("input").focus();
//				}
				
			 },
			 chooseThickness:function(e){
			 	var value = $(e.target).val();
			 	if ("其他" == value) {
			 		this.showThickness = false;
			 	} else {
			 		this.showThickness = true;
			 	}
			 },
			 cancleWeight:function(e){
			 	var type = $("#dialog1").attr("type");
			 	var selectValue = $("#chooseThickness").val();
			 	if (type == "thickness" && selectValue == "other") {
			 		this.showThickness = false;
			 		$("#chooseThickness option").removeAttr("selceted");
			 		$("#chooseThickness option").eq($("#chooseThickness option").length-1).attr("selected","selected");
			 	}
			 	$("#dialog1").hide();
			 	$("#weight").find("select").blur();
				$("#weight").find("input").blur();
			 },
			 confirmWeight:function(e){
			 	var self = this;
			 	var type = $('#dialog1').attr("type");
			 	var reg = new RegExp("^[0-9]+(.[0-9]{1,3})?$");
				var value1 = $("#weight").find("input").val();
				var value2 = $("#weight").find("select").val();
				var value = "";
				if (type == "thickness") {
					if (value1 != "") {
						value = value1;
					}
					if (value2 != "" && value2 != "其他") {
						value = value2;
					}
				} else {
					value = value1;
				}
				//要映射的输入框dom对象
				var input =$($('#dialog1')[0].currentInput);
				if(!reg.test(value)){
					window.alert("只能为非负数，且小数位数不超过3位");
					$("#weight").find("input").focus();
					$("#weight").find("input").select();
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
					$("input[name='futureWeight']").each(function(index,obj){
						totalWeight += Number($(obj).val()==""?0:$(obj).val());
					});
					$("#totalWeight").html(totalWeight.toFixed(3))
			 	} else if (type == "thickness") {
			 		var specificationId = input.attr("specificationId");
			 		var quoteId = input.attr("quoteId");
			 		var quotePrice = input.attr("quotePrice");
			 		var flag = false;
			 		var d = input.closest("li").index();
			 		self.addPriceList.forEach(function(obj,index){
			 			if (obj.specificationId == specificationId) {
			 				obj.addPriceList.forEach(function(p,i){
			 					if (val == p.thickness) {
			 						flag = true;
					 				self.quoteList.forEach(function(quote,index){
					 					if (quote.id == quoteId && index == d) {
					 						quote.quotePrice = Number(quotePrice) + Number(p.thicknessPrice);
					 					}
					 				});
			 					}
			 				});
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
			 	}
				$('#dialog1').hide();
			 },
			 deleteRowResource:function(e,id,index){//删除期货资源
				$("#dialog2").attr("data-index",index);
				$("#dialog2").attr("data-type","futures");
				$('#dialog2').show();
			 },
			 deleteSpotgoods:function(e,id,index){//删除现货资源
				$("#dialog2").attr("data-index",index);
				$("#dialog2").attr("data-type","spotgoods");
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
				if (type == "spotgoods") {
					this.resListingList.splice(index,1);
					/**
					 * 需要后台删除购物车数据
					 */
					var totalWeight = 0;
					$("input[name='futureWeight']").each(function(index,obj){
						totalWeight += Number($(obj).val()==""?0:$(obj).val());
					});
					$("#totalWeight").html(totalWeight.toFixed(3))
					$('#dialog2').hide();
				} else if (type == "futures") {
					var index = $("#dialog2").attr("data-index");
					this.quoteList.splice(index,1);
					var totalWeight = 0;
					$("input[name='futureWeight']").each(function(index,obj){
						totalWeight += Number($(obj).val()==""?0:$(obj).val());
					});
					$("#totalWeight").html(totalWeight.toFixed(3))
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
				var defaultValue = [self.editAddr.province_name,self.editAddr.area_id,self.editAddr.districtId];
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
			 closeManagerAddrView:function(){
				$("#managerAddr").children().removeClass("m-quote-transportfee-show").addClass("m-quote-transportfee-close");
				setTimeout(function(){$("#managerAddr").addClass("hide")},200);
			 },
			 excuteOrder:function(){
			 	var self = this;
			 	var checkInfo = self.checkInfo();
			 	if (checkInfo) {
			 		window.alert("请确保数据填写完整！");
			 		return;
			 	}
			 	weui.loading('请稍后...', {className: 'custom-classname'});
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
			 		'cureWord':cureWord
			 		
			 	},{emulateJSON:true}).then(function(data){
			 		if (data.data.success) {
			 			window.location.href = "success?orderId="+data.data.orderId+"&type=quote";
			 		} else {
						weui.toast('期货订单生成失败!', 3000);
			 		}
				}).catch(function(rs){
					weui.toast('网络异常!', 3000);
				});
			 },
			 checkInfo:function(){
			 	var result = false;
				var reg = /^[0-9]+(.[0-9]{1,3})?$/;
				$("#futures input").each(function(index,obj){
					if ($(obj).val() == "" || !reg.test($(obj).val())) {
						result = true;
					}
				});
				$("#spotgoods input").each(function(index,obj){
					if ($(obj).attr("name") == "futureWeight") {
						if ($(obj).val() == "" || !reg.test($(obj).val())) {
							result = true;
						}
					}
				});
				if ($("#transFee").hasClass("show")) {
					var flag = false;
					$("#transFee input").each(function(index,obj){
						if ($(obj).prop("checked")) {
							flag = true;
						}
					});
					if (!flag) {
						result = true;
					}
				}
				return result;
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
			 				texture = $(obj).attr("data-texture");
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
			 		var weight = 0,count = 0;
			 		if (type == 1) { // 按数量
				 		count = $(obj).find("input[name='futureWeight']").val();
			 		} else if (type == 2) {// 按重量
				 		weight = $(obj).find("input[name='futureWeight']").val();
			 		}
			 		var listingId = $(obj).find("input[name='futureWeight']").attr("listingId");
			 		var quote = {};
			 		quote['buyQuantity'] = count;
			 		quote['buyWeight'] = weight;
			 		quote['listingId'] = listingId;
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
				var number = $(e.target).parent().find("input[type='text']");
				var value = Number(number.val());
				value = value + 1;
				if (value > limit) {
					value = value - 1;
					number.val(value);
					window.alert("超出购买数量限制！");
				} else {
					number.val(value);
				}
				$(e.target).parent().find("p").html((value * unitWeight).toFixed(3));
			},
			subNumber:function(unitWeight,e){
				var number = $(e.target).parent().find("input[type='text']");
				var value = number.val();
				value = value - 1;
				if (value == 0) {
					value = value + 1;
					number.val(value);
					window.alert("购买数量不能为0！");
				} else {
					number.val(value);
				}
				$(e.target).parent().find("p").html((value * unitWeight).toFixed(3));
			}
		},
		created:function(){
			var self = this;
			this.$http.post("getShopcartData",{'quoteIds':quoteIds,'memberId':memberId,'listingIds':listingIds},{emulateJSON:true}).then(function(data){
				self.quoteList = data.data.quoteList;
				self.resListingList = data.data.resListingList;
				data.data.quoteList.forEach(function(obj,index){
					var texture = obj.texNames;
					var widthAndThickness = obj.specificationName.split("*");
					self.quoteList[index].texNames = texture.split(",");
					self.quoteList[index].width = widthAndThickness[0];
					self.quoteList[index].thickness = widthAndThickness[1];
					self.quoteList[index].quotePrice2 = self.quoteList[index].quotePrice;
					self.wavehouses = data.data.wavehouses;
					if (obj.steelWorkName == "唐山东海") {
						self.steelPlace = "唐山东海";
					}
				});
				self.addPriceList = data.data.addPriceList;
				self.freightQuoteList = data.data.freightQuoteList;
				self.userConsignee = data.data.userConsignee;
				self.userConsigneeList = data.data.userConsigneeList;
				self.memberName = data.data.memberName;
				var id = "";
				$("#deliveryType a").each(function(obj,index){
					if ($(obj).hasClass("weui-btn_primary")) {
						id = $(obj).attr("data-type");
					}
				});
				if ("gczt" == id) {//如果是工厂自提，则不显示；
				 	$("#transFee").removeClass("show").addClass("hide");
			 	} else if ("ckzt" == id) {//如果是仓库自提，当业务单位为“天津中拓”，且有货物的产地为“唐山东海”时，则显示
			 		if ("天津中拓" == self.memberName && self.steelPlace == "唐山东海") {
					 	$("#transFee").removeClass("hide").addClass("show");
			 		} else {
					 	$("#transFee").removeClass("show").addClass("hide");
			 		}
			 	} else if ("bd" == id) {//如果是包到则显示；
				 	$("#transFee").removeClass("hide").addClass("show");
			 	} else {
				 	$("#transFee").removeClass("show").addClass("hide");
			 	}
				
	        	loading.hide();
			}).catch(function(rs){
				weui.toast('网络异常!', 3000);
			});
			self.getAreaList();
		}
	});
	$("#g-page").on("click",".u-ipt-min",function(e){
		var name = $(e.target).attr("name");
		if (name = "startDate") {
		 	var date = new Date();
			var defaultValue = [];
			defaultValue.push(date.getFullYear());
			defaultValue.push(date.getMonth()+1);
			defaultValue.push(date.getDate());
		 	var endDate = $("#endDate").val();
			weui.datePicker({
	            start: new Date(),
	            end: 2050,
	            defaultValue: defaultValue,
	            onChange: function (result) {
	            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
	                $(e.target).val(value);
	            },
	            onConfirm: function (result) {
	            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
	                var dateStart = new Date(value);
	                if (endDate != "") {
		            	var dateEnd = new Date(endDate);
		            	if (dateStart <= dateEnd) {
			                $(e.target).val(value);
		            	} else {
							$("#iosDialog2").show();
		            	}
	                } else {
	                	$(e.target).val(value);
	                }
	            }
	        });
		} else if (name = "endDate") {
		 	var date = new Date();
			var defaultValue = [];
			defaultValue.push(date.getFullYear());
			defaultValue.push(date.getMonth()+1);
			defaultValue.push(date.getDate());
		 	var startDate = $("#startDate").val();
			if (startDate == "") {
				$("#iosDialog2").show();
				return;
			} else {
				weui.datePicker({
		            start: new Date(),
		            end: 2050,
		            defaultValue: defaultValue,
		            onChange: function (result) {
		            },
		            onConfirm: function (result) {
		            	var value = result[0].value + "-" + result[1].value + "-" + result[2].value;
		            	var dateStart = new Date(startDate);
		            	var dateEnd = new Date(value);
		            	if (dateStart <= dateEnd) {
			                $(e.target).val(value);
		            	} else {
							$("#iosDialog2").show();
		            	}
		            }
		        });
			}
		
		}
	});
	$('#iosDialog2').on('click', '.weui-dialog__btn_primary', function () {
		$('#iosDialog2').hide();
	});
	$('#dialog1').on('click', '.weui-dialog__btn_default', function () {
		$('#dialog1').hide();
	});
	$('#dialog2').on('click', '.weui-dialog__btn_default', function () {
		$('#dialog2').hide();
	});
	function getParams(type){
		var url = window.location.href;
		var params = [];
		var m = url.substring(url.indexOf("=")+1);
		var quoteIds = m.substring(0,m.indexOf("&"));
		
		var q = m.substring(m.indexOf("=")+1);
		var memberId = q.substring(0,q.indexOf("&"));
		
		var listingIds = q.substring(q.indexOf("=")+1);
		if (type == "quoteIds") {
			return quoteIds
		} else if (type == "memberId") {
			return memberId;
		} else if (type == "listingIds") {
			return listingIds;
		}
	}
});