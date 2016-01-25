$(document).ready(function(){
    var $areaSelectBox = $('.areaSelectBox');
    $areaSelectBox.find('.selectData').val($('#area_tmp').val());
    
    var $categorySelectBox = $('.categorySelectBox');
    $categorySelectBox.find('.selectData').val($('#category_tmp').val());
});