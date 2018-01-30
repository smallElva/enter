/**
 * Created by enter on 2017/11/28.
 */
/**
 * =================================================================================================
 */
function getPwd(){
    var username = $("#login_num").val();
    var userPassValue = getCookieValue(username);
    $("#login_pwd").val(userPassValue);
}

$(function(){
    //  当用户名输入框有值时，显示删除按钮
    var loginUserName = $('.userInput');
    var deleteText = $('.js-deleteText');

    loginUserName.focus(function () {
        deleteText.css('visibility','visible'); //光标聚焦时出现删除按钮
    });
    loginUserName.blur(function () {
        $(document).on("click",function(e){
            //如果点击的不是带有“withDeleteIcon”的页面其他的地方，就隐藏删除按钮，否则显示删除按钮
            if($(e.target).closest(".withDeleteIcon").length == 0){
                deleteText.css('visibility','hidden'); //失去光标时隐藏删除按钮
            }else{
                deleteText.css('visibility','visible');
            }
        })
    });
    deleteText.click(function () {
        loginUserName.val('');  //点击删除按钮清空输入框内容
    });



    // 国际区号选择和验证电话号码
    var telInput = $(".mobile-number"),
        errorMsg = $("#error-msg");
    // 初始化
    telInput.intlTelInput({
        nationalMode: true,
        initialCountry: "cn"
    });
    var reset = function() {
        telInput.removeClass("error");
        errorMsg.addClass("hide");
    };
    //  验证号码是否符合规范
    telInput.blur(function() {
        reset();
        if ($.trim(telInput.val())) {
            if (!telInput.intlTelInput("isValidNumber")) {
                telInput.addClass("error");
                errorMsg.removeClass("hide");
            }
        }
    });
    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

    $("body").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            login();
        }
    });
    //登录
    $(document).on('click','#loginIn',function(){
        login();
    });

    //登录
    function login(){
        var Laccount = $('#login_num').val();
        var Lpassword = $('#login_pwd').val();
        var reg = /^[a-zA-Z0-9]{6,20}$/;
        var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        $("#login_pwd").next('.prompt').remove();//删除提示语
        $("#login_num").next('.prompt').remove();//删除提示语
        if( !Laccount){
            $("#login_num").after("<p class='prompt'>帐号不能为空</p>");//增加提示语
            return false;
        }
        if(!filter.test(Laccount)){
            $("#login_num").after("<p class='prompt'>请输入格式正确的邮箱</p>");//增加提示语
            return false;
        }
        if(!Lpassword){
            $("#login_pwd").after("<p class='prompt'>密码不能为空</p>");//增加提示语
            return false;
        }
        if(!reg.test(Lpassword)){
            $("#login_pwd").after("<p class='prompt'>请输入6-20位数字与字母组合密码</p>");//增加提示语
            return false;
        }
        postForm(loginUrl,{'email':Laccount,"password":Lpassword},function (result) {
            if(result.code ==1){
                if($("#rememberLogin").is(":checked")){
                    addCookie(Laccount,Lpassword,14,"/login");
                }else{
                    deleteCookie(Laccount,"/login");
                }
                window.location.href=result.url;
            }else{
                alert(result.msg);
            }
        });
    }
    /**
     * ================================================登录end=================================================
     */

    /**
     * =================================================邮箱注册start================================================
     */
    /**
     * 点击获取邮箱验证码
     */
    $(document).on('click','#sendCodeEmail',function(){
        var userEmail=$('#userEmail').val();
        var filterEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        $('#codeMsgEmail,#userEmail').next('.prompt').remove();
        if (!userEmail) {
            $('#userEmail').after("<p class='prompt'>邮箱不能为空</p>");
            return false;
        }

        if(!filterEmail.test(userEmail)){
            $('#userEmail').after("<p class='prompt'>请输入正确的邮箱账号</p>");
            return false;
        }
        if(checked == 0){
            time = 60;
            timeCountDown("sendCodeEmail");
            getFormParam(getEmailCodeUrl,{email:userEmail,type:'registerCode'},function (result) {
                if(result.code == 1){
                }else {
                    clearCount("sendCodeEmail");
                    alert(result.msg);
                }
            })
        }

    });

    /**
     * 点击进行注册下一步
     */
    $(document).on('click','#regEmailOk',function(){
        var userEmail=$('#userEmail').val();
        var codeEmail = $('#codeMsgEmail').val();
        var filterEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        $('#codeMsgEmail,#userEmail').next('.prompt').remove();
        if (!userEmail) {
            $('#userEmail').after("<p class='prompt'>邮箱不能为空</p>");
            return false;
        }

        if(!filterEmail.test(userEmail)){
            $('#userEmail').after("<p class='prompt'>请输入正确的邮箱账号</p>");
            return false;
        }
        if(!codeEmail){
            $('#codeMsgEmail').after("<p class='prompt'>验证码不能为空</p>");
            return false;
        }
        if(codeEmail.length < 6){
            $('#codeMsgEmail').after("<p class='prompt'>验证码错误</p>");
            return false;
        }
        getFormParam(checkCodeUrl,{email:userEmail,validCode:codeEmail,type:"registerCode"},function (result) {
            if(result.code == 1){
                showPwd();
            }else{
                alert(result.msg);
            }
        });
    });

    /**
     * 邮箱注册
     */
    $(document).on("click","#finishPwd",function(){
        var pwd = $("#pwd").val(),
            rePwd= $("#rePwd").val();
        var userEmail=$('#userEmail').val();
        $('#pwd').next('.prompt').remove();
        $('#rePwd').next('.prompt').remove();
        if(!pwd){
            $('#pwd').after("<p class='prompt'>密码不能为空</p>");
            return false;
        }
        if(pwd.length < 6 || pwd.length > 20){
            $('#pwd').after("<p class='prompt'>请输入6至20位数字或字母</p>");
            return false;
        }
        if( !rePwd ){
            $('#rePwd').after("<p class='prompt'>请重复输入密码</p>");
            return false;
        }else if(pwd != rePwd){
            $('#rePwd').after("<p class='prompt'>两次密码不一致</p>");
            return false;
        }
        postForm(registerUrl,{'password':pwd,"email":userEmail},function (result) {
            if(result.code ==1){
                window.location.href = result.url;
            }else{
                alert(result.msg);
            }
        });
    });
    /**
     * =================================================邮箱注册end================================================
     */

    /**
     * =================================================忘记密码start================================================
     */

    /**
     * 点击获取忘记密码邮箱验证码
     */
    $(document).on('click','#sendCodeEmailYz',function(){
        var userEmailYz=$('#userEmailYz').val();

        var filterEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        $('#userEmailYz,#codeMsgEmailYz').next('.prompt').remove();

        if (!userEmailYz) {
            $('#userEmailYz').after("<p class='prompt'>邮箱不能为空</p>");
            return false;
        }

        if(!filterEmail.test(userEmailYz)){
            $('#userEmailYz').after("<p class='prompt'>请输入正确的邮箱账号</p>");
            return false;
        }
        if(checked == 0){
            time = 60;
            timeCountDown("sendCodeEmailYz");
            getFormParam(getEmailCodeUrl,{email:userEmailYz,type:'forgetPwdCode'},function (result) {
                if(result.code == 1){
                }else {
                    clearCount("sendCodeEmailYz");
                    alert(result.msg);
                }
            })
        }

    });
    /**
     * 忘记密码邮箱验证
     */
    $(document).on('click','#regEmailOkYz',function(){
        var userEmailYz=$('#userEmailYz').val();
        var codeYz = $('#codeMsgEmailYz').val();

        var filterEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        $('#userEmailYz,#codeMsgEmailYz').next('.prompt').remove();

        if (!userEmailYz) {
            $('#userEmailYz').after("<p class='prompt'>邮箱不能为空</p>");
            return false;
        }

        if(!filterEmail.test(userEmailYz)){
            $('#userEmailYz').after("<p class='prompt'>请输入正确的邮箱账号</p>");
            return false;
        }
        if(!codeYz){
            $('#codeMsgEmailYz').after("<p class='prompt'>验证码不能为空</p>");
            return false;
        }
        if(codeYz.length < 6){
            $('#codeMsgEmailYz').after("<p class='prompt'>验证码错误</p>");
            return false;
        }
        getFormParam(checkCodeUrl,{email:userEmailYz,validCode:codeYz,type:"forgetPwdCode"},function (result) {
            if(result.code == 1){
                changePwd();
            }else{
                alert(result.msg);
            }
        });
    });

    //修改密码
    /**
     * 忘记密码修改密码
     */
    $(document).on("click","#finishChangePwd",function(){
        var changePwd = $("#changePwd").val(),
            changeRePwd= $("#changeRePwd").val();
        var userEmailYz=$('#userEmailYz').val();
        $('#changePwd').next('.prompt').remove();
        $('#changeRePwd').next('.prompt').remove();
        if(!changePwd){
            $('#changePwd').after("<p class='prompt'>密码不能为空</p>");
            return false;
        }
        if(changePwd.length < 6 || changePwd.length > 20){
            $('#changePwd').after("<p class='prompt'>请输入6至20位数字或字母</p>");
            return false;
        }
        if( !changeRePwd ){
            $('#changeRePwd').after("<p class='prompt'>请重复输入密码</p>");
            return false;
        }else if(changePwd != changeRePwd){
            $('#changeRePwd').after("<p class='prompt'>两次密码不一致</p>");
            return false;
        }
        postForm(changePwdUrl,{'password':changePwd,"email":userEmailYz},function (result) {
            if(result.code ==1){
                alert("密码修改成功！请登陆");
                window.location.href = result.url;
            }else{
                alert(result.msg);
            }
        });

    });

    // //手机注册
    // $(document).on('click','#register-btn',function(){
    //     var mobileNumber=$('#mobile-number').val(),
    //         code = $('#codeMsg').val();
    //     var reg = /^1[3|4|5|7|8]\d{9}$/;
    //
    //     $('#codeMsg,#mobile-number').parent().next('.prompt').remove();
    //     if (!mobileNumber) {
    //         $('#mobile-number').parent().after("<p class='prompt'>账号不能为空</p>");
    //         return false;
    //     }
    //     if(!reg.test(mobileNumber)){
    //         $('#mobile-number').parent().after("<p class='prompt'>请输入正确的手机号码</p>");
    //         return false;
    //     }
    //     if(!code){
    //         $('#codeMsg').parent().after("<p class='prompt'>验证码不能为空</p>");
    //         return false;
    //     }
    //     if(code.length < 6){
    //         $('#codeMsg').parent().after("<p class='prompt'>验证码错误</p>");
    //         return false;
    //     }
    //     else{
    //         showPwd();
    //     }
    // });
    // //手机号验证
    // $(document).on('click','#register-btnYz',function(){
    //     var mobileNumberYz=$('#mobile-numberYz').val(),
    //         codeYz = $('#codeMsgYz').val();
    //     var reg = /^1[3|4|5|7|8]\d{9}$/;
    //
    //     $('#codeMsgYz,#mobile-numberYz').parent().next('.prompt').remove();
    //     if (!mobileNumberYz) {
    //         $('#mobile-numberYz').parent().after("<p class='prompt'>账号不能为空</p>");
    //         return false;
    //     }
    //     if(!reg.test(mobileNumberYz)){
    //         $('#mobile-numberYz').parent().after("<p class='prompt'>请输入正确的手机号码</p>");
    //         return false;
    //     }
    //     if(!codeYz){
    //         $('#codeMsgYz').parent().after("<p class='prompt'>验证码不能为空</p>");
    //         return false;
    //     }
    //     if(codeYz.length < 6){
    //         $('#codeMsgYz').parent().after("<p class='prompt'>验证码错误</p>");
    //         return false;
    //     }
    //     else{
    //         changePwd();
    //     }
    // });


});


// 登录
function showLogin() {
    $('#login_form').show();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').hide();
    $('#yzEmail_form').hide();
    $('#regEmail_form').hide();
    $('#pwd_form').hide();
    $('#pwd_change_form').hide();
}
// 邮箱注册
function showRegEmail() {
    $('#login_form').hide();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').hide();
    $('#yzEmail_form').hide();
    $('#regEmail_form').show();
    $('#pwd_form').hide();
    $('#pwd_change_form').hide();
}
// 手机注册
function showRegPhone() {
    $('#login_form').hide();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').show();
    $('#yzEmail_form').hide();
    $('#regEmail_form').hide();
    $('#pwd_form').hide();
    $('#pwd_change_form').hide();
}
// 输入密码
function showPwd(){
    $('#login_form').hide();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').hide();
    $('#yzEmail_form').hide();
    $('#regEmail_form').hide();
    $('#pwd_form').show();
    $('#pwd_change_form').hide();
}
// 手机验证
function showYzPhone(){
    $('#login_form').hide();
    $('#regPhone_formYz').show();
    $('#regPhone_form').hide();
    $('#yzEmail_form').hide();
    $('#regEmail_form').hide();
    $('#pwd_form').hide();
    $('#pwd_change_form').hide();
}
// 邮箱验证
function showYzEmail(){
    $('#login_form').hide();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').hide();
    $('#yzEmail_form').show();
    $('#regEmail_form').hide();
    $('#pwd_form').hide();
    $('#pwd_change_form').hide();
}
// 忘记密码
function forgetPwd(){
    $('#login_form').hide();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').hide();
    $('#yzEmail_form').show();
    $('#regEmail_form').hide();
    $('#pwd_form').hide();
    $('#pwd_change_form').hide();
}
// 修改密码
function changePwd(){
    $('#login_form').hide();
    $('#regPhone_formYz').hide();
    $('#regPhone_form').hide();
    $('#yzEmail_form').hide();
    $('#regEmail_form').hide();
    $('#pwd_form').hide();
    $('#pwd_change_form').show();
}

