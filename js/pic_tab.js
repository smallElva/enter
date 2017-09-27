
var $ = $.noConflict();
//ban_qh
$.fn.banqh = function(can){
	can = $.extend({
					box:null,//总框架
					pic:null,//大图框架
					pnum:null,//小图框架
					prev_btn:null,//小图左箭头
					next_btn:null,//小图右箭头
					prev:null,//大图左箭头
					next:null,//大图右箭头
					pop_prev:null,//弹出框左箭头
					pop_next:null,//弹出框右箭头
					autoplay:false,//是否自动播放
					interTime:5000,//图片自动切换间隔
					delayTime:800,//切换一张图片时间
					pop_delayTime:800,//弹出框切换一张图片时间
					order:0,//当前显示的图片（从0开始）
					picdire:true,//大图滚动方向（true水平方向滚动）
					mindire:true,//小图滚动方向（true水平方向滚动）
					min_picnum:null,//小图显示数量
					pop_up:false,//大图是否有弹出框
					pop_div:null,//弹出框框架
					pop_pic:null,//弹出框图片框架
					pop_xx:null,//关闭弹出框按钮
					mhc:null//朦灰层
				}, can || {});
	var picnum = $(can.pic).find('ul li').length;
	var picw = $(can.pic).find('ul li').outerWidth(true);
	var pich = $(can.pic).find('ul li').outerHeight(true);
	var poppicw = $(can.pop_pic).find('ul li').outerWidth(true);
	var picminnum = $(can.pnum).find('ul li').length;
	var picpopnum = $(can.pop_pic).find('ul li').length;
	var picminw = $(can.pnum).find('ul li').outerWidth(true);
	var picminh = $(can.pnum).find('ul li').outerHeight(true);
	var pictime;
	var tpqhnum=0;
	var xtqhnum=0;
	var popnum=0;
	$(can.pic).find('ul').width(picnum*picw).height(picnum*pich);
	$(can.pnum).find('ul').width(picminnum*picminw).height(picminnum*picminh);
	$(can.pop_pic).find('ul').width(picpopnum*poppicw);
	
//点击小图切换大图
	    $(can.pnum).find('li').click(function () {
        tpqhnum = xtqhnum = $(can.pnum).find('li').index(this);
        show(tpqhnum);
		minshow(xtqhnum);
    }).eq(can.order).trigger("click");
//大图弹出框
if(can.pop_up==true){
	$(can.pic).find('ul li').click(function(){
		$(can.mhc).height($(document).height()).show();
		$(can.pop_div).show();
		popnum = $(this).index();
		var gdjl_w=-popnum*poppicw;
		$(can.pop_pic).find('ul').css('left',gdjl_w);
		popshow(popnum);
		})
	$(can.pop_xx).click(function(){
		$(can.mhc).hide();
		$(can.pop_div).hide();
	})
}

	if(can.autoplay==true){
//自动播放
		pictime = setInterval(function(){
			show(tpqhnum);
			minshow(tpqhnum)
			tpqhnum++;
			xtqhnum++;
			if(tpqhnum==picnum){tpqhnum=0};	
			if(xtqhnum==picminnum){xtqhnum=0};
					
		},can.interTime);	
		
//鼠标经过停止播放
		$(can.box).hover(function(){
			clearInterval(pictime);
		},function(){
			pictime = setInterval(function(){
				show(tpqhnum);
				minshow(tpqhnum)
				tpqhnum++;
				xtqhnum++;
				if(tpqhnum==picnum){tpqhnum=0};	
				if(xtqhnum==picminnum){xtqhnum=0};		
				},can.interTime);			
			});
	}
//小图左右切换			
	$(can.prev_btn).click(function(){
		if(tpqhnum==0){tpqhnum=picnum};
		if(xtqhnum==0){xtqhnum=picnum};
		xtqhnum--;
		tpqhnum--;
		show(tpqhnum);
		minshow(xtqhnum);	
		})
	$(can.next_btn).click(function(){
		if(tpqhnum==picnum-1){tpqhnum=-1};
		if(xtqhnum==picminnum-1){xtqhnum=-1};
		xtqhnum++;
		minshow(xtqhnum)
		tpqhnum++;
		show(tpqhnum);
		})	
//大图左右切换	
	$(can.prev).click(function(){
		if(tpqhnum==0){tpqhnum=picnum};
		if(xtqhnum==0){xtqhnum=picnum};
		xtqhnum--;
		tpqhnum--;
		show(tpqhnum);
		minshow(xtqhnum);	
		})
	$(can.next).click(function(){
		if(tpqhnum==picnum-1){tpqhnum=-1};
		if(xtqhnum==picminnum-1){xtqhnum=-1};
		xtqhnum++;
		minshow(xtqhnum)
		tpqhnum++;
		show(tpqhnum);
		})
//弹出框图片左右切换	
	$(can.pop_prev).click(function(){
		if(popnum==0){popnum=picnum};
		popnum--;
		popshow(popnum);
		})
	$(can.pop_next).click(function(){
		if(popnum==picnum-1){popnum=-1};
		popnum++;
		popshow(popnum);
		})			
//小图切换过程
	function minshow(xtqhnum){
		var mingdjl_num =xtqhnum-can.min_picnum+2
		var mingdjl_w=-mingdjl_num*picminw;
		var mingdjl_h=-mingdjl_num*picminh;
		
		if(can.mindire==true){
			$(can.pnum).find('ul li').css('float','left');
			if(picminnum>can.min_picnum){
				if(xtqhnum<3){mingdjl_w=0;}
				if(xtqhnum==picminnum-1){mingdjl_w=-(mingdjl_num-1)*picminw;}
				$(can.pnum).find('ul').stop().animate({'left':mingdjl_w},can.delayTime);
				}
				
		}else{
			$(can.pnum).find('ul li').css('float','none');
			if(picminnum>can.min_picnum){
				if(xtqhnum<3){mingdjl_h=0;}
				if(xtqhnum==picminnum-1){mingdjl_h=-(mingdjl_num-1)*picminh;}
				$(can.pnum).find('ul').stop().animate({'top':mingdjl_h},can.delayTime);
				}
			}
		
	}
//大图切换过程
		function show(tpqhnum){
			var gdjl_w=-tpqhnum*picw;
			var gdjl_h=-tpqhnum*pich;
			if(can.picdire==true){
				$(can.pic).find('ul li').css('float','left');
				$(can.pic).find('ul').stop().animate({'left':gdjl_w},can.delayTime);
				}else{
			$(can.pic).find('ul').stop().animate({'top':gdjl_h},can.delayTime);
			}//滚动
			//$(can.pic).find('ul li').eq(tpqhnum).fadeIn(can.delayTime).siblings('li').fadeOut(can.delayTime);//淡入淡出
			$(can.pnum).find('li').eq(tpqhnum).addClass("on").siblings(this).removeClass("on");
		};
//弹出框图片切换过程
		function popshow(popnum){
			var gdjl_w=-popnum*poppicw;
				$(can.pop_pic).find('ul').stop().animate({'left':gdjl_w},can.pop_delayTime);
			//$(can.pop_pic).find('ul li').eq(tpqhnum).fadeIn(can.pop_delayTime).siblings('li').fadeOut(can.pop_delayTime);//淡入淡出
		};					
				
};

/*!
 * jquery Magnify Plugin v2.1.0 by T. H. Doan (http://thdoan.github.io/magnify/)
 * Based on http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
 *
 * jQuery Magnify by T. H. Doan is licensed under the MIT License.
 * Read a copy of the license in the LICENSE file or at http://choosealicense.com/licenses/mit
 */

(function($) {
    $.fn.magnify = function(oOptions) {
        // Default options
        oOptions = $.extend({
            'src': '',
            'speed': 100,
            'timeout': -1,
            'finalWidth': null,
            'finalHeight': null,
            'magnifiedWidth': null,
            'magnifiedHeight': null,
            'limitBounds': false,
            'afterLoad': function(){}
        }, oOptions);

        var $that = this, // Preserve scope
            $html = $('html'),

            // Initiate
            init = function(el) {
                var $image = $(el),
                    $anchor = $image.closest('a'),
                    oDataAttr = {};

                // Get data attributes
                for (var i in oOptions) {
                    oDataAttr[i] = $image.attr('data-magnify-' + i.toLowerCase());
                }

                // Disable zooming if no valid large image source
                var sZoomSrc = oDataAttr['src'] || oOptions['src'] || $anchor.attr('href') || '';
                if (!sZoomSrc) return;

                var $container,
                    $lens,
                    nImageWidth,
                    nImageHeight,
                    nMagnifiedWidth,
                    nMagnifiedHeight,
                    nLensWidth,
                    nLensHeight,
                    nBoundX = 0,
                    nBoundY = 0,
                    oContainerOffset, // Relative to document
                    oImageOffset,     // Relative to container
                    // Get true offsets
                    getOffset = function() {
                        var o = $container.offset();
                        // Store offsets from container border to image inside
                        // NOTE: .offset() does NOT take into consideration image border and padding.
                        oImageOffset = {
                            'top': ($image.offset().top-o.top) + parseInt($image.css('border-top-width')) + parseInt($image.css('padding-top')),
                            'left': ($image.offset().left-o.left) + parseInt($image.css('border-left-width')) + parseInt($image.css('padding-left'))
                        };
                        o.top += oImageOffset['top'];
                        o.left += oImageOffset['left'];
                        return o;
                    },
                    // Hide the lens
                    hideLens = function() {
                        if ($lens.is(':visible')) $lens.fadeOut(oOptions['speed'], function() {
                            $html.removeClass('magnifying').trigger('magnifyend'); // Reset overflow-x
                        });
                    };

                // Data attributes have precedence over options object
                if (!isNaN(+oDataAttr['speed'])) oOptions['speed'] = +oDataAttr['speed'];
                if (!isNaN(+oDataAttr['timeout'])) oOptions['timeout'] = +oDataAttr['timeout'];
                if (!isNaN(+oDataAttr['finalWidth'])) oOptions['finalWidth'] = +oDataAttr['finalWidth'];
                if (!isNaN(+oDataAttr['finalHeight'])) oOptions['finalHeight'] = +oDataAttr['finalHeight'];
                if (!isNaN(+oDataAttr['magnifiedWidth'])) oOptions['magnifiedWidth'] = +oDataAttr['magnifiedWidth'];
                if (!isNaN(+oDataAttr['magnifiedHeight'])) oOptions['magnifiedHeight'] = +oDataAttr['magnifiedHeight'];
                if (oDataAttr['limitBounds']==='true') oOptions['limitBounds'] = true;
                if (typeof window[oDataAttr['afterLoad']]==='function') oOptions.afterLoad = window[oDataAttr['afterLoad']];

                // Save any inline styles for resetting
                $image.data('originalStyle', $image.attr('style'));

                // Activate magnification:
                // 1. Try to get large image dimensions
                // 2. Proceed only if able to get large image dimensions OK

                // [1] Calculate the native (magnified) image dimensions. The zoomed version is only shown
                // after the native dimensions are available. To get the actual dimensions we have to create
                // this image object.
                var elZoomImage = new Image();
                $(elZoomImage).on({
                    'load': function() {
                        // [2] Got image dimensions OK.

                        var nX, nY;

                        // Fix overlap bug at the edges during magnification
                        $image.css('display', 'block');
                        // Create container div if necessary
                        if (!$image.parent('.magnify').length) {
                            $image.wrap('<div class="magnify"></div>');
                        }
                        $container = $image.parent('.magnify');
                        // Create the magnifying lens div if necessary
                        if ($image.prev('.magnify-lens').length) {
                            $container.children('.magnify-lens').css('background-image', 'url(\'' + sZoomSrc + '\')');
                        } else {
                            $image.before('<div class="magnify-lens loading" style="background:url(\'' + sZoomSrc + '\') 0 0 no-repeat"></div>');
                        }
                        $lens = $container.children('.magnify-lens');
                        // Remove the "Loading..." text
                        $lens.removeClass('loading');
                        // Cache dimensions and offsets for improved performance
                        // NOTE: This code is inside the load() function, which is important. The width and
                        // height of the object would return 0 if accessed before the image is fully loaded.
                        nImageWidth = oOptions['finalWidth'] || $image.width();
                        nImageHeight = oOptions['finalHeight'] || $image.height();
                        nMagnifiedWidth = oOptions['magnifiedWidth'] || elZoomImage.width;
                        nMagnifiedHeight = oOptions['magnifiedHeight'] || elZoomImage.height;
                        nLensWidth = $lens.width();
                        nLensHeight = $lens.height();
                        oContainerOffset = getOffset(); // Required by refresh()
                        // Set zoom boundaries
                        if (oOptions['limitBounds']) {
                            nBoundX = (nLensWidth/2) / (nMagnifiedWidth/nImageWidth);
                            nBoundY = (nLensHeight/2) / (nMagnifiedHeight/nImageHeight);
                        }
                        // Enforce non-native large image size?
                        if (nMagnifiedWidth!==elZoomImage.width || nMagnifiedHeight!==elZoomImage.height) {
                            $lens.css('background-size', nMagnifiedWidth + 'px ' + nMagnifiedHeight + 'px');
                        }
                        // Store zoom dimensions for mobile plugin
                        $image.data('zoomSize', {
                            'width': nMagnifiedWidth,
                            'height': nMagnifiedHeight
                        });
                        // Clean up
                        elZoomImage = null;
                        // Execute callback
                        oOptions.afterLoad();
                        // Handle mouse movements
                        $container.off().on({
                            'mousemove touchmove': function(e) {
                                e.preventDefault();
                                // Reinitialize if image initially hidden
                                if (!nImageHeight) {
                                    refresh();
                                    return;
                                }
                                // x/y coordinates of the mouse pointer or touch point. This is the position of
                                // .magnify relative to the document.
                                //
                                // We deduct the positions of .magnify from the mouse or touch positions relative to
                                // the document to get the mouse or touch positions relative to the container.
                                nX = (e.pageX || e.originalEvent.touches[0].pageX) - oContainerOffset['left'],
                                    nY = (e.pageY || e.originalEvent.touches[0].pageY) - oContainerOffset['top'];
                                // Toggle magnifying lens
                                if (!$lens.is(':animated')) {
                                    if (nX>nBoundX && nX<nImageWidth-nBoundX && nY>nBoundY && nY<nImageHeight-nBoundY) {
                                        if ($lens.is(':hidden')) {
                                            $html.addClass('magnifying').trigger('magnifystart'); // Hide overflow-x while zooming
                                            $lens.fadeIn(oOptions['speed']);
                                        }
                                    } else {
                                        hideLens();
                                    }
                                }
                                if ($lens.is(':visible')) {
                                    // Move the magnifying lens with the mouse
                                    var sBgPos = '';
                                    if (nMagnifiedWidth && nMagnifiedHeight) {
                                        // Change the background position of .magnify-lens according to the position of
                                        // the mouse over the .magnify-image image. This allows us to get the ratio of
                                        // the pixel under the mouse pointer with respect to the image and use that to
                                        // position the large image inside the magnifying lens.
                                        var nRatioX = -Math.round(nX/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                                            nRatioY = -Math.round(nY/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                                        if (oOptions['limitBounds']) {
                                            // Enforce bounds to ensure only image is visible in lens
                                            var nBoundRight = -Math.round((nImageWidth-nBoundX)/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                                                nBoundBottom = -Math.round((nImageHeight-nBoundY)/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                                            // Left and right edges
                                            if (nRatioX>0) nRatioX = 0;
                                            else if (nRatioX<nBoundRight) nRatioX = nBoundRight;
                                            // Top and bottom edges
                                            if (nRatioY>0) nRatioY = 0;
                                            else if (nRatioY<nBoundBottom) nRatioY = nBoundBottom;
                                        }
                                        sBgPos = nRatioX + 'px ' + nRatioY + 'px';
                                    }
                                    // Now the lens moves with the mouse. The logic is to deduct half of the lens's
                                    // width and height from the mouse coordinates to place it with its center at the
                                    // mouse coordinates. If you hover on the image now, you should see the magnifying
                                    // lens in action.
                                    $lens.css({
                                        'top': Math.round(nY-nLensHeight/2) + oImageOffset['top'] + 'px',
                                        'left': Math.round(nX-nLensWidth/2) + oImageOffset['left'] + 'px',
                                        'background-position': sBgPos
                                    });
                                }
                            },
                            'mouseenter': function() {
                                // Need to update offsets here to support accordions
                                oContainerOffset = getOffset();
                            },
                            'mouseleave': hideLens
                        });

                        // Prevent magnifying lens from getting "stuck"
                        if (oOptions['timeout']>=0) {
                            $container.on('touchend', function() {
                                setTimeout(hideLens, oOptions['timeout']);
                            });
                        }
                        // Ensure lens is closed when tapping outside of it
                        $('body').not($container).on('touchstart', hideLens);

                        // Support image map click-throughs while zooming
                        var sUsemap = $image.attr('usemap');
                        if (sUsemap) {
                            var $map = $('map[name=' + sUsemap.slice(1) + ']');
                            // Image map needs to be on the same DOM level as image source
                            $image.after($map);
                            $container.click(function(e) {
                                // Trigger click on image below lens at current cursor position
                                if (e.clientX || e.clientY) {
                                    $lens.hide();
                                    var elPoint = document.elementFromPoint(
                                        e.clientX || e.originalEvent.touches[0].clientX,
                                        e.clientY || e.originalEvent.touches[0].clientY
                                    );
                                    if (elPoint.nodeName==='AREA') {
                                        elPoint.click();
                                    } else {
                                        // Workaround for buggy implementation of elementFromPoint()
                                        // See https://bugzilla.mozilla.org/show_bug.cgi?id=1227469
                                        $('area', $map).each(function() {
                                            var a = $(this).attr('coords').split(',');
                                            if (nX>=a[0] && nX<=a[2] && nY>=a[1] && nY<=a[3]) {
                                                this.click();
                                                return false;
                                            }
                                        });
                                    }
                                }
                            });
                        }

                        if ($anchor.length) {
                            // Make parent anchor inline-block to have correct dimensions
                            $anchor.css('display', 'inline-block');
                            // Disable parent anchor if it's sourcing the large image
                            if ($anchor.attr('href') && !(oDataAttr['src'] || oOptions['src'])) {
                                $anchor.click(function(e) {
                                    e.preventDefault();
                                });
                            }
                        }

                    },
                    'error': function() {
                        // Clean up
                        elZoomImage = null;
                    }
                });

                elZoomImage.src = sZoomSrc;
            }, // END init()

            // Simple debounce
            nTimer = 0,
            refresh = function() {
                clearTimeout(nTimer);
                nTimer = setTimeout(function() {
                    $that.destroy();
                    $that.magnify(oOptions);
                }, 100);
            };

        /**
         * Public Methods
         */

        // Turn off zoom and reset to original state
        this.destroy = function() {
            this.each(function() {
                var $this = $(this),
                    $lens = $this.prev('div.magnify-lens'),
                    sStyle = $this.data('originalStyle');
                if ($this.parent('div.magnify').length && $lens.length) {
                    if (sStyle) $this.attr('style', sStyle);
                    else $this.removeAttr('style');
                    $this.unwrap();
                    $lens.remove();
                }
            });
            // Unregister event handler
            $(window).off('resize', refresh);
            return $that;
        };

        // Handle window resizing
        $(window).resize(refresh);

        return this.each(function() {
            // Initiate magnification powers
            init(this);
        });

    };
}(jQuery));

