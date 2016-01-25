/*-------------------------------------------------------------------
 *
 * File Name : aucview.js
 *
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
    search_page_new
-------------------------------------------------------------------*/
$(function(){
    var select_box_hover_flg = false;

    $('span.selectable2Val').click(function(){
        $('#selectable select.selectable2').focus();
        if($('ul.selectList').css('display') == 'none')
        {
            $('ul.selectList').slideDown(100);
        } else {
            $('ul.selectList').slideUp(100);
        }
    });

    $('ul.selectList li a').click(function(){
        $('ul.selectList li a').removeClass();
        $(this).attr('class','selected');
        $('#search_box_form select#c_id option').attr('selected',false);
        if($(this).attr('data-value') == 'nodata')
        {
            $($('#search_box_form select#c_id option')[0]).attr('selected','selected');
        } else {
            $('#search_box_form select#c_id option[value="'+$(this).attr('data-value')+'"]').attr('selected','selected');
        }
        $('span.selectable2Val').html($('#search_box_form select#c_id option[selected="selected"]').text());
        $('ul.selectList').slideUp();
        return false;
    });

    $('ul.selectList').hover(function(){
        select_box_hover_flg = true;
    },function(){
        select_box_hover_flg = false;
    });

    $('#search_box_form select#c_id').blur(function(){
        if(select_box_hover_flg)
        {
            $(this).focus();
            return true;
        }
        $('ul.selectList').slideUp(300);
        return true;
    });

    $('.wb_inner').on('click', '.inner_item', function(){
        var link = $(this).children('span.results-image').children('a').attr('href');
        window.open(link);
    });

    $('.sb_content').on('click', '.inner_item', function(){
        var link = $(this).children('span.results-image').children('a').attr('href');
        window.open(link);
    });
});


/*-------------------------------------------------------------------
    navi
-------------------------------------------------------------------*/
function navi_image_select() {

    var navi = new Array(3);
    navi[0] = 'data'   ;
    navi[1] = 'school' ;
    navi[2] = 'kantei' ;

    for (var i=0 ; i<3 ; i++) {

        var x        = navi[i];
        var img_id   = 'navi_image_' + x ;
        var img_node = document.getElementById( img_id );
        if (img_node) {

            var r        = Math.ceil(Math.random() * 10);
            var r_str    = new String(r);
            var r_len    = r_str.length;

            img_node.src = '/img/navi_' + x + '_' + ((r_len == 1) ? ('0' + r) : r ) + '.gif' ;
        }
    }
}


/*-------------------------------------------------------------------
    review_scroll
-------------------------------------------------------------------*/
horizontal_scroll = function ( _scroll_area_id , _left_or_right , _val ) {

    _val = parseInt(_val);

    if (_val < 0) {
        return ;
    }

    var _OUTER_AREA_WIDTH = 748 ;

    var outer_area_id_base = "keyword_review";
    var inner_area_id_base = "keyword_review_inner";
    var button_id_base     = "horizontal_scroll";

    var timerID       = 0   ;
    var timerCount    = 0   ;
    var timerCountMax = 100 ;

    var _rate_1 = 0.70 ;
    var _rate_2 = 0.85 ;
    var _rate_3 = 0.90 ;
    var _min    = 10   ;

    var _outer_area = $( "#" + outer_area_id_base + "_" + _scroll_area_id ) ;
    var _inner_area = $( "#" + inner_area_id_base + "_" + _scroll_area_id ) ;

    var _inner_area_width = 0 ;
    var _scrolled         = 0 ;

    var _LI = _inner_area.find(">li");
    if (_LI) {
        _inner_area_width = _LI.eq(0).outerWidth(true) * _LI.size() ;
    }

    var _outer_area_width = _outer_area.width() || _OUTER_AREA_WIDTH ;
    if (isNaN(_outer_area_width) == true) {
        _outer_area_width = _OUTER_AREA_WIDTH ;
    }
    if (isNaN(_outer_area_width) <= 0) {
        _outer_area_width = _OUTER_AREA_WIDTH ;
    }

    if (_outer_area_width >= _inner_area_width) {
        return ;
    }

    var non_view_area_size = Math.abs( _outer_area_width - _inner_area_width   );
    if (non_view_area_size <= 0) {
        return ;
    }

    var _direction
        = (_left_or_right == 'left' ) ? -1
        : (_left_or_right == 'right') ? +1
        :                                0
        ;

    if (_direction == 0) {
        return ;
    }

    var _inner_area_mrgin_left     = parseInt(_inner_area.css('marginLeft').replace('px',''));
    var _inner_area_mrgin_left_abs = Math.abs(_inner_area_mrgin_left) ;

    var _max = 0;

    if (_direction == -1) {
        var _diff = _inner_area_width - _inner_area_mrgin_left_abs ;
        if (_diff >= 0) {
            if (_diff > _outer_area_width) {
                _max =  _diff - _outer_area_width ;
                if (_max > _val) {
                    _max = _val ;
                }
                var new_inner_area_mrgin_left = _inner_area_width - _outer_area_width - _inner_area_mrgin_left_abs - _max ;
                if (new_inner_area_mrgin_left <= _min) {
                    _max += new_inner_area_mrgin_left;
                }
            }
        }
    }
    else if (_direction == 1) {
        if (_inner_area_mrgin_left_abs >= 0) {
            if (_inner_area_mrgin_left_abs < _min) {
                _max = _inner_area_mrgin_left_abs ;
            }
            else if (_inner_area_mrgin_left_abs < _val) {
                _max = _inner_area_mrgin_left_abs ;
            }
            else {
                _max = _val ;
            }
        }
    }

    if (_max < 0) {
        return ;
    }

    var _button_right        = $( "#" + button_id_base + "_right_" + _scroll_area_id ) ;
    var _button_right_status = _button_right.attr("disabled") ;

    var _button_left        = $( "#" + button_id_base + "_left_" + _scroll_area_id ) ;
    var _button_left_status = _button_left.attr("disabled")  ;

    var _func = function () {

        var x = _max - _scrolled ;
        var d;

        if (x < (_max / 10)) {
            d = parseInt(x * _rate_3);
        } else if (x < (_max / 5)) {
            d = parseInt(x * _rate_2);
        } else {
            d = parseInt(x * _rate_1);
        }

        if (d < _min) {
            d = x ;
        }

        _scrolled += d ;

        _inner_area_mrgin_left += (d * _direction) ;
        _inner_area.css('marginLeft',_inner_area_mrgin_left+"px");

        if (_scrolled >= _max || timerCount > timerCountMax) {

            var _stat_r = _button_right_status;
            var _stat_l = _button_left_status;

            if (_inner_area_mrgin_left < 0) {
                _stat_r = false ;
            } else {
                _stat_r = true ;
            }

            if (Math.abs(_inner_area_mrgin_left) >= non_view_area_size) {
                _stat_l = true;
            } else {
                _stat_l = false;
            }

            _button_right.attr( "disabled" , _stat_r ) ;
            _button_left.attr(  "disabled" , _stat_l ) ;

            clearInterval(timerID);
        }
    }

    _button_right.attr( "disabled" , false ) ;
    _button_left.attr(  "disabled" , false ) ;

    timerID = setInterval(_func,1);
}


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function() {
    $(".jCarouselLite").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible : 5,
        speed: 1000,
        easing: "linear"
    });
    $(".jCarouselLite2").jCarouselLite({
        btnNext: ".next2",
        btnPrev: ".prev2",
        visible : 5,
        speed: 1000,
        easing: "easeOutBounce"
    });
    $(".jCarouselLite3").jCarouselLite({
        btnNext: ".next3",
        btnPrev: ".prev3",
        visible : 5,
        speed: 1000,
        easing: "easeInOutBack"
    });
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
var aucviewFuncs = new SubHead();
function cngImage(url) {
    if(url !== '') {
        var thumbnail_image = document.getElementById('thumbnail_image');
        if (thumbnail_image) {
            thumbnail_image.src = url;
        }
    }
}
function bookmark_form_submit ( form_id ) {
    var f = document.getElementById(form_id);
    if (f) {
        f.submit();
        return false;
    }
    return false;
}
function img_popup () {
    var thumbnail_image = document.getElementById('thumbnail_image');
    if (thumbnail_image) {
        var img_url    = thumbnail_image.src;
        var img_url_en = encodeURIComponent( img_url );
        javascript:window.open('http://aucview.aucfan.com/yahoo/v408226154/?imgpopup=1&current_image=' + img_url_en , 'aucviewwindow' , 'scrollbars=yes,resizable=yes,width=650px,height=1000px' );
    }
    return false;
}
function show_popup ( id, name, width, height ) {
    var base_url = "http://ap3.aucfan.com/aucview/";
    window.open( base_url + 'show/' + name + '/id/' + id + '/', name + 'window' , 'scrollbars=yes,resizable=yes,width=' + width + 'px,height=' + height + 'px' );
    return false;
}


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$("a#syuppinsyaInfo,a#hyokaComment").live("click",function(){
    var clickId = $(this).attr("id");
    var infoOrComment = $("."+clickId);
    if(clickId == "hyokaComment")
    {
        $(".syuppinsyaInfo").css("display","none");
        for(var ii=0;infoOrComment.length >= ii;ii++)
        {
            $(infoOrComment[ii]).css("display","block");
        }
    } else {
        $(".hyokaComment").css("display","none");
        for(var ii=0;infoOrComment.length >= ii;ii++)
        {
            $(infoOrComment[ii]).css("display","block");
        }
    }
    return false;
});


/*-------------------------------------------------------------------
    recommend_jsonp
-------------------------------------------------------------------*/
//$(function(){
//     var jsonp_item_flg = false;
//     var effect_type = '';
//     $(document).scroll(function(){
//         var targetTop = $('#rs_jsonp_item_height').offset().top-$(window).height();
//         var gId = $('ul#recommendItemShow_list').attr('data-ur');
//         if(targetTop > $(this).scrollTop() || jsonp_item_flg) return true;
//         jsonp_item_flg = true;
//         var clientWidth = 0;
//         $.ajax({
//             type:'GET',
//             url:'http://api.aucfan.com/recommend/v1/item/list.jsonp?group='+gId,
//             dataType:'jsonp',
//             jsonpCallback:'recommend_jsonp',
//             beforeSend:function(){
//                 clientWidth = $(window).width();
//                 if(effect_type == 'bound')
//                 {
//                     $('ul#recommendItemShow_list').css('position','relative');
//                     $('ul#recommendItemShow_list').css('left',clientWidth+'px');
//                     $('ul#recommendItemShow_list').css('opacity','0');
//                 } else if(effect_type == 'kurukuruBound')
//                 {
//                     $('ul#recommendItemShow_list').css('position','relative');
//                     $('ul#recommendItemShow_list').css('left',clientWidth+'px');
//                 }
//             },
//             success:function(json){
//                 var len = 10;
//                 var get_len = json.data.items.length;
//                 var addHtml = '';
//                 var randArray = new Array(len);
//                 var rand = 0;
//                 var i = 0;
//                 if(!get_len)
//                 {
//                     $('#show_recommend').css('display','none');
//                     return false;
//                 }
//                 if(len > get_len)
//                 {
//                     len = get_len;
//                 }
//                 for(var c=0; c < len; c++)
//                 {
//                     rand = Math.floor(Math.random() * get_len);
//                     for(var c2=0;c2<len;c2++)
//                     {
//                         if(randArray[c2] != 0 && !randArray[c2])
//                         {
//                             break;
//                         }
//                         if(randArray[c2] == rand)
//                         {
//                             rand = Math.floor(Math.random() * get_len);
//                             var c2=-1;
//                             continue;
//                         }
//                     }
//                     randArray[c2] = rand;
//                     i = rand;
//                     addHtml = '<span class="size_fix"><a target="_blank" href="http://linkout.aucfan.com/?to=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&amp;pid=883098218&amp;vc_url=' + encodeURIComponent('http://page.auctions.yahoo.co.jp/jp/auction/' + json.data.items[i].AuctionID) + '"><span class="size_fix"><img src="'+json.data.items[i].Image+'" width="'+json.data.items[i].ImageWidth+'px" height="'+json.data.items[i].ImageHeight+'px" /></span></a></span>';
//                     addHtml += '<ul><li class="item_price"><a href="'+json.data.items[i].AucviewUrl+'">'+json.data.items[i].CurrentPrice+'円</a></li>';
//                     addHtml += '<li class="bid_num">入札数：'+json.data.items[i].Bids+'</li>';
//                     addHtml += '<li class="rem_time">残り時間'+json.data.items[i].EndTime+'</li></ul>';
//                     $('ul#recommendItemShow_list').append('<li data-jsonNo="'+i+'" class="show_item" title="'+json.data.items[i].Title+'">'+addHtml+ '</li>');
//                 }
//                 $('ul#recommendItemShow_list').fadeIn(3000);
//             }
//         });
//     });
//});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$("a#shousaiInfo,a#rakusatsuInfo").live("click",function(){
    var clickId = $(this).attr("id");
    var infoOrComment = $("."+clickId);
    if(clickId == "rakusatsuInfo")
    {
        $(".shousaiInfo").css("display","none");
        for(var ii=0;infoOrComment.length >= ii;ii++)
        {
            $(infoOrComment[ii]).css("display","block");
        }
    } else {
        $(".rakusatsuInfo").css("display","none");
        for(var ii=0;infoOrComment.length >= ii;ii++)
        {
            $(infoOrComment[ii]).css("display","block");
        }
    }
    return false;
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
function pop_up_login () {
    $('.bid_set_input').css('display', 'none');
    $("#modal_reserve").show();
    return false;
}
function btn_bid_reserve () {
    $('.regist_member').css('display', 'none');
    $("#modal_reserve").show();
    return false;
}


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
function close_modal () {
    $('.modal_alpha_BK,span.btn_pop_close a img').click(function () {
        if ($('#modal_reserve').css('display') != 'none') {
            $('#modal_reserve').fadeOut();
        }
    });
    $('#modal_same_bid .close,.modalBK').click(function () {
        $('#modal_same_bid').fadeOut(500);
    });
}
function btn_bid_same_click () {
        $('#modal_same_bid').show();
}

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
function btn_bid_same_click_to_yahoo () {
    $('#bid_same_form input[name="description_plain_work"]').attr('value',$('#encryption').html());
    $('#bid_same_form').submit();
}



/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function(){
    var auction_site = "yahoo"+"";

    $("#recentItemShow_title").css("display", "none");
    $("#recentItemShow_title_etc").css("display", "");
    $(".recentItemEtc").css("display", "");
    if(AUCVIEW_COOKIE.data.length > 0){
        var maxcount = (AUCVIEW_COOKIE.data.length > 4) ? 4 : AUCVIEW_COOKIE.data.length;
        var target_img_width = 100;
        var target_img_height = 100;
        var base_url = "http://aucview.aucfan.com/"+auction_site+"/";

        for(var num = 0; num < maxcount; num++){
            var unecape_object = new Array();
            if(!AUCVIEW_COOKIE.data[num]) continue;
            for(var i = 0; i < AUCVIEW_COOKIE.data[num].length; i++){
                unecape_object.push(unescape(AUCVIEW_COOKIE.data[num][i]));
            };
            var img_size = AUCVIEW_COOKIE.resize_img(AUCVIEW_COOKIE.data[num][6],AUCVIEW_COOKIE.data[num][7],target_img_width,target_img_height);
            if (img_size.width > target_img_width || img_size.height > target_img_height) return;

            var title_short = AUCVIEW_COOKIE.substr(unecape_object[1],13,'...');

            var img_str  = ""+unecape_object[5];
            var site_str = (img_str.search('yahoo') > -1) ? 'yahoo' : 'mbok';
            if("v408226154" == unecape_object[0] || auction_site != site_str) {
                maxcount += (AUCVIEW_COOKIE.data.length > 4) ? 1 : 0;
                $("#recentItemShow_title_etc").css("display", "none");
                continue;
            }

            $("#recentItemShow_title").css("display", "");
            $("#recentItemShow_title_etc").css("display", "none");
            $(".recentItemEtc").css("display", "none");

            var text = '';
            text += '<li class="show_item">';
            text +=     '<span class="size_fix"><a href="'+base_url+unecape_object[0]+'/"><img width="160" alt="'+unecape_object[1]+'" src="'+unecape_object[5]+'"></a></span>';
            text +=     '<ul> ';
            text +=         '<li class="item_price"> <a href="'+base_url+unecape_object[0]+'/">'+unecape_object[3]+' 円</a> </li>';
            text +=         '<li class="bid_num">入札数：'+unecape_object[8]+'</li>';
            text +=         '<li class="rem_time">残り時間：'+unecape_object[2]+'</li>';
            text +=     '</ul>';
            text += '</li>';

            $("#recentItemShow_list").append(text);
        };
    }
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
//$(window).load(function(){
//     if($('div.searchListToolbarMain').css('display') == 'none')
//     {
//         $('div#topcontrol').css('bottom','30px');
//     } else {
//         $('div#topcontrol').css('bottom','190px');
//     }
//});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
var is_initial_hide = 0;
$(window).load(function(){
    if(1 == $.cookie('searchToolBarFlg')) {
        is_initial_hide = 1;
        searchListToolbarSwitchClick();
    }
});

function searchListToolbarSwitchClick()
{
    var toolBarToggleFlg = $('div.searchListToolbarMain').css('display');

    if(1 == is_initial_hide) {
        $('div.searchListToolbarMain').css('display','none');
        $('div.searchListToolbarMainShadow').css('display','block');
        is_initial_hide = 0;
        return;
    }

    $('div.searchListToolbarSwitch').css('display','none');

    if(toolBarToggleFlg != 'none')
    {
        $.cookie('searchToolBarFlg','1',{expires:360,path:'/',domain:'.aucfan.com'});
        $("#copyright").animate({padding:'15px 0 30px'},500);
        $('div#topcontrol').css('bottom','30px');
        $('div.searchListToolbarSwitch').animate({bottom:'0'},500);
        mainToggle(toolBarToggleFlg);
    } else {
        $("#copyright").css('padding','15px 0 200px');
        $('div#topcontrol').css('bottom','190px');
        $('div.searchListToolbarMainShadow').slideToggle('1000',function(){ mainToggle(toolBarToggleFlg); });
        $.cookie('searchToolBarFlg','0',{expires:360,path:'/',domain:'.aucfan.com'});
    }
    function mainToggle(toolBarToggleFlg){
        $('div.searchListToolbarMain').slideToggle("1000",function(){
            toolBarToggleFlg = $('div.searchListToolbarMain').css('display');
            if(toolBarToggleFlg == 'none')
            {
                $('div.searchListToolbarMainShadow').slideToggle();
                $('div.searchListToolbarSwitch span').html('<img src="http://x1.aucfan.com/img/yaji02.png" alt="矢印" width="19" height="18" />');
                $('div.searchListToolbarSwitch').css('bottom','0');
                setTimeout(function(){   $('div.searchListToolbarSwitch,#topcontro').fadeIn('normal'); },300);
            } else {
                $('div.searchListToolbarSwitch').css('bottom','155px');
                $('div.searchListToolbarSwitch span').html('<img src="http://x1.aucfan.com/img/yaji01.png" alt="矢印" width="19" height="18" />');
                setTimeout(function(){   $('div.searchListToolbarSwitch,#topcontrol').fadeIn('normal'); },100);
            }
        });
    }
}

$('div.searchListToolbarSwitch').click(function(){
    searchListToolbarSwitchClick();
});

var uvClickFlg = 1;
$("tr.results_shopping td a,tr.results_bid td a").click(function(){
    uvClickFlg = 2;
});
$("tr.results_shopping,tr.results_bid").click(function(){
    if(uvClickFlg == 2)
    {
        uvClickFlg = 1;
        return true;
    }
    var tds = $(this);
    var targetLink = $(tds.find("a.item_title"));
    if(targetLink.attr("target") == "_blank")
    {
        window.open(targetLink.attr("href"));
    } else {
        location.href = targetLink.attr("href");
    }
    return false;
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
var lis;
var dispCount = 5;
var hoverFlg = 0;
var dispDelay = 8000;
$(function(){
    var siteData = 'yoku';

    if(!$('#similarItem_frame ul.aucview_similar li')[0]) return false;
    lis = $('#similarItem_frame ul.aucview_similar li').clone();


    for(var i=0;lis.length>=i;i++)
    {
        $(lis[i]).find('p.item_price').remove();


        $(lis[i]).find('a').attr('href',$(lis[i]).find('a.imgLink').attr('data-'+siteData));
        $(lis[i]).find('a').attr('target','_blank');


        if(i>=dispCount)
        {
            $(lis[i]).css('display','none');
        }
    }
    $('div#ct_hotItem ul.ct_hotItem_list').html(lis);
    if(lis.length > dispCount)
    {
        setInterval(function(){ toolbarItemChange(); },dispDelay);
    }
    $('div.searchListToolbarMain').hover(function(){
        hoverFlg = 1;
    },function(){
        hoverFlg = 0;
    });

    function toolbarItemChange()
    {
        var rond;
        var count = 0;
        if(hoverFlg == 1 || $('div.searchListToolbarMain').css('display') == 'none') return true;
        $('div#ct_hotItem ul.ct_hotItem_list').fadeOut("slow",function(){
            for(var i=0;lis.length>=i;i++)
            {
                $(lis[i]).css("display",'none');
            }
            for(var i=0;dispCount>i;i++)
            {
                rond = Math.floor(Math.random()*(lis.length+1));
                if($(lis[rond]).css("display") != 'none')
                {
                    i--;
                    continue;
                }
                $(lis[rond]).css("display",'block');
            }
            $('div#ct_hotItem ul.ct_hotItem_list').html(lis);
            $('div#ct_hotItem ul.ct_hotItem_list').fadeIn("slow");
        });
    }
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function(){
    aucviewFuncs.initSearchbox('head');
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function(){
    $('ul#item_imgs li a.item_img_set').hover(function(){
        var target_div = $(this).children('div');
        if(target_div.children('div.hoverUp').css('display') != 'none') return false;
        target_div.children('div.hoverUp').css({width:$(this).css('width')});

        if($(this).width() < 200)
        {
            target_div.find('div.hoverUp').css('font-size','12px');
        }
        if($(this).width() < 150)
        {
            target_div.find('div.hoverUp').css('font-size','15px');
            target_div.find('div.hoverUp').css({height:$(this).find('img').css('height')});
            target_div.find('span.item_img_hidetab').css({height:($(this).find('img').height()*0.4)+'px',padding:'1.5% 5%','margin-top':'10px'});
            target_div.children('div.hoverUp').css('display','block');
            target_div.animate({'margin-top':'-'+($(this).find('img').height()+1)+'px','height':'50px'},'fast');

        } else {
            target_div.children('div.hoverUp').css('display','block');
            target_div.animate({'margin-top':'-51px','height':'50px'},'fast');
        }
    },function(){
        var target_div = $(this).children('div');
        target_div.animate({'margin-top':'0px','height':'0px'},'fast','',function(){ target_div.children('div.hoverUp').css('display','none'); });
    });
});


/*-------------------------------------------------------------------

-------------------------------------------------------------------*/
$(function(){
    $('span.itemimg_main').click(function(){
        $('div.prodThumWin ul.prodThumNav li img[src="'+$(this).find('img').attr('src')+'"]').parent('li').attr('class','current');
        $('div.prodThumWin div.prodThumImg img').attr('src',$(this).find('img').attr('src'));
        $('div.prodThumWin').css('display','block');
        $('div.prodThumWinInner').fadeIn();
        return false;
    });
    $('p.prodThumWinCls,div.prodThumBack').click(function(){
        $('div.prodThumWin,div.prodThumWinInner').css('display','none');
        $('div.prodThumWin ul.prodThumNav li').each(function(){
            $(this).removeClass();
        });
        return false;
    });
    $('div.prodThumWin ul.prodThumNav li img').click(function(){
        $('div.prodThumWin ul.prodThumNav li').each(function(){
            $(this).removeClass();
        });
        $(this).parent('li').attr('class','current');
        $('div.prodThumWin div.prodThumImg img').attr('src',$(this).attr('src'));
        cngImage($(this).attr('src'));
    });
});

$(function() {
    $('#bookmarkButton').on('click', function() {
        var site = $(this).attr('data-site');
        var auctionId = $(this).attr('data-aid');
        if (site == '' || auctionId == '') {
            return false;
        }

        $.ajax({
            url: 'http://aucfan.com/bookmark/add',
            xhrFields: {
                withCredentials: true
            },
            method: 'POST',
            data: {
                site: site,
                auctionId: auctionId
            },
            dataType: 'json',
            success: function(res) {
                if (! res.result.status || res.result.status == 'failed') return false;
                if (res.result.status == 'success') {
                    $('p.jsModalTrig[data-modal-target="modalBookmark2"]').click();
                }
                if (res.result.status == 'already') {
                    $('p.jsModalTrig[data-modal-target="modalBookmark3"]').click();
                }
                if (res.result.status == 'countOver') {
                    $('p.jsModalTrig[data-modal-target="modalBookmark4"]').click();
                }
            },
        });
    });
});
