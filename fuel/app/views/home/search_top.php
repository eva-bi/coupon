<div id="couponTopVisual">
    <div class="couponTopVisualInner">
        <h1 class="couponTopHdType01">クーポン検索</h1>
        <p class="couponTopCatch">おいしいレストランや人気エステなど、<br>
        おトクなクーポンをまとめて探せます。</p>
        <div class="couponTopInput">
            <form name="couponSearchform" id="couponSearchform" method="get" action="/search">
                <div class="selectBox areaSelectBox">
                    <h2 class="hdSelect">都道府県</h2>
                    <i class="arrow"></i>
                    <i class="close crossIco01"></i>
                    <div class="selectBlock">すべての都道府県</div>
                    <div class="selectList">
                        <select class="selectData" name="area">
                            <?php foreach($area_list as $v) : ?>
                                <option value="<?=$v?>"><?=$v?></option>
                            <?php endforeach ?>
                        </select>
                        <ul class="selectListInner">
                            <li class='all current'>すべて</li>
                            <?php foreach($area_list as $v) : ?>
                                <li class="<?=$v?>"><?=$v?></li>
                            <?php endforeach ?>
                        </ul>
                    </div>
                </div>
                <div class="selectBox categorySelectBox">
                    <h2 class="hdSelect">カテゴリ</h2>
                    <i class="arrow"></i>
                    <i class="close crossIco01"></i>
                    <div class="selectBlock">すべてのカテゴリ</div>
                    <div class="selectList">
                        <select class="selectData" name="category">
                            <?php foreach($categories as $v) : ?>
                                <option value="<?=$v?>"><?=$v?></option>
                            <?php endforeach ?>
                        </select>
                        <ul class="selectListInner">
                            <li class="all current">すべて</li>
                            <?php foreach($categories as $v) : ?>
                                <li class="<?=$v?>"><?=$v?></li>
                            <?php endforeach ?>
                        </ul>
                    </div>
                </div>
                <div class="searchSubmit">
                    <button type="submit" id="couponSearchBtn" class="searchBtn btnType01 btnColor03 btnEffects">クーポンを探す</button>
                </div>
            </form>
        </div>
    </div>
</div>