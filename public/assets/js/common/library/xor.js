(function(exports) {
  "use strict";
    var Xor = {
        process: function(key, data) {
            return xor(key, data);
        }
    };

    function keyCharAt(key, i) {
        return key.charCodeAt( Math.floor(i % key.length) );
    }

    function xor(key, data) {
        var output = '';
        for(var i=0; i < data.length; i++){
            var k = keyCharAt(key, i);
            output += String.fromCharCode(data.charCodeAt(i) ^ k);
        }
        return output;
    }
    exports.Xor = Xor;
})(this);
