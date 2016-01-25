<?= Asset::js(array('common/coupon/coupon.js')); ?>
<div id="couponSearchField">
    <div class="couponSearchBox">
        <a href="/coupon/" class="logoCouponSearch">クーポン検索</a>
        <div class="couponSearchInput">
            <form name="couponSearchform" id="couponSearchform" method="get" action="/search">
            <input type="hidden" value="<?=$area?>" id="area_tmp">
            <input type="hidden" value="<?=$category?>" id="category_tmp">
                <div class="selectBox areaSelectBox">
                    <i class="arrow"></i>
                    <i class="close crossIco01"></i>
                    <div class="selectBlock"><?=$area?$area:"すべての都道府県"?></div>
                    <div class="selectList">
                        <select class="selectData" name="area">
                            <option value="">すべて</option>
                            <?php foreach($area_list as $v) : ?>
                                <option value="<?=$v?>" <?=$area==$v?"selected":""?> ><?=$v?></option>
                            <?php endforeach ?>
                        </select>
                        <ul class="selectListInner">
                            <li class='all <?=$area?"":"current"?>'>すべて</li>
                            <?php foreach($area_list as $v) : ?>
                                 <li class="<?=$v?><?=$area==$v?" current":""?>"><?=$v?></li>
                            <?php endforeach ?>
                        </ul>
                    </div>
                </div>
                <div class="selectBox categorySelectBox">
                    <i class="arrow"></i>
                    <i class="close crossIco01"></i>
                    <div class="selectBlock"><?=$category?$category:"すべてのカテゴリ"?></div>
                    <div class="selectList">
                        <select class="selectData" name="category">
                            <option value="">すべて</option>
                            <?php foreach($categories as $v) : ?>
                                <option value="<?=$v?>" <?=$category==$v?"selected":""?> ><?=$v?></option>
                            <?php endforeach ?>
                        </select>
                        <ul class="selectListInner">
                            <li class="all <?=$category?"":"current"?>">すべて</li>
                            <?php foreach($categories as $v) : ?>
                                <li class="<?=$v?><?=$category==$v?" current":""?>"><?=$v?></li>
                            <?php endforeach ?>
                        </ul>
                    </div>
                </div>
                <div class="searchSubmit btnEffects">
                    <button type="submit" id="couponSearchBtn" class="searchBtn">検索</button>
                </div>
            </form>
        </div>
    </div>
    <div class="couponHeadNav">
        <div class="couponHeadNavInner">
            <ul class="couponSortHeadNav">
                <li class="<?=$sort=="date"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'date'], ['area' => $area], ['category' => $category]); ?>">新着順</a></li>
                <li class="<?=($sort=="priority"||$sort=="")?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'priority'], ['area' => $area], ['category' => $category]); ?>">おすすめ順</a></li>
                <li class="<?=$sort=="saleoff"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'saleoff'], ['area' => $area], ['category' => $category]); ?>">割引順</a></li>
                <li class="<?=$sort=="price"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'price'], ['area' => $area], ['category' => $category]); ?>">売れ行き順</a></li>
                <li class="<?=$sort=="sold"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'sold'], ['area' => $area], ['category' => $category]); ?>">定価の安い順</a></li>
            </ul>
            <ul class="couponPaginationHeadNav">
                <li class="prev"><a href="?<?= Uri::build_query_string(['page' => $prev_page], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>"><i class="arrowLeftIco03"></i>前へ</a></li>
                <?php if($curr_page>$page_numbers+1) : ?>
                    <li class="first"><a href="?<?= Uri::build_query_string(['page' => 1], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>">1</a></li>
                <?php endif ?>
                <?php for ($i=max($curr_page-$page_numbers, 1); $i<=max(1, min($pages,$curr_page+$page_numbers)); $i++): ?>
                     <li class="<?= ($i == $curr_page) ? 'current' : '' ?>"><a href="?<?= Uri::build_query_string(['page' => $i], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>"><?= $i ?></a></li>
                <?php endfor ?>
                <?php if($curr_page < ($pages - $page_numbers)) : ?>
                    <li class="last"><a href="?<?= Uri::build_query_string(['page' => $pages], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>"><?= $pages ?></a></li>
                <?php endif ?>
                <li class="next"><a href="?<?= Uri::build_query_string(['page' => $next_page], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>">次へ<i class="arrowRightIco03"></i></a></li>
            </ul>
        </div>
    </div>
<!-- /#couponSearchField --></div>


<!--===== Contents Start =====-->
<section id="contentsWrap">
    <div id="contentsArea">
        <div class="couponHdType01">
            <h1 class="hd"><?=$area?$area."の":""?><?=$category?>クーポン</h1>
            <p class="count">全<em class="total"><?=Ultilities\NumUtil::format_currency($total_coupons)?></em>件中<span class="display">1～<?=$pages?>件を表示</span></p>
        </div>

        <div class="couponShowcaseBox">
            <?php foreach($coupons as $coupon) :?>
                <section class="couponShowcaseBlock">
                    <a href="<?=$coupon->coupon_url?>">
                        <h3 class="hdCoupon"><?=$coupon->coupon_title?></h3>
                        <p class="couponLabel"><?=$coupon->category_name?><span class="slash">／</span><?=$coupon->coupon_area?></p>
                        <div class="couponPrice">
                            <p>
                            <?php if($coupon->coupon_teika) : ?>
                                <del class="originalPrice"><?=$coupon->coupon_teika?>円</del><br>
                            <?php endif ?>
                            <?=$coupon->coupon_kakaku?><span class="yen">円</span></p>
                        </div>
                        <?php if($coupon->coupon_teika) : ?>
                            <p class="couponPriceOff"><?= \Ultilities\NumUtil::percentage($coupon->coupon_kakaku,$coupon->coupon_teika); ?><span class="percent">%</span><span class="off">OFF</span></p>
                        <?php else : ?>
                            <p class="couponSpecialPrice">Special<br>Price</p>
                        <?php endif ?>
                        <p class="couponTimeLimit">あと<span class="val"><?= \Ultilities\DateUtil::time_remaining($coupon->coupon_untilldatetime); ?></span>で終了</p>
                        <p class="couponSold"><span class="val"><?=$coupon->coupon_sold?></span>枚<br>
                        売れています</p>
                        <div class="couponImg">
                            <img src="<?=$coupon->coupon_photo?>" alt="">
                        </div>
                    </a>
                </section>
            <?php endforeach ?>
        <!-- /.couponShowcaseBox --></div>
    <!-- /#contentsArea --></div>

    <nav class="couponPaginationArea">
        <div class="couponPaginationNav">
            <ul class="couponPaginationList">
                <li class="prev"><a href="?<?= Uri::build_query_string(['page' => $prev_page], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>" class="btnType01 btnColor05 btnBdr btnEffects dim"><i class="arrowLeftIco07"></i>前のクーポンを見る</a></li>
                <?php if($curr_page>$page_numbers+1) : ?>
                    <li class="first"><a href="?<?= Uri::build_query_string(['page' => 1], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>">1</a></li>
                <?php endif ?>
                <?php for ($i=max($curr_page-$page_numbers, 1); $i<=max(1, min($pages,$curr_page+$page_numbers)); $i++): ?>
                     <li class="<?= ($i == $curr_page) ? 'current' : '' ?>"><a href="?<?= Uri::build_query_string(['page' => $i], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>"><?= $i ?></a></li>
                <?php endfor ?>
                <?php if($curr_page < ($pages - $page_numbers)) : ?>
                    <li class="last"><a href="?<?= Uri::build_query_string(['page' => $pages], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>"><?= $pages ?></a></li>
                <?php endif ?>
                <li class="next"><a href="?<?= Uri::build_query_string(['page' => $next_page], ['sort' => $sort], ['area' => $area], ['category' => $category]); ?>" class="btnType01 btnColor05 btnBdr btnEffects dim">次のクーポンを見る<i class="arrowRightIco07"></i></a></li>
            </ul>
        </div>
        <ul class="couponSortNav">
            <li class="<?=$sort=="date"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'date'], ['area' => $area], ['category' => $category]); ?>">新着順</a></li>
            <li class="<?=($sort=="priority"||$sort=="")?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'priority'], ['area' => $area], ['category' => $category]); ?>">おすすめ順</a></li>
            <li class="<?=$sort=="saleoff"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'saleoff'], ['area' => $area], ['category' => $category]); ?>">割引順</a></li>
            <li class="<?=$sort=="price"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'price'], ['area' => $area], ['category' => $category]); ?>">売れ行き順</a></li>
            <li class="<?=$sort=="sold"?"current":""?>"><a href="?<?= Uri::build_query_string(['sort' => 'sold'], ['area' => $area], ['category' => $category]); ?>">定価の安い順</a></li>
        </ul>
    </nav>
<!-- /#contentsWrap --></section>
<!--===== Contents End =====-->