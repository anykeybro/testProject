/**
 * Created by MBakalov on 20.07.2015.
 */
var div = document.querySelector('div');

var func1 = function(){
    console.log( 'func1' );
    div.removeEventListener("click",func1);
    div.addEventListener("click",func2);
};

var func2 = function(){
    console.log( 'func2' );
    div.removeEventListener("click",func2);
    div.addEventListener("click",func1);
};

div.addEventListener("click", func1);
