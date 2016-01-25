/*-------------------------------------------------------------------
 *
 * File Name : slider.js
 *
-------------------------------------------------------------------*/

jQuery(function($){
    (function () {

        var $win = $(window);
        var $body = $('body');

        var winWidth = $win.width();
        var winHeight = $win.height();

/* =================================================================

    Free Slider

================================================================= */
        function freeSlider() {
            $(document).find(".freeSliderWrap").each(function (i, elem) {
                var $freeSlider = $(elem).find(".freeSlider");
                var $nextPage = $(elem).find(".nextPage");
                var $scrollbar = $(elem).find(".scrollbar");
                var $sliderToStart = $(elem).parent().find('.sliderToStart');
                var liAllWidth = 0;

                $freeSlider.find('li').each(function(i) {
                    $(this).css({
                        width: ''
                    });

                    var liWidth = $(this).find('a').width() + 10;

                    liAllWidth += liWidth;

                    $(this).css({
                        width: liWidth + 'px'
                    });

                    if (i === $freeSlider.find('li').size() - 1) {
                        sliderSet();
                    }
                });

                var wrapWidth = $(this).width();

                if (wrapWidth >= liAllWidth) {
                    $nextPage.hide();
                    $scrollbar.hide();
                    $sliderToStart.addClass('usually');
                } else {
                    $nextPage.show();
                    $scrollbar.show();
                    $sliderToStart.removeClass('usually');
                }

                if (!$(elem).find('.scrollbar').is(':visible')) {
                    $nextPage.addClass('disabled');
                } else {
                    $nextPage.removeClass('disabled');
                }

                function sliderSet() {
                    $freeSlider.sly({
                        horizontal: 1,
                        itemNav: 'basic',
                        smart: 1,
                        activateOn: null,
                        mouseDragging: 1,
                        touchDragging: 1,
                        releaseSwing: 1,
                        startAt: 0,
                        scrollBar: $(elem).find('.scrollbar'),
                        scrollBy: 1,
                        activatePageOn: null,
                        speed: 300,
                        elasticBounds: 1,
                        easing: 'easeOutExpo',
                        dragHandle: 1,
                        dynamicHandle: 1,

                        // Buttons
                        prevPage: $(elem).find('.prevPage'),
                        nextPage: $(elem).find('.nextPage')
                    });

                    // To Start button
                    $sliderToStart.on('click', function () {
                        var item = $(this).data('item');

                        $freeSlider.sly('toStart', item);
                    });

                    $freeSlider.sly('reload');
                }
            });
        }

        freeSlider();

/* =================================================================

    Window Function

================================================================= */
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

                    // Free Sliderリセット
                    freeSlider();
                }
            }, 200 );
        });



    }());
});
