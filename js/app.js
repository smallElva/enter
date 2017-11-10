/**
 * Created by enter on 2017/9/15.
 */

$(function () {
    var num = $('#cartTable .item').length;
    var numB = num-3;
    if(numB <= 0){
        $('#foot').removeClass('fixed-bottom');
    }
    //当屏幕向下滚时，导航栏固定在顶部
    $(document).scroll(function () {
        var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if(numB > 0){
            if (scrollHeight >= (numB*150+80)) {
                $('#foot').removeClass('fixed-bottom');
            }else{
                $('#foot').addClass('fixed-bottom');
            }
        }
        if (scrollHeight >  83) {
            $('.header').addClass('fixed-top');
            $('.sideBar').css('top','88px');
        }else{
            $('.header').removeClass('fixed-top');
            $('.sideBar').css('top','82px');
        }
    });
    // 头部个人中心列表动画
    $(".personList").each(function( index ) {
        $( this ).css({'animation-delay': (index/10)+'s'});
    });

    // 点击侧栏置顶标签页面滚动至顶部
    $('#toTop').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });
    // 收货地址选择
    $('.addMenu').click(function () {
        $(this).parent().addClass('defaultAdd').siblings().removeClass('defaultAdd');
    });
    //点击在线支付，出现提示，点击货到付款，提示消失
    $('#payWay li:first-child').click(function () {
        $('#paywayAli').show();
    });
    $('#payWay li:nth-child(2)').click(function () {
        $('#paywayAli').hide();
    });
    //点击公司发票，出现纳税人识别号，点击个人发票，纳税人识别号消失
    $('#invoice li:first-child').click(function () {
        $('#companyInvoice').hide();
    });
    $('#invoice li:nth-child(2)').click(function () {
        $('#companyInvoice').show();
    });

    /*--点击购物车部分--*/
    var $el = $("#js_showCart");
    var $cart = $('#shopCartBlock');
    var $showPerson = $("#js_showPerson");
    var $person = $("#personBlock");
    var $showNav = $('#showNav');
    var $sideBar = $('#sideBar');
    $el.click(function(e){
        e.stopPropagation();
        $cart.fadeToggle('fast');//  点击购物车标志，出现购物车
        $person.fadeOut('fast');
    });
    $showPerson.click(function(e){
        e.stopPropagation();
        $person.fadeToggle('fast');//  点击购物车标志，出现个人中心列表
        $cart.fadeOut('fast');
    });
    // 删除购物车中的商品
    $('.js_deleteGoods').click(function (e) {
        e.stopPropagation();
        $(this).parent('li').remove();
    });
    //侧导航动画
    $showNav.click(function (e) {
        e.stopPropagation();
        $(this).toggleClass('icon-click icon-out');
        $sideBar.toggleClass('sideBarLeft');
    });
    $(document).on('click',function(e){
        if(($(e.target) != $el) && (!$cart.is(':hidden'))){
            $cart.fadeOut('fast'); // 点击页面任何其他地方，购物车消失
        }
        if(($(e.target) != $showPerson) && (!$person.is(':hidden'))){
            $person.fadeOut('fast'); // 点击页面任何其他地方，个人中心
        }
        if(($(e.target) != $showNav) && ($sideBar.hasClass('sideBarLeft'))){
            $sideBar.removeClass('sideBarLeft');
            $showNav.removeClass('icon-click').addClass('icon-out');
        }
    });
    /*--点击购物车部分-end!--*/
    //模态框居中调用方法
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);

});
//  点击加号，数字加一
function m_subtract(t) {
    var obj = t.parentNode.getElementsByTagName('input')[0];
    if (obj.value>1)
        obj.value--;
}
//  点击减号，数字减一
function m_add(t) {
    var obj = t.parentNode.getElementsByTagName('input')[0];
    obj.value++;
}
//模态框居中
function centerModals() {
    $('.modal').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
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

