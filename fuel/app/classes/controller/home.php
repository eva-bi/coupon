<?php

class Controller_Home extends Controller_Template
{
    public $template = 'template';
    
	public function action_index()
	{
        $coupons = "";

        try
        {
            $coupons = unserialize(Cache::get('cache_coupons'));
        }
        catch (\CacheNotFoundException $e)
        {
            $curl = Request::forge('http://allcoupon.jp/api-v1/coupon', 'curl');
            $curl->set_params(array('output' => 'json', 'apikey' => '9EBgSyRbAPmutrWE'));
            // this is going to be an HTTP POST
            $curl->set_method('get');
            $curl->set_auto_format(true);
            $result = $curl->execute()->response();

            $coupons = json_decode($result->body);
            Cache::set('cache_coupons', serialize($coupons) , 300);
        }

        $view = Presenter::forge('home/index');
        $view->set('coupons', $coupons, false);

        $this->template->content = $view;
	}
    
	public function action_search()
	{
        $coupons = "";
        try
        {
            $coupons = unserialize(Cache::get('cache_coupons'));
        }
        catch (\CacheNotFoundException $e)
        {
            $curl = Request::forge('http://allcoupon.jp/api-v1/coupon', 'curl');
            $curl->set_params(array('output' => 'json', 'apikey' => '9EBgSyRbAPmutrWE'));
            // this is going to be an HTTP POST
            $curl->set_method('get');
            $curl->set_auto_format(true);
            $result = $curl->execute()->response();

            $coupons = json_decode($result->body);
            Cache::set('cache_coupons', serialize($coupons) , 300);
        }
        if($area = Input::get('area')){
            $coupons = array_filter($coupons, function($v, $k) {
                                    return $v->coupon_area == Input::get('area');
                            },
                            ARRAY_FILTER_USE_BOTH
                );
        };
        if($category = Input::get('category')){
            $coupons = array_filter($coupons, function($v, $k) {
                                    return $v->category_name == Input::get('category');
                            },
                            ARRAY_FILTER_USE_BOTH
                );
        };

        $view = Presenter::forge('home/search');
        $view->set('title', $area, false);
        $view->set('area', $area, false);
        $view->set('category', $category, false);
        $view->set('coupons', $coupons, false);

        $this->template->content = $view;
	}
}
