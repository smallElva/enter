/**
 * Created by enter on 2017/12/26.
 */

/*pc端上传图片方法 */
/**
*@param containerId 存放图片的父级元素

*/
function imgChange(containerId,inputId) {
    //获取点击的文本框
    var file = document.getElementById(inputId);
    //存放图片的父级元素
    var imgContainer = document.getElementById(containerId);
    //文本框的父元素
    var zFile = file.parentNode;
    //获取的图片文件
    var fileList = file.files;

    var imgArr = [];
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(file.files[i]);
        imgArr.push(imgUrl);
        var img = document.createElement("img");
        img.setAttribute("src", imgArr[i]);
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("class", "z_addImg");
        var closeIcon = document.createElement("i");
        closeIcon.setAttribute("class", "iconfont icon-close closeImg");
        imgAdd.appendChild(img);
        imgAdd.appendChild(closeIcon);
        imgContainer.insertBefore(imgAdd,zFile);
        $('.img_div').remove();
    }
    imgRemove();
}


// 点击图片删除该图片方法
function imgRemove() {
    var imgList = document.getElementsByClassName("z_addImg");
    for (var j = 0; j < imgList.length; j++) {
        imgList[j].index = j;
        imgList[j].onclick = function() {
            var t = this;
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
                t.remove();
            }
            else{                                                                                         //判断如果是移动端，当弹出层出现时，消除背景可以滑动的bug
                var sure = document.getElementById("sureDelete");
                $('#deleteModal').modal('show');
                sure.onclick = function() {
                    $('#deleteModal').modal('hide');
                    t.remove();
                };
            }
        }
    }
}
