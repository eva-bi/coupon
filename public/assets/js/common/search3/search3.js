/*-------------------------------------------------------------------
 *
 * File Name : search3.js
 *
-------------------------------------------------------------------*/


/* =================================================================

    SlideDown

================================================================= */
$(function () {
      $('.slideDownBtn').click(function() {

        /*if ($(this).attr('class') == 'selected'){
          // メニュー非表示
          alert("1");
          $(this).removeClass('selected').next('div').stop(false, true).slideUp('fast');
        } else {
          // 表示しているメニューを閉じる
         // $('.slideDownBtn').removeClass('selected');
          //$('.slideDown').hide();

          // メニュー表示
          alert("2");
          $(this).addClass('selected').next('div').stop(false, true).slideDown('fast');
        }    */

        var slideDownElem = $('.slideDown');

        if(!$(this).next().is(':visible')){
            slideDownReset($(this));
            $('.slideDownBtn').removeClass('selected');
            $(this).addClass('selected').next().stop(false, true).slideDown('fast');
        } else {
            slideDownReset($(this));
            $(this).next().stop(false, true).slideUp('fast', function(){
                $(this).prev().removeClass('selected');
            });
        }

        function slideDownReset(self){
            var selfSlideDown = self.next();
            var index = slideDownElem.index(selfSlideDown);
            slideDownElem.each(function(i) {
                if (index != i) {
                    $(this).hide();
                }
            });
        }


      });


      var over_flg = '';

      // マウスカーソルがメニュー上/メニュー外
      $('.slideDownBtn,.slideDown').hover(function(){
        over_flg = true;
      }, function(){
        over_flg = false;
      });

      // メニュー領域外をクリックしたらメニューを閉じる
      $('body').click(function() {
        if (over_flg == false) {
          $('.slideDown').stop(false, true).slideUp('fast',function(){
              $('.slideDownBtn').removeClass('selected');
          });
        }
      });
    });



/* =================================================================

    nouislider

================================================================= */
//IE8以外
if(basicIeFlg[1] > 8 || basicIeFlg[1] === 0){

    $(function () {

       if($('#slider').size() <= 0){
           return;
       }

       var slider = document.getElementById('slider');

        noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });

    });
}

/* =================================================================

    sly　要素スライダー

================================================================= */
jQuery(function($){
    'use strict';
    // -------------------------------------------------------------
    //   Basic Navigation
    // -------------------------------------------------------------
    (function () {
        var $frame  = $('#basic01');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });

    }());

    (function () {
        var $frame  = $('#basic02');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });

    }());

    (function () {
        var $frame  = $('#basic03');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });

    }());

    (function () {
        var $frame  = $('#basic04');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });

    }());
    
    (function () {
        var $frame  = $('#basic05');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });

    }());
    
    (function () {
        var $frame  = $('#basic06');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap   = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });

    }());




    //Add key filter search site
    $('.navMarket li a').on('click', function(){
        s = $(this).data('s');
        $('#site-search').val(s);
        if ($('.setLayout li a').hasClass('navMarketNow')) {
            $('.setLayout li a').removeClass('navMarketNow');
        };
        $(this).addClass('navMarketNow');
    });
    //Reset value price
    $('#js-reset-price').on('click', function(){
        $('#min-price').attr('value', '');
        $('#max-price').attr('value', '');
    })
    //Sort item
    $('#js-sort').on('change', function() {
        var url = $(location).attr('href');
        var indexOfO = url.indexOf('o='); 
        if ( indexOfO != -1 ) {//if already has param o in querystring -> remove it
            url = url.substring(0, indexOfO - 1);
        }
        
        url = url + '&o=' + $(this).val();
        if (url.indexOf('?') != -1) {//has other GET params
            var url = url.split('&o')[0];
            if ($(this).val() != '') {
                url = url + '&o=' + $(this).val();
            }
        } else {//has no other GET params
            var url = url.split('&o')[0];
            if ($(this).val() != '') {
                url = url + '?o=' + $(this).val();
            }
        }
        window.location.href = url;
    });

    $('.showcaseLink').on('click', function(e){
        var url = $(this).find('.trimmingImg').data('url');
        var senderElement = e.target.nodeName;
        if (senderElement == 'A') {
            return true;
        };
        window.open(url, '_blank');
    });
    $('#js-discount').on('change', function(){
        var value = $(this).val().split(',');
        if (value.length > 1) {
            $('#discount-rate-low').val(value[0]);
            $('#discount-rate-high').val(value[1]);
        } else {//option '選択しない' is selected
            $('#discount-rate-low').val('');
            $('#discount-rate-high').val('');
        };
    });
    //Rewrite url
    // $( "#js-searchform" ).submit(function( event ) {
    //     event.preventDefault();
    //     var searchtype = "on";
    //     var q = $('#searchFormKeyword').val();
    //     var s = $('#site-search').val();
    //     var np  = $('#js-np').val();
    //     var min = $('#min-price').val();
    //     var max = $('#max-price').val();
    //     $( "input[type='radio']" ).prop( "checked", function( i, val ) {
    //         if (val) {
    //             searchtype = $(this).val()
    //         };
    //     });
    //     var url = '/search3?q=' + q + '&s=' + s;
    //     var querystring = $(location).attr('search').split('&');
    //     if (searchtype == 'or') {
    //         url = url + '&searchtype=or';
    //     };
    //     if (np != "") {
    //         url = url + '&np=' + np;
    //     };
    //     if (min != "") {
    //         url = url + '&l=' + min + '&u=' +max;
    //     };
    //     //console.log(url);
    //     window.location.href = url;
    // });
});
