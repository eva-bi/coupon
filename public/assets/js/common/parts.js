function Parts(keyword, category) {
  this.requests = [];
  this.results  = [];
  this.dataTypeUrls = {
    popularRakuten: '/append/popular_rakuten/?q=' + keyword + '&c=' + category,
    auctionYahoo:   '/append/auction_yahoo/?q=' + keyword,
    popularAmazon:  '/append/popular_amazon/?q=' + keyword + '&c=' + category,
    kakakucom:      '/append/kakakucom/?q=' + keyword,
  };
  this.renderTarget = {
    popularRakuten: {
      isFromSearchengine: {id: '', pid: '_RTaucf10000002'},
      top : {id: 'compare_rakuten_top_area', pid: '_RTaucf10000005'},
      sidebar: {id: 'side_bar_rakuten_ichiba', pid: '_RTaucf10000015'},
      bottom: {id: 'compare_rakuten_bottom_area', pid: '_RTaucf10000014'},
      rakutenAdTop: {id: 'rakutenAdTop', pid: '_RTaucf10000002'},
      rakutenAdBottom: {id: 'rakutenAdBottom', pid: '_RTaucf10000014'},
    },
    auctionYahoo: {
      isFromSearchengine: {id: ''},
      bottom: {id: 'auction_yahoo_bottom_area'},
    },
    popularAmazon: {
      sidebar: {id: 'popular_amazon_area'}
    },
    kakakucom: {
      sidebar: {id: 'popular_kakakucom'}
    }
  };
}

Parts.prototype = {
  get: function(targets) {
    var self = this;
    var responses = [];

    for (var dataType in this.dataTypeUrls) {
      if ($.inArray(dataType, targets) === -1) {
        continue;
      }
      this.requests.push({params: {url: this.dataTypeUrls[dataType]}, datatype: dataType});
    }

    for (var i = 0; i < self.requests.length; i++) {
      var jqXHR = self.ajax(self.requests[i].params);
      jqXHR.aucfanDataType = self.requests[i].datatype;
      responses.push(jqXHR);
    }
  },
  ajax: function(options, callbacks) {
    var self = this;
    options = $.extend({
      type: 'GET',
      url: '',
      dataType: 'json'
    }, options || {});

    if (options.url == null) {
      return;
    }

    var jqXHR = $.ajax(options).done(self.ajaxDone).fail(self.ajaxFail);

    return jqXHR;
  },
  ajaxDone: function(data, textStatus, jqXHR) {
    Parts.results[jqXHR.aucfanDataType] = {
      data: data,
      statuses: textStatus,
      jqXHR: jqXHR
    };
  },
  ajaxFail: function(jqXHR, textStatus, errorThrown) {
    Parts.results[jqXHR.aucfanDataType] = {
      data: null,
      statuses: textStatus,
      jqXHR: jqXHR
    };
  },
  render: function(dataType, renderType) {
    var self = this;

    if (typeof self.results[dataType] == 'undefined') {
      setTimeout(function() {
        Parts.render(dataType, renderType);
      }, 100);
      return;
    }

    var target = self.renderTarget[dataType];
    var opt = target[renderType];

    var html = '';
    if (dataType === 'popularRakuten') {
      if (renderType === 'isFromSearchengine') {
        appendRakuten(self.results[dataType].data, opt.pid);
        return true;
      }
      if (renderType === 'sidebar') {
        html = '<div id="rakten_recommend_side_bar" class="recommend_side_bar"><ul class="inner_area">';
        $.each(self.results[dataType].data, function(i, item) {
          var itemUrl = Parts.addPid(item.itemUrl, opt.pid);
          itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl;
          html += '<li class="inner_item">';
          html += '<span class="results-image catalog-image">';
          html += '<a href="' + itemUrl + '" target="_blank" rel="nofollow">';
          html += '<img src="' + item.mediumImageUrl + '">';
          html += '</a>';
          html += '</span>';
          html += '<ul class="result_price_area">'
          html += '<li class="cat-price">';
          html += '<span><a class="result_price" href="' + itemUrl + '" target="_blank" rel="nofollow">' + item.itemPrice + ' 円</a></span>';
          html += '</li></ul></li>';
        });
        html += '</div></ul>';
        $('#' + opt.id).html(html);
      } else if (renderType === 'top') {
        html = '<ul class="inner_area" style="width: 670px;">';
        $.each(self.results[dataType].data, function(i, item) {
          var itemUrl = Parts.addPid(item.itemUrl, opt.pid);
          itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl;
          html += '<li class="inner_item">';
          html += '<span class="sitename_rakuten_ichiba">';
          html += '<a href="' + itemUrl  + '" target="_blank" rel="nofollow">楽天市場</a>';
          html += '</span>';
          html += '<span class="results-image catalog-image">';
          html += '<a href="' + itemUrl + '" target="_blank" rel="nofollow">';
          html += '<img src="' + item.mediumImageUrl + '" id="img_rai_1">';
          html += '</a>';
          html += '</span>';
          html += '<p><a class="item_title" href="' + itemUrl + '" target="_blank" rel="nofollow">' + self.substr(item.itemName, 20) + '</a></p>';
          html += '<ul class="result_price_area">'
          html += '<li class="cat-price">';
          html += '<a class="item_price" href="' + itemUrl + '" target="_blank" rel="nofollow">' + item.itemPrice + ' 円</a>';
          html += '</li>';
          html += '<li class="btn_itempage">';
          html += '<span class="btn-item-detail">';
          html += '<a href="' + itemUrl + '" target="_blank" rel="nofollow">商品の詳細</a>';
          html += '</span>';
          html += '</li></ul></li>';
        });
        html += '</ul>';
        $('#' + opt.id).html(html);
      } else if (renderType === 'bottom') {
        html = '<ul class="inner_area" style="width: 670px;">';
        $.each(self.results[dataType].data, function(i, item) {
          var itemUrl = Parts.addPid(item.itemUrl, opt.pid);
          itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl;
          html += '<li class="inner_item">';
          html += '<span class="sitename_rakuten_ichiba">';
          html += '<a href="' + itemUrl  + '" target="_blank" rel="nofollow">楽天市場</a>';
          html += '</span>';
          html += '<span class="results-image catalog-image">';
          html += '<a href="' + itemUrl + '" target="_blank" rel="nofollow">';
          html += '<img src="' + item.mediumImageUrl + '" id="img_rai_1">';
          html += '</a>';
          html += '</span>';
          html += '<p><a class="item_title" href="' + itemUrl + '" target="_blank" rel="nofollow">' + self.substr(item.itemName, 20) + '</a></p>';
          html += '<ul class="result_price_area">'
          html += '<li class="cat-price">';
          html += '<a class="item_price" href="' + itemUrl + '" target="_blank" rel="nofollow">' + item.itemPrice + ' 円</a>';
          html += '</li>';
          html += '<li class="btn_itempage">';
          html += '<span class="btn-item-detail">';
          html += '<a href="' + itemUrl + '" target="_blank" rel="nofollow">商品の詳細</a>';
          html += '</span>';
          html += '</li></ul></li>';
        });
        html += '</ul>';
        $('#' + opt.id).html(html);
      } else if (renderType === 'rakutenAdTop') {
        html += '<div style="clear: both;">';
        if (self.results[dataType].data == null) {
          $('#' + opt.id).css('display', 'block');
          return false;
        }
        $.each(self.results[dataType].data, function(i, item) {
          if (i > 5) {
            return false;
          }
          var itemUrl = Parts.addPid(item.itemUrl, opt.pid);
          itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl;
          html += '<a href="' +  itemUrl + '" target="_blank">';
          html += '<div class="imgContainer">';
          html += '<img src="' + item.mediumImageUrl + '">';
          html += '</div>';
          html += '<div class="txtContainer">';
          html += '<p class="txtTl">' + self.substr(item.itemName, 30) + '</p>';
          html += '<p class="txtPl">' + item.itemPrice + ' 円</p>';
          html += '</div>';
          html += '</a>';
        });
        html += '</div>';
        $('#rakutenAdTopNoItem').remove();
        $('#' + opt.id).prepend(html).css('display', 'block');
      } else if (renderType === 'rakutenAdBottom') {
        html += '<div style="clear: both;">';
        if (self.results[dataType].data == null || self.results[dataType].data.length < 3) {
          $('#rakutenAdBottom').remove();
          $('#rakutenWidgetBottom').css('display', 'block');
          return false;
        }
        $.each(self.results[dataType].data, function(i, item) {
          if (i > 4) {
            return false;
          }
          var itemUrl = Parts.addPid(item.itemUrl, opt.pid);
          itemUrl = 'http://linkout.aucfan.com/?to=' + itemUrl;
          html += '<a href="' +  itemUrl + '" target="_blank">';
          html += '<div class="imgContainer">';
          html += '<img src="' + item.mediumImageUrl + '">';
          html += '</div>';
          html += '<div class="txtContainer">';
          html += '<p class="txtTl">' + self.substr(item.itemName, 30) + '</p>';
          html += '<p class="txtPl">' + item.itemPrice + ' 円</p>';
          html += '</div>';
          html += '</a>';
        });
        html += '</div>';
        $('#rakutenAdBottomNoItem').remove();
        $('#' + opt.id).prepend(html).css('display', 'block');
      }
    } else if (dataType === 'popularAmazon') {
      if (renderType === 'sidebar') {
        html = '<ul class="inner_area">';
        $.each(self.results[dataType].data, function(i, item) {
          html += '<li class="inner_item">';
          html += '<span class="sitename_amazon_jp"><a href="' + item.auctionItemUrl + '" target="_blank" rel="nofollow">アマゾン</a></span>';
          html += '<span class="results-image catalog-image">';
          html += '<a href="' + item.auctionItemUrl + '" target="_blank" rel="nofollow"><img src="' + item.thumbnail + '" id="img_am_1"></a></span>';
          html += '<p><a class="item_title" href="' + item.auctionItemUrl + '" target="_blank" rel="nofollow">' + item.title + '</a></p>';
          html += '<ul class="result_price_area">'
          html += '<li class="cat-price"><span class="sitename_amazon_jp display_price_only">';
          html += '<a class="item_price" href="' + item.auctionItemUrl + '" target="_blank" rel="nofollow">' + item.price + ' 円</a>';
          html += '</span></li></ul></li>';
        });
        html += '</ul>';
        $('#' + opt.id).addClass('recommend_side_bar').removeClass('amazon_recommend_side_bar_bg').html(html);
      }
    } else if (dataType === 'auctionYahoo') {
      if (renderType === 'isFromSearchengine') {
        appendYahoo(self.results[dataType].data);
        return true;
      }
      if (renderType === 'bottom') {
        html = '<ul class="inner_area">';
        $.each(self.results[dataType].data, function(i, item) {
          html += '<li class="inner_item">';
          html += '<span class="results-image simple-open-image">';
          html += '<a href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&amp;pid=883536473&amp;vc_url=' + item.itemUrl + '" target="_blank" rel="nofollow">';
          html += '<img src="http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=2015148&amp;pid=883536473" height="1" width="0" border="0" style="display:none;">';
          html += '<img src="' + item.thumbnail + '">';
          html += '</a>';
          html += '</span>';
          html += '<ul class="result_price_area">';
          html += '<li class="cat-price"><span>';
          html += '<a class="result_price" href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&amp;pid=883536473&amp;vc_url=' + item.itemUrl + '" target="_blank" rel="nofollow">';
          html += '<img src="http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=2015148&amp;pid=883536473" height="1" width="0" border="0">' + item.formattedPrice + ' 円';
          html += '</a>';
          html += '</span></li>';
          html += '<li>入札 ' + item.bid + '</li>';
          html += '<li>残り ' + item.formattedTime + '</li>';
          html += '</ul>';
          html += '</li>';
        });
        html += '</ul>';
        $('#' + opt.id).html(html);
      }
    } else if (dataType === 'kakakucom') {
      if (renderType === 'sidebar') {
        if (self.results[dataType].data == null) {
          return false;
        }
        html = '<ul class="inner_area">';
        $.each(self.results[dataType].data, function(i, item) {
          html += '<li class="inner_item">';
          html += '<span class="results-image catalog-image">';
          html += '<a href="' + item.itemUrl + '" target="_blank" rel="nofollow">';
          html += '<img src="' + item.thumbnail + '">';
          html += '</a>';
          html += '</span>';
          html += '<ul class="result_price_area">';
          html += '<li class="cat-price">' + item.title + '</li>';
          html += '<li class="cat-price">';
          html += '<span>';
          html += '<a class="result_price" href="' + item.itemUrl + '" target="_blank" rel="nofollow">' + item.formattedPrice + ' 円</a>';
          html += '</span>';
          html += '</li>';
          html += '</ul>';
          html += '</li>';
        });
        html += '</ul>';
        $('#' + opt.id).html(html);
      }
    }
  },
  substr: function(text, len, truncation) {
    if (len == null) {
      ken = 20;
    }
    if (truncation == null) {
      truncation = '...';
    }
    var str = '';

    for (i = 0; i < text.length; i++) {
      n = escape(text.charAt(i));
      if (i >= len) {return str + ' ' + truncation;}
      str += text.charAt(i);
    }

    return text;
  },
  addPid: function(url, pid, delimiter) {
    if (delimiter == null) {
      delimiter = '?';
    }

    var splittUrl = url.split(delimiter);
    if (splittUrl.length == 2) {
      url = splittUrl[0] + pid + delimiter + splittUrl[1];
    }

    return url;
  }
};

var appendRakuten = function (popularRakutenData, pid) {
  if (popularRakutenData == null) {
    return;
  }

  $.each(popularRakutenData, function (i, item) {
    var source = $('#append_rakuten_item').clone(true);
    source.attr('id', 'append_rakuten_item' + Number(i + 1));

    var itemUrl = 'http://linkout.aucfan.com/?to=' + item.itemUrl;
    var replaceStr = pid + '?pc';
    itemUrl = itemUrl.replace('?pc', replaceStr);
    source.find('.item_url').attr('href', itemUrl);

    if (item.mediumImageUrl != '') {
      source.find('img#img_rai_1').attr('src', item.mediumImageUrl);
    } else {
      source.find('img#img_rai_1').attr('src', '/assets/image/common/noimage/noimage.png');
    }

    var title = item.itemName;
    var length = 20;
    var textTrim = title.substr(0, length);
    var titleLength = title.length;
    if (length < titleLength) var title = textTrim + '...';
    source.find('.item_title').html(title);
    source.find('.item_price').html(item.itemPrice + ' 円');
    source.css('display', 'block');
    $('#inner_area_rai_48417').append(source);
  });
  $('#append_rakuten_item').remove();
  $('#rs_rakuten_item_anchor_area').remove();
  $('#inner_area_rai_48417').css('display', 'block');
};

var appendYahoo = function (popularYahooData) {
  if (popularYahooData == null) {
    return;
  }
  $.each(popularYahooData, function (i, item) {
    var source = $('#append_yahoo_item').clone(true);
    source.attr('id', 'append_yahoo_item' + Number(i + 1));

    var itemUrl = 'http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&pid=881788464&vc_url=';
    itemUrl += item.itemUrl;
    source.find('.append_yahoo_url').attr('href', itemUrl);

    if (item.thumbnail != '') {
      source.find('img.yahoo_thumbnail').attr('src', item.thumbnail);
    } else {
      source.find('img.yahoo_thumbnail').attr('src', '/assets/image/common/noimage/noimage.png');
    }

    var bid = item.bid;
    var price = item.formattedPrice;
    var formattedTime = item.formattedTime;
    price = price + ' 円';
    bid = '入札' + bid;
    formattedTime = '残り' + formattedTime;
    source.find('.yahoo_price').append(price);
    source.find('.yahoo_bid').html(bid);
    source.find('.yahoo_formattedTime').html(formattedTime);

    $('#append_yahoo').append(source);
  });
  $('#append_yahoo_item').remove();
  $('#rs_auction_item_anchor_area').remove();
  $('#inner_area_yahoo').css('display', 'block');
};

var appendOverture = function(query,mode)
{
    var url = '/append/overture/';
    var targetID = 'search' == mode ? 'ya_overture_search' : '';

    $.ajax({
        type:"GET",
        url:url,
        data: {
            q: query,
            mode : mode
        },
        cache:false,
        success: function(rtn) {
            //search OVTに下に自社広告追加にて。
            $('#'+targetID).html(rtn.replace(/##br##/g, "<br />"));//
        },
        error: function() {
            return;
        }
    });
};
