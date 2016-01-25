/*-------------------------------------------------------------------
 *
 * File Name : basic.js
 *
-------------------------------------------------------------------*/

/* Table Of Contents
------------------------------------------
User Agent
Smooth Scroll
Button Click Effects
Header User Menu
Header Search
Fixed Mini Header
Fixed Pagetop
Tooltip Comment
Ad Display Alternative
Supplement Balloon
Alert Modal Window
Ripple Modal Window
Window Function

Change Viewmode
------------------------------------------ */

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

/* ================================================================ */

(function($) {
    $.event.add(window, 'load', function() {

        var $win = $(window);
        var $html = $('html');
        var $body = $('body');
        var $frame = $('#frame');

        var winWidth = $win.width();
        var winHeight = $win.height();
        var scVal = $win.scrollTop();

/* =================================================================

    Attachment Hover Class

================================================================= */
        if (basicUaFlg != 1) {
            $('a, .hv').addClass('tb');

            var linkTouchStart = function(){
                thisAnchor = $(this);
                touchPos = thisAnchor.offset().top;
                moveCheck = function(){
                    nowPos = thisAnchor.offset().top;
                    if(touchPos == nowPos){
                        thisAnchor.addClass('hover');
                    }
                }
                setTimeout(moveCheck, 100);
            }

            var linkTouchEnd = function(){
                thisAnchor = $(this);
                hoverRemove = function(){
                    thisAnchor.removeClass('hover');
                }
                setTimeout(hoverRemove, 500);
            }

            $(document).on('touchstart mousedown','a, .hv',linkTouchStart);
            $(document).on('touchend mouseup','a, .hv',linkTouchEnd);
        }

/* =================================================================

    Smooth Scroll

================================================================= */
        var smtSc = {

            config: {
                speed: 700,
                easing: 'easeOutQuart',
                noscClass: 'nosc'
            },

            self: '',

            init: function() {
                if (basicUaFlg === 1) { // PCの処理
                    $(document).on('mousedown', 'a[href^=#]:not(".' + smtSc.config.noscClass + '")', function() {
                        smtSc.self = $(this);
                        smtSc.scFunc();
                    });

                } else { // PC以外の処理
                    $(document).on('touchstart', 'a[href^=#]:not(".' + smtSc.config.noscClass + '")', function() {
                        smtSc.self = $(this);
                        smtSc.scFunc();
                    });
                }

                $(document).on('click', 'a[href^=#]:not(".' + smtSc.config.noscClass + '")', function() {
                    return false;
                });
            },

            scFunc: function() {
                var html = navigator.userAgent.match(/Chrome|Safari/) ? 'body' : 'html';
                var href;
                var target;
                var position;

                href = this.self.attr('href');
                target = href == '#' || href == '' ? 'body' : href;
                position = $(target).offset().top;

                $(html).stop(false, true).animate({
                    scrollTop: position
                }, smtSc.config.speed, smtSc.config.easing);
            }
        };

        smtSc.init();

/* =================================================================

    Button Click Effects

================================================================= */
        var btnEffects = {
            config: {
                btnElem: $('.btnEffects'),
                curBtnElem: '',
                rippleElem: '',
                rippleX: '',
                rippleY: '',
                spd: 800,
                eas: 'easeOutSine'
            },

            init: function() {
                var t = this;
                var $btnElem = t.config.btnElem;

                if ($btnElem.size() <= 0) {return;}

                $btnElem.each(function() {
                    var rippleWidth = $(this).innerWidth() * 2;
                    var rippleHTML = '<span class="ripple" style="width:' + rippleWidth + 'px; height:' + rippleWidth + 'px;"></span>';

                    $(this).append(rippleHTML);
                });

                t.config.rippleElem = $('.ripple', $btnElem);

                t.userEvent();
            },

            rippleAnim: function() {
                var t = this;
                var $curBtnElem = t.config.curBtnElem;
                var $rippleElem = t.config.rippleElem;
                var elem = $curBtnElem.find($rippleElem);
                var rippleX = t.config.rippleX;
                var rippleY = t.config.rippleY;
                var rippleWidth = elem.width();
                var spd = t.config.spd;
                var eas = t.config.eas;

                elem.velocity('stop').velocity({
                    properties: {
                        top: [rippleY, rippleY],
                        left: [rippleX, rippleX],
                        opacity: [0, 1],
                        marginTop: [-rippleWidth / 2, -rippleWidth / 2],
                        marginLeft: [-rippleWidth / 2, -rippleWidth / 2],
                        transformOrigin: ['50% 50%', '50% 50%'],
                        scale: [1.2, 0]
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        complete: function() { // 完了時の処理
                            $(this).hide();
                        },
                        display: 'block' // 表示・非表示
                    }
                });

            },

            userEvent: function() {
                var t = this;
                var $btnElem = t.config.btnElem;

                if (basicUaFlg === 1) { // PCの処理
                    $btnElem.on('mouseup', function(e){
                        t.config.rippleX = e.pageX - $(this).offset().left;
                        t.config.rippleY = e.pageY - $(this).offset().top;
                        t.config.curBtnElem = $(this);

                        t.rippleAnim();
                    });

                } else { // PC以外の処理
                    $btnElem.on('touchstart', function(e){
                        var e = e.originalEvent.touches[0];

                        t.config.rippleX = e.pageX - $(this).offset().left;
                        t.config.rippleY = e.pageY - $(this).offset().top;
                        t.config.curBtnElem = $(this);

                        t.rippleAnim();
                    });
                }
            }
        }

        btnEffects.init();

/* =================================================================

    Header User Menu

================================================================= */
        var headerUserMenu = {
            config: {
                trigElem: [
                    '#headerSwitchingArea .status',
                    '#fixedMinHeader .toolUser'
                ],
                menuElem: $('.userMenu'),
                curElem: '',
                spd: 200,
                eas: 'easeOutCubic'
            },

            init: function() {
                if (this.config.menuElem.size() <= 0) {return;}

                this.userEvent();
            },

            showAnim: function() {
                var t = this;
                var $menuElem = t.config.menuElem;
                var $curElem = t.config.curElem;
                var spd = t.config.spd;
                var eas = t.config.eas;

                $menuElem.hide();

                $curElem.parent().find($menuElem).velocity('stop').velocity({
                    properties: {
                        opacity: ['1', '0'],
                        translateY: ['0', '-10px']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        display: 'block' // 表示・非表示
                    }
                });

            },

            hideAnim: function() {
                var t = this;
                var trigElem = t.config.trigElem;
                var $menuElem = t.config.menuElem;
                var $curElem = t.config.curElem;
                var spd = t.config.spd;
                var eas = t.config.eas;

                $menuElem.velocity('stop').velocity({
                    properties: {
                        opacity: ['0', '1'],
                        translateY: ['-10px', '0']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        complete: null, // 完了時の処理
                        display: 'none' // 表示・非表示
                    }
                });

            },

            userEvent: function() {
                var t = this;
                var trigElem = t.config.trigElem;
                var $menuElem = t.config.menuElem;

                if (basicUaFlg === 1) { // PCの処理
                    $(trigElem[0] + ',' + trigElem[1]).on({
                        'mouseenter': function(){
                            t.config.curElem = $(this);
                            t.showAnim();
                        },
                        'mouseleave': function(){
                            t.hideAnim();
                        }
                    });

                    $(trigElem[0] + ',' + trigElem[1]).find('li').on('click', function() {
                        $(trigElem[0] + ',' + trigElem[1]).trigger('mouseleave');
                    });

                } else { // PC以外の処理
                    $(trigElem[0] + ',' + trigElem[1]).on('click', function() {
                        t.config.curElem = $(this);

                        if (!t.config.curElem.parent().find($menuElem).is(':visible')) {
                            t.showAnim();
                        }
                    });

                    $body.on('click', function() {
                        if (t.config.curElem.parent().find($menuElem).is(':visible')) {
                            t.hideAnim();
                        }
                    });
                }
            }
        }

        headerUserMenu.init();

/* =================================================================

    Header Search

================================================================= */
        var $curSwitchingTab;

        var headerSearchSwitching = {
            config: {
                searchform: $('#searchField #searchform'),
                switchingTab: $('#headerSwitchingArea .switchingTab'),
                searchInput: $('#searchField #searchInput'),
                searchMode: $('#searchField .searchMore'),
                placeholder: {
                    bid:      'オークションで落札済みの商品をさがす',
                    open:     '開催中のオークション商品をさがす',
                    shopping: '販売中のショッピング商品をさがす'
                },
                action: {
                    bid: 'http://aucfan.com/search1/',
                    open: 'http://aucfan.com/search2/',
                    shopping: 'http://aucfan.com/search3/'
                }
            },

            init: function() {
                var t = this;
                var $switchingTab = t.config.switchingTab;

                if ($switchingTab.size() <= 0) {return;}

                if ($('#searchformYm').size() > 0) {
                    // search3以外での処理（ブラウザバック時でも選択したタブを維持する）
                    var ym = $('#searchformYm').val();
                    var type = '';

                    if (ym == 'l30d') {
                        type = 'bid'
                    } else if (ym == 's2') {
                        type = 'shopping'
                    } else {
                        type = 'open';
                    }

                    $switchingTab.children().removeClass('current');
                    $curSwitchingTab = $('.' + type).find('a');
                    $curSwitchingTab.addClass('current');
                }

                t.switching();
                t.userEvent();
            },

            switching: function() {
                var t = this;
                var $searchform = t.config.searchform;
                var $switchingTab = t.config.switchingTab;
                var $searchInput = t.config.searchInput;
                var $searchMode = t.config.searchMode;
                var ph = t.config.placeholder;
                var action = t.config.action;
                var cls = $curSwitchingTab.parent().attr('class').split(' ');

                $switchingTab.children().removeClass('current');
                $curSwitchingTab.parent().addClass('current');

                if ($.inArray('bid', cls) >= 0) {
                    $searchInput.attr('placeholder', ph.bid);
                    $searchMode.children('a').attr('href', action.bid);
                    $('#searchformYm').val('l30d');
                } else if ($.inArray('open', cls) >= 0) {
                    $searchInput.attr('placeholder', ph.open);
                    $searchMode.children('a').attr('href', action.open);
                    $('#searchformYm').val('');
                } else {
                    $searchInput.attr('placeholder', ph.shopping);
                    $searchMode.children('a').attr('href', action.shopping);
                    $('#searchformYm').val('s2');
                }
            },

            userEvent: function() {
                var t = this;
                var $switchingTab = t.config.switchingTab;

                $switchingTab.find('a').on('click', function() {
                    if ($(this).parent().hasClass('current')) {return;}

                    $curSwitchingTab = $(this);

                    t.switching();
                });
            }
        }

        var headerSearch = {
            config: {
                searchTool: $('#searchField .searchToolBox'),
                searchInput: $('#searchField #searchInput')
            },

            init: function() {
                if (this.config.searchInput.size() <= 0) {return;}

                this.userEvent();
            },

            userEvent: function() {
                var t = this;
                var $searchTool = t.config.searchTool;
                var $searchInput = t.config.searchInput;

                $searchInput.on('focus', function() {
                    $searchTool.addClass('active');
                });

                $searchInput.on('blur', function() {
                    $searchTool.removeClass('active');
                });
            }
        }

        var headerSearchCategory = {
            config: {
                searchTool: $('#searchField .searchToolBox'),
                trigElem: $('#searchField .categorySelect'),
                cateSelect: $('#searchCateSelect'),
                cateList: $('.searchCateSelectInner .searchCateList'),
                spd: 400,
                eas: 'easeOutCubic'
            },

            init: function() {
                if (this.config.searchTool.size() <= 0) {return;}

                this.userEvent();
            },

            showAnim: function() {
                var t = this;
                var $searchTool = t.config.searchTool;
                var $cateSelect = t.config.cateSelect;
                var spd = t.config.spd;
                var eas = t.config.eas;

                $cateSelect.velocity('stop').velocity('slideDown', {
                    duration: spd, // アニメーション時間
                    easing: eas, // イージング
                    begin: function() { // 開始時の処理
                        $searchTool.addClass('cateActive');
                    },
                    complete: null // 完了時の処理
                });
            },

            hideAnim: function() {
                var t = this;
                var $searchTool = t.config.searchTool;
                var $cateSelect = t.config.cateSelect;

                $cateSelect.hide();
                $searchTool.removeClass('cateActive');
            },

            userEvent: function() {
                var t = this;
                var $trigElem = t.config.trigElem;
                var $cateSelect = t.config.cateSelect;
                var $cateList = t.config.cateList;

                $trigElem.on('click', function() {
                    if (!$cateSelect.is(':visible')) {
                        t.showAnim();
                    } else {
                        t.hideAnim();
                    }
                });

                $cateSelect.on('click', function(e) {
                    e.stopPropagation();
                });

                $cateList.children('li').on('click', function() {
                    var txt = $(this).text();

                    $cateList.children('li').removeClass('selected');
                    $(this).addClass('selected');
                    $trigElem.find('.curCategory .cateTxt').text(txt);
                    $('#searchformC').val($(this).attr('data-value'));
                    t.hideAnim();
                });

                $cateSelect.find('.close').on('click', function(e) {
                    if ($cateSelect.is(':visible')) {
                        t.hideAnim();
                    }
                });

                $body.on('click', function() {
                    if ($cateSelect.is(':visible')) {
                        t.hideAnim();
                    }
                });
            }
        }

        headerSearchSwitching.init();
        headerSearch.init();
        headerSearchCategory.init();

/* =================================================================

    Fixed Mini Header

================================================================= */
        var fixedMinHeaderDispPoint;

        var fixedMinHeader = {
            config: {
                headerElem: $('#fixedMinHeader'),
                dispPointElem: $('.fixedMinHeaderDispPoint'),
                hideAnimFlg: 0,
                spd: 400,
                eas: 'easeOutCubic'
            },

            init: function() {
                var t = this;
                var $dispPointElem = t.config.dispPointElem;

                if ($dispPointElem.size() <= 0) {return;}

                fixedMinHeaderDispPoint = $dispPointElem.offset().top;
            },

            showAnim: function() {
                var t = this;
                var $headerElem = t.config.headerElem;
                var spd = t.config.spd;
                var eas = t.config.eas;

                $headerElem.velocity('stop').velocity({
                    properties: {
                        translateY: ['0', '-100%']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        begin: function() { // 開始時の処理
                            $(this).css({
                                zIndex: 1000
                            });
                            t.config.hideAnimFlg = 0;
                        },
                        complete: null, // 完了時の処理
                        visibility: 'visible' // 表示・非表示
                    }
                });
            },

            hideAnim: function() {
                var t = this;
                var $headerElem = t.config.headerElem;
                var spd = t.config.spd;
                var eas = t.config.eas;

                if (t.config.hideAnimFlg) {return;}

                t.config.hideAnimFlg = 1;

                $headerElem.velocity('stop').velocity({
                    properties: {
                        translateY: ['-100%', '0']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        complete: function() { // 完了時の処理
                            $(this).css({
                                zIndex: ''
                            });
                            t.config.hideAnimFlg = 0;
                        },
                        visibility: 'hidden' // 表示・非表示
                    }
                });
            }
        }


        var minHeaderDropMenu = {
            config: {
                trigElem: '#fixedMinHeader .searchMore',
                shoppingSelect: $('#fixedMinHeader .searchMoreSelect'),
                spd: 400,
                eas: 'easeOutCubic'
            },

            init: function() {
                if (this.config.shoppingSelect.size() <= 0) {return;}

                this.userEvent();
            },

            showAnim: function() {
                var t = this;
                var $shoppingSelect = t.config.shoppingSelect;
                var spd = t.config.spd;
                var eas = t.config.eas;

                $shoppingSelect.stop(true, true).slideDown(spd, eas);
            },

            hideAnim: function() {
                var t = this;
                var $shoppingSelect = t.config.shoppingSelect;

                $shoppingSelect.hide();
            },

            userEvent: function() {
                var t = this;
                var trigElem = t.config.trigElem;
                var $shoppingSelect = t.config.shoppingSelect;

                if (basicUaFlg === 1) { // PCの処理
                    $(trigElem).on({
                        'mouseenter': function(){
                            t.showAnim();
                        },
                        'mouseleave': function(){
                            t.hideAnim();
                        }
                    });

                } else { // PC以外の処理
                    $(trigElem).on('click', function() {
                        if (!$shoppingSelect.is(':visible')) {
                            t.showAnim();
                        }
                    });

                    $body.on('click', function() {
                        if ($shoppingSelect.is(':visible')) {
                            t.hideAnim();
                        }
                    });
                }
            }
        }

        fixedMinHeader.init();
        minHeaderDropMenu.init();

/* =================================================================

    Fixed Pagetop

================================================================= */
        var ptAnimFlg = 0;
        var $ptElem = $('#fixedPagetop');

        var fixedPagetop = {
            config: {
                spd: 400,
                eas: 'easeOutCubic'
            },

            ptShow: function() {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;

                if ($ptElem.is(':visible')) {return;}

                ptAnimFlg = 1;

                $ptElem.velocity('stop').velocity({
                    properties: {
                        opacity: ['1', '0'],
                        scale: ['1', '0']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        complete: function() { // 完了時の処理
                            ptAnimFlg = 0;

                            if (scVal === 0) {
                                $(this).hide();
                            }
                        },
                        display: 'block' // 表示・非表示
                    }
                });
            },

            ptHide: function() {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;

                if (!$ptElem.is(':visible')) {return;}

                ptAnimFlg = 1;

                $ptElem.velocity('stop').velocity({
                    properties: {
                        opacity: ['0', '1'],
                        scale: ['0', '1']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        complete: function() { // 完了時の処理
                            ptAnimFlg = 0;
                        },
                        display: 'none' // 表示・非表示
                    }
                });
            },

            posAdjust: function() {
                // .edgeAreaがあるときの固定ページトップボタンの位置調整処理
                if ($ptElem.size() > 0 && $('.edgeArea').size() > 0) {
                    if (winWidth >= 1650 && $body.hasClass('typeExtend')) {
                        $ptElem.addClass('posAdjust');

                    }
                    if (winWidth >= 1450 && !$body.hasClass('typeExtend') && !$body.hasClass('typeWide')) {
                        $ptElem.addClass('posAdjust');
                    }
                }
            }
        }

        fixedPagetop.posAdjust();

/* =================================================================

    Tooltip Comment

================================================================= */
        var tooltipComment = {
            config: {
                trigElem: $('[data-tooltip]'),
                tooltipElem: '',
                spd: 100
            },

            init: function() {
                var t = this;
                var html = '<div id="tooltipComment"><br></div>';

                $frame.append(html);

                t.config.tooltipElem = $('#tooltipComment');

                t.userEvent();
            },

            userEvent: function() {
                var t = this;
                var $trigElem = t.config.trigElem;
                var $tooltipElem = t.config.tooltipElem;
                var spd = t.config.spd;
                var eas = t.config.eas;

                $trigElem.hover(function(e){
                    var $self = $(this);

                    function tipTextMaking() {
                        var tipText = '';
                        var attr = $self.attr('data-tooltip').split('<br>');

                        for (var i = 0; i < attr.length; i++) {
                            if (i != attr.length-1) {
                                tipText += attr[i] + '<br>';
                            } else {
                                tipText += attr[i];
                            }
                        }

                        return tipText;
                    }

                    $(this).attr('alt','').attr('title','');

                    $tooltipElem
                        .stop(true, true)
                        .fadeIn(spd)
                        .html(tipTextMaking())
                        .css({
                            top: e.clientY + 20,
                            left: e.clientX - 5
                        });
                },function(){
                    $tooltipElem.fadeOut(spd, function() {
                        $(this).html('');
                    });
                }).mousemove(function(e){
                    $tooltipElem.css({
                        top: e.clientY + 20,
                        left: e.clientX - 5
                    });
                });
            }
        }

        if (basicUaFlg === 1) { // PCの処理
            tooltipComment.init();
        }

/* =================================================================

    Ad Display Alternative

================================================================= */
        var adDisplayAlt = {
            config: {
                bnrElem: $('[class*="adBnrBoxW"]'),
                curElem: null,
                spd: 400,
                eas: 'easeOutSine'
            },

            init: function() {
                var t = this;
                var $bnrElem = t.config.bnrElem;

                if ($bnrElem.size() <= 0) {return;}

                $bnrElem.on('click', '.adBnrConfig, .close', function() {
                    t.config.curElem = $(this).closest($bnrElem);
                    t.switching();
                });
            },

            switching: function() {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;
                var $curElem = t.config.curElem;
                var $subElem = $curElem.find('.substituteBlock');

                if (!$subElem.is(':visible')) {
                    $subElem.velocity('stop').velocity({
                        properties: {
                            opacity: ['1', '0']
                        },
                        options: {
                            duration: spd, // アニメーション時間
                            easing: eas, // イージング
                            complete: null, // 完了時の処理
                            display: 'block' // 表示・非表示
                        }
                    });

                } else {
                    $subElem.velocity('stop').velocity({
                        properties: {
                            opacity: ['0', '1']
                        },
                        options: {
                            duration: spd, // アニメーション時間
                            easing: eas, // イージング
                            complete: null, // 完了時の処理
                            display: 'none' // 表示・非表示
                        }
                    });
                }
            }
        }

        adDisplayAlt.init();

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

    Alert Modal Window

================================================================= */
        var alertModal = {
            config: {
                modalElem: $('.alertModal:not(.typeRewrite)'),
                trigElem: $('[data-am-target]'),
                modalBgElem: null,
                curElem: null,
                animFlg: 0,
                spd: 300,
                eas: 'easeInQuint'
            },

            init: function() {
                var t = this;
                var $trigElem = t.config.trigElem;

                if ($trigElem.size() <= 0) {return;}

                var $modalElem = t.config.modalElem;

                $frame.append('<div id="alertModalBg" class="overlapLayer ovColor01" style="z-index: 2999;"></div>');
                t.config.modalBgElem = $('#alertModalBg');
                var $modalBgElem = t.config.modalBgElem;

                $trigElem.each(function() {
                    $(this).on('click', function() {
                        if (t.config.animFlg) {return;}
                        t.modalShow($(this));
                    });
                });

                $modalElem.on('click', '.close', function() {
                    if (t.config.animFlg) {return;}
                    t.modalHide();
                });

                $modalBgElem.on('click', function() {
                    if (t.config.animFlg) {return;}
                    t.modalHide();
                });
            },

            modalShow: function(self) {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;

                t.config.animFlg = 1;

                var $modalElem = t.config.modalElem;
                var $modalBgElem = t.config.modalBgElem;
                var id = self.attr('data-am-target');

                t.config.curElem = $modalElem.filter('#' + id);
                var $curElem = t.config.curElem;

                var widthVal = $curElem.attr('data-am-width');
                var heightVal = $curElem.css('height').split('px')[0];
                var mgnVal = widthVal != '' ? -widthVal / 2 + 'px' : '';
                var topVal = (winHeight - heightVal) / 2 + scVal;

                $curElem.css({
                    visibility: 'hidden',
                    top: topVal + 'px',
                    zIndex: 3000,
                    width: widthVal + 'px',
                    marginLeft: mgnVal
                });

                $modalBgElem.stop().fadeIn(spd);

                $curElem.velocity('stop').velocity({
                    properties: {
                        transformOriginX: ['50%', '50%'],
                        transformOriginY: ['50%', '50%'],
                        scale: ['1', '0'],
                        borderRadius: ['6px', '50%']
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        complete: function() { // 完了時の処理
                            $(this).find('.close').show();

                            $(this).find('.alertModalInner').velocity('stop').velocity({
                                properties: {
                                    opacity: ['1', '0']
                                },
                                options: {
                                    duration: spd, // アニメーション時間
                                    easing: 'ease', // イージング
                                    complete: function() { // 完了時の処理
                                        t.config.animFlg = 0;
                                    },
                                    visibility: 'visible' // 表示・非表示
                                }
                            });
                        },
                        visibility: 'visible' // 表示・非表示
                    }
                });
            },

            modalHide: function() {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;

                t.config.animFlg = 1;

                var $modalElem = t.config.modalElem;
                var $modalBgElem = t.config.modalBgElem;
                var $curElem = t.config.curElem;

                $curElem.find('.close').hide();
                $modalBgElem.stop().fadeOut(spd);

                $curElem.find('.alertModalInner').velocity('stop').velocity('reverse', 200, function() {
                    $curElem.css({
                        visibility: 'hidden'
                    });
                });

                $curElem.velocity('stop').velocity('reverse', 200, function() {
                    $curElem.css({
                        visibility: 'hidden',
                        zIndex: -1
                    });

                    t.config.animFlg = 0;
                });
            }
        }

        alertModal.init();

/* =================================================================

    Ripple Modal Window

================================================================= */
        var rippleModal = {
            config: {
                modalElem: $('.rippleModal'),
                trigElem: $('[data-rm-target]'),
                modalBgElem: null,
                curElem: null,
                animFlg: 0,
                spd: 400,
                eas: 'easeInQuint'
            },

            init: function() {
                var t = this;
                var $trigElem = t.config.trigElem;

                if ($trigElem.size() <= 0) {return;}

                var $modalElem = t.config.modalElem;

                $frame.append('<div id="rippleModalBg" class="overlapLayer" style="z-index: 2999;"></div>');
                t.config.modalBgElem = $('#rippleModalBg');
                var $modalBgElem = t.config.modalBgElem;

                $trigElem.each(function() {
                    $(this).on('click', function() {
                        if (t.config.animFlg) {return;}
                        t.modalShow($(this));
                    });
                });

                $modalElem.on('click', '.close', function() {
                    if (t.config.animFlg) {return;}
                    t.modalHide();
                });

                $modalBgElem.on('click', function() {
                    if (t.config.animFlg) {return;}
                    t.modalHide();
                });
            },

            modalShow: function(self) {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;

                t.config.animFlg = 1;

                var $modalElem = t.config.modalElem;
                var $modalBgElem = t.config.modalBgElem;
                var id = self.attr('data-rm-target');

                t.config.curElem = $modalElem.filter('#' + id);
                var $curElem = t.config.curElem;

                var trigWidth = self.innerWidth();
                var trigHeight = self.innerHeight();
                var widthVal = $curElem.attr('data-rm-width');
                var heightVal = $curElem.css('height').split('px')[0];
                var bgVal = $curElem.attr('data-rm-bg');
                var topVal = (self.offset().top + trigHeight / 2) - heightVal / 2;
                var leftVal = (self.offset().left + trigWidth / 2) - widthVal /2;

                $curElem.css({
                    visibility: 'hidden',
                    top: topVal + 'px',
                    left: leftVal + 'px',
                    zIndex: 3000,
                    width: widthVal + 'px',
                    borderColor: bgVal,
                    background: bgVal
                });

                self.velocity('stop').velocity({
                    properties: {
                        transformOriginX: ['50%', '50%'],
                        transformOriginY: ['50%', '50%'],
                        scale: ['0', '1']
                    },
                    options: {
                        duration: 100, // アニメーション時間
                        easing: 'ease', // イージング
                        complete: function() { // 完了時の処理
                            modalFunc();

                            $modalBgElem.fadeIn(200);
                        }
                    }
                });

                function modalFunc() {
                    $curElem.velocity('stop').velocity({
                        properties: {
                            transformOriginX: ['50%', '50%'],
                            transformOriginY: ['50%', '50%'],
                            scale: ['1', '0'],
                            borderRadius: ['6px', '50%']
                        },
                        options: {
                            duration: spd, // アニメーション時間
                            easing: eas, // イージング
                            delay: 200, // 遅延
                            complete: function() { // 完了時の処理
                                $(this).find('.close').show();

                                self.velocity('reverse', { duration: 0 });

                                $(this).css({
                                    borderColor: '',
                                    background: ''
                                });

                                $(this).find('.rippleModalInner').velocity('stop').velocity({
                                    properties: {
                                        opacity: ['1', '0']
                                    },
                                    options: {
                                        duration: spd, // アニメーション時間
                                        easing: 'ease', // イージング
                                        begin: function() { // 開始時の処理
                                            $(this).css({
                                                opacity: 0
                                            });
                                        },
                                        complete: function() { // 完了時の処理
                                            t.config.animFlg = 0;
                                        },
                                        visibility: 'visible' // 表示・非表示
                                    }
                                });
                            },
                            visibility: 'visible' // 表示・非表示
                        }
                    });
                }
            },

            modalHide: function() {
                var t = this;
                var spd = t.config.spd;
                var eas = t.config.eas;

                t.config.animFlg = 1;

                var $modalElem = t.config.modalElem;
                var $modalBgElem = t.config.modalBgElem;
                var $curElem = t.config.curElem;

                $curElem.find('.close').hide();
                $modalBgElem.fadeOut(100);

                $curElem.find('.rippleModalInner').velocity('stop').velocity('reverse', 200, function() {
                    $curElem.css({
                        visibility: 'hidden'
                    });
                });

                $curElem.velocity('stop').velocity('reverse', 200, function() {
                    $curElem.css({
                        visibility: 'hidden',
                        zIndex: -1
                    });

                    t.config.animFlg = 0;
                });
            }
        }

        rippleModal.init();

/* =================================================================

    Window Function

================================================================= */
        $win.on('scroll', function() {
            scVal = $win.scrollTop();

            // 固定ページトップ
            if (!ptAnimFlg) {
                if (scVal >= 80) {
                    fixedPagetop.ptShow();
                } else {
                    fixedPagetop.ptHide();
                }
            }

            // 固定ヘッダー
            var $headerElem = fixedMinHeader.config.headerElem;
            if (scVal >= fixedMinHeaderDispPoint) {
                if ($headerElem.css('visibility') == 'hidden') {
                    fixedMinHeader.showAnim();
                }
            } else {
                if ($headerElem.css('visibility') != 'hidden') {
                    fixedMinHeader.hideAnim();
                }
            }
        });

        var resizeTimer;
        var winWidthResized;
        var winHeightResized;

        $win.on('resize', function() {
            if (resizeTimer !== false) {
                clearTimeout(winWidthResized);
                clearTimeout(winHeightResized);
            }

            resizeTimer = setTimeout(function() {
                winWidthResized = $win.width();
                winHeightResized = $win.height();

                if (winWidth != winWidthResized || winHeight != winHeightResized) {
                    winWidth = $win.width();
                    winHeight = $win.height();

                    // .edgeAreaがあるときの固定ページトップボタンの位置調整処理
                    if ($ptElem.size() > 0 && $('.edgeArea').size() > 0) {
                        if (winWidth >= 1650 && $body.hasClass('typeExtend')) {
                            $ptElem.addClass('posAdjust');
                        } else if (winWidth < 1650 && $body.hasClass('typeExtend')) {
                            $ptElem.removeClass('posAdjust');
                        }

                        if (winWidth >= 1450 && !$body.hasClass('typeExtend') && !$body.hasClass('typeWide')) {
                            $ptElem.addClass('posAdjust');
                        } else if (winWidth < 1450 && !$body.hasClass('typeExtend') && !$body.hasClass('typeWide')) {
                            $ptElem.removeClass('posAdjust');
                        }
                    }
                }
            }, 200 );
        });




    });
})(jQuery);
/* ================================================================ */


/* =================================================================

    Change Viewmode

================================================================= */
function changeViewMode(mode,domain,path,day){
    domain = domain || '.aucfan.com';
    path = path || '/';
    day = day || 1;
    var exp = new Date();
    exp.setTime( exp.getTime() + 1000*60*60*24*day );
    document.cookie = "bw=" +mode+ "; domain="+domain+"; path=" +path+ "; expires=" + exp.toGMTString();
    return true;
}
