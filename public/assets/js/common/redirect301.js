/*-------------------------------------------------------------------
 *
 * File Name   : redirect301.js
 *
-------------------------------------------------------------------*/

$(window).load(function(){
    $('#proReOverlay').fadeIn();
    $('#proRedirect').animate(
        {
            "top":"0",
            "bottom":"0",
        },
        500,"easeOutBack"
        );

    $('.proReCloseBtn').on("click",function(){
        $('#proReOverlay').fadeOut();
        $('#proRedirect').fadeOut();
    });

});