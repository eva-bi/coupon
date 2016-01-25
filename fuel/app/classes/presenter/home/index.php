<?php

class Presenter_Home_Index extends Presenter
{
    const RESULT_PER_PAGE = 24;
    const PAGE_NUMBERS = 4;
    
	public function view()
	{
        \Config::load('master');
        
        //paginate
        if($sort = Input::get('sort')){
            $this->coupons = \Ultilities\CouponOrderBy::Orderby($this->coupons, $sort);   
        };
        $total_coupons = count($this->coupons);
        $pages = ceil($total_coupons / self::RESULT_PER_PAGE);

        $curr_page = Input::get('page') ? Input::get('page') : 1;
        $next_page = $curr_page < $pages ? $curr_page + 1 : $pages;
        $prev_page = $curr_page > 1 ? $curr_page - 1 : 1;
         
        $offset = ($curr_page - 1) * self::RESULT_PER_PAGE;
        $this->coupons = array_slice($this->coupons, $offset, self::RESULT_PER_PAGE);

        $this->pages = $pages;
        $this->curr_page = $curr_page;
        $this->next_page = $next_page;
        $this->prev_page = $prev_page?$prev_page:false;
        $this->page_numbers = self::PAGE_NUMBERS;
        $this->sort = $sort;
		$this->area_list = \Config::get('area_v1');
		$this->categories = \Config::get('category_name_v1');
	}
}
