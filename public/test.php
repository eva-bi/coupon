<?php
        require 'restclient.php';
        $api = new RestClient;

        $coupons = $api->get('http://allcoupon.jp/api-v2/coupon', array(
                            'limit' => '10',
                            'output' => 'json',
                            'apikey' => '9EBgSyRbAPmutrWE'
                        )
                    );
        echo "<pre>";
        print_r(json_decode($coupons->response));
?>
