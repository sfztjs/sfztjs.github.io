(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
})(jQuery);
function path(d, s, w){
    return '<path d="' + d + '" style="' + s + '" stroke-width = "' + w +'"/>';
}
function printPDF(){
    var div = document.getElementById("operation");
    div.style.display = "none";
    window.print();
    div.style.display = "";
}
function help(){
    $("body").css("overflow-x","hidden");
    $( "#help-dialog" ).dialog({
        modal: true,
        draggable: false,
        width: '95%',
        beforeClose: function( event, ui ) {
            $("body").css("overflow-y","scroll");
        },
        buttons: []
    });
    $( ".ui-dialog" ).css("top","5px");
}

function appendCss(){
    var $style = $('<style type="text/css"></style>');
    $($('head')[0]).append($style);
    $style.append('li span.hz-box{display: inline-block; text-align: center; width:80px; height:80px;font-family:"楷体","楷体_gb2312"; font-size:58px; line-height: 85px; background:url(https://i.shufazitie.net/images/bg11.svg) left center no-repeat; color:rgb(184,255,184);margin-top: -2px}');
}
function genrow(w,info,svgStart, svgEnd, lines, firstStyle, style, firstWidth, width, strHtml){
    var left = 1;
    var l = 1;
    var grid = l * 12;
    var html = '';
    var strokesLength = info.sk.length + 1;
    lines += l;
    for(var i=0; i<grid; i++){
        html += '<li style="padding: 2px 0;"><span class="hz-box">&nbsp;</span></li>';
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
        }else{
            return false;
        }
    });
    if((w-1)%3===0){
        $html.find(".hz-box").addClass("svg77");
    }else{
        $html.find(".hz-box").addClass("svg75");
    }
    $("ul").append($html);
    return lines;
}

function draw(){
    var word = window.localStorage.getItem('words');
    if(!word || word == null || word == ''){
        word = $.getUrlParam('words');
    }
    window.localStorage.clear();
    appendCss();
    var words = word.split("");
    var firstStyle = "fill:rgb(0,176,80);stroke:rgb(0,176,80);";
    var style = "fill:rgb(184,255,184);stroke:rgb(184,255,184);";
    var firstWidth = "1.5";
    var width = "1.6";
    var svgStart = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.65, -0.65) translate(250, -1150)">';
    var svgEnd = '</g></svg>';
    var strHtml = "";
    var lines = 0;
    var num = words.length;
    var w = 0;
    var intv = setInterval(function(){
        var wd = words[w++];
        if(num--){
            var code = wd.charCodeAt(0).toString(16);
            $.ajaxSettings.async = false;
            $.getJSON('core/' + code, function (data){
                console.log("index:" + w + " word:"+wd + " json:" + data);
                lines = genrow(w, data, svgStart, svgEnd, lines, firstStyle, style, firstWidth, width, strHtml);
            });
        } else {
            var mod = 13;
            var last = mod - lines % mod ;
            var g = last * 12;
            var lastHtml = '';
            for(var i=0; i<g; i++){
                lastHtml += '<li style="padding: 2px 0;"><span class="hz-box">&nbsp;</span></li>';
            }
            $("ul").append(lastHtml);
            window.clearInterval(intv);
        }
    }, 50);
}
$(function (){
    draw();
});