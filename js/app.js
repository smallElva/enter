/**
 * Created by enter on 2017/9/15.
 */

$(function () {

    // 弹出框解决闪屏问题以及移动端弹窗禁止背景滑动方法初始化.
    browserRedirect();


    /***
     * 移动端轮播左右滑动效果-start
     *
     *
     * **/
    // 获取手指在轮播图元素上的一个滑动方向（左右）
    // 获取界面上轮播图容器
    var $carousels = $('.carousel');
    var startX,endX;
    // 在滑动的一定范围内，才切换图片
    var offset = 50;
    // 注册滑动事件
    $carousels.on('touchstart',function (e) {
        // 手指触摸开始时记录一下手指所在的坐标x
        startX = e.originalEvent.touches[0].clientX;

    });
    $carousels.on('touchmove',function (e) {
        // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend',function (e) {
        //console.log(endX);
        //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
        //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
        var distance = Math.abs(startX - endX);
        if (distance > offset){
            //说明有方向的变化
            //根据获得的方向 判断是上一张还是下一张出现
            $(this).carousel(startX >endX ? 'next':'prev');
        }
    });
    /***
     * 移动端轮播左右滑动效果-end
     *
     *
     * **/


    /***
    * 尾部点击微博、微信、qq弹出二维码--start
    *
    *
    * **/
    $(".js_weibo,.js_weixin,.js_qq").on('click',function (e) {
        e.stopPropagation();
        if($(event.target).is($('.js_weibo'))){
            $('.codesImgs').attr('src','images-xs/weibo-img.jpg')//点击的对象如果是微博显示微博的二维码
        }if($(event.target).is($('.js_weixin'))){
            $('.codesImgs').attr('src','images-xs/wechatPay.png')//点击的对象如果是微信显示微信的二维码
        }if($(event.target).is($('.js_qq'))){
            $('.codesImgs').attr('src','images-xs/timg.jpg')     //点击的对象如果是qq显示qq的二维码
        }

        $('#codesDiv').addClass('codesDivBottom');
        $('.overLay').show();
    });
    $(document).on('click', function(e) { //点击页面除了id="codesDiv"之外的任何区域都关闭该div
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'codesDiv') {
                return;
            }
            elem = elem.parentNode;
        }
        $('.overLay').hide(); //关闭阴影
        $('#codesDiv').removeClass('codesDivBottom'); //关闭该div
    });
    /***
     * 尾部点击微博、微信、qq弹出二维码-end
     *
     *
     * **/



    /***
     * 移动端导航部分动画-start
     *
     *
     * **/
    $(".navIcons-xs").click(function(){
        $(this).find('.nav-iconOpen').toggleClass("icon-daohang4 icon-close");
        $('html').toggleClass('noscroll');
        $(".mobile-inner-nav").slideToggle(250);
    });
    $(".mobile-inner-nav a").each(function( index ) {
        $( this ).css({'animation-delay': (index/10)+'s'});
    });
    /***
     * 移动端导航部分动画--end!
     *
     *
     * **/


    var num = $('#cartTable .item').length;
    var numB = num-3;
    if(numB <= 0){
        $('#foot').removeClass('fixed-bottom');
    }
    //当屏幕向下滚时，导航栏固定在顶部
    $(document).scroll(function () {
        var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var bodyWidth =document.body.clientWidth;//网页可见区域宽
        if(bodyWidth <= 991){
            if(scrollHeight>0){
                $('.header-page-xs').addClass('header-page-fixed');
            }else{
                $('.header-page-xs').removeClass('header-page-fixed');
            }

        }
        if(numB > 0){
            if (scrollHeight >= (numB*150+80)) {
                $('#foot').removeClass('fixed-bottom');
            }else{
                $('#foot').addClass('fixed-bottom');
            }
        }
        if (scrollHeight >  82) {
            $('.header').addClass('fixed-top');
            $('#toTop').fadeIn();
        }else{
            $('.header').removeClass('fixed-top');
            $('#toTop').fadeOut();
        }
    });
    // 头部个人中心列表动画
    $(".personList").each(function( index ) {
        $( this ).css({'animation-delay': (index/10)+'s'});
    });

    // 点击侧栏置顶标签页面滚动至顶部
    $('#toTop').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });
    // 收货地址点击'设为默认地址'效果
    $('.change_tip').click(function (e) {
        $('.change_tip').not(this).text("【设为默认地址】");
        $(this).text("【默认地址】");
    });
    // 收货地址选择
    $('.addMenu').click(function () {
        $(this).parent().addClass('defaultAdd').siblings().removeClass('defaultAdd');
    });
    // 选择切换
    $('.choose li').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    });
    /***
     * 鼠标移入导航部分动画
     *
     *
     * **/
    var $el = $("#js_showCart");
    var $cart = $('#shopCartBlock');
    var $showPerson = $("#js_showPerson");
    var $person = $("#personBlock");
    var $showNav = $('#showNav');
    var $sideBar = $('#sideBar');
    var timer;
    //  鼠标移入购物车标志，出现购物车动画
    $el.hover(function(){
        $cart.stop(true).show();
    },function (e) {
        e.stopPropagation();
        timer = setTimeout(function () {
            $cart.stop(true).hide();
        }, 200);
    });
    $cart.hover(function () {
        clearTimeout(timer);
    },function () {
        $cart.stop(true).hide();
    });
    //  鼠标移入个人中心标志，出现个人中心动画
    $showPerson.hover(function(){
        $person.stop(true).show();
    },function (e) {
        e.stopPropagation();
        timer = setTimeout(function () {
            $person.stop(true).hide();
        }, 200);
    });
    $person.hover(function () {
        clearTimeout(timer);
    },function () {
        $person.stop(true).hide();
    });
    //  鼠标移入导航标志，出现侧导航动画
    $showNav.hover(function(){
        $(this).addClass('icon-click').removeClass('icon-out');
        $sideBar.stop(true).addClass('sideBarLeft');
    },function (e) {
        e.stopPropagation();
        timer = setTimeout(function () {
            $sideBar.stop(true).removeClass('sideBarLeft');
            $showNav.addClass('icon-out').removeClass('icon-click');
        }, 200);
    });
    $sideBar.hover(function () {
        clearTimeout(timer);
    },function () {
        $showNav.addClass('icon-out').removeClass('icon-click');
        $sideBar.stop(true).removeClass('sideBarLeft');
    });

    // 删除购物车中的商品
    $('.js_deleteGoods').click(function (e) {
        e.stopPropagation();
        $(this).parent('li').remove();
    });

    /***
     * 鼠标移入导航部分动画***end!
     *
     *
     * **/

});
//  点击加号，数字加一
function m_subtract(t) {
    var obj = t.parentNode.getElementsByTagName('input')[0];
    if (obj.value>1)
        obj.value--;
}
//  点击数字输入框，只能输入非零正整数
function NumCheck(t){
    var num = t.value;
    var re = /^[1-9]\d*$/;  //匹配非零正整数
    if(!re.test(num)||num==""){
        t.value = 1;
    }
}
//  点击减号，数字减一
function m_add(t) {
    var obj = t.parentNode.getElementsByTagName('input')[0];
    obj.value++;
}

// 确认框自定义公共方法
var Common = {
    confirm:function(params){
        var model = $(params.nameId);
        $(params.btnId).click();
        //每次都将监听先关闭，防止多次监听发生，确保只有一次监听
        model.find(".cancel").die("click");
        model.find(".ok").die("click");
        model.find(".ok").live("click",function(){
            params.operate(true)
        });

        model.find(".cancel").live("click",function(){
            params.operate(false)
        })
    }
};

function delete_ok(element,params2,getTotal){
    Common.confirm({
        nameId: params2.nameId,
        btnId: params2.btnId,
        operate: function (reselt) {
            if (reselt) {
                element.remove();
                getTotal();
            } else {
            }
        }
    });

}

/***
 * 省市区联动选择方法-start
 *
 *
 *
 * **/
// 省市区联动效果
(function($){
    $.fn.selectAddress=function(options){
        //默认select的id
        var defaults={
            province: '#province',
            city: '#city',
            area: '#area'
        };
        var opts=$.extend({}, defaults, options),
            province=$(opts.province),
            city=$(opts.city),
            area=$(opts.area);
        //ajax公用函数
        function ajaxFun(url,type,obj,selectOption){
            $.ajax({
                url:url,
                datatype:type,
                type:"GET",
                success:function(xmlDoc){
                    var valueList = $(xmlDoc).find(selectOption);
                    if(obj==city || obj==area ){
                        valueList = $(xmlDoc).find(selectOption).children(obj);
                    }
                    $(valueList).each(function(){
                        obj.append("<option value='"+$(this).attr("postcode")+"'>"+$(this).attr("name")+"</option>");
                    });
                    $('#provinceVal').val($("#province option:selected").text());
                    $('#cityVal').val($("#city option:selected").text());
                    $('#areaVal').val($("#area option:selected").text());
                }
            });
        }
        //初始化数据
        function init(){
            province.append("<option value='0'>请选择省份..</option>");
            city.append("<option value='0'>请选择城市..</option>");
            area.append("<option value='0'>请选择县区..</option>");
            var selectOption="province";
            ajaxFun("areas.xml","xml",province,selectOption);

        }

        //选择省份
        province.on('change', function() {
            if($(this).val() == "0") {
                city.find("option").remove();
                area.find("option").remove();
                city.append("<option value='0'>请选择城市..</option>");
                area.append("<option value='0'>请选择县区..</option>");
            }else{
                city.find("option").remove();
                area.find("option").remove();
                var selectVal = $(this).val();

                //被选择的省份
                var provinceOption="province[postcode="+selectVal+"]";
                //当选择省份时初始联动显示的第一个城市
                var cityOption="province[postcode="+selectVal+"] city:first";
                ajaxFun("areas.xml","xml",city,provinceOption); //城市
                ajaxFun("areas.xml","xml",area,cityOption);  //县区
            }

        });
        //选择城市
        city.on('change', function() {
            area.find("option").remove();
            var selectVal = $(this).val();
            var selectOption="city[postcode="+selectVal+"]";
            ajaxFun("areas.xml","xml",area,selectOption);
        });
        init();

    }
})(jQuery);
/***
 * 省市区联动选择方法-end
 *
 *
 *
 * **/

/***
 ================================================================================================================================
 * **/


/***
 * 弹出框垂直居中于屏幕方法-start
 *
 *
 *
 * **/
(function ($) {
    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
            offset       = ($(window).height() - $dialog.height()) / 2,
            bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }
    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
}(jQuery));
/***
 * 弹出框垂直居中于屏幕方法-end
 *
 *
 *
 * **/


/***
================================================================================================================================
 * **/


/***
 * 弹出框解决闪屏问题以及移动端弹窗禁止背景滑动方法-start
 *
 *
 *
 * **/
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){ //判断如果是pc端
        $('.modal').on('show.bs.modal', function(){   // 当弹出框出现时增加padding消除闪屏
            $('.navbar-fixed-top').css({paddingRight:'17px'});
            $('.fixed-bottom').css({paddingRight:'17px'});
            $('.logo').css({marginLeft:'-91.5px'});
        }).on('hide.bs.modal', function(){            // 当弹出框消失时时移除padding消除闪屏
            $('.navbar-fixed-top').css({paddingRight:'0'});
            $('.fixed-bottom').css({paddingRight:'0'});
            $('.logo').css({marginLeft:'-83px'});
        });
    }
    else{                                                                                         //判断如果是移动端，当弹出层出现时，消除背景可以滑动的bug
        // 设置目前为止
        var cPosition = false;
        $('.modal').on('show.bs.modal', function(){
            cPosition = $(window).scrollTop();
        })
            .on('shown.bs.modal', function(){
                $('body.modal-open').css({position:'fixed'});
                $('body.modal-open').css({width:'100%'});
            })
            .on('hide.bs.modal', function(){
                $('body.modal-open').css({position:'relative'});
                window.scrollTo(0, cPosition);
            });
    }
}
/***
 * 弹出框解决闪屏问题以及移动端弹窗禁止背景滑动方法-end
 *
 *
 *
 * **/