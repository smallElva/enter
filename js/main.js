var flag = 0;
var isStart = 0, isStart2 = 0;
var rotate = 1, addFlag = 0, removeFlag = 0;
var v1;
if (IsPC()) {


} else {
    if ($("html").width() / $("html").width() < 1) {
        if ($("html").width() < 415 && $("html").height() < 737) {
            $(".sdw-pc").remove();
        }
    } else {
        if ($("html").width() < 737 && $("html").height() < 415) {
            $(".sdw-pc").remove();
        }
    }
}


var old_w = 0;
$(function () {
    fontResize();
    $(window).resize(function () {
        fontResize();
    });
    $(".btn-sd").click(function(){
        if($("html").width() < 769){
//          var dataratio = $(".sdw-container7").attr("data-ratio",'')
            $(".ie8 .sdw-container1 .sdw1_iphone").css("top","auto");

        }
        var $this = $(this);
        $(this).parent(".sdw-container").next(".btn_sdw").slideToggle(1500);
        setTimeout (function(){
            console.log($this);
            $this.fadeOut();
            $this.siblings("a").fadeIn();
        },1300);
    });
});
var sdw_hw = new sdw_hw({
    mainObj: $("#content"),
    containerObj: $(".block"),
    animateObj: ".sdw-animate",
    easing: "easeIn",
    topHalf: 0.2,
    bottomHalf: 0.2,
    single: [{
        eq: $(".sdw-container4"),
        topH: 0,
        bottomH: 0,
        addEvent: function (self) {

            removeFlag = 0;
            if (addFlag == 0) {

                addFlag++;

                if (isStart == 1) {
                    if (rotate == 1) {
                        v1.animate1("", Math.round(1000 / 24))
                    } else if (rotate == 2) {
                        v1.animate2(Math.round(1000 / 24))
                    }
                }
                isStart2 = 2;

            }

        },
        removeEvent: function (self) {

            addFlag = 0;
            if (removeFlag == 0) {
                removeFlag++;
//                    v1.stop();
            }

        }
    }],
    addEvent: function (self) {
        self.addClass("active");
    },
    removeEvent: function (self) {
        self.removeClass("active");
    },
    imgCompEvent: function () {
        sdw_hw.setHeight();

    }
});
function fontResize() {

    var sdw_width = $("html").width();
    if (old_w == sdw_width) {
        return;
    }
    var w = sdw_width / 1920;
    var fs = sdw_width / 1920;
    var title = 60;
    var title3 = 39;
    var title30 = 30;
    var ctx = 20;
    var ps = 18;
    if (fs < 0.4 && sdw_width > 768) {
        fs = 0.4;
    }

    if (sdw_width < 769) {
        fs = sdw_width / 750;
        title = 40;
        title3 = 35;
        title30 = 30;
        ctx = 20;
        ps = 14;
        ctx = ctx * fs;
        title =title * fs;
        title3 =title3 * fs;
        title30 =title30 * fs;
    } else {
        ctx = ((ctx * fs) < 14 ? 14 : (ctx * fs));
        title = ((title * fs) <25 ? 25 : (title * fs));
        title3 = ((title3 * fs) <25 ? 25 : (title3 * fs));
        title30 = ((title30 * fs) <18 ? 18 : (title30 * fs));
    }
    if (sdw_width > 768 && sdw_width < 1200) {
        fs = 0.8;
    }
    $(".block").css({"font-size": 30 * (sdw_width < 769 ? (sdw_width / 750) : w) + "px"});
    $(".title").css({"font-size": title + "px", "margin-bottom": 35 * w,"line-height": title * 1.3  + "px"});
    $(".title2").css({"font-size": title + "px", "margin-bottom": 30 * w,"line-height": title * 1.3  + "px"});
    $(".title3").css({"font-size": title3 + "px", "margin-bottom": 30 * w, "line-height": title3 * 1.3  + "px"});
    $(".title4").css({"font-size": title3 + "px", "margin-bottom": 130 * w, "line-height": title3 * 1.3  + "px"});
    $(".title5").css({"font-size": title3 + "px", "margin-bottom": 80 * w, "line-height": title3 * 1.3  + "px"});
    $(".title30").css({"font-size": title30 + "px"});
    $(".ps").css({"font-size": ps * fs + "px","line-height": ps * 1.3  + "px"});
    $(".sup").css({"font-size": 14 * fs + "px"});
    $(".sup2").css({"font-size": 16 * fs + "px"});
    $(".ctx").css({"font-size": ctx + "px",  "line-height": ctx * 1.4 + "px"});
    $(".ctx3").css({"font-size": ctx + "px", "margin-bottom": 140 * w, "line-height": ctx * 1.4 + "px"});
    $(".ctx2").css({"font-size": ctx + "px","line-height": ctx * 1.4 + "px"});
    $(".ctx4").css({"font-size": ctx + "px", "margin-bottom": 50 * w, "line-height": ctx * 1.4 + "px"});
    $(".btn").css({"font-size": 18 * fs + "px"});
    $(".line").css({"margin-bottom":5* w,"margin-top":5* w, "font-size": 45 * fs + "px"});
}
function IsPC()
{
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "BlackBerry", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

