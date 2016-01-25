/*-------------------------------------------------------------------
 *
 * File Name : function.js
 *
-------------------------------------------------------------------*/

/* Table Of Contents
------------------------------------------
items Belt
items Infinity Slider
items Details Tab
items Details Acc
Fixed Side Banner
Tool Button
Aucsnipe Config
Modal Items Description
Alert Modal Window (Rewrite)
Window Function
------------------------------------------ */

$(function() {
    var $win = $(window);
    var $doc = $(document);
    var $frame = $('#frame');
    var $header = $('#globalHeader');
    var $colItemsArea = $('#colItemsArea');
    var $colInfoArea = $('#colInfoArea');
    var $btmInfoWrap = $('#btmInfoWrap');

    var winWidth = $win.width();
    var winHeight = $win.height();
    var colInfoAreaWidth = $colInfoArea.innerWidth();
    var colInfoAreaPos = $colInfoArea.offset();
    var btmInfoWrapPos = $btmInfoWrap.offset();
    var scVal = $win.scrollTop();

/* =================================================================

    items Belt

================================================================= */
    var itemsBelt = {
        config: {
            beltElem: $('.itemsBeltList')
        },

        init: function() {
            var t = this;
            var $beltElem = t.config.beltElem;

            if ($beltElem.size() <= 0 || basicIeFlg[0] != 1) {return;}

            $beltElem.each(function() {
                $(this).children('li').each(function() {
                    var imgWidth = $(this).find('.thum').width();

                    $(this).css({
                        width: imgWidth + 'px'
                    });
                });
            });
        }
    }

    itemsBelt.init();

/* =================================================================

    items Infinity Slider

================================================================= */
    var itemsInfinitySlider = {
        setup: function() {
            $doc.find(".itemsInfinitySliderWrap").each(function(i, elem) {
                var $itemsSlider = $(elem).find(".itemsInfinitySlider");

                if ($itemsSlider.find('.sliderBlock').size() <= 1) {
                    $(elem).addClass('typeSingle');
                    return;
                }

                var headerWidth = $header.find('.globalHeaderInner').width();
                var colInfoWidth = $colInfoArea.outerWidth(true);

                $(this).css('width', headerWidth - colInfoWidth - 24 + 'px');

                // セットアップ
                $itemsSlider.slick({
                    speed: 400,
                    cssEase: 'cubic-bezier(.39,.575,.565,1)',
                    easing: 'easeOutSine',
                    dots: true,
                    dotsClass: 'sliderNav',
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                    prevArrow: '<div class="prev"></div>',
                    nextArrow: '<div class="next"></div>'
                });

                $(elem).addClass('typeCarousel');

                // 要素取得
                var $items = $(elem).find('.slick-track > .slick-slide');
                var $prev = $(elem).find('.prev');
                var $next = $(elem).find('.next');

                // 各横幅取得
                var curWidth = $items.filter('.slick-current').width();
                var arrowWidth = ($itemsSlider.width() - curWidth) / 2;

                // サイドナビの横幅を設定
                $prev.css('width', arrowWidth + 'px');
                $next.css('width', arrowWidth + 'px');

                // サムネイル設置
                $items.not('.slick-cloned').each(function(i) {
                    var $image = $(this).find('img').clone().addClass('op hv');

                    $(elem).find('.sliderNav > li').eq(i).find('button').replaceWith($image);
                });

                // スライドアニメーション終了時の処理
                $itemsSlider.on('beforeChange', function(slick, currentSlide){
                    $items.addClass('transit');
                });

                // スライドアニメーション終了時の処理
                $itemsSlider.on('afterChange', function(slick, currentSlide){
                    curWidth = currentSlide.$slides.filter('.slick-current').width();
                    arrowWidth = (currentSlide.$slider.width() - curWidth) / 2;

                    $items.removeClass('transit');
                    currentSlide.$prevArrow.css('width', arrowWidth + 'px');
                    currentSlide.$nextArrow.css('width', arrowWidth + 'px');
                });

                // ウィンドウ横幅が1180px以下のときは両サイドの矢印を非表示にする
                if (winWidth <= 1180) {
                    itemsInfinitySlider.arrowHide();
                }
            });
        },

        unslick: function() {
            $doc.find(".itemsInfinitySliderWrap").each(function(i, elem) {
                var $itemsSlider = $(elem).find(".itemsInfinitySlider");

                $itemsSlider.slick('unslick');
                $(elem).find('.sliderNav').remove();
            });

            this.setup();
        },

        arrowHide: function() {
            $('.itemsInfinitySliderWrap').find('.slick-arrow').remove();
        }
    }

    itemsInfinitySlider.setup();

/* =================================================================

    items Details Tab

================================================================= */
    var itemsDetailsTab = {
        config: {
            tabElem: $('.itemsDetailsTab'),
            tabContElem: $('.itemsDetailsTabContWrap'),
            curTabElem: null
        },

        init: function() {
            var t = this;
            var $tabElem = t.config.tabElem;

            if ($tabElem.size() <= 0) {return;}

            $tabElem.children('li').on('click', function() {
                t.config.curTabElem = $(this);
                t.switching();
            });
        },

        switching: function() {
            var t = this;
            var $tabElem = t.config.tabElem;
            var $tabContElem = t.config.tabContElem;
            var $curTabElem = t.config.curTabElem;
            var index = $curTabElem.index();

            $tabElem.children('li').removeClass('selected');
            $tabElem.children('li').eq(index).addClass('selected');

            $tabContElem.find('.tabContBlock').addClass('hide');
            $tabContElem.find('.tabContBlock').eq(index).removeClass('hide');
        }
    }

    itemsDetailsTab.init();

/* =================================================================

    items Details Acc

================================================================= */
    var itemsDetailsAcc = {
        config: {
            recomWrapElem: $('.itemsRecommend'),
            curRecomWrapElem: null,
            accOpenVal: 190 + 16,
            spd: 400,
            eas: 'easeOutSine'
        },

        init: function(id) {
            var t = this;
            var $recomWrapElem = t.config.recomWrapElem;
            if (id != null) {
                $recomWrapElem = $('#' + id);
            }

            if ($recomWrapElem.size() <= 0) {return;}

            $(document).on('click', '.recomMore', function() {
                t.config.curRecomWrapElem = $(this).closest($recomWrapElem);
                t.accOpen();
            });
        },

        accOpen: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $curRecomWrapElem = t.config.curRecomWrapElem;
            var accOpenVal = t.config.accOpenVal;

            $curRecomWrapElem.find('.recomList').velocity('stop').velocity({
                properties: {
                    height: '+=' + accOpenVal + 'px'
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas, // イージング
                    complete: function() { // 完了時の処理
                        var selfHeight = $(this).height();
                        var childHeight = $(this).children('ul').height();

                        if (selfHeight >= childHeight) {
                            $(this).css({
                                height: 'auto'
                            }).closest($curRecomWrapElem).find('.recomMore').slideUp(spd);
                        }
                    }
                }
            });
        }
    }

    itemsDetailsAcc.init();

/* =================================================================

    Fixed Side Banner

================================================================= */
    var $fixedSideBnrElem = $('#fixedSideBnr');
    var fixedSideBnrMgn = 61;
    var fixedSideBnrFlg = 0;
    var fixedSideBnrPos;
    var fixedSideBnrAbsPos;
    var fixedSideBnrW;
    var fixedSideBnrH;

    var fixedSideBnr = {
        init: function() {
            if ($fixedSideBnrElem.size() <= 0) {return;}

            fixedSideBnrFlg = 1;
            $fixedSideBnrElem.css({
                width: colInfoAreaWidth + 'px'
            });
            fixedSideBnrPos = $fixedSideBnrElem.offset();
            fixedSideBnrW = $fixedSideBnrElem.width();
            fixedSideBnrH = $fixedSideBnrElem.height();
        },

        fixSet: function(behavior) {
            var itemsAreaHeight = $colItemsArea.find('.colItemsAreaInner').outerHeight(true);
            var infoAreaHeight = $colInfoArea.find('.colInfoAreaInner').outerHeight(true);

            if (itemsAreaHeight <= infoAreaHeight) {return;}

            var leftMgn = (colInfoAreaWidth - $fixedSideBnrElem.children().width()) / 2;

            if (behavior == 'fixed') {
                $fixedSideBnrElem.children().css({
                    position: 'fixed',
                    top: fixedSideBnrMgn - 16 + 'px',
                    marginLeft: leftMgn + 'px'
                });
            } else if (behavior == 'absolute') {
                $fixedSideBnrElem.children().css({
                    position: 'absolute',
                    top: fixedSideBnrAbsPos - colInfoAreaPos.top + 'px',
                    marginLeft: leftMgn + 'px'
                });
            }
        },

        fixReset: function() {
            $fixedSideBnrElem.children().css({
                position: '',
                top: '',
                marginLeft: ''
            });
        }
    }

    fixedSideBnr.init();

/* =================================================================

    Tool Button

================================================================= */
    var toolBtn = {
        config: {
            toolBtnListElem: $('.toolBtnList'),
            sliderElem: $('.itemsInfinitySliderWrap'),
            spd: 300,
            eas: 'easeOutQuint'
        },

        init: function() {
            var t = this;
            var $toolBtnListElem = t.config.toolBtnListElem;
            var $sliderElem = t.config.sliderElem;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var leng = $toolBtnListElem.children('li').length;

            if ($toolBtnListElem.size() <= 0) {return;}

            function toolPosMove() {
                for (var i = leng-1; i >= 0; i--) {
                    $toolBtnListElem.children('li').eq(i).velocity('stop').velocity({
                        properties: {
                            translateY: ['40px', '0']
                        },
                        options: {
                            duration: 400, // アニメーション時間
                            easing: 'ease', // イージング
                            delay: 80 * ((leng - 1) - i) // 遅延
                        }
                    });
                }
            }

            function toolPosReset() {
                for (var i = leng-1; i >= 0; i--) {
                    $toolBtnListElem.children('li').eq(i).velocity('stop').velocity('reverse', {delay: 80 * ((leng - 1) - i)});
                }
            }

            $sliderElem.on({
                'mouseenter': function(){
                    toolPosMove();
                },

                'mouseleave': function(){
                    toolPosReset();
                }
            }, '.slick-list');

            $sliderElem.filter('.typeSingle').find('.itemsInfinitySlider').on({
                'mouseenter': function(){
                    toolPosMove();
                },

                'mouseleave': function(){
                    toolPosReset();
                }
            });

            $toolBtnListElem.children('li').hover(function(){
                $(this).css({
                    zIndex: 4
                }).find('.txtDesc').velocity('stop').velocity({
                    properties: {
                        opacity: [1, 0],
                        translateY: ['-10px', 0]
                    },
                    options: {
                        duration: spd, // アニメーション時間
                        easing: eas, // イージング
                        display: 'block' // 表示・非表示
                    }
                });
            }, function() {
                $(this).css({
                        zIndex: 3
                }).find('.txtDesc').velocity('stop').velocity('reverse', function() {
                    $(this).closest('li').css({
                        zIndex: ''
                    });
                });
            });
        }
    }

    toolBtn.init();

/* =================================================================

    Aucsnipe Config

================================================================= */
    var aucsnipeConfig = {
        config: {
            hdMainItem: $('.hdMainItemBox'),
            configTrig: $('.aucSnipeSwitch [class*="switchType"]'),
            configElem: $('#aucSnipeConfig'),
            submitElem: $('#aucSnipeConfig .snipSubmit'),
            closeElem: $('#aucSnipeConfig .close'),
            navTrig: $('.aucSnipeNavTrig'),
            configBgElem: null,
            spd: 400,
            eas: 'easeOutSine',
            configOpenFlg: 0
        },

        init: function() {
            var t = this;
            var $configTrig = t.config.configTrig;
            var $configElem = t.config.configElem;
            var $submitElem = t.config.submitElem;
            var $closeElem = t.config.closeElem;
            var $navTrig = t.config.navTrig;
            var evTrig = 'click';

            if ($configElem.size() <= 0) {return;}

            if (basicUaFlg === 1) { // PCの処理
                evTrig = 'mousedown';
            }

            $frame.append('<div id="aucSnipeConfigBg" class="overlapLayer"></div>');

            t.config.configBgElem = $('#aucSnipeConfigBg');

            $configTrig.on(evTrig, function() {
                if (!$(this).hasClass('active')) {
                    if (!t.config.configOpenFlg) {
                        t.configOpen();
                    } else {
                        t.configClose();
                    }
                } else {
                    $configTrig.removeClass('active');
                }
            });

            $navTrig.on('click', function() {
                var pos = $('#aucviewMainHd').offset();

                window.scrollTo(pos.left, pos.top - 44);

                if (!$configTrig.hasClass('active')) {
                    if (!t.config.configOpenFlg) {
                        t.configOpen();
                    } else {
                        t.configClose();
                    }
                } else {
                    $configTrig.removeClass('active');
                }
            });

            t.config.configBgElem.on('click', function() {
                t.configClose();
            });

            $closeElem.on('click', function() {
                t.configClose();
            });

            $submitElem.on(evTrig, function() {
                t.configClose();
                $configTrig.addClass('active');
            });
        },

        configOpen: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $hdMainItem = t.config.hdMainItem;
            var $configElem = t.config.configElem;
            var $configBgElem = t.config.configBgElem;

            $hdMainItem.css({
                zIndex: 1001
            });

            $('.edgeArea').addClass('hideEdgeArea');

            t.config.configOpenFlg = 1;

            bdrFunc();

            function bdrFunc() {
                $configElem.find('.aucSnipeBdr').velocity('stop', true).velocity({
                    properties: {
                        width: ['100%', 0]
                    },
                    options: {
                        duration: spd / 1.5, // アニメーション時間
                        easing: eas, // イージング
                        complete: function() { // 完了時の処理
                            if (!t.config.configOpenFlg) {return;}

                            $('#fixedMinHeader').css({
                                opacity: 0
                            });
                            contFunc();
                        },
                        display: 'block' // 表示・非表示
                    }
                });
            }

            function contFunc() {
                $configElem.find('.aucSnipeConfigInner').velocity('stop', true).velocity("slideDown", { duration: spd });
                $configBgElem.stop(true, false).fadeIn(spd);
            }
        },

        configClose: function() {
            var t = this;
            var $hdMainItem = t.config.hdMainItem;
            var $configElem = t.config.configElem;
            var $configBgElem = t.config.configBgElem;

            $hdMainItem.css({
                zIndex: ''
            });

            $('.edgeArea').removeClass('hideEdgeArea');

            t.config.configOpenFlg = 0;

            $configElem.find('.aucSnipeBdr').hide();
            $configElem.find('.aucSnipeConfigInner').hide();
            $configBgElem.hide();
            $('#fixedMinHeader').css({
                opacity: ''
            });
        }
    }

    aucsnipeConfig.init();

/* =================================================================

    Modal Items Description

================================================================= */
    var modalItemDesc = {
        config: {
            modalElem: $('#itemsDescArea'),
            modalTrig: $('.itemsDescBtn a'),
            closeElem: $('.itemsDescClose'),
            btmCloseElem : $('.itemsDescBtmClose'),
            modalBgElem: null,
            spd: 400,
            eas: 'easeOutSine'
        },

        init: function() {
            var t = this;
            var $modalElem = t.config.modalElem;
            var $modalTrig = t.config.modalTrig;
            var $closeElem = t.config.closeElem;
            var $btmCloseElem = t.config.btmCloseElem;

            if ($modalElem.size() <= 0) {return;}

            $frame.append('<div id="modalItemDescBg" class="overlapLayer"></div>');

            t.config.modalBgElem = $('#modalItemDescBg');

            //$modalTrig.on('click', function() {
            //    window.scrollTo(0, 0);
            //    t.modalShow();
            //});
            //
            //$closeElem.on('click', function() {
            //    t.modalHide();
            //});
            //
            //$btmCloseElem.find('a').on('click', function() {
            //    t.modalHide();
            //});
            //
            //t.config.modalBgElem.on('click', function() {
            //    t.modalHide();
            //});
        },

        getConfig: function() {
            var t = this;
            return t.config;
        },

        modalShow: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $modalElem = t.config.modalElem;
            var $closeElem = t.config.closeElem;
            var $modalBgElem = t.config.modalBgElem;

            $modalBgElem.fadeIn(spd);

            $modalElem.velocity('stop').velocity({
                properties: {
                    translateX: ['0', '-100%']
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas, // イージング
                    complete: function() { // 完了時の処理
                        $closeElem.show();
                        $modalElem.find($closeElem).hide();
                    },
                    display: 'block' // 表示・非表示
                }
            });
        },

        modalHide: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $modalElem = t.config.modalElem;
            var $closeElem = t.config.closeElem;
            var $modalBgElem = t.config.modalBgElem;

            $modalBgElem.hide();
            $closeElem.hide();

            $modalElem.velocity('stop').velocity('reverse', function() {
                $(this).hide();
                $modalElem.find($closeElem).show();
            });
        }
    }

    modalItemDesc.init();
    Aucview.modalItemDesc = modalItemDesc;

/* =================================================================

    Alert Modal Window (Rewrite)

================================================================= */
    var alertModal = {
        config: {
            modalBgElem: null,
            animFlg: 0,
            spd: 300,
            eas: 'easeInQuint'
        },

        target: {
            id: null, // モーダルのID
            title: null, // モーダル内のタイトル
            cont: null, // モーダル内メッセージ
            width: 400 // モーダルの横幅
        },

        init: function() {
            var t = this;

            $frame.append('<div id="reAlertModalBg" class="overlapLayer ovColor01" style="z-index: 2999;"></div>');
            t.config.modalBgElem = $('#reAlertModalBg');

            $doc.on('click', '.alertModal.typeRewrite .close', function() {
                if (t.config.animFlg) {return;}
                t.modalHide();
            });

            $doc.on('click', '#reAlertModalBg', function() {
                if (t.config.animFlg) {return;}
                t.modalHide();
            });
        },

        modalShow: function(obj) {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;

            t.config.animFlg = 1;

            t.target.id = obj.id;
            t.target.title = obj.title;
            t.target.cont = obj.cont;
            t.target.width = obj.width;

            var $modalElem = $(obj.id);
            var $modalBgElem = t.config.modalBgElem;

            $modalElem.find('.hdModal').html(obj.title);
            $modalElem.find('.alertMessage').html(obj.cont);

            var widthVal = obj.width == '' ? $modalElem.attr('data-am-width') : obj.width;
            var heightVal = $modalElem.css('height').split('px')[0];
            var mgnVal = widthVal != '' ? -widthVal / 2 + 'px' : '';
            var topVal = (winHeight - heightVal) / 2 + scVal;

            $modalElem.css({
                visibility: 'hidden',
                top: topVal + 'px',
                zIndex: 3000,
                width: widthVal + 'px',
                marginLeft: mgnVal
            });

            $modalBgElem.stop().fadeIn(spd);

            $modalElem.velocity('stop').velocity({
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

            var $modalElem = $(t.target.id);
            var $modalBgElem = t.config.modalBgElem;

            $modalElem.find('.close').hide();
            $modalBgElem.stop().fadeOut(spd);

            $modalElem.find('.alertModalInner').velocity('stop').velocity('reverse', 200, function() {
                $modalElem.css({
                    visibility: 'hidden'
                });
            });

            $modalElem.velocity('stop').velocity('reverse', 200, function() {
                $modalElem.css({
                    visibility: 'hidden',
                    zIndex: -1
                });

                t.config.animFlg = 0;
            });
        }
    }

    alertModal.init();
    Aucview.alertModal = alertModal;

/* =================================================================

    Window Function

================================================================= */
    $win.on('scroll', function() {
        scVal = $win.scrollTop();

        // 固定ページトップ
        if (fixedSideBnrFlg) {
            fixedSideBnrPos = $fixedSideBnrElem.offset();
            colInfoAreaPos = $colInfoArea.offset();
            btmInfoWrapPos = $btmInfoWrap.offset();
            fixedSideBnrH = $fixedSideBnrElem.children().height();
            fixedSideBnrAbsPos = btmInfoWrapPos.top - fixedSideBnrH - 56;

            if (scVal >= fixedSideBnrPos.top - fixedSideBnrMgn) {
                if (scVal >= fixedSideBnrAbsPos - 40) {
                    fixedSideBnr.fixSet('absolute');
                } else {
                    fixedSideBnr.fixSet('fixed');
                }
            } else {
                fixedSideBnr.fixReset();
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

                // Sliderリセット
                itemsInfinitySlider.unslick();
            }
        }, 200 );
    });
});
