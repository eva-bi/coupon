<div class="couponPaginationNav">
    <ul class="couponPaginationList">
        <? if($prev_page): ?>
            <li class="prev"><a href="?page=<?= $prev_page ?>" class="btnType01 btnColor05 btnBdr btnEffects dim"><i class="arrowLeftIco07"></i>前のクーポンを見る</a></li>
        <? endif ?>
        <? for($i = 1; $i <= $total_coupons; $i++): ?>
             <li><a href="?page=<?= $i ?>" class="<?= ($i == $curr_page) ? 'current' : '' ?>" ><?= $i ?></a></li>
        <? endfor ?>
        <? if($next_page): ?>
            <li class="next"><a href="?page=<?= $next_page ?>" class="btnType01 btnColor05 btnBdr btnEffects dim">次のクーポンを見る<i class="arrowRightIco07"></i></a></li>
        <? endif ?>
    </ul>
</div>