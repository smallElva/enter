/**
 * Created by enter on 2017/9/15.
 */

$(function () {
    var num = $('#cartTable tbody tr').length;
    var numB = num-4;
    if(numB <= 0){
        $('#foot').removeClass('fixed-bottom');
    }
    //����Ļ���¹�ʱ���������̶��ڶ���
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
    // ��������ö���ǩҳ�����������
    $('#toTop').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });
    // �ջ���ַѡ��
    $('.addMenu').click(function () {
        $(this).parent().addClass('defaultAdd').siblings().removeClass('defaultAdd');
    });
    //�������֧����������ʾ��������������ʾ��ʧ
    $('#payWay li:first-child').click(function () {
        $('#paywayAli').show();
    });
    $('#payWay li:nth-child(2)').click(function () {
        $('#paywayAli').hide();
    });
    //�����˾��Ʊ��������˰��ʶ��ţ�������˷�Ʊ����˰��ʶ�����ʧ
    $('#invoice li:first-child').click(function () {
        $('#companyInvoice').hide();
    });
    $('#invoice li:nth-child(2)').click(function () {
        $('#companyInvoice').show();
    });

    //ģ̬����е��÷���
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);

});
//  ����Ӻţ����ּ�һ
function m_subtract(t) {
    var obj = t.parentNode.getElementsByTagName('input')[0];
    if (obj.value>1)
        obj.value--;
}
//  ������ţ����ּ�һ
function m_add(t) {
    var obj = t.parentNode.getElementsByTagName('input')[0];
    obj.value++;
}
//ģ̬�����
function centerModals() {
    $('.modal').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}
