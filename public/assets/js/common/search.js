/*-------------------------------------------------------------------
 *
 * File Name : search.js
 *
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
    same_products
-------------------------------------------------------------------*/
function sameProd(arg) {
    // 内部処理変数
    var win = $(window);
    var winEv = window.event;
    var mwElem = $('.sameProdWin');
    var mwBgElem = $('.sameProdBack');
    var clsElem = $('.sameProdWinCls', mwElem);

    var scTop = win.scrollTop();
    var winHeight = win.height();
    var mwHeight = mwElem.innerHeight();

    var narrowWinFlg = false;
    var mwOpFlg = false;

    // モーダルウィンドウ処理
    var func = {
        // 各種設定
        config : {
            // モーダルウィンドウの表示スピード
            dispSpd : 300,
            // ウィンドウの縦幅がモーダルウィンドウより小さい場合につけるモーダルウィンドウの上マージン
            mgn : 30
        },

        // 初期処理
        init : function() {
            var mgn = this.config.mgn;

            narrowWinFlg = winHeight <= mwHeight + mgn ? true : false;
            mwOpFlg = true;

            this.winOpen();
        },

        // 表示処理
        winOpen : function() {
            var spd = this.config.dispSpd;
            var mgn = this.config.mgn;
            var topPos = !narrowWinFlg ? scTop + (winHeight/2 - mwHeight/2) : scTop + mgn;

            mwElem.css({top: topPos + 'px'});

            mwBgElem.css({opacity: 0.7}).show();
            mwElem.fadeIn(spd, function() {
                mwOpFlg = false;
            });
        },

        // 非表示処理
        winClose : function() {
            if (mwOpFlg) return;

            var spd = this.config.dispSpd;

            mwBgElem.fadeOut(spd);
            mwElem.fadeOut(spd);
        }
    }

    // クローズボタンクリックイベント
    clsElem.on('click', function() {
        func.winClose();
    });

    // モーダルウィンドウ背景クリックイベント
    mwBgElem.on('click', function() {
        func.winClose();
    });

    // 初期値
    $('span.refAmo').text(arg.price.replace('YEN', '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
    $('dt.sameProdName').text(arg.title);
    $('div.sameProdImg > img').attr({'src':arg.image});

    // 初期処理実行
    func.init();

    // ページ遷移処理の無効化
    var ua = window.navigator.userAgent.toLowerCase();
    var ieVer = (ua.indexOf('msie') > -1) ? parseInt(ua.replace(/.*msie[ ]/,'').match(/^[0-9]+/)) : 0;

    if (ieVer != 0 && ieVer <= 8) {
        winEv.returnValue = false;
    } else {
        return false;
    }
}


/*-------------------------------------------------------------------
    search_page_new
-------------------------------------------------------------------*/
$(function(){
    var select_box_hover_flg = false;

    $('span.selectable2Val').click(function(){
        $('#selectable select.selectable2').focus();
        if ($('ul.selectList').css('display') == 'none') {
            $('ul.selectList').slideDown(100);
        } else {
            $('ul.selectList').slideUp(100);
        }
    });

    $('ul.selectList li a').click(function(){
        $('ul.selectList li a').removeClass();
        $(this).attr('class','selected');
        $('#search_box_form select#c_id option').attr('selected',false);

        if ($(this).attr('data-value') == 'nodata') {
            $($('#search_box_form select#c_id option')[0]).attr('selected','selected');
        } else {
            $('#search_box_form select#c_id option[value="'+$(this).attr('data-value')+'"]').attr('selected','selected');
        }
        $('span.selectable2Val').html($('#search_box_form select#c_id option[selected="selected"]').text());
        $('ul.selectList').slideUp();

        return false;
    });

    $('ul.selectList').hover(function() {
        select_box_hover_flg = true;
    },function(){
        select_box_hover_flg = false;
    });

    $('#search_box_form select#c_id').blur(function(){
        if (select_box_hover_flg) {
            $(this).focus();
            return true;
        }
        $('ul.selectList').slideUp(300);

        return true;
    });

    $('.wb_inner').on('click', '.inner_item', function(){
        var link = $(this).children('span.results-image').children('a').attr('href');
        window.open(link);
        return false;
    });

    $('.sb_content').on('click', '.inner_item', function(){
        var link = $(this).children('span.results-image').children('a').attr('href');
        window.open(link);
        return false;
    });
});

/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function() {
  $('#select_year').change(function(){
    var ym_select               = $("#select_year option:selected").val();
    ym_select                   = ( ym_select=="l30d" ) ? ym_select : Number($("#select_year option:selected").val());
    var permit_max_month        = Number(200403);
    var member_status_premium   = Number(1);

    if (ym_select != "") {
        if ( (ym_select < permit_max_month) && member_status_premium == 0 ) {
          location.href = "";
        } else {
          if ( ym_select=="l30d" ){
            location.href = "/search1/q-~a4b3a4b1a4b7/s-mix/?o=t1";
          } else {
            AUCFAN_SEARCH_PAGE.throw_popup_form({'formVal':[{'name':'ym','val':ym_select,'type':'hidden'}]});
          }
        }
        return false;
    } else {
        return false;
    }
  });
});

/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function(){
    $('p.p_bn_super span.bastu img').click(function(){
        var next_element_class = $(this).parents('p.p_bn_super').next('div').attr('class');
        if($(this).parents('p.p_bn_super').next('.'+next_element_class).css('display') != 'none')
        {
            var target_affi = $(this).parents('p.p_bn_super').next('.'+next_element_class);
            target_affi.fadeOut('fast',function(){
                target_affi.next('.'+next_element_class).fadeIn('fast');
            });
        } else {
            var target_affi = $(this).parents('p.p_bn_super').next('.'+next_element_class).next('.'+next_element_class);
            target_affi.fadeOut('fast',function(){
                target_affi.prev('.'+next_element_class).fadeIn('fast');
            });
        }
    });
});

/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
function postit(f) {
  $.ajax({
    url: $(f).attr('action'),
    type: 'GET',
    timeout: 3000,
    data : $(f).serialize(),
    error: function(){alert('エラーが発生しました。再度お試し下さい。');},
    success: function(obj) {
        $('#improve_column1').html('<span style="font-size:11px;color:#999933;"><p style="font-weight:bold;">ご意見ありがとうございました。</p>いただいたご意見には、必ずスタッフが目を通します。<br />個々のご意見にお返事できないことを予めご了承ください。</span>');
        $('#improve_column2').html('<p>返事が必要なお問い合わせの場合は<br /><a href="/mail/mail.cgi">こちら</a> からご連絡下さい</p>');
    }
  });

  return false;
}

/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function(){
  if ($("#ad_aucfan_navi_premium_mix_1").parent().parent().attr("class") == "listing_ad_overture_im") {
    $("#ad_aucfan_navi_premium_mix_1").clone(true).appendTo("#im_clone .listing_ad_overture_im ul");
    $("#ad_aucfan_navi_premium_mix_2").clone(true).appendTo("#im_clone .listing_ad_overture_im ul");
    $("#ad_aucfan_navi_premium_mix_3").clone(true).appendTo("#im_clone .listing_ad_overture_im ul");
    $("#ad_aucfan_navi_premium_mix_4").clone(true).appendTo("#im_clone .listing_ad_overture_im ul");
    $("#ad_aucfan_navi_premium_mix_5").clone(true).appendTo("#im_clone .listing_ad_overture_im ul");
  } else {
    $("#ad_aucfan_navi_premium_mix_1").clone(true).appendTo("#ss_clone .listing_ad_topSearch ul");
    $("#ad_aucfan_navi_premium_mix_2").clone(true).appendTo("#ss_clone .listing_ad_topSearch ul");
    $("#ad_aucfan_navi_premium_mix_3").clone(true).appendTo("#ss_clone .listing_ad_topSearch ul");
    $("#ad_aucfan_navi_premium_mix_4").clone(true).appendTo("#ss_clone .listing_ad_topSearch ul");
    $("#ad_aucfan_navi_premium_mix_5").clone(true).appendTo("#ss_clone .listing_ad_topSearch ul");
  }
});

/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
var uvClickFlg = 1;
$("tr.results_shopping td a,tr.results_bid td a,tr.self_affiliate a").click(function() {
  uvClickFlg = 2;
});
$("tr.results_shopping,tr.results_bid,tr.self_affiliate").click(function(){
  if (uvClickFlg == 2) {
    uvClickFlg = 1;
    return true;
  }
  var tds = $(this);
  var targetLink = (tds.attr('class') == 'self_affiliate')? $(tds.find("td.icon-logo-aucfan a")):$(tds.find("a.item_title"));
  if (!targetLink[0]) return ture;
  if (targetLink.attr("target") == "_blank") {
    window.open(targetLink.attr("href"));
  } else {
    location.href = targetLink.attr("href");
  }

  return false;
});

/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$("div.searchListToolbarSwitch").click(function() {
  var toolBarToggleFlg = $("div.searchListToolbarMain").css("display");
  $("div.searchListToolbarSwitch").css("display","none");

  if (toolBarToggleFlg != "none") {
      $.cookie("searchToolBarFlg","1",{expires:360,path:'/',domain:'.aucfan.com'});
      $("#copyright").animate({padding:"15px 0 30px"},500);
      $("div.searchListToolbarSwitch").animate({bottom:"0"},500);
      mainToggle(toolBarToggleFlg);
  } else {
      $("#copyright").css("padding","15px 0 85px");
      $("div.searchListToolbarMainShadow").slideToggle("1000",function(){ mainToggle(toolBarToggleFlg); });
      $.cookie("searchToolBarFlg","0",{expires:360,path:'/',domain:'.aucfan.com'});
  }
  function mainToggle(toolBarToggleFlg) {
    $("div.searchListToolbarMain").slideToggle("1000",function(){
      toolBarToggleFlg = $("div.searchListToolbarMain").css("display");
      if (toolBarToggleFlg == "none") {
        $("div.searchListToolbarMainShadow").slideToggle();
        $("div.searchListToolbarSwitch span").html('<img src="http://x1.afimg.jp/img/yaji02.png" alt="矢印" width="19" height="18" />');
        $("div.searchListToolbarSwitch").css("bottom","0");
        setTimeout(function(){   $("div.searchListToolbarSwitch").fadeIn("normal"); },300);
      } else {
        $("div.searchListToolbarSwitch").css("bottom","50px");
        $("div.searchListToolbarSwitch span").html('<img src="http://x1.afimg.jp/img/yaji01.png" alt="矢印" width="19" height="18" />');
        setTimeout(function(){   $("div.searchListToolbarSwitch").fadeIn("normal"); },100);
      }
    });
  }
});
/*-------------------------------------------------------------------
 get bid months
 -------------------------------------------------------------------*/
function getBidMore(data){
  $.ajax({
    url: '/append/period',
    type: 'POST',
    dataType: 'html',
    data: data,
    timeout: 3000,
    success: function(data) {
      $('#bidtime_more').html(data);
      onBidtimeToggle();
    },
    error: function(a,b,c) {
    }
  });
}

var onBidtimeToggle = function() {
  $('[id^="bidtime_toggle_"]').on('click', function(evt) {
    var $dl = $(this).parents('dl');
    if ($dl.hasClass('on')) {
      $dl.removeClass('on').addClass('off');
    } else {
      $dl.removeClass('off').addClass('on');
    }
    $(this).parent('dt').next('dd').slideToggle('fast');
  });
};

var imageLazyLoad = function() {
  $('.thumbnail.loading').each(function() {
    var $this = $(this);

    $this.error(function() {
      $this.attr('src', 'http://x2.afimg.jp/img/thumb_noimage.gif');
    });
    $this.attr('src', $this.attr('data-src-original'));

    $this.removeClass('loading');
  });
}

/*-------------------------------------------------------------------
 151002 pro導線バナー
 -------------------------------------------------------------------*/
$(window).load(function() {
  if ($('#premSideBnrPro').size() <= 0){return;}//あるなし判定

  var docHeight = $(document).height();// ドキュメントの高さ
  var sideBnrElem = $('#premSideBnrPro');// サイドバナー
  var sideBnrTop = sideBnrElem.offset().top;//サイドバナーの上の高さ
  var removeFlg = 0;//クローズの判定のための

  //サイドバナー下までの高さ
  var sideHeight = $('#headrArea').outerHeight() + $('#auctopiHeader').outerHeight(true) + $('#side').height()

  // フッターの高さ
  var footPosi = docHeight - $('#footer').offset().top;
  $(window).bind('scroll', function() {
    //flgが0の時
    if (!removeFlg) {
      var windowH = $(window).height();//ウィンドウの高さ
      var scrollT = $(window).scrollTop();// スクロールした高さ

      // ウィンドウの高さ + スクロールした高さ
      var scrollPosition = scrollT + windowH

      //サイドバナーの固定・解除
      if(scrollT < sideBnrTop) {
          sideBnrElem.removeClass('fixed');
      } else {
        if ( docHeight - scrollPosition <= footPosi ) {
          sideBnrElem.fadeOut();
        } else {
          sideBnrElem.fadeIn().addClass('fixed');
        }
      };
    }
  });

  $('.prem_sidebnr_close').on('click', function(){
    sideBnrElem.fadeOut();
    removeFlg = 1;
  });
});



$(function() {

});



/*-------------------------------------------------------------------
 もしかしてリスト #9749
 -------------------------------------------------------------------*/
var PossiblyList = {
  get: function(query) {
    $.ajax({
      url: '/append/possiblylist/?q=' + query,
      type: 'GET',
      dataType: 'html',
      timeout: 5000
    }).done(function(html) {
      $('#possiblyList').html(html);
    });
  }
};

/*-------------------------------------------------------------------
 オートコンプリート
 -------------------------------------------------------------------*/
$(function() {
  // PC search1
  $('#searchInput').autocomplete({
    source: function(request, response) {
      $.ajax({
          url: "http://autocomplete-1899745734.ap-northeast-1.elb.amazonaws.com/s",
        data: {
          'q':request.term.replace(/　/g, ' '),
          'f':'pc1'
        },
        dataType: 'jsonp',
        jsonp: 'jsonp.wrf',
        type:'get',
        timeout: 5000,
        cache:true
      }).done(function(data) {
        response(data);
      });
    },
    select: function(evt, ui) {
      $('#searchInput').val( ui.item.value );
      $('#searchButton').click();
    }
  });
});
var setAutocompleteKeyword = (function(query) {
  $.ajax({
    url: "http://autocomplete-1899745734.ap-northeast-1.elb.amazonaws.com/e",
    data: {
      'q':query,
      'f':'pc1'
    },
    dataType: 'jsonp',
    jsonp: 'jsonp.wrf',
    type:'get',
    timeout: 5000,
    cache:true
  }).done(function(data) {
  });
});
