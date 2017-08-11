define(function(require, module, exports) {
	var Vue = require("vue");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var sellerId = getParam();
	var dataVue = new Vue({
		el: "#g-page",
		data: {
			disTricts:[],
			memberName:"",// 业务单位名称
			sellerId:"",
			shoppingCartList:[],
			wavehouses:[],
			userConsignee:{},//当前选择的收货地址
			freightQuoteList:[],
			userConsigneeList:[],//收货地址
			editAddr:{},//正在编辑的地址
			totalWeight:0,
			show:false,
			hide:true
		},
		methods: {
			 doneClose:function(e){
			 	$("#iosDialog2").hide();
			 },
			 inputFutureWeight:function(e,type){
			 	var currentInput = e.target;
			 	var d = $("#dialog1")[0]; 
				d["currentInput"] = currentInput;
				$("#weight").find("input").val($(currentInput).val());
				$("#dialog1").show();
				$("#dialog1").attr("type",type);
				$("#weight").find("input").focus();
				$("#weight").find("input").select();
			 },
			 cancleWeight:function(e){
			 	$("#dialog1").hide();
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
			 chooseTransportFeeType:function(e){
			 	$(e.target).prev().trigger("click");
			 },
			 confirmWeight:function(e){
			 	var self = this;
			 	var type = $('#dialog1').attr("type");
			 	var reg = new RegExp("^[0-9]+(.[0-9]{1,3})?$");
				var value = $("#weight").find("input").val();
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
				var dataId = input.attr("data-id");
				self.shoppingCartList.forEach(function(obj,index){
					if (obj.id == dataId) {
						obj.buyWeight = val;
					}
				});
				var totalWeight = 0;
				$("input[name='futureWeight']").each(function(index,obj){
					totalWeight += Number($(obj).val()==""?0:$(obj).val());
				});
				self.totalWeight = totalWeight;
				$('#dialog1').hide();
			 },
			 deleteRowResource:function(e,id){//删除期货资源
				$("#dialog2").attr("data-id",id);
				$('#dialog2').show();
			 },
			 confirmDelete:function(e){
			 	var self = this;
			 	var length = this.shoppingCartList.length;//用于判断是否最后一条资源数
				var id = $("#dialog2").attr("data-id");
				$('#dialog2').hide();
				var loading = weui.loading('正在删除...', {className: 'custom-classname'});
				self.$http.post("deleteShoppingCartData",{
					'id':id
			 	},{emulateJSON:true}).then(function(data){
			 		loading.hide();
			 		if (data.data.result) {
						self.shoppingCartList.forEach(function(obj,index){
							if (obj.id == id) {
								self.shoppingCartList.splice(index,1);
							}
						});
						var totalWeight = 0;
						self.shoppingCartList.forEach(function(obj,index){
							totalWeight += obj.buyWeight;
						});
						self.totalWeight = totalWeight;
			 		} else {
						weui.toast('删除失败!', 3000);
			 		}
				}).catch(function(rs){
			 		loading.hide();
					weui.toast('网络异常!', 3000);
				});
			 },
			 cancleDelete:function(e){
			 	$("#dialog2").hide();
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
			 	$("#editAddr").removeClass("hide");
				setTimeout(function(){$("#editAddr").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
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
			 	$("#editAddr").children().removeClass("m-quote-transportfee-show").addClass("m-quote-transportfee-close");
				setTimeout(function(){$("#editAddr").addClass("hide")},200);
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
			 createNewAddr:function(){
				var addr = {};
				addr.districtId = "";
			    addr.districtName = "";
			    addr.area_id = "";
			 	this.editAddr = addr;
			 	$("#editAddr").removeClass("hide");
				setTimeout(function(){$("#editAddr").children().addClass("m-quote-transportfee-show").removeClass("m-quote-transportfee-close")},10);
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
			 	var transportFeeType = "";
			 	$("#transFee input").each(function(index,obj){
					if ($(obj).prop("checked")) {
						transportFeeType = $(obj).attr("data-transfee");
					}
				});
			 	weui.loading('请稍后...', {className: 'custom-classname'});
			 	var params = self.getOrderData();
			 	self.$http.post("excuteOrder",{
			 		'sellerId':self.sellerId,
			 		'addrId':params['addrId'],
			 		'deliveryType':params['deliveryType'],
			 		'futureQuoteList':JSON.stringify(params['futureQuoteList']),
			 		'spotgoodList':JSON.stringify(params['spotgoodList']),
			 		'shoppingCartList':JSON.stringify(params['shoppingCartList']),
			 		'cureWord':params['cureWord'],
			 		'transportFeeType':transportFeeType,
			 		'startDate':params['startDate'],
			 		'endDate':params['endDate']
			 		
			 	},{emulateJSON:true}).then(function(data){
			 		if (data.data.success) {
			 			window.location.href = "success?orderIds="+data.data.orderId+"&type=shopcart&orderBusiIds="+data.data.orderBusiId;
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
				$("table input[name='futureWeight']").each(function(index,obj){
					if ($(obj).val() == "" || Number($(obj).val()) == 0 || !reg.test($(obj).val())) {
						result = true;
					}
				});
				if ($("#startDate").val() == "" || $("#endDate").val() == "") {
					result = true;
				}
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
			 	var addrId = "";
			 	var deliveryType = "";
			 	$("#deliveryType a").each(function(index,obj){
			 		if ($(obj).hasClass("weui-btn_primary")) {
			 			deliveryType = $(obj).attr("data-type");
			 			if ("bd" == deliveryType) {
			 				addrId = $("#bd").attr("addrId");
			 			}
			 		}
			 	});
				data['shoppingCartList'] = this.shoppingCartList;
				data['futureQuoteList'] = [];//购物车接入需要这两个空字符串
				data['spotgoodList'] = [];//购物车接入需要这两个空字符串
				data['startDate'] = $("#startDate").val();
				data['endDate'] = $("#endDate").val();
				data['cureWord'] = $("#cureWord").val();
				data['addrId'] = addrId;
				data['deliveryType'] = deliveryType;
			 	return data;
			 },
			 pickStartDate:function(e){
				var defaultValue = [];
			 	if ($(e.target).val() == "") {
				 	var date = new Date();
				 	defaultValue.push(date.getFullYear());
					defaultValue.push(date.getMonth()+1);
					defaultValue.push(date.getDate());
			 	} else {
			 		var sta = $(e.target).val().split("-");
					defaultValue.push(sta[0]);
					defaultValue.push(sta[1]);
					defaultValue.push(sta[2]);
			 	}
			 	var endDate = $("#endDate").val();
			 	endDate = endDate.replace(/-/g,'/');
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
		            	var valueStart = result[0].value + "/" + result[1].value + "/" + result[2].value;
		                var dateStart = new Date(valueStart);
		                if (endDate != "") {
			            	var dateEnd = new Date(endDate);
			            	if (dateStart <= dateEnd) {
				                $(e.target).val(value);
			            	} else {
				                $(e.target).val(defaultValue[0]+"-"+defaultValue[1]+"-"+defaultValue[2]);
								$("#iosDialog2").show();
			            	}
		                } else {
		                	$(e.target).val(value);
		                }
		            }
		        });
			 },
			 pickEndDate:function(e){
			 	var date = new Date();
				var defaultValue = [];
				defaultValue.push(date.getFullYear());
				defaultValue.push(date.getMonth()+1);
				defaultValue.push(date.getDate());
			 	var startDate = $("#startDate").val();
			 	startDate = startDate.replace(/-/g,'/');
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
			            	// ios浏览器日期兼容问题，new Date不能解析"2015-10-11"这样的字符串格式，可以解析"2015/12/21"这样的格式
			            	var valueEnd = result[0].value + "/" + result[1].value + "/" + result[2].value;
			            	var dateStart = new Date(startDate);
			            	var dateEnd = new Date(valueEnd);
//			            	dateEnd.setFullYear(result[0].value);
//			            	dateEnd.setMonth(Number(result[1].value)-1);
//			            	dateEnd.setDate(result[2].value);
			            	if (dateStart <= dateEnd) {
				                $(e.target).val(value);
			            	} else {
								$("#iosDialog2").show();
			            	}
			            }
			        });
				}
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
			}
		},
		created:function(){
			var self = this;
			self.sellerId = sellerId;
			self.$http.post("getShopcartData2",{'sellerId':sellerId},{emulateJSON:true}).then(function(data){
				self.shoppingCartList = data.data.shoppingCartList;
				self.show = true;
				self.hide = false;
				self.shoppingCartList.forEach(function(obj,index){
					self.totalWeight += obj.buyWeight;
				});
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
				
	        	weui.loading().hide();
			}).catch(function(rs){
				weui.toast('网络异常!', 3000);
			});
			self.getAreaList();
		}
	});
	function getParam(){
		var url = window.location.href;
		var m = url.substring(url.indexOf("=")+1);
		return m;
	}
});