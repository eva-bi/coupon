var appendAucviewYahoo = function (query, places, categoryId, site) {
    var url = '/append/aucview_yahoo/';
    $.ajax({
        type:"GET",
        url:url,
        data: {
            q: query,
            categoryId: categoryId,
            site: site
        },
        cache:false,
        success: function(rtn) {
            var json = $.parseJSON(rtn);
            if (json == null) {
                $('#rs_auction_item_load').hide();
                $('#similarItem_frame').css('display', 'block');
                $('#ajax_yahoo_search_result_area').css('display', 'block');
                $('#ajax_yahoo_search_result_area a span').css('display', 'block');
                return;
            }
            if ($.inArray('bottom', places) >= 0) {
                $('#append_yahoo_item').css('display', 'block');
                $('#ajax_yahoo_search_result_area').css('display', 'none');
                $('#similarItem_frame').css('display', 'block');
                $('#rs_auction_item_load').hide();

                $.each(json, function (key, val) {
                    var source = $('#append_yahoo_item').clone(true);
                    source.attr('id', 'append_yahoo_item' + Number(key + 1));

                    var itemUrl = val.itemUrl;
                    source.find('.append_yahoo_url').attr('href', itemUrl);

                    if (val.thumbnail != '') {
                        source.find('img.yahoo_thumbnail').attr('src', val.thumbnail);
                    } else {
                        source.find('img.yahoo_thumbnail').attr('src', '/assets/image/common/noimage/noimage.png');
                    }

                    var bid = val.bid;
                    var price = val.formattedPrice;
                    var formattedTime = val.formattedTime;
                    price = price + ' 円/入札' + bid + '/' + formattedTime;
                    source.find('.yahoo_price').html(price);

                    var title = val.title;
                    var length = 30;
                    var textTrim = title.substr(0, length);
                    var titleLength = title.length;
                    if (length < titleLength) var title = textTrim + '...';

                    source.find('.yahoo_title').html(title);

                    $('#append_yahoo').append(source);
                });
                $('#append_yahoo_item').css('display', 'none');
            }
        },
        error: function() {
            $('#rs_auction_item_load').hide();
            $('#similarItem_frame').css('display', 'block');
            $('#ajax_yahoo_search_result_area').css('display', 'block');
            $('#ajax_yahoo_search_result_area a span').css('display', 'block');
            return;
        }
    });
};

var appendAucviewYahooRanking = function (query, places, categoryId, site, isFromSearchengine) {
    var url = '/append/aucview_yahoo_ranking/';
    $.ajax({
        type:"GET",
        url:url,
        data: {
            q: query,
            categoryId: categoryId,
            site: site,
            isFromSearchengine: isFromSearchengine
        },
        cache:false,
        success: function(rtn) {
            appendAucviewRankingCallback(rtn,places,'yahoo');
        },
        error: function() {
            $('#ajax_yahoo_search_result_middle_load').hide();
            $('.append_yahoo_ranking').css('display', 'none');
            $('.hotItem_related_box').css('display', 'none');
            $('#ajax_yahoo_search_result_middle a span').css('display', 'block');
            $('#ajax_yahoo_search_result_middle').css('display', 'block');
            return;
        }
    });
};

//車・バイクのカテゴリのみなので、表示対象IDなどappendAucviewYahooRankingに準ずることとする
var appendAucviewMbokRanking = function (query,places,categoryId) {
    var url = '/append/aucview_mbok_ranking/';
    $.ajax({
        type:"GET",
        url:url,
        data: {
            q: query,
            c: categoryId,
        },
        cache:false,
        success: function(rtn) {
            appendAucviewRankingCallback(rtn,places,"mbok");
            $('#middle_append_yahoo_ranking').addClass('icon_mbok');
        },
        error: function() {
            $('#ajax_yahoo_search_result_middle_load').hide();
            $('.append_yahoo_ranking').css('display', 'none');
            $('.hotItem_related_box').css('display', 'none');
            $('#ajax_yahoo_search_result_middle a span').css('display', 'block');
            $('#ajax_yahoo_search_result_middle').css('display', 'block');
            return;
        }
    });
};

var appendAucviewRankingCallback = function (rtn,places,site){
    var json = $.parseJSON(rtn);
    if (json == null) {
        $('#ajax_yahoo_search_result_middle_load').hide();
        $('.append_yahoo_ranking').css('display', 'none');
        $('.hotItem_related_box').css('display', 'none');
        // $('#ajax_yahoo_search_result_top a span').css('display', 'block');
        // $('#ajax_yahoo_search_result_top').css('display', 'block');
        $('#ajax_yahoo_search_result_middle a span').css('display', 'block');
        $('#ajax_yahoo_search_result_middle').css('display', 'block');
        return;
    }
    if ($.inArray('top', places) >= 0) {
        $.each(json, function (key, val) {
            var source = $('#append_yahoo_ranking_item').clone(true);
            source.attr('id', 'append_yahoo_ranking_item' + Number(key + 1));

            var itemUrl = val.aucviewUrl;
            source.find('.append_yahoo_ranking_url').attr('href', itemUrl);

            if (val.thumbnail != '') {
                source.find('img.append_yahoo_ranking_thumbnail').attr('src', val.thumbnail);
            } else {
                source.find('img.append_yahoo_ranking_thumbnail').attr('src', '/assets/image/common/noimage/noimage.png');
            }

            var title = val.title;
            var length = 30;
            var textTrim = title.substr(0, length);
            var titleLength = title.length;
            if (length < titleLength) var title = textTrim + '...';

            source.find('.append_yahoo_ranking_title').html(title);

            $('#append_yahoo_ranking_top').append(source);
        });
        $('#append_yahoo_ranking_item').css('display', 'none');
        $('#ajax_yahoo_search_result_top').css('display', 'none');
        $('#ajax_yahoo_search_result_top_load').css('display', 'none');
        $('#append_yahoo_ranking_top').css('display', 'block');
    }
    if ($.inArray('middle', places) >= 0) {
        $.each(json, function (key, val) {
            var li_id = 'middle_append_yahoo_ranking_item' + Number(key + 1);
            var thumbnail = '/assets/image/common/noimage/noimage.png';
            if (val.thumbnail != '') {
                thumbnail = val.thumbnail;
            }
            var vc = "";
            var itemUrl = val.itemUrl;
            if(site == 'mbok'){
                itemUrl = "http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&pid=883781251&vc_url=" + val.itemUrl;
            }
            var title = val.title;
            var length = 30;
            var textTrim = title.substr(0, length);
            var titleLength = title.length;
            if (length < titleLength) var title = textTrim + '...';
            var bid = val.bid;
            var price = val.formattedPrice;
            var formattedTime = val.formattedTime;
            price = price + ' 円';
            var list = '<li id="' +li_id+ '">'
                            +'<span><a href="' + itemUrl + '" class="middle_append_yahoo_ranking_url"><img src="' + thumbnail + '" class="middle_append_yahoo_ranking_thumbnail" /></a></span>'
                            +"<dl>"
                                + '<dd class="price"><a href="' + itemUrl + '" class="middle_append_yahoo_ranking_url middle_append_yahoo_ranking_price">' + price + '</a></dd>'
                                + '<dd class="bid_state">入札<span class="middle_append_yahoo_ranking_bid">' + bid + '</span>/<span class="middle_append_yahoo_ranking_date">' + formattedTime + '</span></dd>'
                                + '<dd class="item_name"><a href="' + itemUrl + '" class="middle_append_yahoo_ranking_url middle_append_yahoo_ranking_title">' + title + '</a></dd>'
                            + "</dl>"
                       + '</li>';
            $('#middle_append_yahoo_ranking').append(list);
            if (key == 6) {
                return false;
            }
        });
        if(site == 'mbok') {
            var imp = "";
            for(var i=0; i<6; i++){
                imp += '<img src="http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=2015148&pid=883781251" height="1" width="0" border="0">';
            }
            $('#middle_append_yahoo_ranking').append(imp);
        }
        $('#middle_append_yahoo_ranking_item').css('display', 'none');
        $('#ajax_yahoo_search_result_middle').css('display', 'none');
        $('.hotItem_related_box').css('display', 'block');
        $('#ajax_yahoo_search_result_middle_load').hide();
    }
};

var appendAucviewRakuten = function (query, places, isFromSearchengine) {
    var url = '/append/aucview_rakuten/';
    $.ajax({
        type:"GET",
        url:url,
        data: {q: query},
        cache:false,
        success: function(rtn) {
            var json = $.parseJSON(rtn);

            if (json == null) {
                $('#rs_rakten_item_load').hide();
                $('.rakten_related_box').css('display', 'block');
                $('#append_rakuten_from_search_engine').css('display', 'none');
                $('#append_rakuten').css('display', 'none');
                $('#rakuten_recommend_anchor_area').css('display', 'block');
                $('#left_rakuten').css('display', 'none');
                return;
            }

            var appendHead = function(headDisplayNum, targetId) {
                var $rakutenHeadItemParentDiv = $(targetId + '.rakuten-head-item div');
                var textLength = 25;

                $.each(json, function (key, val) {
                    if(key >= headDisplayNum) return true;

                    var itemUrl = val.itemUrl;
                    itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl.replace('?pc', '_RTaucf10000004' + '?pc');
                    var $rakutenHeadItemA = $('<a/>').attr({'href':itemUrl,'target':'_blank'});

                    var $imgContainerDiv  = $('<div/>').addClass('imgContainer');
                    if (val.mediumImageUrl != '') {
                        $imgContainerDiv.append($('<img/>').attr('src', val.mediumImageUrl));
                    } else {
                        $imgContainerDiv.append($('<img/>').attr('src', '/assets/image/common/noimage/noimage.png'));
                    }

                    var $txtContainerDiv  = $('<div/>').addClass('txtContainer');
                    var title = val.itemName;
                    var textTrim = title.substr(0, textLength);
                    var titleLength = title.length;
                    if (textLength < titleLength) title = textTrim + '...';

                    $txtContainerDiv.append($('<p/>').addClass('txtTl').text(title))
                                    .append($('<p/>').addClass('txtPl').text(val.itemPrice + ' 円'));

                    $rakutenHeadItemA.append($imgContainerDiv).append($txtContainerDiv);
                    $rakutenHeadItemParentDiv.append($rakutenHeadItemA);
                });

                $(targetId + '.rakuten-head-item').css('display', 'block');
                $(targetId + '.rakuten-head-noitem').css('display', 'none');
                }
            if ($.inArray('head', places) >= 0) {
                appendHead(6, '#pslAdCtHorWide');
            }
            if ($.inArray('head10', places) >= 0) {
                appendHead(10, '#pslAdCtHor');
            }

            if ($.inArray('bottom', places) >= 0) {
                $('.rakuten_recommend_box').addClass('rakten_related_box');
                $('.rakuten_recommend_box').removeClass('rakuten_recommend_box');
                $('.rakten_related_box').addClass('inner_area');
                $('.rakten_related_box').css('display', 'block');
                $('#rs_rakten_item_load').hide();

                $.each(json, function (key, val) {
                    var source = $('#append_rakuten_item').clone(true);
                    source.attr('id', 'append_rakuten_item' + Number(key + 1));

                    var itemUrl = val.itemUrl;
                    var replaceStr = '_RTaucf10000016' + '?pc';
                    itemUrl = itemUrl.replace('?pc', replaceStr);
                    itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl;
                    source.find('.append_rakuten_url').attr('href', itemUrl);

                    if (val.mediumImageUrl != '') {
                        source.find('img.rakuten_thumbnail').attr('src', val.mediumImageUrl);
                    } else {
                        source.find('img.rakuten_thumbnail').attr('src', '/assets/image/common/noimage/noimage.png');
                    }

                    var title = val.itemName;
                    var length = 30;
                    var textTrim = title.substr(0, length);
                    var titleLength = title.length;
                    if (length < titleLength) var title = textTrim + '...';
                    source.find('.rakuten_title').html(title);
                    source.find('.rakuten_price').html(val.itemPrice + ' 円');

                    $('#append_rakuten').append(source);
                });
                $('#append_rakuten_item').css('display', 'none');
            }

            if ($.inArray('side', places) >= 0) {
                var $rakutenSideParentDiv = $('#bnrAdCt.rakuten div');
                var sideDisplayNum  = 4;
                $('#left_rakuten_load').hide();
                $.each(json, function (key, val) {
                    if(key >= sideDisplayNum) return true;

                    var itemUrl = val.itemUrl;
                    itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl.replace('?pc', '_RTaucf10000010' + '?pc');
                    var $rakutenSideItemA = $('<a/>').attr({'href':itemUrl,'target':'_blank'});

                    if (val.mediumImageUrl != '')
                        $rakutenSideItemA.append($('<img/>').attr('src', val.mediumImageUrl));
                    else
                        $rakutenSideItemA.append($('<img/>').attr('src', '/assets/image/common/noimage/noimage.png'));

                    $rakutenSideItemA.append($('<p/>').addClass('txtTl').text(val.itemName));
                    $rakutenSideParentDiv.append($rakutenSideItemA);
                });
                $('#bnrAdCt.rakuten').css('display', 'block');
            }

            if ($.inArray('middle', places) >= 0) {
                var $rakutenMiddleItemParentDiv = $('#pslAdCtHorWide.rakuten-middle-item div');
                var textLength = 30;
                var maxDisplayNum = 5;
                $.each(json, function (key, val) {
                    if(key >= maxDisplayNum) return true;

                    var itemUrl = val.itemUrl;
                    itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl.replace('?pc', '_RTaucf10000008' + '?pc');
                    var $rakutenMiddleItemA = $('<a/>').attr({'href':itemUrl,'target':'_blank'});

                    var $imgContainerDiv  = $('<div/>').addClass('imgContainer');
                    if (val.mediumImageUrl != '')
                        $imgContainerDiv.append($('<img/>').attr('src', val.mediumImageUrl));
                    else
                        $imgContainerDiv.append($('<img/>').attr('src', '/assets/image/common/noimage/noimage.png'));


                    var $txtContainerDiv  = $('<div/>').addClass('txtContainer');

                    var title = val.itemName;
                    var textTrim = title.substr(0, textLength);
                    var titleLength = title.length;
                    if (textLength < title.length) title = textTrim + '...';

                    $txtContainerDiv.append($('<p/>').addClass('txtTl').text(title))
                                    .append($('<p/>').addClass('txtPl').text(val.itemPrice + ' 円'));

                    $rakutenMiddleItemA.append($imgContainerDiv).append($txtContainerDiv);
                    $rakutenMiddleItemParentDiv.append($rakutenMiddleItemA);
                });

                $('#pslAdCtHorWide.rakuten-middle-item').css('display', 'block');
                $('#pslAdCtHorWide.rakuten-middle-noitem').css('display', 'none');
            }
        },
        error: function() {
            $('.rakten_related_box').css('display', 'block');
            $('#append_rakuten_from_search_engine').css('display', 'none');
            $('#append_rakuten').css('display', 'none');
            $('#rakuten_recommend_anchor_area').css('display', 'block');
            $('#left_rakuten').css('display', 'none');
            return;
        }
    });
};
var appendAucviewAmazon = function(query, places, endCategoryName) {
        var url = '/append/aucview_amazon/';
        $.ajax({
            type:"GET",
            url:url,
            data: {
                q: query,
                endCategoryName : endCategoryName
            },
            cache:false,
            success: function(rtn) {
                var json = $.parseJSON(rtn);
                if ($.inArray('bottom', places) >= 0) {
                    if (json == null) {
                        $('#rs_amazon_item_load').hide();
                        $('.amazon_related_box').css('display', 'block');
                        $('#append_amazon').css('display', 'none');
                        $('#amazon_recommend_anchor_area').css('display', 'block');
                        return;
                    }
                    $('.amazon_recommend_box').addClass('amazon_related_box');
                    $('.amazon_recommend_box').removeClass('amazon_recommend_box');
                    $('.amazon_related_box').addClass('inner_area');
                    $('.amazon_related_box').css('display', 'block');
                    $('#rs_amazon_item_load').hide();
                    $.each(json, function (key, val) {
                        var source = $('#append_amazon_item').clone(true);
                        source.attr('id', 'append_amazon_item' + Number(key + 1));

                        var itemUrl = val.auctionItemUrl;
                        source.find('.append_amazon_url').attr('href', itemUrl);

                        if (val.thumbnail != '') {
                            source.find('img.amazon_thumbnail').attr('src', val.thumbnail);
                        } else {
                            source.find('img.amazon_thumbnail').attr('src', '/assets/image/common/noimage/noimage.png');
                        }

                        var title = val.title;
                        var length = 30;
                        var textTrim = title.substr(0, length);
                        var titleLength = title.length;
                        if (length < titleLength) var title = textTrim + '...';
                        source.find('.amazon_title').html(title);
                        source.find('.amazon_price').html(val.price + ' 円');

                        $('#append_amazon').append(source);
                    });
                    $('#append_amazon_item').css('display', 'none');
                }
            },
            error: function() {
                $('#rs_amazon_item_load').hide();
                $('.amazon_related_box').css('display', 'block');
                $('#append_amazon').css('display', 'none');
                $('#amazon_recommend_anchor_area').css('display', 'block');
                return;
            }
        });
};
var appendOverture = function(query,mode)
{
    var url = '/append/overture/';
    var targetID = 'aucview' == mode ? 'middle_ovt' : '';

    $.ajax({
        type:"GET",
        url:url,
        data: {
            q: query,
            mode : mode
        },
        cache:false,
        success: function(rtn) {
            $('#'+targetID).after(rtn);
        },
        error: function() {
            return;
        }
    });
};
