/*-------------------------------------------------------------------
 *
 * File Name   : amazonS1.js
 *
-------------------------------------------------------------------*/

$(function(){

/* =================================================================

    User Agent

================================================================= */
var basicUaFlg = 1; // 初期値はPC

var basicIosFlg = 0;
var basicAndroidFlg = 0;
var basicAndroidVer = 0;

var basicIeFlg = [0, 0];

var basicUaMedia = [
    'iphone',
    'ipod',
    'ipad',
    'android',
    'msie',
    'trident'
];
var basicUa = navigator.userAgent.toLowerCase();

var basicUaPattern = new RegExp(basicUaMedia.join('|'), 'i');
if (basicUaPattern.test(basicUa)) {
    // iPhone
    if (basicUa.indexOf('iphone') != -1 && basicUa.indexOf('ipad') == -1 && basicUa.indexOf('ipod') == -1) {
        basicUaFlg = 2;
        basicIosFlg = 1;
    // iPod
    } else if (basicUa.indexOf('ipod') != -1) {
        basicUaFlg = 2;
        basicIosFlg = 1;
    // iPad
    } else if (basicUa.indexOf('ipad') != -1) {
        basicUaFlg = 3;
        basicIosFlg = 1;
    // Android Phone
    } else if (basicUa.indexOf('android') != -1 && basicUa.indexOf('mobile') != -1) {
        basicUaFlg = 2;
        basicAndroidFlg = 1;
        basicAndroidVer = parseFloat(basicUa.slice(basicUa.indexOf('android')+8));
    // Android Tablet
    } else if (basicUa.indexOf('android') != -1) {
        basicUaFlg = 3;
        basicAndroidFlg = 1;
        basicAndroidVer = parseFloat(basicUa.slice(basicUa.indexOf('android')+8));
    // Internet Explorer
    } else if (basicUa.indexOf('msie') != -1 || basicUa.indexOf('trident') != -1) {
        var array = /(msie|rv:?)\s?([\d\.]+)/.exec(basicUa);
        basicIeFlg[0] = 1;
        basicIeFlg[1] = parseFloat((array) ? array[2] : 0);
    }
}


/* =================================================================

    商品情報モーダル

================================================================= */

    $('#amItemListArea .title , .amItemThumb a').on("click",function(){

        var scrollT = $(window).scrollTop();// スクロールした高さ
        var amWinTop = (scrollT + 50) + 'px';
        $('.amItemWindow').css({'top' : amWinTop });
        //ウィンドウを開くときに毎回scrollTopを取る

        $('#amOverlay').fadeIn();
        $('.amItemWindow').fadeIn();

        return false;
    });

    $('#amOverlay , .amItemWinClose').on("click",function(){
        $('#amOverlay').fadeOut();
        $('.amItemWindow').fadeOut();
    });



/* ------------------------------
    モーダル内画像切替
------------------------------ */

    if($("li.itemPhoto a").size() > 0){
        $("li.itemPhoto a").click(function(){
            var src = $(this).attr("href");
            $("#thumbnail_image").fadeOut("fast",function() {
                $(this).attr("src",src);
                $(this).fadeIn();
            });
            return false;

        });
    }



/* =================================================================

    Supplement Balloon

================================================================= */
        var supBalloon = {
            config: {
                trigElem: $('[data-supballoon]'),
                spd: 400,
                eas: 'easeInQuad'
            },

            init: function() {
                var t = this;
                var $trigElem = t.config.trigElem;

                if ($trigElem.size() <= 0) {return;}

                if (basicUaFlg != 1) {
                    $('[data-supballoon] .balloonWrap').hide();
                }

                t.swell();
            },

            swell: function() {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;
                var $trigElem = t.config.trigElem;

                $trigElem.each(function(i) {
                    var $self = $(this);
                    var data = $self.attr('data-supballoon').split(',');

                    $self.hover(function() {
                        $self.find('.balloonSymbol').fadeOut(200);
                        $self.find('.balloonBox').velocity('stop').velocity({
                            properties: {
                                width: [data[0] + 'px', '30px'],
                                height: [data[1] + 'px', '30px'],
                                transformOriginX: ['100%', '0'],
                                transformOriginY: ['100%', '0'],
                                translateX: [data[2] + 'px', '0'],
                                translateY: [data[3] + 'px', '0'],
                                borderRadius: ['6px', '50%']
                            },
                            options: {
                                duration: spd, // アニメーション時間
                                easing: eas, // イージング
                                complete: function() {
                                    $self.find('.balloonCont').fadeIn(200);
                                }, // 完了時の処理
                                display: 'block' // 表示・非表示
                            }
                        });

                        $self.find('.balloonSymbol').hide();
                    }, function() {
                        $self.find('.balloonCont').hide();
                        $self.find('.balloonBox').velocity('stop').velocity('reverse', function() {
                            $(this).fadeOut(200);
                            $self.find('.balloonSymbol').show();
                        });
                    });
                });
            }
        }

        supBalloon.init();



/* =================================================================

    モノレート・プライスチェック モーダル

================================================================= */


    $('.mnrateFree').on("click",function(){
        $('#amOverlay').fadeIn();
        $('.mnrateFreeWindow').fadeIn();
        return false;
    });

    $('.pcheckFree').on("click",function(){
        $('#amOverlay').fadeIn();
        $('.pcheckFreeWindow').fadeIn();
        return false;
    });


    $('.amItemWindow .mnrateFree , .amItemWindow .pcheckFree').on("click",function(){
        $('#amItemInrOverlay').fadeIn();
        return false;
    });


    $('#amOverlay , .amFreeWinClose , #amItemInrOverlay').on("click",function(){
        $('.mnrateFreeWindow').fadeOut();
        $('.pcheckFreeWindow').fadeOut();
        $('#amItemInrOverlay').fadeOut();
    });



});
