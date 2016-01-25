/**
 * Created by makise on 15/09/03.
 */
function moveImage(target){
    var url = 'http://aucfan.com/ad_cs?id=7624';
    var $target = $(target);
    var columnCount = $('div a', $target).length;
    $('a', $target).each(function(index, element){
        var $campaignContainerDiv = $('<div/>').addClass('campaignContainer').attr('bhref', $(element).attr('href')).hide();
        $campaignContainerDiv.append($('<img/>').attr('src', '/assets/image/common/ad/rakuten_super_sale_square.png'));
        $(element).append($campaignContainerDiv);
    });

    var camImgCurrentPos = columnCount - 1;

    setInterval(function() {
        current = $('a', $target)[camImgCurrentPos];
        camImgCurrentPos++;
        camImgCurrentPos %= columnCount;
        next = $('a', $target)[camImgCurrentPos];

        if($('.campaignContainer', current).attr('bhref') == 'javascript:void(0);'){
            $(current).css('cursor', 'default');
        }
        $(current).attr('href', $('.campaignContainer', current).attr('bhref'));
        $('.imgContainer, .txtContainer', current).css('display', '');
        $('.campaignContainer', current).hide();

        $(next).attr('href', url).css('cursor', 'pointer');
        $('.imgContainer, .txtContainer', next).hide();
        $('.campaignContainer', next).show();
    }, 2000);
}

$('.campaignContainer').hover(
    function(){
        console.log('hover');
    },
    function(){

    }
)
