// Avoid `console` errors in browsers that lack a console.
(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();

// LoremImages
(function(b){b.fn.loremImages=function(e,d,j){var a=b.extend({},b.fn.loremImages.defaults,j);return this.each(function(c,k){var f=b(k),g="";for(c=0;c<a.count;c++){var h=e+Math.round(Math.random()*a.randomWidth),i=d+Math.round(Math.random()*a.randomHeight);g+=a.itemBuilder.call(f,c,"//lorempixel.com/"+(a.grey?"g/":"")+h+"/"+i+"/"+(a.category?a.category+"/":"")+"?"+Math.round(Math.random()*1E3),h,i)}f.append(g)})};b.fn.loremImages.defaults={count:10,grey:0,randomWidth:0,randomHeight:0,category:0,itemBuilder:function(e,
d){return'<img src="'+d+'" alt="Lorempixel">'}}})(jQuery);


// jQuery throttle / debounce - v1.1 - 3/7/2010
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);