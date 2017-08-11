define(function(require, exports, module) {
	var Vue = require("vue");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	Vue.http.options.emulateJSON = true;//设置表单提交
	// weui
	var weui = require("weui");
	require("date");
	

	 //
	var queryVue = new Vue({
			el: "#g-page",
			data: {
				isShowSearchPanel:false,//搜索界面是否展示
				queryParam: {
					startDate:'',
					endDate:'',
					sellerName:'',//卖家会员名称
					contractStatus:-1,//合同状态
					contractType:-1,//合同类型
					contractTypeList:[
					                  {
					                	  'type':-1,
					                	  'desc':'所有'
					                  },
					                  {
					                	  'type':1,
					                	  'desc':'现货合同'
					                  },
					                  {
					                	  'type':2,
					                	  'desc':'代订货合同'
					                  }
					                  ],
					queryType:'pending'//查询类型,pending待处理，done已处理默认待处理
				},
				pendingPage:{//待处理数据
					isReq:false,//是否在加载数据中
					haveLoaded:true,//是否从来没有加载过数据
					pageNo:1,//当前页
					rowsize:5,//分页大小
					totalPage:1,//总页数
					list:[]//列表数据
				},
				donePage:{//已处理数据
					isReq:false,//是否在加载数据中
					haveLoaded:false,//是否从来没有加载过数据
					pageNo:1,//当前页
					rowsize:5,//分页大小
					totalPage:1,//总页数
					list:[]//列表数据
				}
				
			},
			computed:{
				contractStatus:function(){
					var list = [];
					list.push({
						'status':-1,
						'text':'所有'
					});
					if(this.queryParam.queryType === 'pending'){
						list.push({
							'status':1,
							'text':'待买家确认'
						});
						list.push({
							'status':2,
							'text':'待卖家确认'
						});
						list.push({
							'status':5,
							'text':'待提交合同'
						});
						list.push({
							'status':12,
							'text':'待确认解除合同'
						});
						list.push({
							'status':19,
							'text':'合同执行中'
						});
					}
					return list;
				}
			},
			created:function(){
				this.queryByBtn();
			},
			methods: {
				hideSearchPanel:function(){
					this.isShowSearchPanel = false;
				},
				showSearchPanel:function(){
					this.isShowSearchPanel = true;
				},
				//获取查询类型值
				getQueryTypeVal:function(){
					if(this.queryParam.queryType === 'pending'){
						return 1;
					}else if(this.queryParam.queryType === 'done'){
						return 2;
					}
					return -1;
				},
				/**
				 * 根据查询参数查询
				 * @param {Object} params 查询参数
				 * @param {Function} successCallBack  返回成功回调函数
				 * @param {Function} errorCallBack  失败回调函数
				 * @param {Funciton} finallyCallBack  不管失败成功，回调函数
				 */
				query: function(params, successCallBack,errorCallBack,finallyCallBack) {
					/*var loading = weui.loading('加载中...', {
						   
					});*/
					var self = this;
					 this.$http.post("../../ec/contract/getBuySpotContractData",params).then(function(rs){
						    var data = rs.data;
						   if(typeof successCallBack === "function"){
							   successCallBack(data.page);
							}
						  return ;
					  },function(error){
						  
						  weui.toast('网络异常!', 3000);
						  if(typeof errorCallBack === "function"){
							  errorCallBack(error);
							}
					  }).catch(function(rs){
						 
					  }).finally(function(){
						//loading.hide();
						  
						//待处理
						if(typeof finallyCallBack === "function"){
							finallyCallBack();
						}
					  });
					
				},
				/**
				 * @param {Function} successCallBack  返回成功回调函数
				 * @param {Function} errorCallBack  失败回调函数
				 * @param {Funciton} finallyCallBack  不管失败成功，回调函数
				 */
				doQuery: function(successCallBack,errorCallBack,finallyCallBack) {
					var params = {
							'queryType': this.getQueryTypeVal(),
							'startDate': this.queryParam.startDate,
							'endDate': this.queryParam.endDate,
							'contractType':this.queryParam.contractType,
							'sellerName':this.queryParam.sellerName
					};
					//待处理
					if(this.queryParam.queryType === 'pending') {
						params['contractStatus'] = this.queryParam.contractStatus;
						params['pageNo'] = this.pendingPage.pageNo;
						params['rowsize'] = this.pendingPage.rowsize;
						this.query(params, successCallBack,errorCallBack,finallyCallBack);
						//已完成
					} else if(this.queryParam.queryType === 'done' ) {
						params['pageNo'] = this.donePage.pageNo;
						params['rowsize'] = this.donePage.rowsize;
						this.query(params, successCallBack,errorCallBack,finallyCallBack);
					} else {//默认按待处理查询
						params['queryType'] = 'pendding';
						params['contractStatus'] = this.queryParam.contractStatus;
						params['pageNo'] = this.pendingPage.pageNo;
						params['rowsize'] = this.pendingPage.rowsize;
						this.query(params, successCallBack,errorCallBack,finallyCallBack);
					}
				},
				setPageData:function(page,data){
					if(page.pageNo === 1) {
						page.totalPage = data.total;
						page.list = data.list;
					} else {
						page.totalPage = data.total;
						page.list = page.list.concat(data.list);
					}
				},
				queryByBtn: function() {
					var self = this;
					var loading = weui.loading('加载中...', {
						   
					});
					//重新分配局部变量
					var  queryType = this.queryParam.queryType;
					this.hideSearchPanel();//隐藏查询界面
					//待处理
					if(this.queryParam.queryType === 'pending') {
						this.pendingPage.pageNo = 1;
						//this.pendingPage.isReq = true;
						//已完成
					} else if(this.queryParam.queryType === 'done' ) {
						this.donePage.pageNo = 1;
						//this.donePage.isReq = true;
					}
					
					this.doQuery(function(data) {
						if(queryType === 'pending') {
							self.setPageData(self.pendingPage,data);
						//已完成
						} else if(queryType === 'done' ) {
							self.setPageData(self.donePage,data);
						}
					},function(){
						
					},function(){
						loading.hide();
					});
				},
				clearByBtn:function(){
					this.queryParam.startDate = '';
					this.queryParam.endDate = '';
					this.queryParam.sellerName = '',//卖家会员名称
					this.queryParam.contractStatus = -1;//合同状态
					this.queryParam.contractType= -1;//合同类型
				},
				loadNextPage:function(callback){
					var self = this;
					var isNeedQuery = false;
					//待处理
					if(this.queryParam.queryType === 'pending') {
						if(this.pendingPage.pageNo < this.pendingPage.totalPage){
							isNeedQuery  = true;
							this.pendingPage.pageNo++;
							this.pendingPage.isReq = true;
						}
						//已完成
					} else if(this.queryParam.queryType === 'done' ) {
						if(this.donePage.pageNo < this.donePage.totalPage){
							if(this.pendingPage.pageNo < this.pendingPage.totalPage){
								isNeedQuery  = true;
								this.donePage.pageNo++;
								this.donePage.isReq = true;
							}
						}
					}
					if(isNeedQuery){
						this.doQuery(callback);
					}
				},
				pendingClick:function(){
					var self = this;
					this.queryParam.queryType = "pending";
					if(this.pendingPage.haveLoaded){
						return ;
					}
					this.pendingPage.haveLoaded  = true;
					this.pendingPage.isReq = true;
					this.doQuery(function(data){
						self.pendingPage.isReq = false;
						self.setPageData(self.pendingPage,data);
					});
				},
				doneClick:function(){
					var  self = this;
					this.queryParam.queryType = "done";
					if(this.donePage.haveLoaded){
						return ;
					}
					this.donePage.isReq = true;
					this.donePage.haveLoaded  = true;
					this.doQuery(function(data){
						self.donePage.isReq = false;
						self.setPageData(self.donePage,data);
					});
				},
				pendingNextPage:function(){
					var  self = this;
					this.loadNextPage(function(data){
						self.pendingPage.isReq = false;
						self.setPageData(self.pendingPage,data);
					});
				},
				doneNextPage:function(){
					var  self = this;
					this.loadNextPage(function(data){
						self.donePage.isReq = false;
						self.setPageData(self.pendingPage,data);
					});
				},
				startDateChoice:function(){
		
					var self = this;
					var endDate = this.queryParam.endDate;
					if(!endDate){
						endDate = new Date().getFullYear();
					}
					var val = this.queryParam.startDate;
					var vs = val.split("-");
					var now  = new Date();
					var year = now.getFullYear();
					var month = now.getMonth()+1;
					var date = now.getDate();
					if(vs.length === 3){
						 year = parseInt(vs[0]);
						 month = parseInt(vs[1]);
						 date = parseInt(vs[2]);
					}
					weui.datePicker({
					    start: 2010,
					    end: endDate,
					    defaultValue: [year, month, date],
					    onChange: function(result){
					        console.log(result);
					    },
					    onConfirm: function(result){
					        var y = result[0].value;
					        var m = result[1].value;
					        var d = result[2].value;
					        var vStr = y+"-";
					        if(m>9){
					        	 vStr += m+"-";
					        }else{
					        	vStr += "0"+m+"-";
					        }
					        if(d>9){
					        	 vStr += d;
					        }else{
					        	vStr += "0"+d;
					        }
				
					        self.queryParam.startDate = vStr;
					    },
					    id: 'datePicker'
					});
				},
				endDateChoice:function(){
					var self = this;
					var startDate = this.queryParam.startDate;
					if(!startDate){
						startDate = 2010;
					}
					var val = this.queryParam.endDate;
					var vs = val.split("-");
					var now  = new Date();
					var year = now.getFullYear();
					var month = now.getMonth()+1;
					var date = now.getDate();
					if(vs.length === 3){
						 year = parseInt(vs[0]);
						 month = parseInt(vs[1]);
						 date = parseInt(vs[2]);
					}
					weui.datePicker({
					    start: startDate,
					    end: new Date().getFullYear(),
					    defaultValue: [year, month, date],
					    onChange: function(result){
					     
					    },
					    onConfirm: function(result){
					        var y = result[0].value;
					        var m = result[1].value;
					        var d = result[2].value;
					        var vStr = y+"-";
					        if(m>9){
					        	 vStr += m+"-";
					        }else{
					        	vStr += "0"+m+"-";
					        }
					        if(d>9){
					        	 vStr += d;
					        }else{
					        	vStr += "0"+d;
					        }
					        self.queryParam.endDate = vStr;
					    },
					    id: 'datePicker'
					});
				},
				toContractDetail:function(contractId,contractCode,contractStatus){
				/*	if(contractStatus ===2 || contractStatus === 5){
						 weui.alert("卖家正在确认"+contractCode+"合同，待卖家确认后您才能查看合同详情");
						return ;
					}*/
					window.location.href = "./toBuyContractDetail?contractId="+contractId;
					return ;
				}
				
			}
		});
	
		weui.tab('#tab',{
	        defaultIndex: 0,
	        onChange: function(index){
	           var  ret = index;
	        }
	    });
});