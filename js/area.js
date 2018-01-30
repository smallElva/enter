/**
 * Created by enter on 2017/12/18.
 */
/**
 * jquery.area.js
 * 移动端省市区三级联动选择插件
 * author: Elva
 * date: 2017-12-18
 **/
var provinceOption,cityOption,areaOption;
var expressArea;
var areaCont;
var areaList = $("#areaList");
var addressXml;
/**
 * 初始化地址数据
 */
$.ajax({
    url:"areas.xml",
    dataType:"xml",
    type:"GET",
    success:function(xmlDoc){
        addressXml = xmlDoc;
        intProvince();
    }
});

function refreshOption(provinceCode,cityCode,areaCode){
     provinceOption = "province[postcode=" + provinceCode + "]";
     cityOption = provinceOption + " " + "city[postcode=" + cityCode + "]";
     areaOption = cityOption + " " + "area[postcode=" + areaCode + "]";
}


/*初始化省份*/
function intProvince() {
    areaCont = "";
    var valueList = $(addressXml).find("province");
    $(valueList).each(function () {
        var postcode = $(this).attr("postcode");
        var name = $(this).attr("name");
        areaCont += '<li onClick="selectP(' + postcode + ');">' + name + '</li>';
    });
    areaList.html(areaCont);
    $("#areaBox").scrollTop(0);
    $("#backUp").removeAttr("onClick").hide();
}


/*选择省份*/
function selectP(provinceCode) {
    areaCont = "";
    areaList.html("");
    refreshOption(provinceCode,0,0);
    var valueList = $(addressXml).find(provinceOption).children("city");
    var provinceName = $(addressXml).find(provinceOption).attr("name");
    $(valueList).each(function () {
        var postcode = $(this).attr("postcode");
        var name = $(this).attr("name");
        areaCont += '<li onClick="selectC(' + provinceCode + ','+postcode+');">' + provinceName + name + '</li>';
    });
    areaList.html(areaCont);
    $("#areaBox").scrollTop(0);
    expressArea = provinceName + " > ";
    $("#backUp").attr("onClick", "intProvince();").show();
}

/*选择城市*/
function selectC(provinceCode,cityCode) {
    areaCont = "";
    refreshOption(provinceCode,cityCode,0);
    var valueList = $(addressXml).find(cityOption).children("area");
    var provinceName = $(addressXml).find(provinceOption).attr("name");
    var cityName= $(addressXml).find(cityOption).attr("name");
    $(valueList).each(function () {
        var postcode = $(this).attr("postcode");
        var name = $(this).attr("name");
        areaCont += '<li onClick="selectD(' + provinceCode + ',' + cityCode + ',' + postcode + ');">' + provinceName + cityName + name + '</li>';
    });
    areaList.html(areaCont);
    $("#areaBox").scrollTop(0);
    expressArea += cityName + ">";
    $("#backUp").attr("onClick", "selectP(" + provinceCode + ");");
}

/*选择区县*/
function selectD(provinceCode, cityCode,areaCode) {
    refreshOption(provinceCode,cityCode,areaCode);
    var areaName = $(addressXml).find(areaOption).attr("name");
    clockArea();
    expressArea += areaName;
    $("#expressArea .address_choose").html(expressArea);
}

/*关闭省市区选项*/
function clockArea() {
    $("#areaMask").fadeOut();
    $("#areaLayer").animate({"bottom": "-100%"});
    intProvince();
}

$(function() {
    /*打开省市区选项*/
    $("#expressArea").click(function() {
        $("#areaMask").fadeIn();
        $("#areaLayer").animate({"bottom": 0});
    });
    /*关闭省市区选项*/
    $("#areaMask, #closeArea").click(function() {
        clockArea();
    });
});
