Aucview = {};

/** Advertisement Parts */
Aucview.AdParts = (function(params) {
    var results  = {},
        jobs = {},
        appends = {
            yauc: {url: '/append/aucview_yahoo/', params: ['q', 'c']},
            yauc_ranking: {url: '/append/aucview_yahoo_ranking/', params: ['q', 'c']},
            richiba: {url: '/append/aucview_rakuten/', params: ['q']},
            amazon: {url: '/append/aucview_amazon/', params: ['q', 'lcn']},
        },
        defaultParams = $.extend(true, {q: '', c: ''}, params || {});
    if (params['pp'] == '1') {
        appends['ponpare'] = {url: '/append/aucview_ponpare/', params: ['q', 'lcn']};
    }
    return {
        retrylimit: 3,
        // @access public
        get: function(target) {
            var self = this,
                params = {};

            for (var dataType in appends) {
                if ($.inArray(dataType, target) === -1) {
                    continue;
                }

                params = self.getAjaxParams(appends[dataType]);
                if (params) {
                    results[dataType] = {
                        retries: 1,
                        data: null
                    };
                    self.ajax(dataType, params);
                }
            }
        },
        // @access public
        render: function(dataType, options) {
            var self = this;

            if (options.id == null) {
                return false;
            }

            if (results[dataType].data == null && results[dataType].retries <= self.retrylimit) {
                setTimeout(function () {
                    self.render(dataType, options);
                }, 500);
                return;
            }

            if (results[dataType].data == null) {
                return;
            }

            var html = '';
            if (dataType === 'yauc') {
                if (options.id === 'yaucRecommend') {
                    html = '<div class="recomList"><ul class="wBreak">';
                    $.each(results[dataType].data, function (i, item) {
                        var itemUrl = self.addValuecommerce(item.itemUrl, options.sid, options.pid);
                        html += '<li class="recomBlock">';
                        html += '<a href="' + itemUrl + '" target="_blank" class="op hv">';
                        html += '<div class="recomImg">';
                        html += '<div class="recomImgInner">';
                        html += '<div class="logoBadge"><i class="yahuokuIco"></i></div>';
                        html += '<img src="' + item.thumbnail + '" alt="" class="op">';
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="recomTxt">';
                        html += '<p class="name">' + self.substr(item.title) + '</p>';
                        html += '<p class="price">価格：<span>¥ ' + item.formattedPrice + '</span></p>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    });
                    html += '</ul></div>';
                    html += '<div class="recomMore hv">商品をもっと見る<div class="line"></div></div>';
                    $('#' + options.id).append(html).find('.recomNoItems').remove();
                }
            } else if (dataType === 'richiba') {
                if (options.id === 'richibaAdTile') {
                    obj = self.sort(results[dataType].data, 'reviewCount');
                    var html = '', list = '', $richibaAdTileElm = $('#' + options.id);
                    $.each(obj, function (i, item) {
                        if (i >= options.count) {
                            return false;
                        }
                        var itemUrl = self.addLinkout(item.itemUrl, options.pid);
                        list += '<li>';
                        list += '<a href="' + itemUrl + '" target="_blank">';
                        list += '<div class="adImg"><img src="' + item.mediumImageUrl + '" alt=""></div>';
                        list += '<div class="adTxt">';
                        list += '<p class="name">' + self.substr(item.itemName) + '</p>';
                        list += '<p class="price">' + self.numberFormat(item.itemPrice) + '円</p>';
                        list += '</div>';
                        list += '</a>';
                        list += '</li>';
                    });
                    if (list != '') {
                        html = '<ul class="adTileList">' + list + '</ul>';
                        $richibaAdTileElm.children('div.noMatchBgimg').remove();
                        $richibaAdTileElm.removeClass('adNonBlock').addClass('adTileBlock').prepend(html);
                    }
                } else if (options.id === 'richibaRecommend') {
                    html = '<div class="recomList"><ul class="wBreak">';
                    $.each(results[dataType].data, function (i, item) {
                        var itemUrl = self.addLinkout(item.itemUrl, options.pid);
                        html += '<li class="recomBlock">';
                        html += '<a href="' + itemUrl + '" target="_blank" class="op hv">';
                        html += '<div class="recomImg">';
                        html += '<div class="recomImgInner">';
                        html += '<div class="logoBadge"><i class="rakutenIco"></i></div>';
                        html += '<img src="' + item.mediumImageUrl + '" alt="" class="op">';
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="recomTxt">';
                        html += '<p class="name">' + self.substr(item.itemName) + '</p>';
                        html += '<p class="price">価格：<span>¥ ' + self.numberFormat(item.itemPrice) + '</span></p>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    });
                    html += '</ul></div>';
                    html += '<div class="recomMore hv">商品をもっと見る<div class="line"></div></div>';
                    $('#' + options.id).append(html).find('.recomNoItems').remove();
                }
            } else if (dataType === 'amazon') {
                if (options.id === 'amazonRecommend') {
                    html = '<div id="amazonRecommend" class="recomList"><ul class="wBreak">';
                    $.each(results[dataType].data, function (i, item) {
                        var itemUrl = self.addLinkout(item.itemUrl);
                        html += '<li class="recomBlock">';
                        html += '<a href="' + itemUrl + '" target="_blank" class="op hv">';
                        html += '<div class="recomImg">';
                        html += '<div class="recomImgInner">';
                        html += '<div class="logoBadge"><i class="amazonIco"></i></div>';
                        html += '<img src="' + item.mediumImageUrl + '" alt="" class="op">';
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="recomTxt">';
                        html += '<p class="name">' + self.substr(item.itemName) + '</p>';
                        html += '<p class="price">価格：<span>¥ ' + item.formattedPrice + '</span></p>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    });
                    html += '</ul></div>';
                    html += '<div class="recomMore hv">商品をもっと見る<div class="line"></div>';
                    $('#' + options.id).append(html).find('.recomNoItems').remove();
                }
            } else if (dataType === 'ponpare') {
                if (options.id === 'ponpareRecommend') {
                    html = '<div id="ponpareRecommend" class="recomList"><ul class="wBreak">';
                    $.each(results[dataType].data, function (i, item) {
                        var itemUrl = self.addLinkItemPonpare(item.link, options.vp);
                        html += '<li class="recomBlock">';
                        html += '<a href="' + itemUrl + '" target="_blank" class="op hv">';
                        html += '<div class="recomImg">';
                        html += '<div class="recomImgInner">';
                        //html += '<div class="logoBadgePPP"><i class="ponpareIco"></i></div>';
                        html += '<img src="' + item.imageFree.url + '" alt="" class="op">';
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="recomTxt">';
                        html += '<p class="name">' + self.substr(item.title) + '</p>';
                        html += '<p class="price">価格：<span>¥ ' + self.numberFormat(item.price) + '</span></p>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    });
                    html += '</ul></div>';
                    html += '<div class="recomMore hv">商品をもっと見る<div class="line"></div>';
                    $('#' + options.id).append(html).find('.recomNoItems').remove();
                }
            }
        },
        // @access private
        getAjaxParams: function(target) {
            var data = {},
                url = target.url;

            if (target.url == null || target.params == null) {
                return false;
            }

            $.each(target.params, function(i, v) {
                if (defaultParams[v] == '') {
                    return true;
                }
                data[v] = defaultParams[v];
            });

            return {url: url, data: data};
        },
        // @access private
        ajax: function(dataType, options) {
            var self = this;
            options = $.extend({
                type: 'GET',
                url: '',
                dataType: 'json',
                timeout: 5000
            }, options || {});

            if (options.url == null) {
                return;
            }
            var jqXHR = $.ajax(options);
            jqXHR.done(function(data, textStatus, jqXHR) {
                if (jqXHR.status == 200) {
                    results[dataType].data = data;
                    results[dataType].statuses = textStatus;
                    results[dataType].jqXHR = jqXHR;
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
            }).always(function(param1, textStatus, param2) {
                if (results[dataType].retries >= self.retrylimit) {
                    return false;
                }
                if (param1 == null
                    && (param2.status != null && param2.status != 200)
                ) {
                    setTimeout(function() {
                        self.ajax(dataType, options);
                    }, 1000);
                    results[dataType].retries++;

                }
            });
        },
        // @access private
        substr: function(text, len, truncation) {
            if (text == null) {
                return '';
            }
            if (len == null) {
                len = 24;
            }
            if (truncation == null) {
                truncation = '...';
            }

            var str = '';
            for (i = 0; i < text.length; i++) {
                n = escape(text.charAt(i));
                if (i >= len) {
                    return str + ' ' + truncation;
                }
                str += text.charAt(i);
            }

            return str;
        },
        // @access private
        addPid: function(url, pid, delimiter) {
            if (delimiter == null) {
                delimiter = '?';
            }

            var splittUrl = url.split(delimiter);
            if (splittUrl.length == 2) {
                url = splittUrl[0] + pid + delimiter + splittUrl[1];
            }

            return url;
        },
        // * access private
        replaceAmazonAssociateTag: function(url, associateTag) {
            var self = this;

            return self.addLinkout(url.replace(/aucfanip-22/g , associateTag));
        },
        // @access private
        addLinkout: function(url, pid, delimiter) {
            if (pid != null) {
                if (delimiter == null) {
                    delimiter = '?';
                }

                var splitUrl = url.split(delimiter);
                if (splitUrl.length == 2) {
                    url = splitUrl[0] + pid + delimiter + splitUrl[1];
                }
            }
            url = 'http://linkout.aucfan.com/?to=' + url;

            return url;
        },
     // @access private
        addLinkItemPonpare: function(url, new_vp) {
            var tmp_itemUrl = url;
            var url = "#";
            var vp = tmp_itemUrl.indexOf("&vp=");
            var va = tmp_itemUrl.indexOf("&va=");
            if (vp != -1 && va != -1) {
                url = 'http://linkout.aucfan.com/?to=' + tmp_itemUrl.substring(0, vp) + "&vp=" + new_vp + tmp_itemUrl.substring(va);
            }
            return url;
        },
        // @access private
        addValuecommerce: function(url, sid, pid) {
            url = 'http://linkout.aucfan.com/?to=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=SID&pid=PID&vc_url=' + url;
            url = url.replace('SID', sid);
            url = url.replace('PID', pid);

            return url;
        },
        // @access private
        numberFormat: function(num) {
            num = String(num);
            nums = num.split('');

            var result = '';
            var len = nums.length;

            for (var i = 0; i < len; i++){
                result = nums[(len - 1) - i] + result;

                if (i % 3 === 2){
                    result = ',' + result;
                }
            }

            return result;
        },
        // @access private
        sort: function(obj, field) {
            var target = obj.concat();
            target.sort(function(a, b){
                if (a[field] < b[field]) return 1;
                if (a[field] > b[field]) return -1;

                return 0;
            });

            return target;
        }
    };
});

/** Detail Switcher */
Aucview.DetailSwitcher = (function(site, auctionId) {
    var modalConfig = {},
        opts = {
            auctionId: auctionId,
            site: site,
            caption: '',
            detailPage: 'detailtext',
            originalUrl: window.location.href,
            captionElem: '#itemsCaption',
        };

    return {
        init: function(encrytCaption) {
            modalConfig = $.extend(true, modalConfig, Aucview.modalItemDesc.getConfig() || {});

            if (modalConfig.modalElem.size() <= 0) {
                return false;
            }

            var self = this;

            opts.caption = Base64.decode(Xor.process('93b7d358e031b24ccb1bf83914640b58', Base64.decode(encrytCaption)));
            if (opts.site === 'yahoo') {
                $(opts.captionElem).html(opts.caption);
            } else {
                $(opts.captionElem).html(opts.caption.replace(/[\n\r]/g, '<br>'));
            }

            var $modalTrig = modalConfig.modalTrig,
                $closeElem = modalConfig.closeElem,
                $btmCloseElem = modalConfig.btmCloseElem;

            $modalTrig.on('click', function(evt) {
                evt.preventDefault();
                window.scrollTo(0, 0);
                Aucview.modalItemDesc.modalShow();
                self.show();

                return false;
            });
            $closeElem.on('click', function() {
                Aucview.modalItemDesc.modalHide();
                self.hide();
            });

            $btmCloseElem.find('a').on('click', function() {
                Aucview.modalItemDesc.modalHide();
                self.hide();
            });

            modalConfig.modalBgElem.on('click', function() {
                Aucview.modalItemDesc.modalHide();
                self.hide();
            });

            window.addEventListener('popstate', function(e) {
                if (e.state != null && e.state.path.indexOf(opts.detailPage) !== -1) {
                    window.scrollTo(0, 0);
                    Aucview.modalItemDesc.modalShow();
                } else {
                    Aucview.modalItemDesc.modalHide();
                }
            }, true);
        },
        show: function() {
            var path = '/' + opts.detailPage + '/' + opts.site + '/' + opts.auctionId + '/';
            var pushHandler = {path: path};
            history.pushState(pushHandler, '', path);
        },
        hide: function() {
            var path = '/' + opts.site + '/' + opts.auctionId + '/';
            var pushHandler = {path: path};
            history.pushState(pushHandler, '', path);
        }
    };
});

/** Bookmark */
Aucview.Bookmark = (function() {
    var opts = {
            site: '',
            auctionId: '',
        },
        $toolBookmark = $('.toolBtnList').children('.toolBookmark');
    return {
        init: function(options) {
            var self = this;

            opts = $.extend(true, opts, options || {});
            self.add();
        },
        add: function() {
            var self = this;
            $('#addBookmark').on('click', function () {
                if ($toolBookmark.hasClass('add')) {
                    return false;
                }
                if (opts.site == null || opts.auctionId == null) {
                    return false;
                }

                $.ajax({
                    url: '/bookmark/add',
                    type: 'POST',
                    data: {
                        site: opts.site,
                        auctionId: opts.auctionId
                    },
                    dataType: 'json'
                }).done(function (res, textStatus, jqXHR) {
                    if (! res.result.status || res.result.status == 'failed') {
                        Aucview.alertModal.modalShow({
                            id: '#amBookmarkError',
                            title: '会員登録でお気に入りに追加！',
                            cont: 'エラーが発生しました。<br>恐れ入りますが、もう一度実行してください。'
                        });
                    }
                    if (res.result.status == 'success') {
                        Aucview.alertModal.modalShow({
                            id: '#amBookmarkError',
                            title: '会員登録でお気に入りに追加！',
                            cont: 'マイブックマークに登録しました。'
                        });
                        self.drawCheckmark();
                    }
                    if (res.result.status == 'already') {
                        Aucview.alertModal.modalShow({
                            id: '#amBookmarkError',
                            title: '会員登録でお気に入りに追加！',
                            cont: '既にマイブックマークに登録済みです。'
                        });
                        self.drawCheckmark();
                    }
                    if (res.result.status == 'countOver') {
                        Aucview.alertModal.modalShow({
                            id: '#amBookmarkError',
                            title: '会員登録でお気に入りに追加！',
                            cont: 'ブックマークの登録数が上限に達しているので長沢まで。'
                        });
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    Aucview.alertModal.modalShow({
                        id: '#amBookmarkError',
                        title: '無料会員登録でお気に入りに追加！',
                        cont: 'エラーが発生しました。<br>恐れ入りますが、もう一度実行してください。'
                    });
                });
            });
        },
        drawCheckmark: function() {
            if (! $toolBookmark.hasClass('add')) {
                $toolBookmark.addClass('add');

                var addTxt = $toolBookmark.find('.txtDesc').attr('data-addtxt');
                $toolBookmark.find('.txtDesc').text(addTxt);
            }
        }
    };
});

/** Exhibit */
Aucview.Exhibit = (function() {
    return {
        init: function() {
            var slef = this;
            if ($('#addExhibit')) {
                $('#addExhibit').on('click', function (e) {
                    e.preventDefault();
                    slef.submit();
                })
            }
        },
        submit: function() {
            $('#descriptionPlainWork').attr('value', $('#itemsCaption').html());
            $('#same_exhibited_form').submit();
        }
    };
});

/** Feeds */
google.load('feeds', '1');
Aucview.Feeds = (function() {
    var feedUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?callback=?',
        topicUrl = 'http://special.aucfan.com/feed/',
        collegeUrl = 'http://aucfan.com/college/feed/',
        releaseUrl = 'http://topics.aucfan.com/feed/';
  
    return {
        render: function(id, options) {
            if (typeof options == "undefined") {
                return false;
            }

            var url = '',
                num = 3,
                callback;

            switch (options.type) {
                case 'topic':
                    url = topicUrl;
                    callback = this.renderTopicRss;
                    break;
            }

            if (options.num != null && $.isNumeric(options.num)) {
                num = options.num;
            }

            var opts = $.extend({q: url, v: '1.0', num: num}, options.params || {});
            this.getFeeds(id, opts, callback);
        },
        getFeeds: function(id, options, callback) {
            if (! options.q) return false;
            $.getJSON(
                feedUrl,
                options,
                function(data) {
                    if (data) {
                      callback.call(this, id, data.responseData.feed);
                    }
                }
            );
        },
        renderTopicRss: function(id, feeds) {
            if (feeds == null) {
                return false;
            }
            $.each(feeds.entries, function() {
                try {
                    var images = this.content.match(/<img [^\/>].+?>/);
                    var image = images[0];
                    var imageTag = '';
                    if (image) {
                        image = image.replace(/width="[0-9]+"/, 'style=""');
                        imageTag = image.replace(/height="[0-9]+"/, '');
                    } else {
                        imageTag = '<img src="/assets/image/common/noimage/noimage.png" alt="no image">';
                    }
                } catch (e) {
                    imageTag = '<img src="/assets/image/common/noimage/noimage.png" alt="no image">';
                }

                var contents = '';
                contents = '<li>'
                         + '<a href="' + this.link + '" target="_blank" class="op hv">'
                         + '<div class="auctopiThum op">'
                         + '<div class="image">'
                         + imageTag
                         + '</div>'
                         + '</div>'
                         + '<p class="auctopiTxt">' + this.title + '</p>'
                         + '</a>'
                         + '</li>';
                $('#' + id).append(contents);
            });
        }
    };
});

/** Item belt */
Aucview.ItemBelt = (function() {
    return {
        lazyLoad: function() {
            $('#itemsBeltList li img').each(function() {
                var $this = $(this);

                $this.error(function() {
                    $this.attr('src', '/assets/image/common/noimage/no_image.png');
                });
                $this.attr('src', $this.attr('data-src'));
            });
        }
    };
});

/** Item Slider */
Aucview.ItemsSlider = (function() {
    return {
        lazyLoad: function() {
            $('#itemsSlider div').each(function() {
                var $img = $(this).find('img');

                $img.error(function() {
                    $img.attr('src', '/assets/image/common/noimage/no_image.png');
                });
                $img.attr('src', $img.attr('data-src'));
            });
        }
    };
});
