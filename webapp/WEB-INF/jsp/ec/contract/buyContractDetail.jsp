<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>合同详情</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.1.2.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/contract/contractDetail.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>
<body>
   <div id="app" style="height: 100%;">
	<div id='g-page' class="g-page">
	     <header class="g-header">
	       <h1 class="u-title">中拓钢铁网电子购销合同</h1>
	       <button v-cloak  v-if="contract.contractStatusDesc === '待买家确认'" @click="showConfirmContract();" class="weui-btn weui-btn_mini u-sure-btn" >确认合同</button>
	     </header>
	     <div class="g-content">
	       <table class="tb1">
	           <tr>
	               <td class="label">合同编号：</td>
	               <td>
	                    <span v-text="contract.contractCode"></span>
	                    <span class="contract-status"  v-text="contract.contractStatusDesc"></span>
	               </td>
	              
	           </tr>
	           <tr>
	               <td class="label">签订时间：</td>
	               <td  v-text="contract.createdDatetime ? new Date(contract.createdDatetime).formatDate('yyyy-MM-dd'):''"></td>
	           </tr>
	           <tr>
	               <td class="label">签订地址：</td>
                   <td  v-text="contract.signedAddress"></td>
	           </tr>
	           <tr>
                   <td class="label">供方：</td>
                   <td  v-text="contract.sellerName"></td>
               </tr>
                <tr>
                   <td class="label">需方：</td>
                   <td  v-text="contract.buyerName"></td>
               </tr>
	       </table>
	       <table class="tb2 u-section" >
	           <caption>一、合同票的物信息:</caption>
	           <template  v-for="(e,index) in contract.detailList" >
	               <tr>
	                   <td class="label"><span v-text="index+1"></span>品名</td>
	                   <td class="label">产地</td>
	                   <td class="label">规格</td>
	                   <td class="label">材质</td>
	                   <td class="label">计量方式</td>
	               </tr>
	               <tr>
	                   <td v-text="e.brandName"></td>
	                   <td v-text="e.placeSteelName"></td>
	                   <td v-text="e.specification"></td>
	                   <td v-text="e.textureName"></td>
	                   <td v-text="e.calculateTypeDesc"></td>
	               </tr>
	               <tr>
	                   <td>件数</td>
	                   <td v-text="e.buyQuantity"></td>
	                   <td>重量(吨)</td>
                       <td colspan="2" v-text="e.buyWeight"></td>
	               </tr>
	               <tr>
                       <td>含税单价</td>
                       <td v-text="e.buyPrice"></td>
                       <td>金额</td>
                       <td colspan="2" v-text="e.buyMoney"></td>
                   </tr>
                   <tr>
                       <td>备注</td>
                       <td colspan="4" v-text="e.resComment"></td>
                   </tr>
	           </template>
	           <tr>
	               <td class="label total-money" colspan="5">
	                   <span>合计人民币(大写):</span>
	                   <span v-text="contract.totalBuyoneyCN"></span>
	               </td>
	           </tr>
	           <tr v-if="contract.goodsRemarkHtml">
                   <td class="label total-money" colspan="5">
                       <div v-html="contract.goodsRemarkHtml"></div>
                   </td>
               </tr>
	       </table>
	       <div v-cloak v-if="contract.dataSource == 0" >
	           <ul class="u-section">
                 <li>
	                   <h3 class="u-contract-title">二、产品质量技术标准:</h3>
	               </li>
	               <li>
	                                               执行国标或者生产厂家生产标准，供方提供钢厂质保书。
	               </li>
                </ul>
                <ul class="u-section">
		            <li >
		              <h3 class="u-contract-title"> 三、交货时间、地点：</h3>
		            </li>
		            <li>1、交货时间：&nbsp;&nbsp;
		              <span class="u-line-text">
		                  {{contract.deliveryBeginTime ? new Date(contract.deliveryBeginTime).formatDate('yyyy-MM-dd'):''}}
		                  --
		                  {{contract.deliveryTime ? new Date(contract.deliveryTime).formatDate('yyyy-MM-dd'):''}}
		              </span>
		              
		               <span v-if="contract.deliveryType === 1">提清</span>
		            <li>2、交货地点：&nbsp;&nbsp;
		              <span class="u-line-text" v-text="contract.deliveryAddr"></span>
		            </li>
		            <li>3、指定签收人：
		                  <span class="u-line-text" v-text="contract.deliveryUserInfo"></span>
		            </li>
		        </ul>
		        <ul class="u-section">
		            <li>
		              <h3 class="u-contract-title">四、交货方式以及费用承担：</h3>
		            </li>
		            <li v-if="contract.deliveryType === 1">需方自提并承担运输费用，供方承担出库费用。</li>
		            <li v-if="contract.deliveryType === 2">供方将货物运送至合同约定的交货地点,列表单价中包含
		              <span class="u-line-text" v-text="contract.deliveryTypePricePerT"></span>
		                                  元/吨运杂费由需方承担,需方承担货到工地后的卸货义务及相关卸货费用。
                    </li>
                    <li v-if="contract.deliveryType === 3">
                                                                                供方将货物代办运输至合同约定的交货地点,列表中含税单价包含
                                <span class="u-line-text" v-text="contract.deliveryTypePricePerT"></span>                                                
                                                                               元/吨运杂费由需方承担。供方代收代付，运杂费原始票据转交给需方，需方承担货到工地后的卸货义务及相关卸货费用,
                                <span class="u-line-text" v-text="contract.deliveryTypeCls"></span> 
                                                                                票结算。
                    </li>
                    <li v-if="contract.deliveryType === 4">
                                            {{contract.deliveryTypeNote}}
                    </li>
		            
		        </ul>
		        <ul class="u-section">
		            <li >
		              <h3 class="u-contract-title"> 五、包装标准：</h3>       
		            </li>
		            <li>生产工厂标准出厂包装。</li>
		        </ul>
		        <ul class="u-section">
		            <li > <h3 class="u-contract-title"> 六、合理损耗计算方法：</h3></li>
		            <li>理计商品按钢厂挂牌理论结算；磅计商品以供方仓库实际过磅重量结算，磅差不超过±3‰
		                                          ，磅差在3‰以内按供方出库重量结算，超出磅差部分双方协商解决。
		            </li>
		        </ul>
		        <ul class="u-section">
		            <li ><h3 class="u-contract-title">七、验收标准、方法及提出异议期限：</h3></li>
		            <li>1、验收标准按照本合同第二条执行。</li>
		            <li>2、若有数量异议，需方应在提货或交货时要求供方现场点验，货物离开货场或交货完成，供方不受理数量异议。</li>
		            <li>3、若有质量异议，需方应在货物离开货场七个工作日内以书面形式通知供方，并保证货物包装完整。由此产生的质量问题由供方负责通知钢厂协同处理，最终以钢厂处理结果为准。此批钢材须检验合格后方可使用。需方未经检验使用或检验不合格而使用所产生的损失供方不予负责。</li>
		            <li>4、逾期未在上述时间内办理异议，视为需方放弃主张权。</li>
		        </ul>
		        <ul class="u-section">
		            <li><h3 class="u-contract-title">八、结算方法及期限：</h3>
		            </li>
	                <template v-if="contract.balanceType === 1">
		                <li >1、需方应在
		                <span class="u-line-text" v-text="contract.balanceATime ? new Date(contract.balanceATime).formatDate('yyyy-MM-dd'):''"></span> 
		                                          前全额支付货款,先款后货。
		                </li>
		                <li>2、付款方式：电汇或银行转账方式,若支付银行承兑汇票,应先征得供方同意,并按照供方财务制度支付贴息利息。</li>
		                <li>3、合同执行完毕后,供方于
		                 <span class="u-line-text" v-text="contract.balanceAInvoiceTime"></span> 
		                                              日内开具增值税发票,
		                  <span class="u-line-text" v-text="contract.balanceACls"></span>                          
		                                            票结算。
		                </li>
	                </template>
		        
		                <li v-if="contract.balanceType === 2">&nbsp;&nbsp;先款后货：需方于
		                <span class="u-line-text" v-text="contract.balanceATime ? new Date(contract.balanceATime).formatDate('yyyy-MM-dd'):''"></span>  
		                                          支付全款。
		                </li>
		           <template v-if="contract.balanceType === 3">
		                <li >1、需方应在  <span class="u-line-text" v-text="contract.balanceATime ? new Date(contract.balanceATime).formatDate('yyyy-MM-dd'):''"></span>  
		                                                      前以电汇或银行转账方式支付本次货款。若需方未在合同规定期限内支付货款，则需方应自逾期之日起按
		                      <span class="u-line-text" v-text="contract.balanceInterest"></span>  
		                                                      每天的标准向供方支付逾期利息；逾期达到
		                    <span class="u-line-text" v-text="contract.interestDay"></span>  
		                                                  天，供方有权变更价格等交易条款或解除合同。需方须按合同总额的
		                    <span class="u-line-text" v-text="contract.balancePenalty"></span>
		                     &nbsp;向出卖方支付违约金，违约金不足以弥补出卖方损失的，需方应另行赔偿。
		                </li>
		                <li>2、付款方式：电汇或银行转帐方式，若支付银行承兑汇票，应先征得供方同意,并按照供方财务制度支付贴息利息。</li>
		                <li>3、合同执行完毕后，供方于
		                   <span class="u-line-text" v-text="contract.balanceAInvoiceTime"></span>
		                                                  日内开具增值税发票，
		                   <span class="u-line-text" v-text="contract.balanceACls"></span>
		                                              票结算。
		                </li>
		     
		            </template>
		             <template v-if="contract.balanceType === 4">
		          
		                <li>1、先货后款，需方于
		                  <span class="u-line-text" v-text="contract.balanceATime ? new Date(contract.balanceATime).formatDate('yyyy-MM-dd'):''"></span>
		                                              之前支付全款。
		                </li>
		                <li>2、如需方逾期付款，每推迟一天，需方须向供方支付
		                 <span class="u-line-text" v-text="contract.fine"></span>
		                                          元/吨/天的罚息，但最迟不得推迟7天支付。同时因需方逾期付款而造成供方实际损失的，需方须另行赔偿。
		                </li>
		         
		             </template>
		            <li v-if="contract.balanceType === 5" v-text="contract.other"></li>
		          
		        </ul>
		        <ul class="u-section">
		            <li><h3 class="u-contract-title">九、违约责任：</h3></li>
		         
                    <li v-if="contract.breakContractType===1">需方逾期付款，须向供方按合同金额
                    <span class="u-line-text" v-text="contract.breakContractMoneyRatio"></span>
                    %支付违约金；且供方有权单方面解除本合同并自行处置货物；给供方造成损失的，由需方承担赔偿责任。
                    </li>
		                
		            <li v-if="contract.breakContractType===2">按照《合同法》相关条款执行。</li>

		        </ul>
		        <ul class="u-section">
		            <li ><h3 class="u-contract-title">十、解决合同纠纷的方式：</h3></li>
		            <li>如发生争议或纠纷，双方应当友好协商解决，协商解决不成，向合同签订所在地人民法院提起诉讼。</li>
		        </ul>
		        <ul class="u-section">
		            <li ><h3 class="u-contract-title">十一、其他约定事项：</h3></li>
		            <li>1、货物风险自供方开具提货单后转由需方承担。需方必须在合同约定的交货时间内提完货物，否则因该批货物产生的所有费用及损失均由需方承担；</li>
		            <li>2、仓库出货时，凭供方提货单出货，供方不办理货场内转户手续；</li>
		            <li>3、未经双方协商一致，本合同债权、债务不得转让；</li>
		            <li>4、在需方未付清全部货款金额之前，供方对本合同项下的货物保留所有权。</li>
		            <li>5、本合同执行期间，供、需双方均不得变更或解除合同，若有变更需经双方共同认可签字盖章确认后方可执行。</li>
		            <li>6、本合同自双方盖章且供方收到需方全额货款之日起生效，至合同执行完毕止。</li>
		        </ul>
		        
		        
           <ul class="u-section">
              <li ><h3 class="u-contract-title">十二、双方同意点击确认之行为与签字并加盖公章之行为具备同等法律效力，且本合同与传统纸质合同具有同等法律效力。</h3></li>
           </ul>
           <table class="tb3 u-section">
               <caption>供方</caption>
               <tr>
                   <td class="label">单位名称：</td>
                   <td v-text="contract.sellerName"></td>
               </tr>
                <tr>
                   <td class="label">单位地址：</td>
                   <td v-text="contract.companyAddress"></td>
               </tr>
                <tr>
                   <td class="label">委托代理人：</td>
                   <td ></td>
               </tr>
                <tr>
                   <td class="label">开户银行：</td>
                   <td v-text="contract.bankName"></td>
               </tr>
                <tr>
                   <td class="label">账号：</td>
                   <td v-text="contract.bankAccount"></td>
               </tr>
               <tr>
                   <td class="label">电话：</td>
                   <td v-text="contract.phone"></td>
               </tr>
               <tr>
                   <td class="label">传真：</td>
                   <td v-text="contract.fax"></td>
               </tr>
               <tr v-if="stampUri &&( contract.contractStatus === 1 || contract.contractStatus === 6 || contract.contractStatus === 7 || contract.contractStatus === 8 || contract.contractStatus === 18)">
                 <td colspan="2">
                                <img :src="stampUri"/>
                 </td>
               </tr>
           </table>
           
           <table class="tb3 u-section">
               <caption>需方</caption>
               <tr>
                   <td class="label">单位名称：</td>
                   <td v-text="sapClientVOForDemander.sapName"></td>
               </tr>
                <tr>
                   <td class="label">单位地址：</td>
                   <td v-text="sapClientVOForDemander.companyAddress"></td>
               </tr>
                <tr>
                   <td class="label">委托代理人：</td>
                   <td ></td>
               </tr>
                <tr>
                   <td class="label">开户银行：</td>
                   <td v-text="sapClientVOForDemander.bankName"></td>
               </tr>
                <tr>
                   <td class="label">账号：</td>
                   <td v-text="sapClientVOForDemander.bankAccount"></td>
               </tr>
               <tr>
                   <td class="label">电话：</td>
                   <td v-text="sapClientVOForDemander.companyTelephone"></td>
               </tr>
               <tr>
                   <td class="label">传真：</td>
                   <td v-text="sapClientVOForDemander.companyFax"></td>
               </tr>
           </table>
	       </div>
	       <div  v-cloak v-if="contract.dataSource == 1" v-html="contract.contractContent" >
	       
	       </div>
	       
	     </div>
    </div>
    
    <div id="confirm-contract" v-cloak v-bind:class="[{'f-hide':!isShowConfirmContract}]">
        <div class="weui-mask weui-animate-fade-in"></div>
        <div class="weui-dialog weui-animate-fade-in">
            <div class="weui-dialog__hd">
                <strong class="weui-dialog__title">确认合同</strong>
            </div>
            <div class="weui-dialog__bd">
             <h3>手机号：{{phone}}</h3>
             <input class="u-ipt-min" v-model="vcode" /><button  id="get-vcode-btn" @click="getRandomCode();" class="weui-btn weui-btn_mini weui-btn_primary">获取短信验证码</button>
            </div>
            <div class="weui-dialog__ft">
                <a 
                    @click="hideConfirmContract();"
                    href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_default">取消</a> 
                    <a
                    @click="confirmContract();"
                    href="javascript:;"
                    class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
            </div>
        </div>
    </div>
    
    </div>
</body>
<script type="text/javascript">
    //加载主模板块
    seajs.use("module/ec/contract/buy-contract-detail");
</script>

</script>
</html>
