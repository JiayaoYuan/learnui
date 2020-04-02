"use strict"; 
(function() {
    var method;
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
} ());
$(window).on('resize',function() {
    var slideHeight = $('.slick-track').innerHeight();
    return false;
});
var $root = $('html, body');
$('a.s-scroll').on('click',function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    },
    500,
    function() {
        window.location.hash = href;
    });
    return false;
});
$(window).load(function() {
    $('#page-loader').addClass('hidden');
});
var dateReadableText = 'Upcoming date';
if ($('.site-config').attr('data-date-readable') && ($('.site-config').attr('data-date-readable') != '')) {
    $('.timeout-day').text('');
    dateReadableText = $('.site-config').attr('data-date-readable');
    $('.timeout-day').text(dateReadableText);
}
$('.clock-countdown').downCount({
    date: $('.site-config').attr('data-date'),
    offset: +10
},
function() {
    var zerodayText = 'An upcoming date';
    if ($('.site-config').attr('data-zeroday-text') && ($('.site-config').attr('data-zeroday-text') != '')) {
        $('.timeout-day').text('');
        zerodayText = $('.site-config').attr('data-zeroday-text');
    }
    $('.timeout-day').text(zerodayText);
});
$(function() {
    $("#second-knob").knob();
});
var background = '#ccc';
var backgroundMask = 'rgba(255,255,255,0.92)';
var backgroundVideoUrl = 'none';
var list = $('.bg-img');
for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-image-src');
    list[i].style.backgroundImage = "url('" + src + "')";
    list[i].style.backgroundRepeat = "no-repeat";
    list[i].style.backgroundPosition = "center";
    list[i].style.backgroundSize = "cover";
}
var list = $('.bg-color');
for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-bgcolor');
    list[i].style.backgroundColor = src;
}
var imageList = $('.slide-show .img');
var imageSlides = [];
for (var i = 0; i < imageList.length; i++) {
    var src = imageList[i].getAttribute('data-src');
    imageSlides.push({
        src: src
    });
}
$(function() {
    $('.slide-show').vegas({
        delay: 5000,
        shuffle: true,
        slides: imageSlides,
        animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
    });
});
$(function() {
    $('.video-container video, .video-container object').maximage('maxcover');
});
$(function() {
    if (backgroundVideoUrl != 'none') {
        if ($(window).width() > 640) {
            $.okvideo({
                source: backgroundVideoUrl,
                adproof: true
            });
        }
    }
});
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var pageElem = $('.page');
$(document).ready(function() {
    $('#mainpage').fullpage({
        menu: '#qmenu',
        anchors: ['home', 'when', 'about-us', 'contact'],
        scrollOverflow: true,
        css3: false,
        navigation: true,
        onLeave: function(index, nextIndex, direction) {
            arrowElem.addClass('gone');
            pageElem.addClass('transition');
            slideElem.removeClass('transition');
            isSlide = false;
        },
        afterLoad: function(anchorLink, index) {
            arrowElem.removeClass('gone');
            pageElem.removeClass('transition');
            if (isSlide) {
                slideElem.removeClass('transition');
            }
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            slideElem.removeClass('transition');
            isSlide = true;
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction) {
            if (isSlide) {
                slideElem.addClass('transition');
            }
        },
        afterRender: function() {}
    });
});
//设置cookie
function setCookie(cname,cvalue,extimes){
    var d = new Date();
    d.setTime(d.getTime()+(getsec(extimes)));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
//得到cookie
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
//核实cookie
function checkCookie(name, value, time){
    var user=getCookie(name);
    if (user==""){                  
        if (value!="" && value!=null){
            setCookie(name ,value, time);
            return false;
        }
    }else{
        console.log("已存在： "+name+" = "+user);
        return true;
    }
}

// s10 十秒  h10 十小时  d10十天
function getsec(str)
{
   var str1=str.substring(1,str.length)*1;
   var str2=str.substring(0,1);
   if (str2=="s")
   {
        return str1*1000;
   }
   else if (str2=="h")
   {
       return str1*60*60*1000;
   }
   else if (str2=="d")
   {
       return str1*24*60*60*1000;
   }
}