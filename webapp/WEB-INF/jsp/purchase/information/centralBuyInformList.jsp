<%@page contentType="text/html; charset=utf-8"%>


<script type="text/javascript">
var pageno=1;  //页号，第几页
var rowsize=10; //每页数据条数
var pageCount = 1; //总页数
var url = "${ctx}/central/information/informListPage?" + "rowsize=" + rowsize;
var querytype="";//查询竞价单类型
var objTpl =  $("#listPageTpl").html(); //目标模板 
 
$(function(){
	pullDownAction(); 
});

/***** loading ajax  加载转圈遮罩 *****/

$(document).on('ajaxStop', function () {  
    $.mobile.loading('hide');
 
});   

/***** loading class="show-page-loading-msg" click  加载转圈遮罩开始 *****/
$(document).on("click", ".show-page-loading-msg", function() {
    setTimeout(function () {  
        $.mobile.loading('show');  
    }, 1); 	
}); 


var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset;
/** 下拉刷新   */
function pullDownAction() {	
	$("#listpage").empty();
	
    //setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
    	
    	pageno = 1;
		
		$.ajax({
 			'type' : 'get', 
			'url' : url +"&querytype="+ querytype +"&pageno="+ pageno+"&_t="+ new Date().getTime(),
			'success' : function(ret) {

				if (ret) {
					pageCount = ret.total;//总页数
							
					var resultText;
					if (ret.list.length>0){
						objTpl = $("#listPageTpl").html();
						var  tempFn = doT.template(objTpl);
						resultText = tempFn(ret.list);
					}else{
						objTpl =  $("#empty").html(); //目标模板 
						resultText = doT.template(objTpl);
					}
										
					$("#listpage").append(resultText);	
					myScroll.refresh(); 
				}
			},
			'failure' : function() {
				alert("数据访问错误，请稍后再试");
			}
		});
        		
        //myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    //}, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

/** 上拉增加数据   */
function pullUpAction () {
    //setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
		++pageno;
				
		if (pageno > pageCount) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多数据了...';
			return;
		}

		$.ajax({
			'type' : 'get',
			'url' : url +"&querytype="+ querytype+"&pageno="+ pageno+"&_t="+ new Date().getTime() ,
			'success' : function(ret) {
				if (ret) {			
					pageCount = ret.total;//总页数
					
					objTpl = $("#listPageTpl").html(); //目标模板
					var tempFn = doT.template(objTpl);
					var resultText = tempFn(ret.list);
					$("#listpage").append(resultText);	
					myScroll.refresh(); 
				} else {
		            pullUpEl.className = '';
		            pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多数据了...';
				}

			},
			failure : function() {
				alert("数据访问错误，请稍后再试");
			}

		});
        
        //myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    //}, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');   
    pullUpOffset = pullUpEl.offsetHeight;
    
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';                
                pullDownAction();   // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });
    
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

/*********** 页面跳转 *********/
/**根据infoId打开消息详情页面  */
function openInform(informId) {

	window.location.href ="${ctx}/central/information/informDetail?informId=" + informId+"&t="+Math.random()
}
		
</script>

