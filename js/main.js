(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
})(jQuery);
(function ($) {
    $.isPro = function () {
        return true;
    }
})(jQuery);
function path(d, s, w){
    return '<path d="' + d + '" style="' + s + '" stroke-width = "' + w +'"/>';
}
function appendCss(t, c, sc){
    var $style = $('<style id="box" type="text/css"></style>');
    $($('head')[0]).append($style);
    $style.append('li span.hz-box{display: inline-block; font-family:"楷体","楷体_gb2312"; font-size:58px; line-height: 85px; text-align: center; width:80px; height:80px;  color:#ffb8b8;margin-top: -2px}');
}
function update(){
    // 步骤条
    if($(".s-step0").hasClass("active")){
      $(".s-step0>b>b,.s-step0>div").addClass("active");
    }
    else if($(".s-step1").hasClass("active")){
      $(".s-step1>b>b,.s-step1>div,.s-step0>b>b,.s-step0>p,.s-step0>div").addClass("active");
    }
    else if($(".s-step2").hasClass("active")){
      $(".s-step2>b>b,.s-step2>div,.s-step1>p,.s-step1>b>b,.s-step1>div,.s-step0>b>b,.s-step0>p,.s-step0>div").addClass("active");
    }
    else if($(".s-step3").hasClass("active")){
      $(".s-step3>b>b,.s-step3>div,.s-step2>p,.s-step2>b>b,.s-step2>div,.s-step1>p,.s-step1>b>b,.s-step1>div,.s-step0>b>b,.s-step0>p,.s-step0>div").addClass("active");
    }
    else if($(".s-step4").hasClass("active")){
      $(".s-step4>b>b,.s-step4>div,.s-step3>p,.s-step3>b>b,.s-step3>div,.s-step2>p,.s-step2>b>b,.s-step2>div,.s-step1>b>b,.s-step1>p,.s-step1>div,.s-step0>b>b,.s-step0>p,.s-step0>div").addClass("active");
    }
    else{
      $(".s-step5>b>b,.s-step5>div,.s-step4>p,.s-step4>b>b,.s-step4>div,.s-step3>p,.s-step3>b>b,.s-step3>div,.s-step2>p,.s-step2>b>b,.s-step2>div,.s-step1>b>b,.s-step1>p,.s-step1>div,.s-step0>b>b,.s-step0>p,.s-step0>div").addClass("active");
    }
}
function clear(){
    $(".s-step").removeClass("active");
    $(".s-step>b>b").removeClass("active");
    $(".s-step>div").removeClass("active");
    $(".s-step>p").removeClass("active");
}

function back(){
    var active = $(".container").find(".active");
    var idx = active.attr("data-idx");
    $(".section").hide();
    $(".section").removeClass("active");
    $(".section"+(parseInt(idx)-1)).addClass("active");
    $(".section"+(parseInt(idx)-1)).show();
    clear();
    $(".s-step"+(parseInt(idx)-1)).addClass("active");
    update();
    if(idx == "1"){
        $(".back").hide();
        $(".status").hide();
    }else if(idx == "5"){
        $("#next").html("下&nbsp;&nbsp;一&nbsp;&nbsp;步");
    }
    return true;
}
function proDialog(){
    $( "#pro-dialog" ).dialog({
        dialogClass: "no-close",
        modal: true,
        draggable: false,
        width: '40%',
        buttons: [
            {
              text: "暂不下载",
              class: "upgrade-left",
              click: function() {
                $( this ).dialog( "close" );
              }
            },
            {
              text: "立即下载",
              class: "upgrade-btn",
              click: function() {
                $( this ).dialog( "close" );
                payDialog();
              }
            }
        ]
    });
}
function payDialog(){
    var blankWindow=window.open('_blank');
    blankWindow.location='https://www.shufazitie.net/download/win/index.html';
}
function generate(){
    var active = $(".container").find(".active");
    var idx = active.attr("data-idx");
    if(idx != "5"){
        $(".section").hide();
        $(".section").removeClass("active");
        $(".section"+(parseInt(idx)+1)).addClass("active");
        $(".section"+(parseInt(idx)+1)).show();
        $(".s-step").removeClass("active");
        $(".s-step"+(parseInt(idx)+1)).addClass("active");
        update();
        if(idx == "0"){
            $(".back").show();
            $(".status").show();
        }else if(idx == "4"){
            $("#next").html("生成字帖");
        }
        
        return true;
    }else{
        var url = "/print.html?ts="+new Date().getTime();
        var words = $("textarea[name='words']").val();
        if(words && words.length > 0){
            //url += words;
            window.localStorage.setItem('words', words.replace(/\n/g,"").replace(/\n/g,"").replace(/\n/g,""));
        }else{
            alert("请输入想要生成字帖的汉字！");
            return false;
        }
        var types = $('ul#type>li.selected');
        if(types && types.length > 0){
            if("&t=1&c=1&fc=0,176,80&sc=184,255,184" !== types.attr("data-url")){
                proDialog();
            }
        }else{
            alert("请选择合适的字框类型！");
            return false;
        }
        var compos = $('ul#composing>li.selected');
        if(compos && compos.length > 0){
            if(compos.attr("data-url")){
                proDialog();
            }
        }else{
            alert("请选择合适的文字排版！");
            return false; 
        }
        var hasPy = $('ul#hasPy>li.selected');
        if(hasPy && hasPy.length > 0){
            if(hasPy.attr("data-url")){
                proDialog();
            }
        }else{
            alert("请选择合适的拼音排版！");
            return false; 
        }
        var fillLine = $('ul#fillLine>li.selected');
        if(fillLine && fillLine.length > 0){
            if(fillLine.attr("data-url")){
                proDialog();
            }
        }else{
            alert("请选择是否需要填充行尾空余！");
            return false; 
        }
        window.location.href=url;
        return true;
    }
}
$(function (){
    var dictionary = [{"ch":"字","py":["zì"]}];
    var graphics = [{"ch":"字","sk":["M 467 799 Q 497 777 529 750 Q 545 737 564 739 Q 576 740 580 756 Q 584 774 571 807 Q 556 841 457 853 Q 438 854 432 852 Q 426 846 429 832 Q 435 819 467 799 Z","M 277 656 Q 277 677 254 696 Q 236 712 233 686 Q 237 656 194 602 Q 149 554 165 507 Q 166 498 171 491 Q 184 464 206 491 Q 221 512 268 623 L 277 656 Z","M 268 623 Q 289 611 326 619 Q 476 665 705 681 Q 730 684 741 681 Q 759 668 756 661 Q 756 657 725 583 Q 718 570 725 565 Q 732 561 749 573 Q 804 613 850 627 Q 887 640 887 649 Q 886 659 812 712 Q 788 730 707 714 Q 503 690 373 668 Q 324 661 277 656 C 247 653 239 632 268 623 Z","M 518 399 Q 642 495 669 501 Q 688 508 683 524 Q 680 540 614 578 Q 595 588 572 580 Q 511 558 418 532 Q 393 525 335 527 Q 311 528 319 508 Q 326 495 346 483 Q 377 467 411 486 Q 433 493 546 534 Q 559 538 571 532 Q 584 525 578 511 Q 545 465 508 409 C 491 384 494 381 518 399 Z","M 551 333 Q 536 381 518 399 L 508 409 Q 498 419 487 424 Q 477 431 471 423 Q 467 419 474 405 Q 490 371 500 328 L 507 289 Q 525 120 490 66 Q 489 65 487 62 Q 478 58 377 89 Q 367 92 360 88 Q 354 87 370 74 Q 437 19 475 -30 Q 493 -49 511 -40 Q 535 -27 553 27 Q 578 120 558 293 L 551 333 Z","M 558 293 Q 718 311 889 296 Q 911 293 918 301 Q 925 314 914 325 Q 886 352 844 371 Q 831 377 806 369 Q 737 356 667 346 Q 600 340 551 333 L 500 328 Q 491 331 308 309 Q 241 299 139 298 Q 126 299 124 288 Q 123 276 141 262 Q 157 250 187 238 Q 197 234 214 242 Q 230 246 303 259 Q 393 280 507 289 L 558 293 Z"]}];
    var word = ['字'];
    
    var firstWidth = "1.5";
    var width = "1.6";
    var svgStart = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.65, -0.65) translate(250, -1150)">';
    var svgEnd = '</g></svg>';
    var strHtml = "";
    var fontColors = ['0,176,80','0,0,0','152,15,41'];
    var subColors = ['184,255,184','184,184,184','255,184,184'];
    for(var t=1;t<=4;t++){
      for(var c=1;c<=3;c++){
          for(var f=1;f<=3;f++){
              var fc = fontColors[f-1];
              var sc = subColors[f-1];
              $('#box').remove();
              appendCss(t, c, sc);
              var firstStyle = "fill:rgb("+fc+");stroke:rgb("+fc+");";
              var style = "fill:rgb("+sc+");stroke:rgb("+sc+");";
              $.each(word, function(w, wd){
                $.each(graphics, function (n, info){
                    if(wd.indexOf(info.ch) > -1){
                        var html = '';
                        for(var i=0; i<1; i++){
                            var url = '&t='+t+'&c='+c+'&fc='+fc+'&sc='+sc;
                            if(t==1&&c==1&&f==1&&i==0){ 
                                html += '<li class="selected" data-url="'+url+'"><span class="hz-box svg" style="background:url(https://i.shufazitie.net/images/bg'+t+''+c+'.svg) left center no-repeat;">&nbsp;</span></li>';
                            }else{
                                html += '<li data-url="'+url+'"><span class="hz-box svg" style="background:url(https://i.shufazitie.net/images/bg'+t+''+c+'.svg) left center no-repeat;">&nbsp;</span></li>';
                            }
                        }
                        
                        var $html = $(html);
                        $html.find(".hz-box").each(function(index, element){
                            if(index == 0){
                                strHtml = svgStart;
                                if(info.sk.length > 0){
                                    for(var i=0; i<info.sk.length; i++){
                                        strHtml += path(info.sk[i], firstStyle, firstWidth);
                                    }
                                }
                                strHtml += svgEnd;
                                $(element).html(strHtml);
                            }
                        });
                        
                        $("ul#type").append($html);
                        $('ul#type>li').click(function () {
                            var durl = $(this).attr("data-url");
                            if("&t=1&c=1&fc=0,176,80&sc=184,255,184" !== durl){
                                proDialog();
                            }
                        });
                    }
                });
              });
          }
      }
    }

    $('ul#composing>li').click(function () {
        var durl = $(this).attr("data-url");
        if(durl){
            proDialog();
        }
    });

    $('ul#hasPy>li').click(function () {
        var durl = $(this).attr("data-url");
        if(durl){
            proDialog();
        }
    });

    $('ul#fillLine>li').click(function () {
        var durl = $(this).attr("data-url");
        if(durl){
            proDialog();
        }
    });
    $("*").attr("draggable",false);
  });