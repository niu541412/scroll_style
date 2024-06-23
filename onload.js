/*!
 * scroll's style v1.1.0
 * only_wsx@163.com
 * niu541412@gmail.com
 */

$(function(){
var config = {
	'backgroundColor': ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
	'opacity': 0.6,
	'borderRadius': '3px',
	'bar_width': '6px',
	'left': '19px',
	'top': '20px'
}

var rand = parseInt(19*Math.random());

$('<div class="wsx_fade"></div><div class="wsx_scroll"><div class="wsx_scroll_bar"></div></div>').appendTo('body');
$('.wsx_scroll_bar').css({'background-color': config.backgroundColor[rand], 'opacity': config.opacity, '-webkit-border-radius': config.borderRadius, 'width': config.bar_width, 'left': config.left});

$('<div class="niu_fade"></div><div class="niu_scroll"><div class="niu_scroll_bar"></div></div>').appendTo('body');
$('.niu_scroll_bar').css({'background-color': config.backgroundColor[rand], 'opacity': config.opacity, '-webkit-border-radius': config.borderRadius, 'height': config.bar_width, 'top': config.top});

$("body").wrapInner("<div class=niu_container1><div class=niu_container2></div></div>");
//ref: https://stackoverflow.com/questions/16670931#answer-16671476

var ctnr2 = document.getElementsByClassName("niu_container2")[0];
var content = document.documentElement?document.documentElement:document.body;
var change_y = $('.niu_container2').height();
var scrollShow_y = false;
var wsx_t;
var change_x = $('.niu_container2').width();
var scrollShow_x = false;
var niu_t;

ctnr2.style.paddingRight = ctnr2.offsetWidth - ctnr2.clientWidth + "px";
console.log(ctnr2.offsetWidth+"&"+ctnr2.clientWidth);
ctnr2.style.width = (ctnr2.offsetWidth - ctnr2.clientWidth)*2 + document.getElementsByClassName("niu_container1")[0].clientWidth + "px";

ctnr2.style.paddingBottom = ctnr2.offsetHeight - ctnr2.clientHeight + "px";
console.log(ctnr2.offsetHeight+"&"+ctnr2.clientHeight);
ctnr2.style.height = (ctnr2.offsetHeight - ctnr2.clientHeight)*2 + document.getElementsByClassName("niu_container1")[0].clientHeight + "px";

function upScrollHeight() {
	clearTimeout(wsx_t);
	clearTimeout(niu_t);
	var wHeight = $('.niu_container2').height();
	var wWidth  = $('.niu_container2').width();
	//var docElemProp = window.document.documentElement.clientHeight;
    //var wHeight = window.document.compatMode === "CSS1Compat" && docElemProp || window.document.body.clientHeight || docElemProp;
	var dHeight = $('.niu_container2')[0].scrollHeight;
	var dWidth  = $('.niu_container2')[0].scrollWidth;
	//var dHeight = window.document.height;
	var tmpScroll_y = $('.wsx_scroll');
	var tmpScroll_x = $('.niu_scroll');
	if(dHeight<=wHeight) {
		if (scrollShow_y == true) {
			tmpScroll_y.hide();
		}
		scrollShow_y = false;
    } else {
		tmpScroll_y.css({'display':'block', 'opacity':1 ,'pointer-events':'none'});
		scrollShow_y = true;
	}
	if(dWidth<=wWidth) {
		if (scrollShow_x == true) {
			tmpScroll_x.hide();
		}
		scrollShow_x = false;
    } else {
		tmpScroll_x.css({'display':'block', 'opacity':1 ,'pointer-events':'none'});
		scrollShow_x = true;
	}
	var scrollHeight = wHeight/dHeight*wHeight > 30 ? wHeight/dHeight*wHeight : 30;
	var scrollWidth  = wWidth /dWidth *wWidth  > 30 ? wWidth /dWidth *wWidth  : 30;
	var top = $('.niu_container2').scrollTop()/(dHeight-wHeight)*(wHeight-scrollHeight);
    tmpScroll_y.css({'top':top});
	tmpScroll_y.height(scrollHeight);
	var left = $('.niu_container2').scrollLeft()/(dWidth-wWidth)*(wWidth-scrollWidth);
    tmpScroll_x.css({'left':left});
	tmpScroll_x.width(scrollWidth);

	wsx_t=setTimeout(function(){
		tmpScroll_y.css({'opacity':0, 'pointer-events':'none'});
		scrollShow_y = false;
	},500);
	niu_t=setTimeout(function(){
		tmpScroll_x.css({'opacity':0, 'pointer-events':'none'});
		scrollShow_x = false;
	},500);
	//console.log(wHeight+' '+dHeight);
}
//setInterval use $().fadeOut() and i'll stop. why?
var init = window.setInterval(function() {
	if((change_y != ctnr2.scrollHeight)||(change_x != ctnr2.scrollWidth)) {
		change_y = ctnr2.scrollHeight;
		change_x = ctnr2.scrollWidth;
		upScrollHeight();
	}
},100);

$('.niu_container2').bind('scroll',function(){
	upScrollHeight();
});

$(window).bind('resize',function(){
	ctnr2.style.width = (ctnr2.offsetWidth - ctnr2.clientWidth)*2 + document.getElementsByClassName("niu_container1")[0].clientWidth + "px";
	ctnr2.style.height = (ctnr2.offsetHeight - ctnr2.clientHeight)*2 + document.getElementsByClassName("niu_container1")[0].clientHeight + "px";
	//console.log(ctnr2.style.width);
	upScrollHeight();
});

var always_y;
var always_x;
var mousedown_y = false;
var mousedown_x = false;
var startY;
var Y;
var startX;
var X;

$(window).bind('mousemove',function(event){
	if((ctnr2.clientWidth-event.clientX) < 40) {
	//console.log(ctnr2.clientWidth-event.clientX);
		if (scrollShow_y == false) {
			upScrollHeight();
		}
		clearTimeout(wsx_t)
		always_y = true;

	} else {
		if (always_y == true) {
			//console.log('always:'+always);
			always_y = false;
			wsx_t=setTimeout(function(){
				$('.wsx_scroll').css({'opacity':0, 'pointer-events':'none'})
				scrollShow_y = false;
			},500);
		}
	}
	if((ctnr2.clientHeight-event.clientY) < 40) {
  //console.log(content.clientWidth-event.clientX);
    if (scrollShow_x == false) {
      upScrollHeight();
    }
    clearTimeout(niu_t);
    always_x = true;

  } else {
    if (always_x == true) {
      //console.log('always:'+always);
      always_x = false;
      niu_t=setTimeout(function(){
        $('.niu_scroll').css({'opacity':0, 'pointer-events':'none'})
        scrollShow_x = false;
      },500);
    }
  }
	if (mousedown_y == true) {
	$('.wsx_fade').css({'pointer-events':'auto'});
		var endY=event.clientY;
		var top=endY-startY+Y;
		if(top<0){
			top=0;
		}
		var max_height=$('.niu_container2').height()-$('.wsx_scroll').height();
		if(top>max_height){
			top=max_height;
		}
		var scroll_top=top/($('.niu_container2').height()-$('.wsx_scroll').height())*($('.niu_container2')[0].scrollHeight-$('.niu_container2').height());
		$('.niu_container2').scrollTop(scroll_top);
	}
	if (mousedown_x == true) {
	$('.niu_fade').css({'pointer-events':'auto'});
		var endX=event.clientX;
		var left=endX-startX+X;
		if(left<0){
			left=0;
		}
		var max_width=$('.niu_container2').width()-$('.niu_scroll').width();
		if(left>max_width){
			left=max_width;
		}
		var scroll_left=left/($('.niu_container2').width()-$('.niu_scroll').width())*($('.niu_container2')[0].scrollWidth-$('.niu_container2').width());
		$('.niu_container2').scrollLeft(scroll_left);
	}
});

$(window).bind('mousedown',function(event){
	startY = event.clientY;
	startX = event.clientX;
	Y=$('.niu_container2').scrollTop()/($('.niu_container2')[0].scrollHeight-$('.niu_container2').height())*($('.niu_container2').height()-$('.wsx_scroll').height());
  X=$('.niu_container2').scrollLeft()/($('.niu_container2')[0].scrollWidth-$('.niu_container2').width())*($('.niu_container2').width()-$('.niu_scroll').width());

	if((content.clientWidth-event.clientX) < 40 && (content.clientWidth-event.clientX) >= 0) {
		//console.log(content.clientWidth-event.clientX);
		mousedown_y=true;
		window.document.onselectstart=function(){
			return false;
		};
	}
	if((content.clientHeight-event.clientY) < 40 && (content.clientHeight-event.clientY) >= 0) {
		mousedown_x=true;
		window.document.onselectstart=function(){
			return false;
		};
	}
});

$(window).bind('mouseup',function(event){
	document.onselectstart=null;
	mousedown_y=false;
	mousedown_x=false;
	$('.wsx_fade').css({'pointer-events':'none'});
	$('.niu_fade').css({'pointer-events':'none'});
});

});
