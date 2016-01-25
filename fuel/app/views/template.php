<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>おトクな共同購入クーポン情報検索サイト - オークファン（aucfan.com）</title>
    <meta name="author" content="aucfan">
    <meta name="robots" content="noydir,noodp">
    <meta name="description" content="おトクな共同購入クーポンの情報を大量に検索！グルーポン、ポンパレ等クーポンサイトからまとめて検索！「オークファン」過去10年間のオークション落札価格・情報を網羅。">
    <meta name="apple-mobile-web-app-capable" content="no">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=1064">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/pathToCustomIcon.png">
    <?= Asset::css(array('coupon.css')); ?>
    <!--[if lte IE 8]>
        <script type="text/javascript" src="/assets/js/common/library/ie9.js"></script>
    <![endif]-->
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <?= Asset::js(array(
        'common/library/jquery.easing.1.3.js',
        'common/library/velocity.min.js',
        'common/library/masonry.pkgd.min.js',
        'common/basic.js',
        'common/coupon/function.js',
        ));
    ?>
    
</head>
<body class="typeExtend">

    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-VVXB"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-VVXB');</script>
    <!-- End Google Tag Manager -->

    <div id="frame">
    <!--===== Header Start =====-->
    <header id="globalHeader">
        <div class="globalHeaderInner">
            <div class="ci"><a href="/"><img src="/assets/image/common/logo/logo_ci.png" alt="aucfan" height="104" width="500">
            <span class="ciTxt">国内最大級のショッピング・<br>オークション相場検索サイト</span></a></div>
            <ul class="headerNav">
                <li><a href="/auctemp/">オークションテンプレート</a></li>
                <li><a href="http://pro.aucfan.com/">オークファンプロ</a></li>
                <li><a href="/navi/premium/tutorial/">検索体験する</a></li>
                <li><a href="/faq.html">よくある質問</a></li>
                <li class="navAbout"><a href="/about.html">オークファンとは？</a></li>
            </ul>
        </div>
    <!-- #globalHeader --></header>
    <!--===== Header End =====-->
    
    
    <!--===== Content Start =====-->
    <?php echo $content; ?>
    <!--===== Content End =====-->

    <!--===== Footer Start =====-->
    <nav id="footerSitemap">
        <div class="footerSitemapInner">
            <div class="sitemapBox">
                <dl class="sitemapBlock">
                    <dt>サイト内コンテンツ</dt>
                    <dd>
                        <ul>
                            <li><a href="/search1/">落札相場検索</a></li>
                            <li><a href="/search2/">現在開催中のオークション検索</a></li>
                            <li><a href="/search3/">ショッピング検索</a></li>
                            <li><a href="/search1/s-ya/">ヤフオク!検索結果</a></li>
                            <li><a href="/search1/s-ra/">楽天オークション検索結果</a></li>
                            <li><a href="/search1/s-mo/">モバオク検索結果</a></li>
                            <li><a href="/topword/">人気キーワードランキング</a></li>
                            <li><a href="/hotword/">注目ワードランキング</a></li>
                            <li><a href="/rareword/">レアワードランキング</a></li>
                            <li><a href="/kwhist.html">リアルタイム検索ワード履歴</a></li>
                            <li><a href="/query/">検索クエリ集</a></li>
                        </ul>
                    </dd>
                </dl>
                <dl class="sitemapBlock">
                    <dt>関連コンテンツ</dt>
                    <dd>
                        <ul>
                            <li><a href="http://auc-school.com/semi/gakuoku/" target="_blank">オークファンゼミ</a></li>
                            <li><a href="http://auc-school.com" target="_blank">オークファンスクール</a></li>
                            <li><a href="http://pro.aucfan.com" target="_blank">オークファンプロ</a></li>
                            <li><a href="http://global.aucfan.com/" target="_blank">グローバルオークファン</a></li>
                            <li><a href="/college/" target="_blank">オークファンカレッジ</a></li>
                            <li><a href="http://mall.aucfan.com/" target="_blank">オークファン仕入れモール</a></li>
                            <li><a href="http://www.rakuichi-rakuza.jp/" target="_blank">フリーマーケット楽市楽座</a></li>
                            <li><a href="/trendsearch/" target="_blank">オークファントレンドサーチ</a></li>
                            <li><a href="/article/" target="_blank">オクトピ</a></li>
                            <li><a href="http://tech.aucfan.com/" target="_blank">aucfan Engineers' blog</a></li>
                            <li><a href="http://town.aucfan.com" target="_blank">オークファンタウン</a></li>
                            <li><a href="http://facebook.com/aucfan" target="_blank">オークファン公式Facebookページ</a></li>
                            <li><a href="http://www.auction-navi.jp" target="_blank">オークション出品代行「オクナビ」</a></li>
                            <li><a href="http://www.moshimo.com" target="_blank">もしもドロップシッピング</a></li>
                            <li><a href="http://www.sekaimon.com" target="_blank">セカイモン</a></li>
                            <li><a href="/ad_cs?id=6422" target="_blank">中古ビジネス専門紙リサイクル通信</a></li>
                        </ul>
                    </dd>
                </dl>
                <dl class="sitemapBlock">
                    <dt>オークファンのツール</dt>
                    <dd>
                        <ul>
                            <li><a href="http://tools.aucfan.com/selling/item/category">かんたん出品ツール（ヤフオク!）</a></li>
                            <li><a href="http://ap.aucfan.com/tools/mbok/selling">かんたん出品ツール（モバオク）</a></li>
                            <li><a href="http://tools.aucfan.com/selling/item/">マイ出品ストレージ</a></li>
                            <li><a href="http://tools.aucfan.com/feedback/bidder/">一括評価ツール</a></li>
                            <li><a href="http://tools.aucfan.com/shipping">一括送料比較ツール</a></li>
                            <li><a href="/auctemp/">オークションテンプレート</a></li>
                            <li><a href="http://tools.aucfan.com/featured/item">一括注目ツール</a></li>
                            <li><a href="http://tools.aucfan.com/monitor/item">オークション出品モニター</a></li>
                            <li><a href="http://tools.aucfan.com/re_selling/item">一括再出品ツール</a></li>
                        </ul>
                    </dd>
                </dl>
                <dl class="sitemapBlock">
                    <dt>会員サービス</dt>
                    <dd>
                        <ul>
                            <li><a href="/navi/premium/index6.html">新規会員登録</a></li>
                            <li><a href="https://ssl.aucfan.com/premium_member/regist">プレミアム会員登録</a></li>
                            <li><a href="https://ssl.aucfan.com/member/login">ログイン</a></li>
                        </ul>
                    </dd>
                    <dt>その他</dt>
                    <dd>
                        <ul>
                            <li><a href="/about.html">オークファンとは</a></li>
                            <li><a href="/faq.html">よくある質問</a></li>
                            <li><a href="/navi/help/">ヘルプ</a></li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
    <!-- /#footerSitemap -->
    </nav>
    <footer id="globalFooter">
        <div class="globalFooterInner">
            <ul class="footerNav">
                <li><a href="https://secure.aucfan.com/contact/general/">お問い合わせ</a></li>
                <li><a href="http://aucfan.co.jp/">会社概要</a></li>
                <li><a href="/navi/premium/tokushoho.html">特定商取引表示</a></li>
                <li><a href="http://aucfan.co.jp/recruit/">スタッフ募集</a></li>
                <li><a href="/company/ad.html">広告掲載について</a></li>
                <li><a href="/siteinfo/sitemap.html">サイトマップ</a></li>
                <li><a href="/siteinfo/service.html">利用規約</a></li>
                <li><a href="/siteinfo/link.html">リンクについて</a></li>
                <li><a href="/company/pp.html">プライバシーポリシー</a></li>
            </ul>
            <small class="copyright">&copy; 2000 aucfan Co.,Ltd. All Rights Reserved.</small>
        </div>
    <!-- #globalFooter --></footer>
    <a href="#frame" id="fixedPagetop"></a>
    <!--===== Footer End =====-->
    </div>
</body>
</html>
