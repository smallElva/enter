var map;
function  loadMap() {
    $('#deviceModal').modal();
    //①初始化地图
    map = new AMap.Map("container", {
        zoom:15,
        resizeEnable: true
    });
    //②加载工具插件
    map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
    });
    //加载定位插件
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });


}

/**
 * 解析定位结果
 * @param result
 */
function onComplete(result) {
    lng = result.position.getLng();
    lat = result.position.getLat();
    search(lng,lat,'KTV');
}


/**
 * 定位失败
 * @param result
 */
function onError(result) {
    console.log("定位失败");
}

/**
 *
 * @param lng   经度
 * @param lat   纬度
 * @param keyWord   搜索关键词
 */
function search(lng,lat,keyWord){
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 20,
            type: keyWord,
            pageIndex: 1,
            map: map,
            center:[lng,lat],
            panel: "panel"
        });
        if(lng){
            var cpoint = [lng,lat]; //中心点坐标
            placeSearch.searchNearBy('', cpoint, 1000, function(status, result) {});
        }else{
            placeSearch.search(keyWord,function(status, result){});
        }
    });
}