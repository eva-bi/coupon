<?php
namespace Ultilities;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Num
 *
 * @author khuentt
 */
class DateUtil extends \Fuel\Core\Num
{
    public static function time_remaining($date)
    {
        $date = strtotime($date);
        $remaining = $date - time();        
        $days_remaining = floor($remaining / 86400);
        $hours_remaining = floor(($remaining % 86400) / 3600);
        $remaining_str = "";
        if($days_remaining){ 
            $remaining_str = $days_remaining . "日";
        }elseif($hours_remaining){
            $remaining_str = $hours_remaining . "時間";
        }
        return $remaining_str;
    }
}
