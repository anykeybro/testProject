///**
// * Created by MBakalov on 20.07.2015.
// */

var a = (function(){
    var num=0;
    var tmp = function(){
        return num+=1;
    };
    return tmp;
})();



console.log(a());
console.log(a());
console.log(a());