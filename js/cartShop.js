
window.onload = function () {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var table = document.getElementById('cartTable'); // 购物车表格
    var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
    var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
    var tr = document.getElementsByClassName('item'); //行
    var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
    var priceTotal = document.getElementById('priceTotal'); //总计
    var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
    var selected = document.getElementById('selected'); //已选商品
    var foot = document.getElementById('foot');
    var prices = document.getElementById('price');
    var checkbox = document.getElementsByClassName('checkbox');
    var chooseAll = document.getElementById('chooseAll');
    var checkedSelectNum = 0;
    var tipsModal = document.getElementById('tipsModal');

    // 更新总数和总价格，已选浮层
    var getTotal = function() {
        var totalCount = 0;
        var seleted = 0;
        var price = 0;
        for (var i = 0, len = tr.length; i < len; i++) {
            totalCount += parseInt(tr[i].getElementsByTagName('input')[1].value);
            if (tr[i].getElementsByTagName('input')[0].checked) {
                // tr[i].className = 'on';
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].getElementsByClassName('subtotal')[0].innerHTML);
            }
            else {
                tr[i].className = 'item';
            }
        }
        chooseAll.innerHTML = totalCount;
        selectedTotal.innerHTML = seleted;
        priceTotal.innerHTML = price.toFixed(2);

        if (seleted == 0) {
            foot.className = 'foot';
        }
    };
    // 计算单行价格
    function getSubtotal(tr) {
        // var cells = tr.cells;
        var price = tr.getElementsByClassName('price')[0]; //单价
        var subtotal = tr.getElementsByClassName('subtotal')[0]; //小计td
        var countInput = tr.getElementsByTagName('input')[1]; //数目input
        var span = tr.getElementsByClassName('reduce')[0]; //-号
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
        //如果数目只有一个，把-号去掉
        if (countInput.value == 1) {
            span.innerHTML = '';
        }else{
            span.innerHTML = '-';
        }
    }

    // 点击选择框
    for(var i = 0; i < selectInputs.length; i++ ){
        selectInputs[i].onclick = function () {
            if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                if(this.checked){
                    checkedSelectNum = selectInputs.length;
                }else{
                    checkedSelectNum = 0;
                }
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;
                }
            }else{
                if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                    for (var i = 0; i < checkAllInputs.length; i++) {
                        checkAllInputs[i].checked = false;
                    }
                    checkedSelectNum--;
                }else{
                    if(++checkedSelectNum == selectInputs.length){
                        for (var i = 0; i < checkAllInputs.length; i++) {
                            checkAllInputs[i].checked = true;
                        }
                    }
                }
            }

            getTotal();//选完更新总计
        }
    }


    //为每行元素添加事件
    for (var i = 0; i < tr.length; i++) {
        //将点击事件绑定到tr元素
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
            var cls = el.className; //触发元素的class
            var countInout = this.getElementsByTagName('input')[1]; // 数目input
            var value = parseInt(countInout.value); //数目
            //通过判断触发元素的class确定用户点击了哪个元素
            var params2 = {nameId:"#deleteModal",btnId:"#common_confirm_btn"};
            switch (cls) {
                case 'add': //点击了加号
                    countInout.value = value + 1;
                    getSubtotal(this);
                    break;
                case 'reduce': //点击了减号
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'delete iconfont icon-close': //点击了删除
                    delete_ok(this,params2,getTotal);
                    break;
            }
            getTotal();
        };
        // 给数目输入框绑定keyup事件
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
            getSubtotal(this.parentNode.parentNode); //更新小计
            getTotal(); //更新总数
        }
    }

    // 点击删除选中商品
    deleteAll.onclick = function () {
        var params2 = {nameId:"#deleteModal",btnId:"#common_confirm_btn"};
        if (selectedTotal.innerHTML != 0) {
            deleteChoose(params2,getTotal);
        }else{
            tipsModal.modal();
        }
        getTotal(); //更新总数
    };
    // 删除选中商品弹窗
    function deleteChoose(params2,getTotal){
        Common.confirm({
            nameId: params2.nameId,
            btnId: params2.btnId,
            operate: function (reselt) {
                if (reselt) {
                    for (var i = 0; i < tr.length; i++) {
                        // 如果被选中，就删除相应的行
                        if (tr[i].getElementsByTagName('input')[0].checked) {
                            tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                            i--; //回退下标位置
                        }
                    }
                    getTotal();
                } else {

                }
            }
        });

    }
    // 默认全选
    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();

    // 如果并未选中任何商品，‘删除选中商品’颜色为#898888；否则为#030304
    if (selectedTotal.innerHTML != 0) {
        deleteAll.style.color = "#030304";
    }else{
        deleteAll.style.color = "#898888";
    }


};

