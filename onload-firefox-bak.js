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
	'width': '6px',
	'left': '19px'
}

var rand = parseInt(19*Math.random());

$('<div class="wsx_fade"></div><div class="wsx_scroll"><div class="wsx_scroll_bar"></div></div>').appendTo('body');
$('.wsx_scroll_bar').css({'background-color': config.backgroundColor[rand], 'opacity': config.opacity, '-webkit-border-radius': config.borderRadius, 'width': config.width, 'left': config.left});

$("body").wrapInner("<div class=sss1><div class=sss2></div></div>");
//ref: https://stackoverflow.com/questions/16670931#answer-16671476

var content = document.getElementsByClassName("sss2")[0];
var content2 = document.documentElement?document.documentElement:document.body;
var change = $('.sss2').height();
var scrollShow = false;
var wsx_t;

content.style.paddingRight = content.offsetWidth - content.clientWidth + "px";
console.log(content.offsetWidth+"&"+content.clientWidth);
content.style.width = (content.offsetWidth - content.clientWidth)*2 + document.getElementsByClassName("sss1")[0].clientWidth + "px";

function upScrollHeight() {
	clearTimeout(wsx_t)
	var wHeight = $('.sss2').height();
	//var docElemProp = window.document.documentElement.clientHeight;
    //var wHeight = window.document.compatMode === "CSS1Compat" && docElemProp || window.document.body.clientHeight || docElemProp;
	var dHeight = $('.sss2')[0].scrollHeight;
	//var dHeight = window.document.height;
	var tmpScroll = $('.wsx_scroll');
	if(dHeight<=wHeight) {
		if (scrollShow == true) {
			tmpScroll.hide();
		}
		scrollShow = false;
    } else {
		tmpScroll.css({'display':'block', 'opacity':1 ,'pointer-events':'none'});
		scrollShow = true;
	}

	var scrollHeight = wHeight/dHeight*wHeight > 30 ? wHeight/dHeight*wHeight : 30;
	var top = $('.sss2').scrollTop()/(dHeight-wHeight)*(wHeight-scrollHeight);
    tmpScroll.css({'top':top});
	tmpScroll.height(scrollHeight);

	wsx_t=setTimeout(function(){
		tmpScroll.css({'opacity':0, 'pointer-events':'none'});
		scrollShow = false;
	},500);
	//console.log(wHeight+' '+dHeight);
}
//setInterval use $().fadeOut() and i'll stop. why?
//$("body").css("overflow","hidden");
//$("html").css("overflow","hidden");
var init = window.setInterval(function() {
	if(change != content.scrollHeight) {
		change = content.scrollHeight;
		upScrollHeight();
	}
},100);

$('.sss2').bind('scroll',function(){
	upScrollHeight();
});

$(window).bind('resize',function(){
	content.style.width = (content.offsetWidth - content.clientWidth)*2 + document.getElementsByClassName("sss1")[0].clientWidth + "px";
	console.log(content.style.width);
	upScrollHeight();
});

var always;
var mousedown = false;
var in_mousedown = false;
var startY;
var Y;

$(window).bind('mousemove',function(event){
	if((content.clientWidth-event.clientX) < 40) {
	//console.log(content.clientWidth-event.clientX);
		if (scrollShow == false) {
			upScrollHeight();
		}
		clearTimeout(wsx_t)
		always = true;

	} else {
		if (always == true) {
			//console.log('always:'+always);
			always = false;
			wsx_t=setTimeout(function(){
				$('.wsx_scroll').css({'opacity':0, 'pointer-events':'none'})
				scrollShow = false;
			},500);
		}
	}
	if (mousedown == true) {
	$('.wsx_fade').css({'pointer-events':'auto'});
		var endY=event.clientY;
		var top=endY-startY+Y;
		if(top<0){
			top=0;
		}
		var max_height=$('.sss2').height()-$('.wsx_scroll').height();
		if(top>max_height){
			top=max_height;
		}
		var scroll_top=top/($('.sss2').height()-$('.wsx_scroll').height())*($('.sss2')[0].scrollHeight-$('.sss2').height());
		$('.sss2').scrollTop(scroll_top);
	}

});

$(window).bind('mousedown',function(event){
	startY = event.clientY;
	Y=$('.sss2').scrollTop()/($('.sss2')[0].scrollHeight-$('.sss2').height())*($('.sss2').height()-$('.wsx_scroll').height());

	if((content2.clientWidth-event.clientX) < 40 && (content2.clientWidth-event.clientX) >= 0) {
		//console.log(content2.clientWidth-event.clientX);
		mousedown=true;
		window.document.onselectstart=function(){
			return false;
		};
	}
});
$(window).bind('mouseup',function(event){
	document.onselectstart=null;
	mousedown=false;
	$('.wsx_fade').css({'pointer-events':'none'});
});

});
