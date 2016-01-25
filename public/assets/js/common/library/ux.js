$(window).ready(function(){
    $("#encryption").html(
        Base64.decode(Xor.process("wachinko", Base64.decode(user_block_text)))
    );
});