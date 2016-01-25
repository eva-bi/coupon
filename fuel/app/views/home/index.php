<!--===== Contents Start =====-->
<section id="contentsWrap">
    <?php echo View::forge('home/search_top', array('area_list' => $area_list, 'categories' => $categories))->render(); ?>

    <section id="contentsArea" class="couponTopContents">
        <h2 class="couponTopHdType02">最新のクーポンをチェック</h2>
        <div class="couponShowcaseBox couponTopShowcase">
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
    <!-- /#contentsArea --></section>
    <nav class="couponPaginationArea">
        <div class="couponPaginationNav">
            <ul class="couponPaginationList">
                <li class="prev"><a href="?page=<?= $prev_page ?><?=($sort)?"&sort=".$sort:""?>" class="btnType01 btnColor05 btnBdr btnEffects dim"><i class="arrowLeftIco07"></i>前のクーポンを見る</a></li>
                <?php if($curr_page>$page_numbers+1) : ?>
                    <li class="first"><a href="?page=1<?=($sort)?"&sort=".$sort:""?>">1</a></li>
                <?php endif ?>
                <?php for ($i=max($curr_page-$page_numbers, 1); $i<=max(1, min($pages,$curr_page+$page_numbers)); $i++): ?>
                     <li class="<?= ($i == $curr_page) ? 'current' : '' ?>"><a href="?page=<?= $i ?><?=($sort)?"&sort=".$sort:""?>"><?= $i ?></a></li>
                <?php endfor ?>
                <?php if($curr_page < ($pages - $page_numbers)) : ?>
                    <li class="last"><a href="?page=<?= $pages ?><?=($sort)?"&sort=".$sort:""?>"><?= $pages ?></a></li>
                <?php endif ?>
                <li class="next"><a href="?page=<?= $next_page ?><?=($sort)?"&sort=".$sort:""?>" class="btnType01 btnColor05 btnBdr btnEffects dim">次のクーポンを見る<i class="arrowRightIco07"></i></a></li>
            </ul>
        </div>
        <ul class="couponSortNav">
            <li class="<?=$sort=="date"?"current":""?>"><a href="?sort=date">新着順</a></li>
            <li class="<?=($sort=="priority"||$sort=="")?"current":""?>"><a href="?sort=priority">おすすめ順</a></li>
            <li class="<?=$sort=="saleoff"?"current":""?>"><a href="?sort=saleoff">割引順</a></li>
            <li class="<?=$sort=="price"?"current":""?>"><a href="?sort=price">売れ行き順</a></li>
            <li class="<?=$sort=="sold"?"current":""?>"><a href="?sort=sold">定価の安い順</a></li>
        </ul>
    </nav>
<!-- /#contentsWrap --></section>
<!--===== Contents End =====-->