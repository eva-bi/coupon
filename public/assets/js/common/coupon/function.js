/*-------------------------------------------------------------------
 *
 * File Name : function.js
 *
-------------------------------------------------------------------*/

/* Table Of Contents
------------------------------------------
Top Search Select
Fixed Search Field
Fixed Search Select
Variable Grid Layout
Window Function
------------------------------------------ */

$(function() {
    var $win = $(window);
    var $doc = $(document);
    var $body = $('body');
    var $frame = $('#frame');
    var $header = $('#globalHeader');
    var $topVisual = $('#couponTopVisual');
    var $searchField = $('#couponSearchField');
    var $contentsArea = $('#contentsArea');

    var winWidth = $win.width();
    var winHeight = $win.height();
    var scVal = $win.scrollTop();

/* =================================================================

    Top Search Select

================================================================= */
    var topSearchSelect = {
        config: {
            spd: 300,
            eas: 'easeOutQuad',
            curSelect: '',
            curSelectWrap: '',
            curSelectList: '',
            selectWidth: '',
            selectHeight: '',
            selectDispFlg: 0
        },

        init: function() {
            var t = this;

            if ($topVisual.size() <= 0) {return;}

            $topVisual.css({
                height: winHeight - $header.innerHeight() + 'px'
            });

            $topVisual.find('.selectData').each(function() {
                $(this).find('option').eq(0).prop('selected', true);
            });

            $topVisual.find('.selectBlock').on('click', function() {
                if (t.config.selectDispFlg) {return;}

                t.config.curSelect = $(this);
                t.config.curSelectWrap = $(this).parent();
                t.config.curSelectList = $(this).siblings('.selectList');
                t.config.selectWidth = t.config.curSelectList.outerWidth();
                t.config.selectHeight = t.config.curSelectList.outerHeight();

                t.selectShow();
            });

            $topVisual.find('.selectList li').on('click', function() {
                if (!t.config.selectDispFlg) {return;}

                var $self = $(this);
                var txt = $(this).text();

                t.txtReplace($self, txt);
            });

            $topVisual.find('.selectBox .close').on('click', function() {
                if (!t.config.selectDispFlg) {return;}

                t.selectHide();
            });

            $body.on('click', function() {
                if ($topVisual.find('.selectBox .close').is(':visible')) {
                    t.selectHide();
                }
            });
        },

        selectShow: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $curSelectWrap = t.config.curSelectWrap;
            var $curSelectList = t.config.curSelectList;
            var $curSelect = t.config.curSelect;
            var selectWidth = t.config.selectWidth;
            var selectHeight = t.config.selectHeight;

            t.config.selectDispFlg = 1;

            $curSelectList.velocity('stop').velocity({
                properties: {
                    opacity: ['1', '0']
                },
                options: {
                    duration: 200, // アニメーション時間
                    easing: 'ease', // イージング
                    begin: function() { // 開始時の処理
                        $(this).css({
                            width: '100%',
                            height: '50px'
                        });

                        $curSelectWrap.css({
                            zIndex: 10
                        });

                        $curSelectWrap.find('.arrow').velocity('stop').velocity({
                            properties: {
                                translateY: ['10px', '0']
                            },
                            options: {
                                duration: spd / 2, // アニメーション時間
                                easing: eas // イージング
                            }
                        });
                    },
                    visibility: 'visible' // 表示・非表示
                }

            }).velocity({
                properties: {
                    width: [selectWidth, '100%'],
                    height: [selectHeight, '50px']
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas, // イージング
                    begin: function() { // 開始時の処理
                        $('.selectBox').find('.hdSelect').velocity('stop').velocity({
                            properties: {
                                translateY: ['30px', '0']
                            },
                            options: {
                                duration: spd, // アニメーション時間
                                easing: eas // イージング
                            }
                        });

                        if ($curSelectWrap.hasClass('categorySelectBox')) {
                            $curSelect.velocity('stop').velocity({
                                properties: {
                                    left: ['-395px', '0']
                                },
                                options: {
                                    duration: spd, // アニメーション時間
                                    easing: eas // イージング
                                }
                            });
                        }
                    },
                    complete: function() { // 完了時の処理
                        $(this).css({
                            width: '',
                            height: ''
                        });

                        $(this).find('li').velocity('stop').velocity({
                            properties: {
                                opacity: ['1', '0']
                            },
                            options: {
                                duration: 100, // アニメーション時間
                                easing: eas // イージング
                            }
                        });

                        $curSelectWrap.find('.close').velocity('stop').velocity({
                            properties: {
                                opacity: ['1', '0'],
                                translateY: ['0', '10px']
                            },
                            options: {
                                duration: spd / 2, // アニメーション時間
                                easing: eas, // イージング
                                display: 'block' // 表示・非表示
                            }
                        });
                    }
                }
            });
        },

        selectHide: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $curSelectWrap = t.config.curSelectWrap;
            var $curSelectList = t.config.curSelectList;
            var $curSelect = t.config.curSelect;
            var selectWidth = t.config.selectWidth;
            var selectHeight = t.config.selectHeight;

            $('.selectBox').find('.hdSelect').velocity('stop').velocity('reverse');
            $curSelectList.find('li').css({
                opacity: ''
            });
            $curSelectWrap.find('.close').hide();
            $curSelectWrap.find('.arrow').velocity('stop').velocity('reverse');
            $curSelectList.velocity('stop').velocity('stop').velocity('reverse', {
                complete: function() { // 完了時の処理
                    $curSelectWrap.css({
                        zIndex: ''
                    });

                    $(this).css({
                        width: '',
                        height: ''
                    });

                    $(this).velocity('stop').velocity({
                        properties: {
                            opacity: ['0', '1']
                        },
                        options: {
                            duration: 200, // アニメーション時間
                            easing: 'ease', // イージング
                            begin: function() { // 開始時の処理
                                $(this).css({
                                    width: '100%',
                                    height: '50px'
                                });
                            },
                            complete: function() { // 完了時の処理
                                $(this).css({
                                    width: '',
                                    height: ''
                                });

                                t.config.selectDispFlg = 0;
                            },
                            visibility: 'hidden' // 表示・非表示
                        }
                    });
                }
            });

            if ($curSelectWrap.hasClass('categorySelectBox')) {
                $curSelect.velocity('stop').velocity('reverse');
            }
        },

        txtReplace: function($self, txt) {
            var t = this;
            var $curSelectWrap = t.config.curSelectWrap;
            var $curSelectList = t.config.curSelectList;
            var $curSelect = t.config.curSelect;
            var index = $self.index();

            if (txt == 'すべて') {
                if ($curSelectWrap.hasClass('areaSelectBox')) {
                    txt += 'の都道府県';
                } else if ($curSelectWrap.hasClass('categorySelectBox')) {
                    txt += 'のカテゴリ';
                }
            }

            $curSelectList.find('li').removeClass('current');
            $self.addClass('current');
            $curSelect.text(txt);

            $curSelectList.find('.selectData option').eq(index).prop('selected', true);
        }
    }

    topSearchSelect.init();

/* =================================================================

    Fixed Search Field

================================================================= */
    var fixedSearchField = {
        config: {
            searchFieldOffset: '',
            spd: 200,
            eas: 'easeOutQuad',
            minFlg: 0,
        },

        init: function() {
            var t = this;

            if ($searchField.size() <= 0) {return;}

            t.config.searchFieldOffset = $searchField.offset().top;
        },

        minimization: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var minFlg = t.config.minFlg;

            if (minFlg) {return;}

            t.config.minFlg = true;

            $searchField.css({
                position: 'fixed',
                top: 0
            });

            $searchField.find('.logoCouponSearch').velocity('stop').velocity({
                properties: {
                    transformOrigin: ['0, 50%', '0, 50%'],
                    scale: ['0.8', '1']
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas // イージング
                }
            });

            $searchField.find('.couponSearchBox').velocity('stop').velocity({
                properties: {
                    height: ['58px', '88px']
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas // イージング
                }
            });

            $searchField.find('.couponHeadNav').velocity('stop').velocity({
                properties: {
                    height: ['36px', '56px']
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas // イージング
                }
            });
        },

        sizeReset: function() {
            var t = this;
            var minFlg = t.config.minFlg;

            if (!minFlg) {return;}

            t.config.minFlg = false;

            $searchField.css({
                position: '',
                top: ''
            });

            $searchField.find('.logoCouponSearch').velocity('stop').velocity('reverse');
            $searchField.find('.couponSearchBox').velocity('stop').velocity('reverse');
            $searchField.find('.couponHeadNav').velocity('stop').velocity('reverse');
        }
    }

    fixedSearchField.init();

/* =================================================================

    Fixed Search Select

================================================================= */
    var fixedSearchSelect = {
        config: {
            spd: 300,
            eas: 'easeOutQuad',
            curSelect: '',
            curSelectWrap: '',
            curSelectList: '',
            selectWidth: '',
            selectHeight: '',
            selectDispFlg: 0
        },

        init: function() {
            var t = this;

            if ($searchField.size() <= 0) {return;}

            $searchField.find('.selectData').each(function() {
                $(this).find('option').eq(0).prop('selected', true);
            });

            $searchField.find('.selectBlock').on('click', function() {
                if (t.config.selectDispFlg) {return;}

                t.config.curSelect = $(this);
                t.config.curSelectWrap = $(this).parent();
                t.config.curSelectList = $(this).siblings('.selectList');
                t.config.selectWidth = t.config.curSelectList.outerWidth();
                t.config.selectHeight = t.config.curSelectList.outerHeight();

                t.selectShow();
            });

            $searchField.find('.selectList li').on('click', function() {
                if (!t.config.selectDispFlg) {return;}

                var $self = $(this);
                var txt = $(this).text();

                t.txtReplace($self, txt);
            });

            $searchField.find('.selectBox .close').on('click', function() {
                if (!t.config.selectDispFlg) {return;}

                t.selectHide();
            });

            $body.on('click', function() {
                if ($searchField.find('.selectBox .close').is(':visible')) {
                    t.selectHide();
                }
            });
        },

        selectShow: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $curSelectWrap = t.config.curSelectWrap;
            var $curSelectList = t.config.curSelectList;
            var $curSelect = t.config.curSelect;
            var selectWidth = t.config.selectWidth;
            var selectHeight = t.config.selectHeight;

            t.config.selectDispFlg = 1;

            $searchField.find('.selectBox').not($curSelectWrap).hide();

            $curSelectList.velocity('stop').velocity({
                properties: {
                    width: [selectWidth, '100%'],
                    height: [selectHeight, '40px']
                },
                options: {
                    duration: spd, // アニメーション時間
                    easing: eas, // イージング
                    begin: function() { // 開始時の処理
                        $curSelectWrap.find('.arrow').velocity('stop').velocity({
                            properties: {
                                opacity: ['0', '1'],
                                translateY: ['10px', '0']
                            },
                            options: {
                                duration: spd / 2, // アニメーション時間
                                easing: eas // イージング
                            }
                        });

                        if ($curSelectWrap.hasClass('categorySelectBox')) {
                            $curSelect.velocity('stop').velocity({
                                properties: {
                                    left: ['-219px', '0']
                                },
                                options: {
                                    duration: spd, // アニメーション時間
                                    easing: eas // イージング
                                }
                            });
                        }
                    },
                    complete: function() { // 完了時の処理
                        $(this).css({
                            width: '',
                            height: ''
                        });

                        $(this).find('li').velocity('stop').velocity({
                            properties: {
                                opacity: ['1', '0']
                            },
                            options: {
                                duration: 100, // アニメーション時間
                                easing: eas // イージング
                            }
                        });

                        $curSelectWrap.find('.close').velocity('stop').velocity({
                            properties: {
                                opacity: ['1', '0'],
                                translateY: ['0', '10px']
                            },
                            options: {
                                duration: spd / 2, // アニメーション時間
                                easing: eas, // イージング
                                display: 'block' // 表示・非表示
                            }
                        });
                    },
                    visibility: 'visible' // 表示・非表示
                }
            });
        },

        selectHide: function() {
            var t = this;
            var spd = t.config.spd;
            var eas = t.config.eas;
            var $curSelectWrap = t.config.curSelectWrap;
            var $curSelectList = t.config.curSelectList;
            var $curSelect = t.config.curSelect;
            var selectWidth = t.config.selectWidth;
            var selectHeight = t.config.selectHeight;

            $curSelectList.find('li').css({
                opacity: ''
            });
            $curSelectWrap.find('.close').hide();
            $curSelectWrap.find('.arrow').velocity('stop').velocity('reverse');
            $curSelectList.velocity('stop').velocity('stop').velocity('reverse', {
                complete: function() { // 完了時の処理
                    $(this).css({
                        width: '',
                        height: ''
                    });

                    $searchField.find('.selectBox').show();

                    t.config.selectDispFlg = 0;
                },
                visibility: 'hidden' // 表示・非表示
            });

            if ($curSelectWrap.hasClass('categorySelectBox')) {
                $curSelect.velocity('stop').velocity('reverse');
            }
        },

        txtReplace: function($self, txt) {
            var t = this;
            var $curSelectWrap = t.config.curSelectWrap;
            var $curSelectList = t.config.curSelectList;
            var $curSelect = t.config.curSelect;
            var index = $self.index();

            if (txt == 'すべて') {
                if ($curSelectWrap.hasClass('areaSelectBox')) {
                    txt += 'の都道府県';
                } else if ($curSelectWrap.hasClass('categorySelectBox')) {
                    txt += 'のカテゴリ';
                }
            }

            $curSelectList.find('li').removeClass('current');
            $self.addClass('current');
            $curSelect.text(txt);

            $curSelectList.find('.selectData option').eq(index).prop('selected', true);
        }
    }

    fixedSearchSelect.init();

/* =================================================================

    Variable Grid Layout

================================================================= */
    var $showcaseBox = $('.couponShowcaseBox');

    var variableGridLayout = {
        init: function() {
            var t = this;

            if (basicIeFlg[1] <= 9 && basicIeFlg[1] > 0) {
                // 商品ブロックの横に余白を設定（IE9以下のみ）
                t.widthVariable();

                $showcaseBox.find('.couponShowcaseBlock').each(function() {
                    $(this).css({
                        marginRight: 17 + 'px'
                    });
                });
            } else {
                // masonry実行（その他のモダンブラウザ）
                $showcaseBox.masonry({
                    itemSelector: '.couponShowcaseBlock',
                    gutter: 24,
                    transitionDuration: '0.5s',
                    isFitWidth: true,
                    isAnimated: true
                });
            }
        },

        widthVariable: function() {
            // 可変グリッド商品ボックスの幅調整処理（IE9以下のみ）
            if (basicIeFlg[1] <= 9 && basicIeFlg[1] > 0) {
                if (winWidth < 1264) {
                    $showcaseBox.css({
                        width: 900 + 'px'
                    });
                } else {
                    $showcaseBox.css({
                        width: ''
                    });
                }
            }
        }
    }

    variableGridLayout.init();

/* =================================================================

    Window Function

================================================================= */
    $win.on('scroll', function() {
        scVal = $win.scrollTop();

        if ($searchField.size() > 0) {
            if (scVal >= fixedSearchField.config.searchFieldOffset) {
                fixedSearchField.minimization();
            } else {
                fixedSearchField.sizeReset();
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

                if ($topVisual.size() > 0) {
                    // TOPビジュアルの高さ調整（TOPページのみ）
                    $topVisual.css({
                        height: winHeight - $header.innerHeight() + 'px'
                    });
                }

                // 可変グリッド商品ボックスの幅調整（IE9以下のみ）
                variableGridLayout.widthVariable();
            }
        }, 200 );
    });
});
