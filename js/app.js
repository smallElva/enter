/**
 * Created by enter on 2017/9/15.
 */

$(function () {
    var num = $('#cartTable tbody tr').length;
    var numB = num-4;
    if(numB <= 0){
        $('#foot').removeClass('fixed-bottom');
    }
    //当屏幕向下滚时，导航栏固定在顶部
    $(document).scroll(function () {
        var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if(numB > 0){
            if (scrollHeight >= numB*120) {
                $('#foot').removeClass('fixed-bottom');
            }else{
                $('#foot').addClass('fixed-bottom');
            }
        }
        if (scrollHeight >  80) {
            $('.navTop').addClass('fixed-top');
            $('#aside').css('top','81px');
            $('.content').css('marginTop','86px')
        }else{
            $('.navTop').removeClass('fixed-top');
            $('#aside').css('top','145px');
            $('.content').css('marginTop','0')
        }
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
