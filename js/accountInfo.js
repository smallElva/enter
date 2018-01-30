/**
 * Created by enter on 2017/12/4.
 */


/**
 * 修改昵称表单验证-start
 */

$(document).on('click','#finishName',function(){
    var secondName = $('#second_name').val();
    var accountName = $('.accountName');
    $('#second_name').next('.prompt').remove();
    if (!secondName) {
        $('#second_name').after("<p class='errorTips'>请输入新的昵称</p>");
        return false;
    }
    else{
        accountName.html(secondName);
        $('#nameModal').modal('hide');
    }
});
/**
 * 修改昵称表单验证-end
 */


/**
 * =================================================修改账户密码表单验证-start================================================
 */
$(document).on('click','#finishPassWord',function(){
    var originPwd = $('#originPwd').val();
    var newPwd = $('#newPwd').val();
    var newPwd2 = $('#newPwd2').val();
    $('#originPwd,#newPwd,#newPwd2').next('.errorTips').remove();
    if (!originPwd) {
        $('#originPwd').after("<p class='errorTips'>密码不得为空</p>");
        return false;
    }
    if(originPwd.length < 6 || originPwd.length > 16){
        $('#originPwd').after("<p class='errorTips'>密码应为6-16位字母和数字组合</p>");
        return false;
    }
    if (!newPwd) {
        $('#newPwd').after("<p class='errorTips'>密码不得为空</p>");
        return false;
    }
    if(newPwd.length < 6 || newPwd.length > 16){
        $('#newPwd').after("<p class='errorTips'>密码应为6-16位字母和数字组合</p>");
        return false;
    }
    if( !newPwd2 ){
        $('#newPwd2').after("<p class='errorTips'>请重复输入密码</p>");
        return false;
    }else if(newPwd != newPwd2){
        $('#newPwd2').after("<p class='errorTips'>两次密码不一致</p>");
        return false;
    }
    else{
        $('#pwdModal').modal('hide');
    }
});
/**
 * =================================================修改账户密码表单验证-end================================================
 */




/**
 * =================================================修改绑定邮箱验证-start================================================
 */
    $(function () {
        /**
         * 邮箱身份验证表单验证-start
         */
        $('#codeEmailModal').on('shown.bs.modal', function () {
            timeCountDown('newEmailYzBtn');
        });
        $('#newEmailYzBtn').click(function () {
            if(checked == 0){
                time =60;
                timeCountDown("newEmailYzBtn");
            }
        });
        $(document).on('click','#yzEmailBtn',function(){
            var yzEmailInput = $('#yzEmailInput').val();
            $('#yzEmailInput').next('.errorTips').remove();
            if(yzEmailInput.length < 6){
                $('#yzEmailInput').after("<p class='errorTips'>验证码格式不对</p>");
                return false;
            }
            else{
                $('#codeEmailContent').hide();
                $('#bindEmailContent').show();
            }
        });
        /**
         * 点击获取邮箱验证码
         */
        $(document).on('click','#bindEmailCode',function(){
            var bindEmailNum=$('#bindEmailNum').val();
            var filterEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            $('#bindEmailNum').next('.errorTips').remove();
            if (!bindEmailNum) {
                $('#bindEmailNum').after("<p class='errorTips'>邮箱不能为空</p>");
                return false;
            }

            if(!filterEmail.test(bindEmailNum)){
                $('#bindEmailNum').after("<p class='errorTips'>请输入正确的邮箱账号</p>");
                return false;
            }
            if(checked == 0){
                time = 60;
                timeCountDown("bindEmailCode");
                getFormParam(getEmailCodeUrl,{email:bindEmailNum,type:'registerCode'},function (result) {
                    if(result.code == 1){
                    }else {
                        clearCount("bindEmailNum");
                        alert(result.msg);
                    }
                })
            }

        });
        /**
         * 点击绑定邮箱的完成
         */
        $(document).on('click','#submitBtnBindEmail',function(){
            var bindEmailCodeMsg = $('#bindEmailCodeMsg').val();
            var bindEmailNum=$('#bindEmailNum').val();
            var accountEmail=$('#accountEmail');
            $('#bindEmailCodeMsg').next('.errorTips').remove();
            if(bindEmailCodeMsg.length < 6){
                $('#bindEmailCodeMsg').after("<p class='errorTips'>验证码格式不对</p>");
                return false;
            }
            else{
                $('#codeEmailModal').modal('hide');
                console.log(accountEmail,bindEmailNum);
                accountEmail.html(bindEmailNum);
            }
        });
    });

/**
 * =================================================修改绑定邮箱验证-end================================================
 */




/**
 * =================================================绑定手机-start================================================
 */

$(function () {
    /**
     * 邮箱身份验证表单验证-start
     */
    $('#callModal').on('shown.bs.modal', function () {
        timeCountDown('phoneEmailYzBtn');
    });
    $('#phoneEmailYzBtn').click(function () {
        if(checked == 0){
            time =60;
            timeCountDown("phoneEmailYzBtn");
        }
    });
    $(document).on('click','#phoneEmailBtn',function(){
        var phoneEmailInput = $('#phoneEmailInput').val();
        $('#phoneEmailInput').next('.errorTips').remove();
        if(phoneEmailInput.length < 6){
            $('#phoneEmailInput').after("<p class='errorTips'>验证码格式不对</p>");
            return false;
        }
        else{
            $('#yzEmailContent').hide();
            $('#bindPhoneContent').show();
        }
    });
    /**
     * 点击获取手机短信证码
     */
    $(document).on('click','#sendCode',function(){
        var callNum=$('#callNum').val();
        var reg = /^1[34578]\d{9}$/;

        $('#callNum').next('.errorTips').remove();
        if (!callNum) {
            $('#callNum').after("<p class='errorTips'>手机号不能为空</p>");
            return false;
        }

        if(!reg.test(callNum)){
            $('#callNum').after("<p class='errorTips'>请输入正确的手机号</p>");
            return false;
        }
        if(checked == 0){
            time = 60;
            timeCountDown("sendCode");
            getFormParam(getEmailCodeUrl,{email:codeMsg,type:'registerCode'},function (result) {
                if(result.code == 1){
                }else {
                    clearCount("sendCode");
                    alert(result.msg);
                }
            })
        }

    });
    /**
     * 点击绑定手机的完成
     */
    $(document).on('click','#submitBtn',function(){
        var codeMsg = $('#codeMsg').val();
        var callNum=$('#callNum').val();
        var accountCall=$('#accountCall');
        $('#codeMsg').next('.errorTips').remove();
        if(codeMsg.length < 6){
            $('#codeMsg').after("<p class='errorTips'>验证码格式不对</p>");
            return false;
        }
        else{
            $('#callModal').modal('hide');
            accountCall.html(callNum);
        }
    });
});

/**
 * =================================================绑定手机-end================================================
 */