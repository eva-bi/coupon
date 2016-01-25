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
class NumUtil extends \Fuel\Core\Num
{
    public static function percentage($value, $total)
    {
        if(!$total) return 0;
        return number_format((($value / $total) * 100), 0);
    }
    public static function format_currency($n, $n_decimals=2)
    {
        return ((floor($n) == round($n, $n_decimals)) ? number_format($n) : number_format($n, $n_decimals));
    }
    public static function trim_thousand_separator($value)
    {
        $result = (double)str_replace(',', '', $value);
        return $result;
    }
}
