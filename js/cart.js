/*计算总钱数*/
function total(){
    setTimeout(function(){
        var t=0;
        var $li_total=$('#cartTable_xs li');
        var s=0;
        var n=0;
        var p=0;
       $($li_total).each(function (i) {
           if($li_total.eq(i).find("input[type='checkbox']").is(':checked')){
               n=$(this).find('.count-input').val();
               p=$(this).find('.perMoney_xs').html();
               s=s+n*p;
           }
           t=s;
       });
       $(".priceTotal_xs").html("￥"+t.toFixed(2));
    },100)
}
/*计算总钱数*/


/*计算选择的商品数量*/
function totalNum(){
    setTimeout(function(){
        var num=0;
        var numT=0;
        var $li_total=$('#cartTable_xs li');
        var n1=0;
       $($li_total).each(function (i) {
           if($li_total.eq(i).find("input[type='checkbox']").is(':checked')){
               n1=$(this).find('.count-input').val();
               num=num+n1*1;
           }
           numT = num;
       });
       $(".totalNumXs").html(numT);
    },100)
}

/*计算选择的商品数量*/


/*判断有无数据*/
function hideDiv() {
    if ($(".cartTable_div_xs").length==0) {
        $(".withGoods-xs").hide();
        $(".withNoShopCart-xs").show();

    }else{
        $(".withGoods-xs").show();
        $(".withNoShopCart-xs").hide();
    }
}
/*判断有无数据*/


/*给单选框或复选框添加样式*/
$(function(){
    hideDiv();
    total();
    totalNum();
    $('input[type=checkbox]').attr("checked","checked");
    /*编辑*/
    $('.js_editCart').click(function () {
        if ($(this).html()=="编辑") { //点击编辑可以进行删除操作
            $('input[type=checkbox]').attr("checked",false);//在删除页面默认勾选框处于非选中状态
            $(this).html("完成");
            $('.total_xs').html('').append('<span>已选：</span>'+'<span class="yel-color totalNumXs"></span>件');
            $('.goPay-a').html('删除').removeAttr('href').attr('data-toggle','modal').attr('data-target','#deleteModal');
        }else{                        //在完成状态可以进行结算操作
            $('input[type=checkbox]').attr("checked","checked");//在结算页面默认勾选框都处于选中状态
            $(this).html("编辑");
            $('.total_xs').html('').append('<span>合计：</span>'+'<span class="priceTotal_xs"></span>');
            $('.goPay-a').html('去结算').attr('href','online_pay.html').removeAttr('data-toggle','data-target');
        }
        total();
        totalNum();
        hideDiv();
    });
    /*编辑*/
    /*点击加一*/
    $('.add').click(function(){
        var countVal = $(this).prev('.count-input');
        countVal.val(parseInt(countVal.val())+1);
        /*计算总钱数*/
        total();
        /*计算总钱数*/
        totalNum();
    });
    /*点击加一*/
    /*点击减一*/
    $('.reduce').click(function(){
        var countVal = $(this).next('.count-input');
        if(countVal.val()==1){
            countVal.val(1);
        }else{
            countVal.val(parseInt(countVal.val())-1);
        }

        /*计算总钱数*/
        total();
        /*计算总钱数*/
        totalNum();
    });
    /*点击减一*/

    /*底部全选*/
    $('.select-all-xs').change(function(){
        total();
        totalNum();
    });
    /*底部全选*/

    /*监听单选框变化*/
    $('.checkItem').change(function () {
        total();
        totalNum();
    });



    /*删除*/
    $('#deleteOk').click(function(){
        $.each($('#cartTable_xs li'), function() {
            if ($(this).find("input[type=checkbox]").attr("checked")=="checked") {
                $(this).remove();
            }
        });
        $.each($("#cartTable_xs"), function() {
            if ($(this).find("li").length==0) {
                $(this).remove();
            }
        });
        hideDiv();
        totalNum();
        total();
    });
    /*删除*/
});