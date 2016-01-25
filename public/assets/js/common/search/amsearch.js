/**
 * Created by tanikado on 2015/12/29.
 */

/*-------------------------------------------------------------------
 Amazon検索
 -------------------------------------------------------------------*/

function searchFormAuto() {
    var sort_param = $('#sort_change_form [name=o]').val();
    $('#order').val(sort_param);
    $('#searchUpdateItemListForm').submit();
}
function searchFormSubmit(isSubmit) {
    if (isSubmit) $('#searchUpdateItemListForm').submit();
    return;
}
var AmazonItem = {
    isAlert : true,//通信失敗時のアラート。
    loadImage : '/assets/image/common/layout/search/amazon/loading.gif',
    noImage : '/assets/image/common/noimage/amazon_img_noimage.png',
    init : function(){
        this.isAlert = true;
        $('#thumbnail_image').attr('src',this.loadImage);
        $('.amItemWindow #contentArea,#country_table,#amItemInrOverlay').hide();
        $('#amOverlay,.amItemWindow,#compare_loading,#loadingImage').show();
        $("#amDetailInfoBox .tagStatus").html("");
    },
    //モーダルの詳細を取る。
    getDetail : function(asin) {
        this.init();
        var url = '/append/modal_amazon/?asin=' + asin;
        var cb =function(data){
            AmazonItem.setModal(data);
            AmazonItem.setCountriesPrice(data);
        };
        this.request(url,cb);
    },
    request : function(url,cb){
        this.ajaxProc = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: 5000
        }).done(function(resp) {
            cb(resp);
        }).fail(function(){
            if(AmazonItem.isAlert){
                alert('データの取得に失敗しました。時間を置いてもう一度お試しください。');
            }
            AmazonItem.closeModal();
        });
    },
    //海外アマゾンとの価格比較テーブルを構成
    setCountriesPrice : function(data){
        if(typeof data['newPrice'] === 'undefined' ){
            $('#country_table tbody').html("-");
            $('#compare_loading').hide();
            $('#country_table').fadeIn();
            return false;
        }
        var url = '/append/compareamazon?asin=' + data['asin'] + '&price=' + data['newPrice'].split(",").join("");
        var cb = function(resp){
            var rec = "";
            for(var i in resp) {
                rec += '<tr>'
                    +'<td><a target="_blank" href="' + resp[i]['url'] + '">' + resp[i]['countryName'] + '</a></td>'
                    +'<td><span>' + resp[i]['price'] +'</span></td>'
                    +'<td><span>' + resp[i]['margin'] + '</span></td>'
                    +'<td><span>' + resp[i]['salesRank'] + '</span></td>'
                    +'<td>' + resp[i]['rate'] +'</td>'
                    +'</tr>';
            }
            $('#country_table tbody').html(rec);
            $('#compare_loading').hide();
            $('#country_table').fadeIn();
        };
        this.request(url,cb);
    },
    //メイン画像
    setImage: function(_self){
        var src = _self.attr("href");
        $("#thumbnail_image").attr('src',src).hide().fadeIn();
    },
    //モーダルウィンドウ
    setModal : function(data) {
        $("[data-params]").html('-');
        //階層がないものは自動
        for(var i in data){
            $("[data-params='"+i+"']").html(data[i]);
        }
        //画像は複数あるので
        $("[data-params='imageSets']").html("");
        for (var i in data['imageSets']) {
            if(data['imageSets'][i] == '/img/no_image_256x192.gif'){
                data['imageSets'][i] = this.noImage;
            }
            $("[data-params='imageSets']").append('<li class="itemPhoto"><a href="' + data['imageSets'][i] + '"><img src="' + data['imageSets'][i] + '" /></a></li>');
        }
        if(data['imageSets'][0] != '/img/no_image_256x192.gif') {
            $('#thumbnail_image').attr('src', data['imageSets'][0]);
        }
        //タグ
        var tags = {'inStock':'在庫あり','hasReviews':'レビューあり','freeShipping':'送料無料','fba':'FBA対象商品'};
        for(var i in tags){
            if(data[i] == true){
                $("#amDetailInfoBox .tagStatus").append('<li>'+tags[i]+'</li>');
            }
        }
        //レビュー
        $("#amReview").attr('href',"http://www.amazon.co.jp/review/product/"+data['asin']);
        $('#amLink').attr('href',data['url']);
        this.setMonorate(data['isP'],data['asin']);
        $('#loadingImage').hide();
        $('.amItemWindow #contentArea,#amItemWinClose,#thumbnail_image').fadeIn();
    },
    //モノレート
    setMonorate:function(isP,asin){
        $('#externalLinks .priceCheck a').addClass('pcheckFree').attr('href','http://aucfan.com/ad_cs?id=7792');
        $('#externalLinks .monorate a').addClass('mnrateFree').attr('href','http://aucfan.com/ad_cs?id=7792');
        if(isP) {
            $('#externalLinks .priceCheck a').removeClass('pcheckFree').attr('href','http://so-bank.jp/detail/?code=' + asin);
            $('#externalLinks .monorate a').removeClass('mnrateFree').attr('href','http://amashow.com/past.php?i=All&kwd=' + asin);
        }
    },
    //GETパラメータのセット
    setUrlVars : function(){
        var vars = {};
        var cid = 0; //TOP
        var params = location.search.substring(1).split('&');
        for(var i = 0; i < params.length; i++) {
            var element = params[i].split( '=' );
            var key = decodeURIComponent(element[0]);
            var val = decodeURIComponent(element[1]);
            if(key =='cid' && val != 1){
                $("[name='" + key + "'][value='"+ val +"']").attr('checked',true);
            }
            if(key == 'cid'){
                cid = val;
            }
            if(key == 'o'){
                $("[name='" + key + "']").val(val);
            }
        }
        this.setCategoryTree(cid);
        return vars;
    },
    //Amazonカテゴリぱんくず
    setCategoryTopicPath : function(resp){
        //クリックでフォームにセット＋リクエストさせる。
        var tp = "<span>»<a data-hasChild='1'  data-cid = '0'>Amazon</adata-hasChild></a></span>";// pankuzu_name0はamazon
        for(var i=1; i < 10; i++){
            if(resp[0]['pankuzu_name'+i] == resp[0]['name']){
                break;
            }
            //レスポンスのレコードは全て同一の階層なので深さは１レコードのみで判断し、全て子がある設定
            tp += '<span>»<a data-hasChild = "1" data-cid = "' + resp[0]['pankuzu_id'+i] + '">' + resp[0]['pankuzu_name'+i] + '</a></span>';
        }
        $('#amCateTp').html(tp);
    },
    //Amazon カテゴリーツリー
    setCategoryTree : function(cid){
        $('#amCategoryTree').html("<img src ='" +this.loadImage+ "' />");
        var url = '/append/category_amazon?cid=' + cid;
        var cb = function(resp){
            $("#searchUpdateItemListForm [name = 'cid']").val(cid);
            if(!resp){
                return false;
            }
            var cList = "";
            var cLevel = Number(resp[0]['level']) +1;
            for(var i in resp) {
                cList += '<li class="cate_parent"><a href="#" data-hasChild = "' + resp[i]['has_child'] + '" data-cid="' + resp[i]['id'] + '">' + resp[i]['name'] + '</a></li>';
            }
            $("#amCategoryTree").html(cList).fadeIn();
            AmazonItem.setCategoryTopicPath(resp);
        };
        this.request(url,cb);
    },
    //modalを閉じる再,通信を切断
    closeModal:function(){
        this.isAlert = false;
        if(this.ajaxProc) {
            this.ajaxProc.abort();
        }
        $('#amOverlay,.amItemWindow,.mnrateFreeWindow,.pcheckFreeWindow').fadeOut();
    }
};

$(function() {
    AmazonItem.setUrlVars();
    $(document).on("click", '#amItemListArea [data-asin]', function () {
        var scrollT = $(window).scrollTop();// スクロールした高さ
        var amWinTop = (scrollT + 50) + 'px';
        $('.amItemWindow').css({'top': amWinTop});
        //ウィンドウを開くときに毎回scrollTopを取る
        var asin = $(this).attr('data-asin');
        AmazonItem.getDetail(asin);
        return false;
    });
    $(document).on('click', '#thumbWideBox li.itemPhoto a', function () {
        AmazonItem.setImage($(this));
        return false;
    });
    $(document).on("click", '#amOverlay , .amItemWinClose' ,function () {
        AmazonItem.closeModal();
    });
    /* =================================================================

     モノレート・プライスチェック モーダル

     ================================================================= */
    /*-------------------------------------------------------------------
     User Agent
     -------------------------------------------------------------------*/
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
            basicAndroidVer = parseFloat(basicUa.slice(basicUa.indexOf('android') + 8));
            // Android Tablet
        } else if (basicUa.indexOf('android') != -1) {
            basicUaFlg = 3;
            basicAndroidFlg = 1;
            basicAndroidVer = parseFloat(basicUa.slice(basicUa.indexOf('android') + 8));
            // Internet Explorer
        } else if (basicUa.indexOf('msie') != -1 || basicUa.indexOf('trident') != -1) {
            var array = /(msie|rv:?)\s?([\d\.]+)/.exec(basicUa);
            basicIeFlg[0] = 1;
            basicIeFlg[1] = parseFloat((array) ? array[2] : 0);
        }
    }
    /* =================================================================

     Supplement Balloon

     ================================================================= */
    var supBalloon = {
        config: {
            trigElem: $('[data-supballoon]'),
            spd: 400,
            eas: 'easeInQuad',
            basicUaFlag : 1,
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
    $(document).on("click",'.mnrateFree',function(){
        $('#amOverlay').fadeIn();
        $('.mnrateFreeWindow').fadeIn();
        return false;
    });
    $(document).on("click",'.pcheckFree',function(){
        $('#amOverlay').fadeIn();
        $('.pcheckFreeWindow').fadeIn();
        return false;
    });
    $(document).on("click",'.amItemWindow .mnrateFree , .amItemWindow .pcheckFree',function(){
        $('#amItemInrOverlay').fadeIn();
        return false;
    });
    $(document).on("click",'#amOverlay , .amFreeWinClose , #amItemInrOverlay',function(){
        $('.mnrateFreeWindow').fadeOut();
        $('.pcheckFreeWindow').fadeOut();
        $('#amItemInrOverlay').fadeOut();
    });
    $(document).on("click",'[data-cid]',function(){
        var hasChild = $(this).attr('data-hasChild');
        var cid = $(this).attr('data-cid');
        var cName = $(this).html();
        if(hasChild == 1) {
            AmazonItem.setCategoryTree(cid);
        }else{
            if(cid != 1){
                $("#searchUpdateItemListForm [name = 'cid']").val(cid);
            }
            $('#amCategoryTree').html("");
            $('#amCateTp').append("<span>»<a data-hasChild='0' >" +cName+ "</a></span>");
            return false;
        }
        return false;
    });

});