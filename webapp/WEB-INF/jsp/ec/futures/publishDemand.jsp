<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
<title>发布需求</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.all.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/weui/weui-1.12.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/module/ec/futures/publishDemand.css" />
<script type="text/javascript" id="seajsnode" src="${ctx}/js/seajs/sea-all.min.js"></script>

<body>
	<div id="app">
	
	   <div id="g-page" class="weui-tab g-page">
            <div class="weui-navbar">
                <div @click="viewQuote($event)" class="weui-navbar__item">
                                         报价单
                </div>
                <div class="weui-navbar__item weui-bar__item_on">
                                    发布需求
                    <a @click="toOrder($event)" href="javascript:void(0)" class="m-shop-car"  >
                            <span class="num" v-text="shopingCartCount">0</span>
                    </a>
                </div>
            </div>
            <div class="weui-tab__panel">
                <!-- 导航  start-->
                <div class="weui-cells">
		             <!-- 卖家选择  start-->
		            <div class="weui-cell weui-cell_select weui-cell_select-after">
		                <div class="weui-cell__hd">
		                    <label for="" class="weui-label">卖家</label>
		                </div>
		                <div class="weui-cell__bd">
		                    <select class="weui-select"  v-model="sellerMemberId">
		                        <option  v-for="e in listSellers" v-bind:value="e.sellerId" v-text="e.sellerName"></option>
		                    </select>
		                </div>
		            </div>
		             <!-- 卖家选择end -->
		            <a class="weui-cell weui-cell_access" href="${ctx }/ec/preorder/prePhotoOrder2">
		                <div class="weui-cell__hd">
		                <img src="../../../images/icons/icon_photo.png" alt=""
		                 style="width:30px;height:30px;margin-right:5px;display:block"></div>
		                <div class="weui-cell__bd">
		                    <p>照片下单</p>
		                </div>
		                <div class="weui-cell__ft">上传照片直接下单</div>
		            </a>
		            
		            <div class="weui-cells__title">品名</div>
                <div class="weui-btn-area">
                    <a 
                    v-for="e in listBrands"
                    :key="e.id"
                    v-text="e.brandName"
                    v-bind:class="['weui-btn','weui-btn_mini',{'weui-btn_default':!brand || e.id!==brand.id},{'weui-btn_warn':brand && e.id === brand.id}]"
                    @click="setBrand(e)"
                    ></a>
                </div>
                
                <div class="weui-cells__title">钢厂</div>
                <div class="weui-btn-area">
                    <a 
                    v-for="e in listSteelWorks"
                    :key="e.id"
                    v-text="e.steelWorkName"
                    v-bind:class="['weui-btn','weui-btn_mini',{'weui-btn_default':!steelWork || e.id !== steelWork.id},{'weui-btn_warn':steelWork && e.id === steelWork.id}]"
                    @click="setSteelWork(e)"
                    ></a>
                    <select @change="setOtherSteelWork($event)" v-if="steelWork && steelWork.steelWorkName === '其他'">
                        <option v-for="e in listOtherSteelWorks" v-bind:value="JSON.stringify(e)"  v-text="e.steelWorkName" ></option>
                    </select>
                   <!-- 
                    <input v-if="steelWork && steelWork.steelWorkName === '其他'"
                        maxlength="20"
                        class="other-input" v-model="otherSteelWorkName"
                        placeholder="请输入钢厂名" /> -->
                </div>
                <div class="weui-cells__title">规格</div>
                <div class="weui-btn-area">
                    <a 
                    v-for="(e,index) in listSpecifications"
                    :key="e.specificationId"
                    v-text="e.specificationName"
                    v-bind:class="['weui-btn','weui-btn_mini',{'weui-btn_default':!specification || e.specificationId!==specification.specificationId},{'weui-btn_warn':specification && e.specificationId === specification.specificationId}]"
                    @click="setSpecification(e)"
                    ></a>
                    <select @change="setOtherSpecification($event)" v-if="specification && specification.specificationName === '其他'">
                        <option v-for="e in listOtherSpecifications" v-bind:value="JSON.stringify(e)"  v-text="e.specificationName" ></option>
                    </select>
                 <!--    <input v-if="specification && specification.specificationName === '其他'" 
                     class="other-input" v-model="otherSpecificationName" 
                     maxlength="20"
                      placeholder="请输入其他规格" /> -->
                </div>
                <div class="weui-cells__title">材质</div>
                <div class="weui-btn-area">
                    <a 
                    v-for="e in listTextures"
                    :key="e.id"
                    v-text="e.textureName"
                    v-bind:class="['weui-btn','weui-btn_mini',{'weui-btn_default':!texture || e.id!==texture.id},{'weui-btn_warn':texture && e.id === texture.id}]"
                    @click="setTexture(e)"
                    ></a>
                    <select @change="setOtherTexture($event)" v-if="texture && texture.textureName === '其他'">
                        <option v-for="e in listOtherTextures" v-bind:value="JSON.stringify(e)"  v-text="e.textureName" ></option>
                    </select>
                  <!--    <input v-if="texture && texture.textureName === '其他'"
                       maxlength="20" 
                       class="other-input" v-model="otherTextureName" 
                       placeholder="请输入其他材质" /> -->
                </div>
                
                <div class="weui-cell">
	                <div class="weui-cell__hd"><label for="" class="weui-label">宽度</label></div>
	                <div class="weui-cell__bd">
	                    <input class="weui-input" v-model.number="width"
	                    type="number" pattern="[0-9]*"  
	                    @blur="checkNumberVal('width',0);"
	                     placeholder="请输入宽度" />
	                </div>
	                <div class="weui-cell__ft">
	                    <!-- <i class="weui-icon-warn"></i> -->
	                </div>
	            </div>
                
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label for="" class="weui-label">
                                                             厚度
                        </label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model.number="thickness" 
                        type="number"  pattern="[0-9]*[\.][0-9]{0,2}" 
                          @blur="checkNumberVal('thickness',2);"
                         placeholder="请输入厚度" />
                    </div>
                    <div class="weui-cell__ft">
                       <a class="f-add-price" @click="showAddPrice();" href="javascript:void(0);" >查看加价厚度</a>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label for="" class="weui-label">下单量</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model.number="buyWeight"
                        type="number" pattern="[0-9]*[\.][0-9]{0,2}" 
                        @blur="checkNumberVal('buyWeight',2);"
                         placeholder="请输入下单重量" />
                    </div>
                    <div class="weui-cell__ft">
                                                    吨
                        <!-- <i class="weui-icon-warn"></i> -->
                    </div>
                </div>
                <div class="weui-btn-area">
		            <a class="weui-btn weui-btn_primary" @click="addShopingCart()" href="javascript:void(0)" >加到购物车</a>
		        </div>
		        
		        </div>
		        
               
               <!-- start  recent-buy-record-list-->
		       <div id="recent-buy-record-list" v-bind:class="['m-recent-buy-record-list',{'hide':isFullHideRecentlyBuyRecord}]" >
		                  <div class="recent-buy-title f-cb"  >
		                                                        最近购买
		                     <span @click="toggelRecentlyBuyRecord();" v-bind:class="['u-push',{'push-down':isShowRecentlyBuyRecord}]"></span>
		                  </div>
		            
		                  <div  v-bind:class="['swiper-container','swiper-container-horizontal',{'hide':isShowRecentlyBuyRecord}]">
		                      <div class="swiper-wrapper">
		                          <div  v-for="p in recentlyBuyRecordList" class="swiper-slide">
		                            <ul>
		                                <li v-for="d in p" class="f-cb">
		                                    <div class="text">
		                                         <p class="desc" v-text="d.brandNameDesc+'  '+d.textureDesc+'*'+ d.specification +'   '+ d.placeSteelDesc">test test*test</p>
		                                    </div>
		                                    <a class="u-shop-car" href="javascript:void(0);" 
		                                     data-brandId="" 
		                                     data-textureId=""
		                                     data-specification=""
		                                     @click="recentAddShopCart(d.brandName,d.brandNameDesc,d.placeSteel,d.placeSteelDesc,d.specification,d.texture,d.textureDesc,d.buyWeight)" 
		                                     ></a>
		                                </li>
		                            </ul>
		                        </div>              
		                  </div>
		                  <div class="swiper-pagination"></div>
		              </div>
		        
		         </div>   
		        <!-- end recent-buy-record-list -->
                <!-- 导航  end-->
            </div>
        </div>
        

        <!-- start thickness-price -->
		<div id="thickness-price"  v-bind:class="['m-thickness-price',{'show':isShowAddPrice}]" >
			<div class="weui-mask" @click="hideAddPrice"></div>
			
			<div class="content">
			     <div class="f-cb">
	                 <i class="iconfont u-back-left" @click="hideAddPrice" ></i>
	                 <h3 class="u-title">厚度加价</h3>
	            </div>
				<div class="weui-cells" style="margin-top: 0;" >

					<div class="weui-cell weui-cell_select weui-cell_select-after">
						<div class="weui-cell__hd">
							<label for="" class="weui-label">品名</label>
						</div>
						<div class="weui-cell__bd">
							<select class="weui-select" @change="setThicknessBrand($event)" >
								<option 
								    v-for="e in listBrands"
				                    :key="e.id"
				                    v-text="e.brandName"
				                    v-bind:value="JSON.stringify(e)"
				                    v-bind:selected="(thicknessBrand && thicknessBrand.id  === e.id) ? 'selected':''"
								></option>
							
							</select>
						</div>
					</div>
					<div class="weui-cell weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">钢厂</label>
                        </div>
                        <div class="weui-cell__bd">    
                            <select class="weui-select" @change="setThicknessSteelWork($event)"  >
                                <option 
                                    v-for="e in listThicknessSteelWorks"
                                    :key="e.id"
                                    v-text="e.steelWorkName"
                                    v-bind:value="JSON.stringify(e)"
                                    v-bind:selected="(thicknessSteelWork && thicknessSteelWork.id  === e.id) ? 'selected':''"
                                ></option>
                            
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label for="" class="weui-label">规格</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" @change="setThicknessSpecification($event)" >
                                <option 
                                    v-for="e in listThicknessSpecifications"
                                    :key="e.specificationId"
                                    v-text="e.specificationName"
                                    v-bind:value="JSON.stringify(e)"
                                    v-bind:selected="(thicknessSpecification && thicknessSpecification.specificationId  === e.specificationId) ? 'selected':''"
                                ></option>
                            
                            </select>
                        </div>
                    </div>
                    <table class="table-add-price">
                        <thead>
                            <tr>
                                <th>厚度</th>
                                <th>加价(元)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in listThicknessAddPrices">
                                <td v-text="e.thickness"></td>
                                <td v-text="e.thicknessPrice"></td>
                            </tr>
                        </tbody>
                    </table>
				</div>
			</div>
		</div>
		<!-- end  thickness-price-->
		
		  
	</div> 
   
</body>
<script type="text/javascript">
	//加载主模板块
	seajs.use("module/ec/futures/publishDemand");
</script>

