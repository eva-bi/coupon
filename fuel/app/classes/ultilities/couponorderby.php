<?php
namespace Ultilities;

class CouponOrderBy
{
    public static function Orderby($coupons, $sort_field)
    {
        switch(strtolower($sort_field)){
            case "priority":
                return static::OrderbyPriority($coupons);
                break;
            case "date":
                return static::OrderbyUntilldatetime($coupons);
                break;
            case "sold":
                return static::OrderbySold($coupons);
                break;
            case "saleoff":
                return static::OrderbySaleoff($coupons);
                break;
            case "price":
                return static::OrderbyPrice($coupons);
                break;
            default:
                return $coupons;
                break;
        }
    }

    private static function OrderbyPriority($coupons)
    {
        usort($coupons, function ($a, $b)
        {
            if ($a->priority == $b->priority) return 0;
            return ($a->priority > $b->priority) ? -1 : 1;
        });
        return $coupons;
    }

    private static function OrderbyUntilldatetime($coupons)
    {
        usort($coupons, function ($a, $b)
        {
            if ($a->coupon_untilldatetime == $b->coupon_untilldatetime) return 0;
            return ($a->coupon_untilldatetime < $b->coupon_untilldatetime) ? -1 : 1;
        });
        return $coupons;
    }

    private static function OrderbySold($coupons)
    {
        usort($coupons, function ($a, $b)
        {
            if (($a->coupon_sold) == ($b->coupon_sold)) return 0;
            return (($a->coupon_sold) > ($b->coupon_sold)) ? -1 : 1;
        });
        return $coupons;
    }

    private static function OrderbySaleoff($coupons)
    {
        usort($coupons, function ($a, $b)
        {
            if (($a->coupon_teika == 0) ||($b->coupon_teika == 0) || ($a->coupon_kakaku/$a->coupon_teika) == ($b->coupon_kakaku/$b->coupon_teika)) return 0;
            return (($a->coupon_kakaku/$a->coupon_teika) > ($b->coupon_kakaku/$b->coupon_teika)) ? -1 : 1;
        });
        return $coupons;
    }

    private static function OrderbyPrice($coupons)
    {
        usort($coupons, function ($a, $b)
        {
            if (($a->coupon_teika-$a->coupon_kakaku) == ($b->coupon_teika-$b->coupon_kakaku)) return 0;
            return (($a->coupon_teika-$a->coupon_kakaku) < ($b->coupon_teika-$b->coupon_kakaku)) ? -1 : 1;
        });
        return $coupons;
    }

}
