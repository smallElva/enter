/**
 * Created by enter on 2017/12/4.
 */
$(function () {
    // 收货地址点击删除效果
    $('.delete_tip').click(function (e) {
        e.stopPropagation();
        var element = $(this).parents('.col-md-4');
        var elementMobile = $(this).parents('.address_block_xs');
        Common.confirm({
            operate: function (reselt) {
                if (reselt) {
                    element.remove();
                    elementMobile.remove();
                } else {
                }
            }
        })
    });
    // 点击删除优惠券
    $('.js_deleteDiscount').click(function () {
        $(this).parent().remove();
    });
    //点击在线支付，出现提示，点击货到付款，提示消失
    $('#payWay li').click(function () {
        $(this).find('input').attr('checked','checked');
        $(this).siblings().find('input').attr('checked',false);
    });
    $('#payWay li:first-child').click(function () {
        $('#paywayAli').show();
    });
    $('#payWay li:nth-child(2)').click(function () {
        $('#paywayAli').hide();
    });
    //点击公司发票，出现纳税人识别号，点击个人发票，纳税人识别号消失
    $('#invoice li:first-child').click(function () {
        $('#companyTip').hide();
        $('#personTip').show();
    });
    $('#invoice li:nth-child(2)').click(function () {
        $('#personTip').hide();
        $('#companyTip').show();
    });
    // 点击添加新地址弹窗
    var addModals = $('#addModal');
    var provinceVal = $('#provinceVal');
    var cityVal = $('#cityVal');
    var areaVal = $('#areaVal');
    $("#select-area").selectAddress();//初始化省市区联动select
    $('#select-area').on('change',function () {
        provinceVal.val($("#province option:selected").text());
        cityVal.val($("#city option:selected").text());
        areaVal.val($("#area option:selected").text());
    });

    $('.js_addMenu').click(function () {
        addModals.modal();
        $("#addAddress_form")[0].reset(); //表单弹出前初始化表单
        $("#city option:selected").text('请选择城市..');
        $("#area option:selected").text('请选择县区..');
        $('#addModalLabel').text('添加新地址');
    });


    // 点击编辑地址弹窗
    $('.js_editModal').click(function (e) {
        e.stopPropagation();
        addModals.modal();
        $("#addAddress_form")[0].reset(); //表单弹出前初始化表单
        $("#city option:selected").text('请选择城市..');
        $("#area option:selected").text('请选择县区..');
        $('#addModalLabel').text('编辑地址');
    });


    /***
     * 添加新地址表单验证-start
     */

    $(document).on('click','#finishAdd',function(){
        var inputUser = $('#inputUser').val();
        var inputPhone = $('#inputPhone').val();
        var inputAddDetail = $('#inputAddDetail').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;

        $('#inputUser,#inputPhone,#inputAddDetail').next('.prompt').remove();
        if (!inputUser) {
            $('#inputUser').after("<p class='prompt'>请填写收货人</p>");
            return false;
        }
        if(!reg.test(inputPhone)){
            $('#inputPhone').after("<p class='prompt'>请输入正确的手机号码</p>");
            return false;
        }
        if(!inputAddDetail){
            $('#inputAddDetail').after("<p class='prompt'>请填写详细地址</p>");
            return false;
        }
        else{
            $('#addModal').modal('hide');
        }
    });
    /***
     * 添加新地址表单验证-end
     */

});
//  自定义提示框
var Common = {
    confirm:function(params){
        var model = $("#deleteModal");
        $("#common_confirm_btn").click();
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
}
